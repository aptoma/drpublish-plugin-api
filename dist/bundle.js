!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.PluginAPI=t():e.PluginAPI=t()}(this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var n=o[r]={exports:{},id:r,loaded:!1};return e[r].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,exports,t){"use strict";var o=t(1),r=t(2),n=t(3),i=function(){var e=function(){function e(e){function o(e){for(var t in e)e.hasOwnProperty(t)&&("object"==typeof e[t]&&null!==e[t]&&"function"===e[t].type?e[t]=r(e[t].eventKey):"object"==typeof e[t]&&null!==e[t]&&"function"==typeof e[t].map?e[t]=e[t].map(o):"object"==typeof e[t]&&null!==e[t]&&(e[t]=o(e[t])));return e}function r(e){return function(t){i.request(e,t)}}var n=t.eventListeners.notify(e.type,o(e.data));return n!==!1||{abort:!0}}this.DEBUG=!1,this.Version="3.0",this.Editor=null,this.Article=null,this.errorListeners=new n,this.eventListeners=new n,this.appName="";var t=this;pm.bind("event",e,"*")};return e.prototype.request=function(e,t,o){var r=this;this.DEBUG&&console.info(this.getAppName()+": Requesting "+e+" from parent with data",t),t||(t={}),"undefined"==typeof o&&(o=null),"number"==typeof t.length&&(t={data:t}),t.src_app=this.getAppName();var n=function(e,t){return function(){return r.eventListeners.remove(t,t),e.apply(null,arguments)}},i=function(e,t){var o=Math.floor(1e3*Math.random()),i=e+o+"functioncallback"+(new Date).getTime(),s=n(t,i);return r.eventListeners.add(i,s),{type:"function",eventKey:i}},s=function(e){for(var t in e)if(e.hasOwnProperty(t)){var o=e[t];"function"==typeof o?e[t]=i(t,o):"object"==typeof o&&null!==o&&"function"==typeof o.map?e[t]=o.map(s):"object"==typeof o&&null!==o&&(e[t]=s(o))}return e};t=s(t),pm({target:parent,type:e,data:t,success:o,error:function(e){r.errorListeners.notify(e.type,e)},origin:"*",hash:!1})},e.prototype.openTagCreationDialog=function(e,t){this.request("create-tag",{tag:e},t)},e.prototype.reloadIframe=function(){this.request("app-reload",{app:this.getAppName()})},e.prototype.getAppName=function(){return this.appName},e.prototype.setAppName=function(e){this.appName=e},e.prototype.showInfoMsg=function(e){this.request("show-message-info",{message:e})},e.prototype.showWarningMsg=function(e){this.request("show-message-warning",{message:e})},e.prototype.showErrorMsg=function(e){this.request("show-message-error",{message:e})},e.prototype.showLoader=function(e){this.request("show-loader",{message:e})},e.prototype.hideLoader=function(){this.request("hide-loader")},e.prototype.__loadArticleRevision=function(e,t){this.request("load-revision",{revision:e},t)},e.prototype.createTag=function(e,t){this.request("tag-create",{tag:e},t)},e.prototype.searchDrLib=function(e,t){this.request("drlib-search",{query:e.query,access:e.access,secure:e.secure,success:e.success,error:e.error},t)},e.prototype.convertDomToHTML=function(e){return"object"==typeof e&&"function"==typeof e.wrap?e.wrap("<div>").parent().html():e.outerHTML},e.prototype.generateArticleUrl=function(e,t){this.request("generate-article-url",{id:e},t)},e.prototype.extendApi=function(e,t,o){var r=this;this.request("extend-api",{group:e,name:t,action:function(e){var t=o(e.data);r.request(e.eventKey,{data:t})}})},e.prototype.callExtendedApi=function(e,t,o,r){this.request("call-extended-api",{group:e,name:t,data:o,callback:r})},e.prototype.getCurrentUser=function(e){this.request("get-current-user",null,e)},e.prototype.getConfiguration=function(e){this.request("get-configuration",null,e)},e.prototype.getDrPublishConfiguration=function(e){this.request("get-drpublish-configuration",null,e)},e.prototype.setConfiguration=function(e,t,o){"boolean"==typeof t?t={onlyPublication:t}:"object"==typeof t&&null!==t||(t={});var r={config:e,onlyPublication:"boolean"==typeof t.onlyPublication&&t.onlyPublication,success:"function"==typeof t.success?t.success:null,error:"function"==typeof t.error?t.error:null};this.request("set-configuration",r,o)},e.prototype.emit=function(e,t){this.request("emit-api-event",{name:e,data:t})},e.prototype.on=function(e,t){var o=this;o.eventListeners.add(e,t),this.request("on-api-event",{name:e})},e.prototype.increaseRequiredActionCounter=function(e){this.request("increase-required-action-counter",{},e)},e.prototype.decreaseRequiredActionCounter=function(e){this.request("decrease-required-action-counter",{},e)},e.prototype.clearRequiredActionCounter=function(e){this.request("clear-required-action-counter",{},e)},e.prototype.setRequiredActionCounter=function(e,t){this.request("set-required-action-counter",{count:e},t)},e.prototype.create=function(){return new e},e.prototype.createEmbeddedObject=function(e,t){console.debug("stef: api create embedded object"),this.request("create-embedded-object",{typeId:e,callback:t})},e.prototype.getEmbeddedObjectTypes=function(e){this.request("get-embedded-object-types",null,e)},e.prototype.giveFocus=function(e,t,o){return"string"==typeof e&&""!==e&&("boolean"!=typeof o&&(o=!0),this.request("give-focus",{pluginName:e,start:o,argument:t}),!0)},e.prototype.hide=function(){return this.request("hide"),!0},e.prototype.createModal=function(e,t){return this.request("create-custom-modal",{content:e,options:t}),!0},e.prototype.updateModal=function(e){return this.request("update-custom-modal",{content:e}),!0},e.prototype.closeModal=function(e){return this.request("close-custom-modal",{destroy:e}),!0},e.prototype.getModalInputs=function(e){this.request("get-custom-modal-inputs",null,e)},e.prototype.confirmAuthenticated=function(){this.request("confirm-authenticated",{pluginName:this.appName})},new e}();i.Article=o(i),i.Editor=r(i),e.exports=i},function(e,exports){"use strict";e.exports=function(e){var t=function(){this.DEBUG=!1};return t.prototype.focusApp=function(t){e.request("app-focus",{},t)},t.prototype.startApp=function(t,o,r){e.request("app-start",{app:t,option:o},r)},t.prototype.stopApp=function(t){e.request("app-stop",{app:t})},t.prototype.getId=function(t){e.request("article-id-get",null,t)},t.prototype.getPackageId=function(t){e.request("package-id-get",null,t)},t.prototype.getPackageGuid=function(t){e.request("package-guid-get",null,t)},t.prototype.clearMetaInfo=function(t){e.request("article-metainfo-clear",null,t)},t.prototype.getTags=function(t){e.request("article-tags-get",null,t)},t.prototype.getCustomMeta=function(t,o){e.request("article-custom-meta-get",{name:t},o)},t.prototype.setCustomMeta=function(t,o,r){e.request("article-custom-meta-set",{name:t,value:o},r)},t.prototype.setTags=function(t,o,r){e.request("article-tags-set",{save:o,tags:t},r)},t.prototype.addTag=function(t,o,r){e.request("article-tags-add",{tag:t,onError:o},r)},t.prototype.removeTag=function(t,o){e.request("article-tags-remove",{tag:t},o)},t.prototype.getSelectedCategories=function(t){e.request("article-categories-selected-get",null,t)},t.prototype.saveCategories=function(e){this.getSelectedCategories(function(t){this.setCategories(t,e)})},t.prototype.setCategories=function(t,o){e.request("article-categories-selected-set",{categories:t},o)},t.prototype.addCategories=function(t,o){e.request("article-categories-add",{categories:t},o)},t.prototype.removeCategories=function(t,o){e.request("article-categories-remove",{categories:t},o)},t.prototype.setMainCategory=function(t,o){e.request("article-categories-main-set",{category:t},o)},t.prototype.getSource=function(t){e.request("article-source-get",null,t)},t.prototype.setSource=function(t,o){e.request("article-source-set",{source:t},o)},t.prototype.getStatus=function(t){e.request("article-status-get",null,t)},t.prototype.setStatus=function(t,o){e.request("article-status-set",{status:t},o)},t.prototype.getPublishedDatetime=function(t){e.request("article-published-get",null,t)},t.prototype.setPublishedDatetime=function(t,o){e.request("article-published-set",{published:t},o)},t.prototype.getAuthors=function(t){e.request("article-authors-get",null,t)},t.prototype.setAuthors=function(t,o){e.request("article-authors-set",{authors:t},o)},t.prototype.addAuthors=function(t,o){e.request("article-authors-add",{authors:t},o)},t.prototype.removeAuthors=function(t,o){e.request("article-authors-remove",{authors:t},o)},t.prototype.setKeywords=function(t,o){e.request("article-keywords-set",{keywords:t},o)},t.prototype.getKeywords=function(t){e.request("article-keywords-get",null,t)},t.prototype.getCurrentContent=function(t){e.request("article-content-get",null,t)},t.prototype.setCurrentContent=function(t,o){e.request("article-content-set",{content:t},o)},t.prototype.getArticletypeId=function(t){e.request("article-type-get",null,t)},t.prototype.setArticletypeId=function(t,o){e.request("article-type-set",{articletype:t},o)},t.prototype.maximizeAppWindow=function(t,o){var r="editor-pane-close-"+(new Date).getTime();e.request("editor-pane-maximize",{title:t,event:r}),e.eventListeners.removeAll(r),e.eventListeners.add(r,o)},t.prototype.restoreAppWindow=function(t){e.request("restore-app-window",{},t)},t.prototype.getByline=function(t){e.request("article-byline-get",null,t)},t.prototype.setByline=function(t,o,r){e.request("article-byline-set",{save:o,byline:t},r)},t.prototype.setGeolocations=function(t,o){e.request("article-geolocations-set",{geolocations:t},o)},t.prototype.getGeolocations=function(t){e.request("article-geolocations-get",null,t)},t.prototype.getProperties=function(t){e.request("article-properties-get",null,t)},t.prototype.setProperties=function(t,o){e.request("article-properties-set",{properties:t},o)},t.prototype.setProperty=function(t,o,r){var n={};n[t]=o,e.request("article-properties-set",{properties:n},r)},new t}},function(e,exports){"use strict";e.exports=function(e){var t=null,o=function(){function o(e){t=e}function r(){t=null}this.DEBUG=!1,e.on("pluginElementClicked",o),e.on("pluginElementDeselected",r)};return o.prototype.getActiveEditor=function(t){e.request("get-active-editor",null,t)},o.prototype.registerMenuAction=function(t,o){e.request("register-menu-action",t,o)},o.prototype.registerMenuActionGroup=function(t,o){e.request("register-menu-action-group",t,o)},o.prototype.registerHoverAction=function(t,o){e.request("register-hover-action",t,o)},o.prototype.directionalCastle=function(t,o){e.request("editor-directional-castle",t,o)},o.prototype.getEditorType=function(t){e.request("editor-get-type",null,t)},o.prototype.replaceElementById=function(t,o,r){e.request("editor-element-replace-byid",{id:t,element:o},r)},o.prototype.replacePluginElementById=function(t,o,r){e.request("editor-element-replace-plugin-element-byid",{id:t,element:o},r)},o.prototype.deleteElementById=function(t,o){e.request("editor-element-replace-byid",{id:t},o)},o.prototype.getHTMLById=function(t,o){e.request("editor-element-get-byid",{id:t},o)},o.prototype.getHTMLBySelector=function(t,o){e.request("editor-elements-get-byselector",{selector:t},o)},o.prototype.getCategories=function(t){e.request("get-categories",null,t)},o.prototype.getParentCategories=function(t,o){e.request("get-parent-categories",t,o)},o.prototype.getParentIds=function(t,o,r){e.request("get-parent-ids",{id:t,selector:o},r)},o.prototype.getTagTypes=function(t){e.request("get-tag-types",null,t)},o.prototype.getTagType=function(t,o){e.request("get-tag-type",{id:t},o)},o.prototype.clear=function(t){e.request("editor-clear",null,t)},o.prototype.insertString=function(t,o){e.request("editor-insert-string",{string:t},o)},o.prototype.insertElement=function(t,o,r){var n=!1;"object"==typeof o?(o=o||{},n="boolean"==typeof o.select&&o.select):"undefined"==typeof r&&"function"==typeof o&&(r=o),e.request("editor-insert-element",{element:t.outerHTML,select:n},r)},o.prototype.removeClasses=function(t,o,r){e.request("editor-classes-remove",{id:t,classes:o},r)},o.prototype.addClasses=function(t,o,r){e.request("editor-classes-add",{id:t,classes:o},r)},o.prototype.markAsActive=function(t,o){e.request("editor-mark-as-active",{id:t},o)},o.prototype.setAttributeById=function(t,o,r,n){e.request("editor-element-attribute-set-byid",{id:t,attribute:o,value:r},n)},o.prototype.setStyleById=function(t,o,r,n){e.request("editor-element-style-set-byid",{id:t,attribute:o,value:r},n)},o.prototype.initMenu=function(t,o){e.request("editor-initialize-menu",{menus:t},o)},o.prototype.openPluginElementEditor=function(t){e.request("open-element-editor",{id:t})},o.prototype.getTotalWordCount=function(t){e.request("total-word-count",null,t)},o.prototype.getTotalCharCount=function(t){e.request("total-char-count",null,t)},o.prototype.updateAssetData=function(t,o){e.request("update-asset-media",t,o)},o.prototype.insertNestedAsset=function(t,o,r,n){function i(t,n,i){r.internalId=t;var s="asset-"+t,p=document.createElement("div");p.id=s,p.dataset.internalId=t,r.externalId&&(p.dataset.externalId=r.externalId),r.assetClass&&p.classList.add(r.assetClass),p.innerHTML=o,e.Editor.getHTMLById(n,function(e){var t=document.createElement("div");t.innerHTML=e,t.firstChild.setAttribute("id",n+"tmp"),u.replacePluginElementById(n,t.innerHTML,function(){t=document.createElement("div"),t.innerHTML=e;var o=t.querySelector(".dp-fact-box-image");o.innerHTML=p.outerHTML,u.replacePluginElementById(n+"tmp",t.innerHTML,i)})})}function s(t){e.request("update-embedded-asset",r,t)}var u=this;e.createEmbeddedObject(r.embeddedTypeId,function(e){i(e,t,function(e){s(n(e))})})},o.prototype.insertEmbeddedAsset=function(o,r,n){function i(e,t){r.internalId=e;var n="asset-"+e,i=document.createElement("div");if(i.id=n,i.dataset.internalId=e,r.externalId&&(i.dataset.externalId=r.externalId),r.assetClass&&i.classList.add(r.assetClass),i.innerHTML=o,p?u.replaceElementById(n,i.outerHTML,{select:!0}):u.insertElement(i,{select:!0}),"function"==typeof t)return t()}function s(t){e.request("update-embedded-asset",r,t)}var u=this,p=!1;if(t){if(r.assetSource!==e.getAppName())return void e.showErrorMsg("Can't update selected plugin element since it doesn't belong to the '"+e.getAppName()+"' plugin");p=!0}if(t){var a=t.dpArticleId;if(!a)throw Error("Selected plugin element: expected dpArticleId not found (tried reading from attribute 'data-internal-id')");i(a,function(e){s(n(e))})}else e.createEmbeddedObject(r.embeddedTypeId,function(e){i(e,function(e){s(n(e))})})},o.prototype.getSelectedPluginElement=function(t){e.request("get-selected-plugin-element",{},t)},new o}},function(e,exports){"use strict";function t(){this._listeners={}}e.exports=t,t.prototype.add=function(e,t){if("function"!=typeof t)throw Error("Listener callback must be a function.");return void 0===this._listeners[e]&&(this._listeners[e]=[]),this._listeners[e].push(t),this._listeners[e].length-1},t.prototype.remove=function(e,t){void 0!==this._listeners[e]&&void 0!==this._listeners[e][t]&&(this._listeners[e][t]=!1)},t.prototype.removeAll=function(e){e?this._listeners[e]=[]:this._listeners=[]},t.prototype.notify=function(e,t){var o=!0;if(void 0===this._listeners[e])return o;var r=t;return"object"==typeof t&&null!==t&&"undefined"!=typeof t.data&&(r=t.data),this._listeners[e].forEach(function(e){"function"==typeof e&&e(r)===!1&&(o=!1)}),o}}])});
//# sourceMappingURL=bundle.js.map