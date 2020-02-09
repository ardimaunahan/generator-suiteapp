NS.Menu=NS.Menu||{};NS.Menu.CLASS={MENU:"ns-menu",MENU_HEADER:"ns-header",MENU_ITEM:"ns-menuitem",MENU_ITEM_ACTIVE:"ns-active",MENU_SUBMENU:"ns-submenu",MENU_MENUBAR:"ns-menubar"};NS.Menu.DOT_CLASS={MENU:"."+NS.Menu.CLASS.MENU,MENU_HEADER:"."+NS.Menu.CLASS.MENU_HEADER,MENU_ITEM:"."+NS.Menu.CLASS.MENU_ITEM,MENU_ITEM_ACTIVE:"."+NS.Menu.CLASS.MENU_ITEM_ACTIVE,MENU_SUBMENU:"."+NS.Menu.CLASS.MENU_SUBMENU,MENU_MENUBAR:"."+NS.Menu.CLASS.MENU_MENUBAR};NS.Menu.InstanceCounter=0;
NS.Menu.getPrevItem=function(k,g){var c=NS.jQuery(k),d=c.prev(NS.Menu.DOT_CLASS.MENU_ITEM).get(0);d||g||(d=c.parent().children(NS.Menu.DOT_CLASS.MENU_ITEM).last().get(0));return d};NS.Menu.getNextItem=function(k,g){var c=NS.jQuery(k),d=c.next(NS.Menu.DOT_CLASS.MENU_ITEM).get(0);d||g||(d=c.parent().children(NS.Menu.DOT_CLASS.MENU_ITEM).first().get(0));return d};
NS.Menu.MenuOpener=function(k,g,c,d,l){var a;this.menu=k;this.openItem=g;this.delay=d;this.openSubmenu=c;this.done=!1;this.onOpen=l;this.cancel=function(){clearTimeout(a);this.done=!0};this.open=function(){if(!this.done){this.done=!0;clearTimeout(a);var f=NS.jQuery(this.menu.rootElement).find(NS.Menu.DOT_CLASS.MENU+NS.Menu.DOT_CLASS.MENU_ITEM_ACTIVE).parent().get(),e=NS.jQuery(this.openItem).parents(NS.Menu.DOT_CLASS.MENU_ITEM).get().reverse();this.from&&f.push(this.from);this.openSubmenu&&this.openItem&&
e.push(this.openItem);for(var b=0,c=Math.min(f.length,e.length);b<c&&f[b]==e[b];b++);for(c=b;c<f.length;c++)this._closeSubmenu(f[c]);for(c=b;c<e.length;c++)this._openSubmenu(e[c]);this.onOpen&&this.onOpen()}};this._closeSubmenu=function(a){var e=NS.jQuery(a.submenu);e.removeClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE);e.attr("aria-expanded","false").attr("aria-hidden","true");this.menu.onMenuItemClose(a)};this._openSubmenu=function(a){var e=NS.jQuery(a),b=NS.jQuery(a.submenu);e.hasClass(NS.Menu.CLASS.MENU_SUBMENU)&&
!b.hasClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE)&&(b.css({top:0,left:0,width:""}),a=this.menu.onMenuItemOpen(a,a.submenu),b.css(a),b.addClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE),b.attr("aria-expanded","true").attr("aria-hidden","false"))};d?a=setTimeout(this.open.bind(this),d):this.open()};NS.Menu.menuOpener={done:!0};
function uir_simpleMenu(k){function g(a){d.removeAttr("aria-activedescendant");var c=d.find(NS.Menu.DOT_CLASS.MENU_ITEM+NS.Menu.DOT_CLASS.MENU_ITEM_ACTIVE);a&&(c=c.not(NS.Menu.DOT_CLASS.MENU_HEADER).last());c.removeClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE)}var c=this,d=NS.jQuery(k);this.isDisabled=!1;this.enable=function(){this.isDisabled=!1};this.disable=function(){this.isDisabled=!0};this.rootElement=d.get(0);this._mouseIn=!1;this.rootElement.id||(this.rootElement.id="NS_MENU_ID"+NS.Menu.InstanceCounter++);
d.attr("role","menubar");d.addClass(NS.Menu.CLASS.MENU_MENUBAR);d.attr("tabindex","0");d.on("mouseenter",function(a){c.onMenuMouseEnter(a)});d.on("mouseleave",function(a){c.onMenuMouseLeave(a)});var l=0;this.isOpen=function(){return!!d.find(NS.Menu.DOT_CLASS.MENU_ITEM_ACTIVE+NS.Menu.DOT_CLASS.MENU).length};this.getSelectedHeaderItem=function(){return d.children(NS.Menu.DOT_CLASS.MENU_ITEM_ACTIVE).get(0)};this.getSelectedItem=function(){return d.find(NS.Menu.DOT_CLASS.MENU_ITEM+NS.Menu.DOT_CLASS.MENU_ITEM_ACTIVE).last().get(0)};
this.closeMenu=function(a,c){return this.selectItem(null,!1,a,a,c)};this.selectItem=function(a,f,e,b,p){var h=c.getSelectedItem(),t=b?NS.UI.Constants.MENU_CLOSE_TIMEOUT:0;!b&&e&&(t=a?c.getMenuOpenTimeout(a):NS.UI.Constants.MENU_CLOSE_TIMEOUT);h!=a&&a&&(NS.jQuery(h).parents(NS.Menu.DOT_CLASS.MENU_ITEM).andSelf().toggleClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE,!1),NS.jQuery(a).parents(NS.Menu.DOT_CLASS.MENU_ITEM).andSelf().toggleClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE,!0),c.onItemSelect(a),d.attr("aria-activedescendant",
a.id));NS.Menu.menuOpener.done||(NS.Menu.menuOpener.menu==c?NS.Menu.menuOpener.cancel():NS.Menu.menuOpener.open());NS.Menu.menuOpener=new NS.Menu.MenuOpener(c,a,f,t,p);return NS.Menu.menuOpener};this.onItemSelect=function(a){};this.onMenuFocusIn=function(a){function f(a,e){function h(a){for(var b=[a];a.parentElement;)b.push(a.parentElement),a=a.parentElement;return b}for(var c=h(a),f=h(e),d,g;c.length&&f.length&&(d=c.pop(),g=f.pop(),d===g););c=NS.jQuery(d.parentNode).children();return c.index(d)<
c.index(g)}if(!c.getSelectedItem()){var e=d.children(NS.Menu.DOT_CLASS.MENU_ITEM);e.length&&(!a.relatedTarget||f(a.relatedTarget,this.rootElement)?c.selectItem(e.get(0),!1,!1):c.selectItem(e.last().get(0),!1,!1))}};this.onMenuFocusOut=function(a){(a.relatedTarget&&0==NS.jQuery(a.relatedTarget).closest(c.rootElement).length||!a.relatedTarget&&!c._mouseIn)&&c.closeMenu(!1,g)};this.onMenuMouseEnter=function(a){this._mouseIn=!0};this.onMenuMouseLeave=function(a){this._mouseIn=!1;a=a.details&&a.details.automation;
if(!this.isDisabled||a)NS.jQuery(document.activeElement).closest(this.rootElement).length?(a=this.getSelectedHeaderItem(),this.selectItem(c.getSelectedItem(),!1,!0,!0,this.selectItem.bind(this,a,!1,!1)),g(!0)):(a=this.isOpen(),this.closeMenu(a,g),g(a))};this.onMenuKeydown=function(a){var f=c.getSelectedItem(),e=NS.jQuery(f),b=f,d=NS.UI.Constants.KeyCode;switch(a.which){case d.ARROW_LEFT:f.isHeader?b=NS.Menu.getPrevItem(e):(b=f.parent,b.isHeader&&(b=NS.Menu.getPrevItem(b),c.selectItem(b,!1,!1),b.submenu&&
(b=NS.jQuery(b.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM).first().get(0))));c.selectItem(b,!1,!1);break;case d.ARROW_RIGHT:f.isHeader?b=NS.Menu.getNextItem(e):f.submenu?b=NS.jQuery(f.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM).first().get(0):(b=NS.Menu.getNextItem(c.getSelectedHeaderItem()),c.selectItem(b,!1,!1),b.submenu&&(b=NS.jQuery(b.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM).first().get(0)));c.selectItem(b,!1,!1);break;case d.ARROW_UP:f.isHeader?f.submenu&&(b=NS.jQuery(f.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM).first().get(0)):
b=NS.Menu.getPrevItem(e);c.selectItem(b,!1,!1);break;case d.ARROW_DOWN:f.isHeader?f.submenu&&(b=NS.jQuery(f.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM).first().get(0)):b=NS.Menu.getNextItem(e);c.selectItem(b,!1,!1);break;case d.TAB:b=(a.shiftKey?NS.Menu.getPrevItem:NS.Menu.getNextItem)(e,f.isHeader);if(!b)return;c.selectItem(b,!1,!1);break;case d.ESCAPE:b=c.getSelectedHeaderItem();c.selectItem(b,!1,!1);break;case d.SPACE:case d.ENTER:e.children("a").get(0).click();break;default:return}a.preventDefault()};
this.onMenuItemOpen=function(a){return{top:0,left:NS.jQuery(a).width()}};this.onMenuItemClose=function(a){};this.onMenuItemPrepare=function(a){var d=NS.jQuery(a),e=d.parent().closest(NS.Menu.DOT_CLASS.MENU_ITEM),b=d.children(NS.Menu.DOT_CLASS.MENU);a.isHeader=d.hasClass(NS.Menu.CLASS.MENU_HEADER);a.parent=0<e.length?e.get(0):null;a.submenu=0<b.length?b.get(0):null;a.menuController=c;a.getItems=function(){return NS.jQuery(this.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM).toArray()};a.getHeader=function(b){b=
b||a;return b.isHeader?b:null!=b.parent?b.getHeader(b.parent):null};a.id=a.id||c.rootElement.id+"-item"+l++};this.create=function(){var a=d.children(NS.Menu.DOT_CLASS.MENU_ITEM),f=d.find(NS.Menu.DOT_CLASS.MENU_ITEM);0==d.children(NS.Menu.DOT_CLASS.MENU_ITEM).length&&(a.push(d.get(0)),f.push(d.get(0)));a.addClass(NS.Menu.CLASS.MENU_HEADER);From(f).ForEach(function(){c.refreshItem(this)});return this};this.itemOnMouseEnter=function(a){var d=a.details&&a.details.automation,e;if(e=!c.isDisabled||d)a=
a.target,e=NS.jQuery(a),e=this===a||"menuitem"!==e.attr("role")&&this===e.closest("[role\x3dmenuitem]").get(0);e&&c.selectItem(this,!0,!d)};this.itemOnMouseLeave=function(){};this.getMenuOpenTimeout=function(a){return a.isHeader?0:NS.UI.Constants.MENU_HOVER_TIMEOUT};this.unbindItem=function(a){a=NS.jQuery(a);a.off("mouseenter",this.itemOnMouseEnter).off("mouseleave",this.itemOnMouseLeave);a.find(NS.Menu.DOT_CLASS.MENU_ITEM).css("min-width","");a.find(".ns-submenu-triangle").remove()};this.bindItem=
function(a){NS.jQuery(a).on("mouseenter",this.itemOnMouseEnter).on("mouseleave",this.itemOnMouseLeave)};this.refreshItem=function(a){var d=NS.jQuery(a);d.attr("role","menuitem");var e=d.children("a");a.hasOwnProperty("menuController")&&(a.menuController.unbindItem(a),a.menuController=this,From(NS.jQuery(a.submenu).children(NS.Menu.DOT_CLASS.MENU_ITEM)).ForEach(function(){c.refreshItem(this)}));d.hasClass(NS.Menu.CLASS.MENU_SUBMENU)&&!d.hasClass(NS.Menu.CLASS.MENU_HEADER)&&0!=e.length&&e.after('\x3cspan class\x3d"ns-submenu-triangle" aria-hidden\x3d"true"\x3e\u25ba\x3c/span\x3e');
d.hasClass(NS.Menu.CLASS.MENU_HEADER)&&d.find(NS.Menu.DOT_CLASS.MENU_ITEM).css("min-width",d.outerWidth());d.children("a").attr("tabindex","-1");c.onMenuItemPrepare(a);a.submenu&&(d.attr("aria-haspopup","true"),NS.jQuery(a.submenu).attr("aria-expanded","false").attr("aria-hidden","true"));c.bindItem(a)};d.focusin(function(a){c.onMenuFocusIn(a)});d.focusout(function(a){c.onMenuFocusOut(a)});d.keydown(function(a){c.onMenuKeydown(a)});typeof uir_menuAutomationHook==typeof Function&&uir_menuAutomationHook(this)}
;function uir_simpleTouchMenu(k){uir_simpleMenu.call(this,k);var g=this;if(NS.Device.hasTouchSupport){var c=this.onMenuItemPrepare;this.onMenuItemPrepare=function(a){c.call(this,a);a.clickCounter=0;NS.jQuery(a).children("a").click(function(){if(!0!==g.touchStarted)return g.touchStarted=!1,!0;g.touchStarted=!1;if(0==NS.jQuery(a).children("ul").length)return!0;a.clickCounter++;return 2>a.clickCounter?(NS.jQuery(a).siblings().toggleClass(NS.Menu.CLASS.MENU_ITEM_ACTIVE,!1),!1):!0})};var d=this.onMenuItemClose;
this.onMenuItemClose=function(a){d.call(this,a);a.clickCounter=0};var l=this.bindItem;this.bindItem=function(a){l.call(this,a);NS.jQuery(a).on("MSPointerDown pointerdown touchstart",function(b){if("MSPointerDown"==b.type||"pointerdown"==b.type){if("mouse"==b.originalEvent.pointerType)return!0;b.stopPropagation();g.itemTouched=this;setTimeout(function(){g.itemTouched=null},500)}g.touchStarted=!0;g.itemOnMouseEnter.call(a,b)})};var a=this.itemOnMouseLeave;this.itemOnMouseLeave=function(d){return NS.Device.hasPointerEnabled&&
g.itemTouched===this?!1:a.call(this,d)};var f=this.onMenuFocusOut;this.onMenuFocusOut=function(){if(!g.touchStarted)return f.call(this)}}};function uir_menuBase(k,g){var c=this;uir_simpleTouchMenu.call(this,k);this.DEFAULT_RENDER_ITEMS_COUNT=50;var d=NS.jQuery(window);g=g||{};var l=!1;g.hasOwnProperty("absolutePosition")&&1==g.absolutePosition&&(l=!0);var a=this.getMenuOpenTimeout;this.getMenuOpenTimeout=function(b){return b.isHeader&&!c.isOpen()?NS.UI.Constants.MENU_OPEN_TIMEOUT:a(b)};this.renderSubmenu=function(a,b){};var f=this.onItemSelect;this.onItemSelect=function(a){f.call(this,a);var b=a.parent;if(b&&0<b.frameSize){var d=b.getItems();
for(a=d.indexOf(a);a<b.frameIndex+(0==b.frameIndex?0:1);)b.frameMoveUp();for(;a>=b.frameIndex+b.frameSize-(b.frameIndex+b.frameSize!=d.length?1:0);)b.frameMoveDown();b.applyFrame()}};var e=this.onMenuItemPrepare;this.onMenuItemPrepare=function(a){e.call(this,a);a.frameSize=0;a.frameIndex=0;a.frameNavigUp=null;a.frameNavigDown=null;a.resetFrame=function(){a.frameIndex=0;a.frameSize=0;a.removeFrameNavigation();NS.jQuery(a.getItems()).show()};a.frameMoveUp=function(){0<a.frameIndex&&0<a.frameSize&&(a.frameIndex--,
a.applyFrame())};a.frameMoveDown=function(){a.frameIndex+a.frameSize<a.getItems().length&&0<a.frameSize&&(c.hasMoreItemsToRender(a)&&c.renderSubmenu(a,c.DEFAULT_RENDER_ITEMS_COUNT),a.frameIndex++,a.applyFrame())};a.applyFrame=function(){var a=NS.jQuery(this.getItems()),b=this.frameIndex,d=this.frameIndex+this.frameSize-1,c=-1,e=From(a).Where(function(){c++;return c<b||c>d}),a=From(a.not(e)),h=0==this.frameIndex,f=this.frameIndex+this.frameSize==this.getItems().length;NS.jQuery(this.frameNavigUp).toggleClass("ns-scroll-button-disabled",
h);NS.jQuery(this.frameNavigDown).toggleClass("ns-scroll-button-disabled",f);!h&&0<a.length&&(h=a.First(),a=a.Remove(h),e.push(h));!f&&0<a.length&&(f=a.Last(),a=a.Remove(f),e.push(f));a.not(":visible").show();e.hide()};a.addFrameNavigation=function(){this.removeFrameNavigation();var a=NS.jQuery(this.submenu),b=NS.jQuery('\x3ca class\x3d"ns-scroll-button ns-scroll-button-top"\x3e\u25b2\x3c/a\x3e'),d=NS.jQuery('\x3ca class\x3d"ns-scroll-button ns-scroll-button-bottom"\x3e\u25bc\x3c/a\x3e'),c=NS.jQuery('\x3cli class\x3d"ns-scroll-button-li"\x3e\x3c/li\x3e').append(b),
e=NS.jQuery('\x3cli class\x3d"ns-scroll-button-li"\x3e\x3c/li\x3e').append(d);this.frameNavigUp=c.get(0);this.frameNavigDown=e.get(0);a.addClass("ns-submenu-truncated").prepend(c).append(e);var h=this;NS.Device.hasTouchSupport?(b.click(function(){h.frameMoveUp()}),d.click(function(){h.frameMoveDown()})):(b.mouseenter(function(){clearInterval(h.frameNavigUpInterval);h.frameNavigUpInterval=setInterval(function(){h.frameMoveUp()},NS.UI.Constants.MENU_SCROLL_SPEED_MAX/Math.min(10,h.frameSize));return!1}).mouseleave(function(){clearInterval(h.frameNavigUpInterval)}),
d.mouseenter(function(){clearInterval(h.frameNavigDownInterval);h.frameNavigDownInterval=setInterval(function(){h.frameMoveDown()},NS.UI.Constants.MENU_SCROLL_SPEED_MAX/Math.min(10,h.frameSize));return!1}).mouseleave(function(){clearInterval(h.frameNavigDownInterval)}))};a.removeFrameNavigation=function(){NS.jQuery(a.submenu).find(".ns-scroll-button-li").remove()}};this.hasMoreItemsToRender=function(){return!1};this.calculateLeft=function(a,b,c){if("right"==g.alignment)return(a.isHeader?NS.jQuery(a).outerWidth():
0)-c;if(a.isHeader)return 0;b=NS.jQuery(a).width();var e="right"==a.parent.overflown,f=0>a.offset.left-c;if((a.offset.left+b+c>d.width()||e)&&!f)return a.overflown="right",-c;a.overflown="";return b};this.calculateTop=function(a,b){var c=a.getItems().length,e=d.height(),f=c*NS.UI.Constants.MENU_ITEM_HEIGHT,g=a.isHeader?NS.jQuery(a).height():0,f=e-(a.offset.top+f),e=Math.min(g,f),p=Math.ceil(a.offset.top+e);p<this.getUpperBound()&&(e=this.getUpperBound()-a.offset.top,f<g&&(g=this.getUpperBound()-p,
g=Math.ceil(g/NS.UI.Constants.MENU_ITEM_HEIGHT)+1,a.addFrameNavigation(),a.frameSize=c-g,a.frameIndex=0,a.applyFrame()));return e};var b=0,p=0;d.scroll(function(){b=d.scrollTop();p=d.scrollLeft()});this.onMenuItemOpen=function(a,c){d.scroll();a.offset=NS.jQuery(a).offset();a.offset.top-=b;a.offset.left-=p;a.resetFrame();var e=NS.jQuery(c).width(),f=(l?a.offset.top:0)+this.calculateTop(a,c),g=(l?a.offset.left:0)+this.calculateLeft(a,c,e);return{width:e,top:f,left:g}};this.getUpperBound=function(){return g.hasOwnProperty("upperBound")?
g.upperBound:0}};function uir_menu(k,g){uir_menuBase.call(this,k,g);var c=function(){return{_windowOnmousewheel:window.onmousewheel,_documentOnmousewheel:document.onmousewheel,restore:function(){window.onmousewheel=this._windowOnmousewheel;document.onmousewheel=this._documentOnmousewheel}}},d=this.onMenuItemPrepare;this.onMenuItemPrepare=function(a){d.call(this,a);a.windowScrollOverride=function(){window.addEventListener&&window.addEventListener("DOMMouseScroll",f,!1);this.originalEventHandlers=c();window.onmousewheel=
f;document.onmousewheel=f};a.windowScrollRelease=function(){this.hasOwnProperty("originalEventHandlers")&&(this.originalEventHandlers.restore(),window.removeEventListener&&window.removeEventListener("DOMMouseScroll",f,!1))}};var l=this.onMenuItemClose;this.onMenuItemClose=function(a){l.call(this,a);a.isHeader&&a.windowScrollRelease()};var a=this.onMenuItemOpen;this.onMenuItemOpen=function(c,b){var d=a.call(this,c,b);0<c.frameSize&&c.windowScrollOverride();return d};var f=function(a){var b=NS.jQuery(a.target).closest(".ns-menuitem");
if(0!=b.length){var b=b.get(0).parent,c=a.wheelDeltaY||a.wheelDelta||-1*a.detail;0<c&&b&&b.frameMoveUp&&b.frameMoveUp();0>c&&b&&b.frameMoveDown&&b.frameMoveDown();NS.UI.Helpers.preventDefault(a)}}};function uir_virtualMenu(k,g,c){var d=this;this._data=c;uir_menu.call(this,k,g);var l=this.onMenuItemPrepare;this.onMenuItemPrepare=function(a){l.call(this,a);a.renderedItemsCount=a.renderedItemsCount||0;if(!a.submenuData){a.submenuRendered=!1;var d=NS.jQuery(a).data("title"),d=From(c).Where("$.label\x3d\x3d{0}",d).First();a.submenuData=null!=d?d.submenu:[]}a.submenuData.length&&NS.jQuery(a).attr("aria-haspopup","true").toggleClass("ns-submenu",!0)};var a=this.onItemSelect;this.onItemSelect=function(b){b.submenuRendered||
(d.renderSubmenu(b,f(b)),this.submenuRendered=!0);a.call(d,b)};var f=function(a){var c=Math.floor(NS.jQuery(window).height()/NS.UI.Constants.MENU_ITEM_HEIGHT)+1;return Math.min(c,a.submenuData.length)},e=this.renderSubmenu;this.renderSubmenu=function(a,c){e.call(this,a,c);if(0!=a.submenuData.length){var f=Math.min(a.submenuData.length-a.renderedItemsCount,c),g=NS.jQuery(a).find("ul.ns-menu").first();0==g.length&&(g=NS.jQuery('\x3cul class\x3d"ns-menu" role\x3d"menu" aria-hidden\x3d"true" aria-expanded\x3d"false"\x3e\x3c/ul\x3e'));
for(var k=g,l=a.submenuData,u=a.renderedItemsCount,q=u;q<u+f;q++){var m=l[q],n="undefined"!==typeof m.label?m.label:"",r=NS.jQuery('\x3cli data-title\x3d"'+n+'" class\x3d"ns-menuitem '+((0<m.submenu.length?"ns-submenu ":"")+("SECTION"==m.type?"ns-menuheader ":"")+("OVERVIEW"==m.type?"ns-menuseparator ":"")+("SEPARATOR"==m.type?"ns-menusimpleseparator":""))+'" role\x3d"menuitem"\x3e\x3c/li\x3e'),n=NS.jQuery("\x3ca\x3e\x3cspan\x3e"+n+"\x3c/span\x3e\x3c/a\x3e");null!=m.url&&n.attr("href",m.url);r.append(n);
m=k;n=NS.jQuery(m).children("li.ns-scroll-button-li").last();0<n.length?n.before(r):m.append(r)}a.submenu=g.appendTo(a).get(0);NS.jQuery(a).addClass("ns-submenu");for(g=a.renderedItemsCount;g<a.renderedItemsCount+f;g++)k=NS.jQuery(a.submenu).children("li.ns-menuitem")[g],k.submenuData=a.submenuData[g].submenu,d.refreshItem(k);a.renderedItemsCount+=f}};this.hasMoreItemsToRender=function(a){return a.submenuData&&a.submenuData.length>a.getItems().length&&a.frameIndex+a.frameSize+1>=a.getItems().length}}
;
//# sourceMappingURL=/assets/reskin_menu/2429149680.map