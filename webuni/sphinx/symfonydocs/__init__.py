# -*- coding: utf-8 -*-

from docutils import nodes
from sphinx import addnodes
from sphinx.writers.html import HTMLTranslator
from sphinx.util import docname_join
from pygments.lexers import get_lexer_by_name
from os import path, remove, makedirs
from requests import get, RequestException
from urllib import urlretrieve
from tempfile import gettempdir
from zipfile import ZipFile
from datetime import datetime
from collections import OrderedDict
from sensio.sphinx import refinclude, phpcode, configurationblock

class SymfonyHTMLTranslator(HTMLTranslator):
    def visit_sidebar(self, node):
        self.visit_admonition(node, 'sidebar')

    def depart_sidebar(self, node):
        self.depart_admonition(node)

    def visit_admonition(self, node, name=''):
        self.body.append(self.starttag(nodes.container(), 'div', CLASS=('admonition-wrapper')))
        self.body.append(self.starttag(nodes.container(), 'div', CLASS=(name)))
        self.body.append('</div>\n')
        self.body.append(self.starttag(node, 'div', CLASS=('admonition admonition-' + name)))
        self.set_first_last(node)

    def depart_admonition(self, node=None):
        self.body.append('</div>\n')
        self.body.append('</div>\n')

    def visit_literal_block(self, node):
        self.body.append('<div class="literal-block">\n')
        try:
            HTMLTranslator.visit_literal_block(self, node)
        finally:
            self.body.append('</div>\n')

    def visit_reference(self, node):
        if False == node.get('translated', True):
            self.body.append('<span class="no-translated">')
        HTMLTranslator.visit_reference(self, node)

    def depart_reference(self, node):
        HTMLTranslator.depart_reference(self, node)
        if False == node.get('translated', True):
            self.body.append('</span>')

class GithubDocs(object):
    groups = OrderedDict()

    def __init__(self):
        self.add_group('__all__')

    def add_group(self, name):
        self.groups[name] = {'total_size': 0, 'total_count': 0, 'count': 0, 'size': 0, 'files': {}}

    def add_file(self, group, path, exists, size):
        if group not in self.groups:
            self.add_group(group)

        for key in ('__all__', group):
            self.groups[key]['total_count'] += 1
            self.groups[key]['total_size'] += size
            if exists:
                self.groups[key]['count'] += 1
                self.groups[key]['size'] += size

        self.groups[group]['files'][path] = { 'exists': exists, 'size': size }

class GithubDoc(object):
    def __init__(self, config, srcdir, statistics):
        self.set_config(config)
        self.srcdir = srcdir
        self.statistics = statistics
        self.missing_files = []
        self.missing_rst_files = []

    def set_config(self, config):
        missing_keys = list(set(['group_name', 'repository', 'target_path']) - set(config.keys()))
        if missing_keys:
            raise GithubDocConfigException(missing_keys)

        self.config = dict({'source_path': '', 'sha': 'master'}.items() + config.items())
        for key in ('source_path', 'target_path'):
            self.config[key] = (self.config[key].rstrip('/')+'/').lstrip('/')

    def copy_files(self, files):
        zip_url = 'https://github.com/{0}/archive/{1}.zip'.format(self.config['repository'], self.config['sha'])
        zip_path = '{0}/{1}-{2}.zip'.format(gettempdir(), self.config['repository'].replace('/', '-'), self.config['sha'])

        copied = []
        if not path.exists(zip_path) or datetime.fromtimestamp(path.getmtime(zip_path)) < self._get_last_commit_date():
            urlretrieve(zip_url, zip_path)

        zip_file = ZipFile(zip_path)
        prefix = '{0}-{1}/{2}'.format(path.basename(self.config['repository']), self.config['sha'], self.config['source_path'])
        slice_from = len(self.config['target_path'])
        for file_path in files:
            try:
                content = zip_file.read(prefix + file_path[slice_from:])
            except KeyError:
                continue

            target_path = path.join(self.srcdir, file_path)
            if not path.exists(path.dirname(target_path)):
                makedirs(path.dirname(target_path))

            f = open(target_path, 'wb')
            f.write(content)
            f.close()

            copied.append(target_path)

        return copied

    def _get_last_commit_date(self):
        url = 'https://api.github.com/repos/{0}/commits'.format(self.config['repository'])
        try:
            r = get(url, params={'sha': self.config['sha'], 'path': self.config['source_path'], 'per_page': 1})
            r.raise_for_status
            return datetime.strptime(r.json()[0]['commit']['committer']['date'][0:19], '%Y-%m-%dT%H:%M:%S')
        except:
            return datetime.now()

    def init_github_info(self):
        r = get('https://api.github.com/repos/{0}/git/trees/{1}'.format(self.config['repository'], self.config['sha']), params={'recursive': 1})
        r.raise_for_status()

        slice_from = len(self.config['source_path'])
        for element in r.json()['tree']:
            if 'blob' != element['type']:
                continue

            if not element['path'].startswith(self.config['source_path']):
                continue

            file_path = self.config['target_path']+element['path'][slice_from:]
            file_rst, extension = path.splitext(file_path)

            exists = path.exists(path.join(self.srcdir, file_path))
            if not exists:
                self.missing_files.append(file_path)

            if not exists and '.rst' == extension:
                self.missing_rst_files.append(file_rst)

            if '.rst' == extension:
                self.statistics.add_file(self.config['group_name'], file_rst, exists, element['size'])

