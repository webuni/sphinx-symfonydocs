/*!
* TableSorter 2.10.8 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach
*/
!function(f){f.extend({tablesorter:new function(){function c(d){"undefined"!==typeof console&&"undefined"!==typeof console.log?console.log(d):alert(d)}function t(d,b){c(d+" ("+((new Date).getTime()-b.getTime())+"ms)")}function r(d,b,a){if(!b)return"";var e=d.config,c=e.textExtraction,l="",l="simple"===c?e.supportsTextContent?b.textContent:f(b).text():"function"===typeof c?c(b,d,a):"object"===typeof c&&c.hasOwnProperty(a)?c[a](b,d,a):e.supportsTextContent?b.textContent:f(b).text();return f.trim(l)} function j(d){var b=d.config,a=b.$tbodies=b.$table.children("tbody:not(."+b.cssInfoBlock+")"),e,u,l,p,n,k,h="";if(0===a.length)return b.debug?c("*Empty table!* Not building a parser cache"):"";a=a[0].rows;if(a[0]){e=[];u=a[0].cells.length;for(l=0;l<u;l++){p=b.$headers.filter(":not([colspan])");p=p.add(b.$headers.filter('[colspan="1"]')).filter('[data-column="'+l+'"]:last');n=b.headers[l];k=g.getParserById(g.getData(p,n,"sorter"));b.empties[l]=g.getData(p,n,"empty")||b.emptyTo||(b.emptyToBottom?"bottom": "top");b.strings[l]=g.getData(p,n,"string")||b.stringTo||"max";if(!k)a:{p=d;n=a;k=-1;for(var f=l,m=void 0,t=g.parsers.length,F=!1,D="",m=!0;""===D&&m;)k++,n[k]?(F=n[k].cells[f],D=r(p,F,f),p.config.debug&&c("Checking if value was empty on row "+k+", column: "+f+': "'+D+'"')):m=!1;for(;0<=--t;)if((m=g.parsers[t])&&"text"!==m.id&&m.is&&m.is(D,p,F)){k=m;break a}k=g.getParserById("text")}b.debug&&(h+="column:"+l+"; parser:"+k.id+"; string:"+b.strings[l]+"; empty: "+b.empties[l]+"\n");e.push(k)}}b.debug&& c(h);b.parsers=e}function v(d){var b=d.tBodies,a=d.config,e,u,l=a.parsers,p,n,k,h,q,m,H,j=[];a.cache={};if(!l)return a.debug?c("*Empty table!* Not building a cache"):"";a.debug&&(H=new Date);a.showProcessing&&g.isProcessing(d,!0);for(h=0;h<b.length;h++)if(a.cache[h]={row:[],normalized:[]},!f(b[h]).hasClass(a.cssInfoBlock)){e=b[h]&&b[h].rows.length||0;u=b[h].rows[0]&&b[h].rows[0].cells.length||0;for(n=0;n<e;++n)if(q=f(b[h].rows[n]),m=[],q.hasClass(a.cssChildRow))a.cache[h].row[a.cache[h].row.length- 1]=a.cache[h].row[a.cache[h].row.length-1].add(q);else{a.cache[h].row.push(q);for(k=0;k<u;++k)if(p=r(d,q[0].cells[k],k),p=l[k].format(p,d,q[0].cells[k],k),m.push(p),"numeric"===(l[k].type||"").toLowerCase())j[k]=Math.max(Math.abs(p)||0,j[k]||0);m.push(a.cache[h].normalized.length);a.cache[h].normalized.push(m)}a.cache[h].colMax=j}a.showProcessing&&g.isProcessing(d);a.debug&&t("Building cache for "+e+" rows",H)}function x(d,b){var a=d.config,e=d.tBodies,c=[],l=a.cache,p,n,k,h,q,m,r,j,D,s,v;if(l[0]){a.debug&& (v=new Date);for(j=0;j<e.length;j++)if(p=f(e[j]),p.length&&!p.hasClass(a.cssInfoBlock)){q=g.processTbody(d,p,!0);p=l[j].row;n=l[j].normalized;h=(k=n.length)?n[0].length-1:0;for(m=0;m<k;m++)if(s=n[m][h],c.push(p[s]),!a.appender||!a.removeRows){D=p[s].length;for(r=0;r<D;r++)q.append(p[s][r])}g.processTbody(d,q,!1)}a.appender&&a.appender(d,c);a.debug&&t("Rebuilt table",v);b||g.applyWidget(d);f(d).trigger("sortEnd",d)}}function A(d){var b=[],a={},e=0,u=f(d).find("thead:eq(0), tfoot").children("tr"),l, p,n,k,h,q,m,j,r,s;for(l=0;l<u.length;l++){h=u[l].cells;for(p=0;p<h.length;p++){k=h[p];q=k.parentNode.rowIndex;m=q+"-"+k.cellIndex;j=k.rowSpan||1;r=k.colSpan||1;"undefined"===typeof b[q]&&(b[q]=[]);for(n=0;n<b[q].length+1;n++)if("undefined"===typeof b[q][n]){s=n;break}a[m]=s;e=Math.max(s,e);f(k).attr({"data-column":s});for(n=q;n<q+j;n++){"undefined"===typeof b[n]&&(b[n]=[]);m=b[n];for(k=s;k<s+r;k++)m[k]="x"}}}d.config.columns=e;var v,B,x,A,z,y,C,w=d.config;w.headerList=[];w.headerContent=[];w.debug&& (C=new Date);A=w.cssIcon?'<i class="'+w.cssIcon+'"></i>':"";w.$headers=f(d).find(w.selectorHeaders).each(function(d){B=f(this);v=w.headers[d];w.headerContent[d]=this.innerHTML;z=w.headerTemplate.replace(/\{content\}/g,this.innerHTML).replace(/\{icon\}/g,A);w.onRenderTemplate&&(x=w.onRenderTemplate.apply(B,[d,z]))&&"string"===typeof x&&(z=x);this.innerHTML='<div class="tablesorter-header-inner">'+z+"</div>";w.onRenderHeader&&w.onRenderHeader.apply(B,[d]);this.column=a[this.parentNode.rowIndex+"-"+ this.cellIndex];var b=g.getData(B,v,"sortInitialOrder")||w.sortInitialOrder;this.order=/^d/i.test(b)||1===b?[1,0,2]:[0,1,2];this.count=-1;this.lockedOrder=!1;y=g.getData(B,v,"lockedOrder")||!1;"undefined"!==typeof y&&!1!==y&&(this.order=this.lockedOrder=/^d/i.test(y)||1===y?[1,1,1]:[0,0,0]);B.addClass(w.cssHeader);w.headerList[d]=this;B.parent().addClass(w.cssHeaderRow);B.attr("tabindex",0)});E(d);w.debug&&(t("Built headers:",C),c(w.$headers))}function y(d,b,a){var e=d.config;e.$table.find(e.selectorRemove).remove(); j(d);v(d);G(e.$table,b,a)}function E(d){var b,a=d.config;a.$headers.each(function(d,c){b="false"===g.getData(c,a.headers[d],"sorter");c.sortDisabled=b;f(c)[b?"addClass":"removeClass"]("sorter-false")})}function C(d){var b,a,e,c=d.config,l=c.sortList,p=[c.cssAsc,c.cssDesc],g=f(d).find("tfoot tr").children().removeClass(p.join(" "));c.$headers.removeClass(p.join(" "));e=l.length;for(b=0;b<e;b++)if(2!==l[b][1]&&(d=c.$headers.not(".sorter-false").filter('[data-column="'+l[b][0]+'"]'+(1===e?":last":"")), d.length))for(a=0;a<d.length;a++)d[a].sortDisabled||(d.eq(a).addClass(p[l[b][1]]),g.length&&g.filter('[data-column="'+l[b][0]+'"]').eq(a).addClass(p[l[b][1]]))}function z(d){var b=0,a=d.config,e=a.sortList,c=e.length,l=d.tBodies.length,p,g,k,h,q,m,j,r,s;if(!a.serverSideSorting&&a.cache[0]){a.debug&&(p=new Date);for(k=0;k<l;k++)q=a.cache[k].colMax,s=(m=a.cache[k].normalized)&&m[0]?m[0].length-1:0,m.sort(function(l,p){for(g=0;g<c;g++){h=e[g][0];r=e[g][1];j=/n/i.test(a.parsers&&a.parsers[h]?a.parsers[h].type|| "":"")?"Numeric":"Text";j+=0===r?"":"Desc";/Numeric/.test(j)&&a.strings[h]&&(b="boolean"===typeof a.string[a.strings[h]]?(0===r?1:-1)*(a.string[a.strings[h]]?-1:1):a.strings[h]?a.string[a.strings[h]]||0:0);var k=f.tablesorter["sort"+j](d,l[h],p[h],h,q[h],b);if(k)return k}return l[s]-p[s]});a.debug&&t("Sorting on "+e.toString()+" and dir "+r+" time",p)}}function I(d,b){d.trigger("updateComplete");"function"===typeof b&&b(d[0])}function G(d,b,a){!1!==b&&!d[0].isProcessing?d.trigger("sorton",[d[0].config.sortList, function(){I(d,a)}]):I(d,a)}function J(d){var b=d.config,a=b.$table,e,c;b.$headers.find(b.selectorSort).add(b.$headers.filter(b.selectorSort)).unbind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter",function(a,e){if(1!==(a.which||a.button)&&!/sort|keypress/.test(a.type)||"keypress"===a.type&&13!==a.which||"mouseup"===a.type&&!0!==e&&250<(new Date).getTime()-c)return!1;if("mousedown"=== a.type)return c=(new Date).getTime(),"INPUT"===a.target.tagName?"":!b.cancelSelection;b.delayInit&&!b.cache&&v(d);var n=(/TH|TD/.test(this.tagName)?f(this):f(this).parents("th, td").filter(":first"))[0];if(!n.sortDisabled){var k,h,q,m=d.config,j=!a[m.sortMultiSortKey],r=f(d);r.trigger("sortStart",d);n.count=a[m.sortResetKey]?2:(n.count+1)%(m.sortReset?3:2);m.sortRestart&&(h=n,m.$headers.each(function(){if(this!==h&&(j||!f(this).is("."+m.cssDesc+",."+m.cssAsc)))this.count=-1}));h=n.column;if(j){m.sortList= [];if(null!==m.sortForce){k=m.sortForce;for(q=0;q<k.length;q++)k[q][0]!==h&&m.sortList.push(k[q])}k=n.order[n.count];if(2>k&&(m.sortList.push([h,k]),1<n.colSpan))for(q=1;q<n.colSpan;q++)m.sortList.push([h+q,k])}else if(m.sortAppend&&1<m.sortList.length&&g.isValueInArray(m.sortAppend[0][0],m.sortList)&&m.sortList.pop(),g.isValueInArray(h,m.sortList))for(q=0;q<m.sortList.length;q++)n=m.sortList[q],k=m.headerList[n[0]],n[0]===h&&(n[1]=k.order[k.count],2===n[1]&&(m.sortList.splice(q,1),k.count=-1));else if(k= n.order[n.count],2>k&&(m.sortList.push([h,k]),1<n.colSpan))for(q=1;q<n.colSpan;q++)m.sortList.push([h+q,k]);if(null!==m.sortAppend){k=m.sortAppend;for(q=0;q<k.length;q++)k[q][0]!==h&&m.sortList.push(k[q])}r.trigger("sortBegin",d);setTimeout(function(){C(d);z(d);x(d)},1)}});b.cancelSelection&&b.$headers.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"});a.unbind("sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter", function(a){a.stopPropagation();b.sortList=[];C(d);z(d);x(d)}).bind("updateAll.tablesorter",function(a,b,e){a.stopPropagation();g.refreshWidgets(d,!0,!0);g.restoreHeaders(d);A(d);J(d);y(d,b,e)}).bind("update.tablesorter updateRows.tablesorter",function(a,b,e){a.stopPropagation();E(d);y(d,b,e)}).bind("updateCell.tablesorter",function(e,c,g,k){e.stopPropagation();a.find(b.selectorRemove).remove();var h,q,m;h=a.find("tbody");e=h.index(f(c).parents("tbody").filter(":first"));var u=f(c).parents("tr").filter(":first"); c=f(c)[0];h.length&&0<=e&&(q=h.eq(e).find("tr").index(u),m=c.cellIndex,h=b.cache[e].normalized[q].length-1,b.cache[e].row[d.config.cache[e].normalized[q][h]]=u,b.cache[e].normalized[q][m]=b.parsers[m].format(r(d,c,m),d,c,m),G(a,g,k))}).bind("addRows.tablesorter",function(c,g,f,k){c.stopPropagation();var h=g.filter("tr").length,u=[],m=g[0].cells.length,t=a.find("tbody").index(g.parents("tbody").filter(":first"));b.parsers||j(d);for(c=0;c<h;c++){for(e=0;e<m;e++)u[e]=b.parsers[e].format(r(d,g[c].cells[e], e),d,g[c].cells[e],e);u.push(b.cache[t].row.length);b.cache[t].row.push([g[c]]);b.cache[t].normalized.push(u);u=[]}G(a,f,k)}).bind("sorton.tablesorter",function(b,e,c,g){b.stopPropagation();a.trigger("sortStart",this);var h,u,m,j=d.config;b=e||j.sortList;j.sortList=[];f.each(b,function(a,b){h=[parseInt(b[0],10),parseInt(b[1],10)];if(m=j.headerList[h[0]])j.sortList.push(h),u=f.inArray(h[1],m.order),m.count=0<=u?u:h[1]%(j.sortReset?3:2)});C(d);a.trigger("sortBegin",this);z(d);x(d,g);"function"===typeof c&& c(d)}).bind("appendCache.tablesorter",function(a,b,e){a.stopPropagation();x(d,e);"function"===typeof b&&b(d)}).bind("applyWidgetId.tablesorter",function(a,e){a.stopPropagation();g.getWidgetById(e).format(d,b,b.widgetOptions)}).bind("applyWidgets.tablesorter",function(a,b){a.stopPropagation();g.applyWidget(d,b)}).bind("refreshWidgets.tablesorter",function(a,b,e){a.stopPropagation();g.refreshWidgets(d,b,e)}).bind("destroy.tablesorter",function(a,b,e){a.stopPropagation();g.destroy(d,b,e)})}var g=this; g.version="2.10.8";g.parsers=[];g.widgets=[];g.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"simple", textSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,initialized:null,tableClass:"tablesorter",cssAsc:"tablesorter-headerAsc",cssChildRow:"tablesorter-childRow",cssDesc:"tablesorter-headerDesc",cssHeader:"tablesorter-header",cssHeaderRow:"tablesorter-headerRow",cssIcon:"tablesorter-icon",cssInfoBlock:"tablesorter-infoOnly",cssProcessing:"tablesorter-processing",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[], empties:{},strings:{},parsers:[]};g.log=c;g.benchmark=t;g.construct=function(d){return this.each(function(){if(!this.tHead||0===this.tBodies.length||!0===this.hasInitialized)return this.config&&this.config.debug?c("stopping initialization! No thead, tbody or tablesorter has already been initialized"):"";var b=f(this),a=this,e,u="",l=f.metadata;a.hasInitialized=!1;a.isProcessing=!0;a.config={};e=f.extend(!0,a.config,g.defaults,d);f.data(a,"tablesorter",e);e.debug&&f.data(a,"startoveralltimer",new Date); e.supportsTextContent="x"===f("<span>x</span>")[0].textContent;e.supportsDataObject=1.4<=parseFloat(f.fn.jquery);e.string={max:1,min:-1,"max+":1,"max-":-1,zero:0,none:0,"null":0,top:!0,bottom:!1};/tablesorter\-/.test(b.attr("class"))||(u=""!==e.theme?" tablesorter-"+e.theme:"");e.$table=b.addClass(e.tableClass+u);e.$tbodies=b.children("tbody:not(."+e.cssInfoBlock+")");A(a);if(a.config.widthFixed&&0===f(a).find("colgroup").length){var p=f("<colgroup>"),n=f(a).width();f(a.tBodies[0]).find("tr:first").children("td").each(function(){p.append(f("<col>").css("width", parseInt(1E3*(f(this).width()/n),10)/10+"%"))});f(a).prepend(p)}j(a);e.delayInit||v(a);J(a);e.supportsDataObject&&"undefined"!==typeof b.data().sortlist?e.sortList=b.data().sortlist:l&&(b.metadata()&&b.metadata().sortlist)&&(e.sortList=b.metadata().sortlist);g.applyWidget(a,!0);0<e.sortList.length?b.trigger("sorton",[e.sortList,{},!e.initWidgets]):e.initWidgets&&g.applyWidget(a);e.showProcessing&&b.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(b){g.isProcessing(a,"sortBegin"===b.type)});a.hasInitialized=!0;a.isProcessing=!1;e.debug&&g.benchmark("Overall initialization time",f.data(a,"startoveralltimer"));b.trigger("tablesorter-initialized",a);"function"===typeof e.initialized&&e.initialized(a)})};g.isProcessing=function(d,b,a){d=f(d);var e=d[0].config;d=a||d.find("."+e.cssHeader);b?(0<e.sortList.length&&(d=d.filter(function(){return this.sortDisabled?!1:g.isValueInArray(parseFloat(f(this).attr("data-column")),e.sortList)})),d.addClass(e.cssProcessing)): d.removeClass(e.cssProcessing)};g.processTbody=function(d,b,a){if(a)return d.isProcessing=!0,b.before('<span class="tablesorter-savemyplace"/>'),a=f.fn.detach?b.detach():b.remove();a=f(d).find("span.tablesorter-savemyplace");b.insertAfter(a);a.remove();d.isProcessing=!1};g.clearTableBody=function(d){f(d)[0].config.$tbodies.empty()};g.restoreHeaders=function(d){var b=d.config;b.$table.find(b.selectorHeaders).each(function(a){f(this).find(".tablesorter-header-inner").length&&f(this).html(b.headerContent[a])})}; g.destroy=function(d,b,a){d=f(d)[0];if(d.hasInitialized){g.refreshWidgets(d,!0,!0);var e=f(d),c=d.config,l=e.find("thead:first"),p=l.find("tr."+c.cssHeaderRow).removeClass(c.cssHeaderRow),n=e.find("tfoot:first > tr").children("th, td");l.find("tr").not(p).remove();e.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(".tablesorter ")); c.$headers.add(n).removeClass(c.cssHeader+" "+c.cssAsc+" "+c.cssDesc).removeAttr("data-column");p.find(c.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter keypress.tablesorter");g.restoreHeaders(d);!1!==b&&e.removeClass(c.tableClass+" tablesorter-"+c.theme);d.hasInitialized=!1;"function"===typeof a&&a(d)}};g.regex=[/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, /^0x[0-9a-f]+$/i];g.sortText=function(d,b,a,e){if(b===a)return 0;var c=d.config,l=c.string[c.empties[e]||c.emptyTo],f=g.regex;if(""===b&&0!==l)return"boolean"===typeof l?l?-1:1:-l||-1;if(""===a&&0!==l)return"boolean"===typeof l?l?1:-1:l||1;if("function"===typeof c.textSorter)return c.textSorter(b,a,d,e);d=b.replace(f[0],"\\0$1\\0").replace(/\\0$/,"").replace(/^\\0/,"").split("\\0");e=a.replace(f[0],"\\0$1\\0").replace(/\\0$/,"").replace(/^\\0/,"").split("\\0");b=parseInt(b.match(f[2]),16)||1!==d.length&& b.match(f[1])&&Date.parse(b);if(a=parseInt(a.match(f[2]),16)||b&&a.match(f[1])&&Date.parse(a)||null){if(b<a)return-1;if(b>a)return 1}c=Math.max(d.length,e.length);for(b=0;b<c;b++){a=isNaN(d[b])?d[b]||0:parseFloat(d[b])||0;f=isNaN(e[b])?e[b]||0:parseFloat(e[b])||0;if(isNaN(a)!==isNaN(f))return isNaN(a)?1:-1;typeof a!==typeof f&&(a+="",f+="");if(a<f)return-1;if(a>f)return 1}return 0};g.sortTextDesc=function(d,b,a,e){if(b===a)return 0;var c=d.config,f=c.string[c.empties[e]||c.emptyTo];return""===b&& 0!==f?"boolean"===typeof f?f?-1:1:f||1:""===a&&0!==f?"boolean"===typeof f?f?1:-1:-f||-1:"function"===typeof c.textSorter?c.textSorter(a,b,d,e):g.sortText(d,a,b)};g.getTextValue=function(d,b,a){if(b){var c=d?d.length:0,g=b+a;for(b=0;b<c;b++)g+=d.charCodeAt(b);return a*g}return 0};g.sortNumeric=function(d,b,a,c,f,l){if(b===a)return 0;d=d.config;c=d.string[d.empties[c]||d.emptyTo];if(""===b&&0!==c)return"boolean"===typeof c?c?-1:1:-c||-1;if(""===a&&0!==c)return"boolean"===typeof c?c?1:-1:c||1;isNaN(b)&& (b=g.getTextValue(b,f,l));isNaN(a)&&(a=g.getTextValue(a,f,l));return b-a};g.sortNumericDesc=function(d,b,a,c,f,l){if(b===a)return 0;d=d.config;c=d.string[d.empties[c]||d.emptyTo];if(""===b&&0!==c)return"boolean"===typeof c?c?-1:1:c||1;if(""===a&&0!==c)return"boolean"===typeof c?c?1:-1:-c||-1;isNaN(b)&&(b=g.getTextValue(b,f,l));isNaN(a)&&(a=g.getTextValue(a,f,l));return a-b};g.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d", C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6",O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};g.replaceAccents=function(d){var b,a="[",c=g.characterEquivalents;if(!g.characterRegex){g.characterRegexArray={};for(b in c)"string"===typeof b&&(a+=c[b],g.characterRegexArray[b]= RegExp("["+c[b]+"]","g"));g.characterRegex=RegExp(a+"]")}if(g.characterRegex.test(d))for(b in c)"string"===typeof b&&(d=d.replace(g.characterRegexArray[b],b));return d};g.isValueInArray=function(d,b){var a,c=b.length;for(a=0;a<c;a++)if(b[a][0]===d)return!0;return!1};g.addParser=function(d){var b,a=g.parsers.length,c=!0;for(b=0;b<a;b++)g.parsers[b].id.toLowerCase()===d.id.toLowerCase()&&(c=!1);c&&g.parsers.push(d)};g.getParserById=function(d){var b,a=g.parsers.length;for(b=0;b<a;b++)if(g.parsers[b].id.toLowerCase()=== d.toString().toLowerCase())return g.parsers[b];return!1};g.addWidget=function(d){g.widgets.push(d)};g.getWidgetById=function(d){var b,a,c=g.widgets.length;for(b=0;b<c;b++)if((a=g.widgets[b])&&a.hasOwnProperty("id")&&a.id.toLowerCase()===d.toLowerCase())return a};g.applyWidget=function(d,b){d=f(d)[0];var a=d.config,c=a.widgetOptions,j=[],l,p,n;a.debug&&(l=new Date);a.widgets.length&&(a.widgets=f.grep(a.widgets,function(b,d){return f.inArray(b,a.widgets)===d}),f.each(a.widgets||[],function(a,b){if((n= g.getWidgetById(b))&&n.id)n.priority||(n.priority=10),j[a]=n}),j.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority?0:1}),f.each(j,function(g,h){h&&(b?(h.hasOwnProperty("options")&&(c=d.config.widgetOptions=f.extend(!0,{},h.options,c)),h.hasOwnProperty("init")&&h.init(d,h,a,c)):!b&&h.hasOwnProperty("format")&&h.format(d,a,c,!1))}));a.debug&&(p=a.widgets.length,t("Completed "+(!0===b?"initializing ":"applying ")+p+" widget"+(1!==p?"s":""),l))};g.refreshWidgets=function(d,b, a){d=f(d)[0];var e,j=d.config,l=j.widgets,p=g.widgets,n=p.length;for(e=0;e<n;e++)if(p[e]&&p[e].id&&(b||0>f.inArray(p[e].id,l)))j.debug&&c("Refeshing widgets: Removing "+p[e].id),p[e].hasOwnProperty("remove")&&p[e].remove(d,j,j.widgetOptions);!0!==a&&g.applyWidget(d,b)};g.getData=function(d,b,a){var c="";d=f(d);var g,l;if(!d.length)return"";g=f.metadata?d.metadata():!1;l=" "+(d.attr("class")||"");"undefined"!==typeof d.data(a)||"undefined"!==typeof d.data(a.toLowerCase())?c+=d.data(a)||d.data(a.toLowerCase()): g&&"undefined"!==typeof g[a]?c+=g[a]:b&&"undefined"!==typeof b[a]?c+=b[a]:" "!==l&&l.match(" "+a+"-")&&(c=l.match(RegExp("\\s"+a+"-([\\w-]+)"))[1]||"");return f.trim(c)};g.formatFloat=function(c,b){if("string"!==typeof c||""===c)return c;var a;c=(b&&b.config?!1!==b.config.usNumberFormat:"undefined"!==typeof b?b:1)?c.replace(/,/g,""):c.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(c)&&(c=c.replace(/^\s*\(/,"-").replace(/\)/,""));a=parseFloat(c);return isNaN(a)?f.trim(c):a};g.isDigit= function(c){return isNaN(c)?/^[\-+(]?\d+[)]?$/.test(c.toString().replace(/[,.'"\s]/g,"")):!0}}});var j=f.tablesorter;f.fn.extend({tablesorter:j.construct});j.addParser({id:"text",is:function(){return!0},format:function(c,t){var r=t.config;c&&(c=f.trim(r.ignoreCase?c.toLocaleLowerCase():c),c=r.sortLocaleCompare?j.replaceAccents(c):c);return c},type:"text"});j.addParser({id:"digit",is:function(c){return j.isDigit(c)},format:function(c,t){var r=j.formatFloat((c||"").replace(/[^\w,. \-()]/g,""),t);return c&& "number"===typeof r?r:c?f.trim(c&&t.config.ignoreCase?c.toLocaleLowerCase():c):c},type:"numeric"});j.addParser({id:"currency",is:function(c){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((c||"").replace(/[,. ]/g,""))},format:function(c,t){var r=j.formatFloat((c||"").replace(/[^\w,. \-()]/g,""),t);return c&&"number"===typeof r?r:c?f.trim(c&&t.config.ignoreCase?c.toLocaleLowerCase():c):c},type:"numeric"});j.addParser({id:"ipAddress",is:function(c){return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(c)}, format:function(c,f){var r,s=c?c.split("."):"",v="",x=s.length;for(r=0;r<x;r++)v+=("00"+s[r]).slice(-3);return c?j.formatFloat(v,f):c},type:"numeric"});j.addParser({id:"url",is:function(c){return/^(https?|ftp|file):\/\//.test(c)},format:function(c){return c?f.trim(c.replace(/(https?|ftp|file):\/\//,"")):c},type:"text"});j.addParser({id:"isoDate",is:function(c){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(c)},format:function(c,f){return c?j.formatFloat(""!==c?(new Date(c.replace(/-/g,"/"))).getTime()|| "":"",f):c},type:"numeric"});j.addParser({id:"percent",is:function(c){return/(\d\s*?%|%\s*?\d)/.test(c)&&15>c.length},format:function(c,f){return c?j.formatFloat(c.replace(/%/g,""),f):c},type:"numeric"});j.addParser({id:"usLongDate",is:function(c){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(c)||/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(c)},format:function(c,f){return c?j.formatFloat((new Date(c.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||"",f):c},type:"numeric"}); j.addParser({id:"shortDate",is:function(c){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((c||"").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(c,f,r,s){if(c){r=f.config;var v=r.headerList[s];s=v.dateFormat||j.getData(v,r.headers[s],"dateFormat")||r.dateFormat;c=c.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===s?c=c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===s?c=c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1"):"yyyymmdd"===s&&(c=c.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3"))}return c?j.formatFloat((new Date(c)).getTime()||"",f):c},type:"numeric"});j.addParser({id:"time",is:function(c){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(c)},format:function(c,f){return c?j.formatFloat((new Date("2000/01/01 "+c.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||"",f):c},type:"numeric"});j.addParser({id:"metadata",is:function(){return!1},format:function(c,j,r){c=j.config; c=!c.parserMetadataName?"sortValue":c.parserMetadataName;return f(r).metadata()[c]},type:"numeric"});j.addWidget({id:"zebra",priority:90,format:function(c,t,r){var s,v,x,A,y,E,C=RegExp(t.cssChildRow,"i"),z=t.$tbodies;t.debug&&(y=new Date);for(c=0;c<z.length;c++)s=z.eq(c),E=s.children("tr").length,1<E&&(x=0,s=s.children("tr:visible"),s.each(function(){v=f(this);C.test(this.className)||x++;A=0===x%2;v.removeClass(r.zebra[A?1:0]).addClass(r.zebra[A?0:1])}));t.debug&&j.benchmark("Applying Zebra widget", y)},remove:function(c,j,r){var s;j=j.$tbodies;var v=(r.zebra||["even","odd"]).join(" ");for(r=0;r<j.length;r++)s=f.tablesorter.processTbody(c,j.eq(r),!0),s.children().removeClass(v),f.tablesorter.processTbody(c,s,!1)}})}(jQuery);

$(document).ready(function(){$("div.configuration-block [class^=highlight-]").hide();$("div.configuration-block [class^=highlight-]").width($("div.configuration-block").width());$("div.configuration-block").addClass("jsactive");$("div.configuration-block").addClass("clearfix");$("div.configuration-block").each(function(){var a=$("[class^=highlight-]:first",$(this));a.show();a.parents("ul:eq(0)").height(a.height()+40)});$("div.configuration-block li").each(function(){var a=$(":first",$(this)).html();$(":first ",$(this)).html("");$(":first ",$(this)).append('<a href="#">'+a+"</a>");$(":first",$(this)).bind("click",function(){$("[class^=highlight-]",$(this).parents("ul")).hide();$("li",$(this).parents("ul")).removeClass("selected");$(this).parent().addClass("selected");var b=$("[class^=highlight-]",$(this).parent("li"));b.show();b.parents("ul:eq(0)").height(b.height()+40);return false})});$("div.configuration-block").each(function(){$("li:first",$(this)).addClass("selected")})});
$(document).ready(function(){$(".main_content .column_02 table").tablesorter();});
