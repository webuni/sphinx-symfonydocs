# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

setup(
    name = 'webuni.sphinx.symfonydocs',
    version = '0.8.3',
    author = u'Martin Hasoň',
    author_email = 'martin.hason@gmail.com',
    description = 'Webuni Sphinx extension for Symfony documentation',
    license = 'MIT',
    platforms = 'any',
    packages = find_packages(),
    include_package_data = True,
    zip_safe = False,
    install_requires = [
        'Sphinx>=1.1',
        'Jinja2>=2.7',
        'requests>=1.0',
        'sphinx-php>=1.0'
    ],
    dependency_links = [
        'https://github.com/fabpot/sphinx-php/archive/master.zip#egg=sphinx-php-1.0'
    ]
)