class GithubDocConfigException(Exception):
    def __init__(self, missing_keys):
        self.missing_keys = missing_keys

merged_github_files = []
missing_github_rst_files = []
github_docs = GithubDocs()

def merge_github_docs(app):
    global merged_github_files, missing_github_rst_files, github_docs

    for config in app.builder.config.github_docs:
        try:
            doc = GithubDoc(config, app.srcdir, github_docs)
        except GithubDocConfigException, e:
            app.warn('Missing keys "'+'", "'.join(e.missing_keys)+'" in "github_doc" configuration: '+str(config))
            continue

        config = doc.config
        app.info('analyzing documentation from http://github.com/{0}'.format(config['repository']))

        try:
            doc.init_github_info()
        except Exception, e:
            app.warn('Error during analyzing documentation: '+str(e))

        if len(doc.missing_files) == 0:
            continue

        missing_github_rst_files += doc.missing_rst_files

        app.info('merging {0:d} file(s) from http://github.com/{1} to {2}'.format(len(doc.missing_files), config['repository'], config['target_path']))
        try:
            merged_github_files += doc.copy_files(doc.missing_files)
        except Exception, e:
            app.warn('Error during copying files: '+str(e))

def delete_merged_github_docs(app, exception):
    for file_path in merged_github_files:
        if path.exists(file_path):
            app.info('deleting merged file "'+file_path+'"')
            remove(file_path)

def fix_nodes(app, doctree, docname):
    for node in doctree.traverse(nodes.reference):
        if 'internal' not in node or 'refuri' not in node:
            continue

        rst_file = path.dirname(docname)+'/'+path.splitext(node['refuri'])[0]
        if True == node['internal'] and rst_file.lstrip('/') in missing_github_rst_files:
            node['translated'] = False

    for node in doctree.traverse(nodes.literal_block):
        if False == node.get('linenos', False):
            node['linenos'] = 'table'

    for node in doctree.traverse(addnodes.versionmodified):
        inline = node.next_node(nodes.inline)
        if None != inline:
            inline['classes'] = ['versionmodified']

def register_jinja_filters(app):
    if hasattr(app.builder.templates, 'environment'):
        app.builder.templates.environment.filters['human_size'] = human_size
        app.builder.templates.environment.filters['basename'] = path.basename
        app.builder.templates.environment.filters['dirname'] = path.dirname

def human_size(size):
    for x in ['B','KB','MB','GB','TB']:
        if size < 1024.0:
            return '{0:3.1f} {1}'.format(size, x)
        size /= 1024.0

def add_html_context(app, pagename, templatename, context, doctree):
    context['translated'] = pagename not in missing_github_rst_files
    context['github_docs'] = github_docs.groups

def setup(app):
    refinclude.setup(app)
    configurationblock.setup(app)
    phpcode.setup(app)

    # enable highlighting for PHP code not between ``<?php ... ?>`` by default
    php = get_lexer_by_name('php', startinline=True)
    app.add_lexer('php', php)
    app.add_lexer('php-annotations', php)

    app.connect('builder-inited', register_jinja_filters)
    app.connect('builder-inited', merge_github_docs)
    app.connect('doctree-resolved', fix_nodes)
    app.connect('html-page-context', add_html_context)
    app.connect('build-finished', delete_merged_github_docs)

    app.config.html_theme_path.append(path.abspath(path.join(path.dirname(__file__), 'themes')))
    app.config.html_translator_class = "webuni.sphinx.symfonydocs.SymfonyHTMLTranslator"
    app.config.html_additional_pages['translation'] = 'translation.html'

    app.add_config_value('github_docs', [], '')
