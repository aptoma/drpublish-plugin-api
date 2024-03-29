(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PluginAPI"] = factory();
	else
		root["PluginAPI"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/PluginAPI.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/AH5Communicator.js":
/*!*******************************!*\
  !*** ./js/AH5Communicator.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module) {
  "use strict";

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * @typedef {Object} selectedPluginElementData
   *
   * @property {String} id The DOM id of the selected element
   * @property {String} dpArticleId
   * @property {String} externalId
   * @property {Boolean} isDigitalAsset
   */

  /**
   * @param {Api} PluginAPI
   * @return {AH5Communicator}
   */
  module.exports = function (PluginAPI) {
    /** @type {selectedPluginElementData|null} */
    var selectedPluginElement = null;
    /**
     * This will be used by editor apps to communicate with the editor
     *
     * Should be used like this:
     *
     * PluginAPI.Editor.insertString('string');
     *
     * @class
     * @classdesc Functions for talking with the AH5 editor. Accessed through PluginAPI.Editor
     * @exports PluginAPI/Editor
     */

    /* eslint max-statements: ["error", 50, { "ignoreTopLevelFunctions": true }]*/

    var AH5Communicator = function AH5Communicator() {
      this.DEBUG = false;
      PluginAPI.on('pluginElementClicked', pluginElementSelected);
      PluginAPI.on('pluginElementDeselected', pluginElementDeselected);
      /**
       * @param {selectedPluginElementData} elementData
       */

      function pluginElementSelected(elementData) {
        selectedPluginElement = elementData;
      }

      function pluginElementDeselected() {
        selectedPluginElement = null;
      }
    };
    /**
     * Get name of current active editor
     *
     * @param {Function} callback function(String)
     */


    AH5Communicator.prototype.getActiveEditor = function (callback) {
      PluginAPI.request('get-active-editor', null, callback);
    };
    /**
     * Registers/Modifies a context menu items for a plugin element
     * The object send should have the following structure
     *
     * @param {Object} action The action object
     * @param {Function} callback function()
     *
     * @example
     * PluginAPI.Editor.registerMenuAction({
     *	  label: 'label in the menu',
     *	  icon: '[Optional] url to possible icon image',
     *	  trigger: '[Optional] css selector, only show menu element when this matches the element',
     *	  callback: function(id, clickedElementId) {
     *		  // callback function
     *		  // first parameter is id of the plugin element
     *		  // second paramter is id of closest element to the trigger element that has an id
     *		  //	  in code: $(event.triggerElement).closest('[id]').attr('id');
     *	  }
     * })
     */


    AH5Communicator.prototype.registerMenuAction = function (action, callback) {
      PluginAPI.request('register-menu-action', action, callback);
    };
    /**
     * Adds a mouseover action to plugin elements
     *
     * @param {function} action to perform
     * @param {function} callback function(String)
     */


    AH5Communicator.prototype.registerHoverAction = function (action, callback) {
      PluginAPI.request('register-hover-action', action, callback);
    };
    /**
     * Gets the selected plugin element from the editor
     *
     * @param {function} callback function(String)
     */


    AH5Communicator.prototype.getSelectedPluginElement = function (callback) {
      PluginAPI.request('get-selected-plugin-element', {}, callback);
    };
    /**
     * Deselect all plugin elements in editor
     *
     * @param {function} callback function(String)
     */


    AH5Communicator.prototype.deSelectPluginElements = function (callback) {
      PluginAPI.request('de-select-plugin-elements', {}, callback);
    };
    /**
     * Swap positions between the provided element and the adjacent one
     * in the specified direction
     * PluginAPI.Editor.directionalCastle({
     *  elementId: 'the provided element id',
     *  direction: 'forward/backward'
     * })
     *  @param {String} elementId DOM element id
     *  @param {String} direction Direction
     *  @param {function} callback
     * */


    AH5Communicator.prototype.directionalCastle = function (elementId, direction, callback) {
      PluginAPI.request('editor-directional-castle', {
        elementId: elementId,
        direction: direction
      }, callback);
    };
    /**
     * Registers/Modifies a group of items to in the context menu
     * The object send should have the following structure
     *
     * @example
     * PluginAPI.Editor.registerMenuActionGroup({
     *	  label: 'label for the group in the menu',
     *	  icon: '[Optional] url to possible icon image',
     *	  actions: [
     *		  {
     *			  label: 'label for the action #1',
     *			  callback: function(id, clickedElementId) {
     *				  // same as for registerMenuAction
     *			  }
     *		  },
     *		  {
     *			  label: 'label for the action #2',
     *			  callback: function(id, clickedElementId) {
     *				  // same as for registerMenuAction
     *			  }
     *		  }
     *	  ]
     * })
     *
     * @param {Object} group The action object
     * @param {function} callback function()
     */


    AH5Communicator.prototype.registerMenuActionGroup = function (group, callback) {
      PluginAPI.request('register-menu-action-group', group, callback);
    };
    /**
     * Retrieves the type of editor that currently has focus
     *
     * @param {function} callback function(String)
     */


    AH5Communicator.prototype.getEditorType = function (callback) {
      PluginAPI.request('editor-get-type', null, callback);
    };
    /**
     * Replace an element in the article
     *
     * @param {String} id Id of the element
     * @param {String} element The new element
     * @param {function} callback function(Boolean), called after replacement is done
     */


    AH5Communicator.prototype.replaceElementById = function (id, element, callback) {
      PluginAPI.request('editor-element-replace-byid', {
        id: id,
        element: element
      }, callback);
    };
    /**
     * Replace a plugin element in the article
     *
     * @param {String} id Id of the element
     * @param {String} element The new element
     * @param {function} callback function(Boolean), called after replacement is done
     */


    AH5Communicator.prototype.replacePluginElementById = function (id, element, callback) {
      PluginAPI.request('editor-element-replace-plugin-element-byid', {
        id: id,
        element: element
      }, callback);
    };
    /**
     * Set the content of an element in the article
     *
     * @param {String} id Id of the element
     * @param {String} content The new content
     * @param {function} callback function(Boolean), called when done
     */


    AH5Communicator.prototype.setElementContentById = function (id, content, callback) {
      PluginAPI.request('editor-element-set-byid', {
        id: id,
        element: content
      }, callback);
    };
    /**
     * Delete an element in the article
     *
     * @param {String} id Id of the element
     * @param {function} callback function(Boolean), called after deletion is done
     */


    AH5Communicator.prototype.deleteElementById = function (id, callback) {
      PluginAPI.request('editor-element-delete-byid', {
        id: id
      }, callback);
    };
    /**
     * Get HTML code of an element
     *
     * @param {String} id The element id
     * @param {function} callback function(String), html content of the element
     */


    AH5Communicator.prototype.getHTMLById = function (id, callback) {
      PluginAPI.request('editor-element-get-byid', {
        id: id
      }, callback);
    };
    /**
     * Get HTML code of all elements that match the selector
     *
     * @param {String} selector The CSS selector
     * @param {function} callback function([String]), html content of matching elements
     */


    AH5Communicator.prototype.getHTMLBySelector = function (selector, callback) {
      PluginAPI.request('editor-elements-get-byselector', {
        selector: selector
      }, callback);
    };
    /**
     * Get all categories
     *
     * @param {Function} callback function([Object Category]), list of Category objects with id, name and pid
     */


    AH5Communicator.prototype.getCategories = function (callback) {
      PluginAPI.request('get-categories', null, callback);
    };
    /**
     * Returns all the parent categories of the given category
     *
     * @param {Object} category The category to find parents of
     * @param {Function} callback function([Object Category]), array of parent Category objects
     */


    AH5Communicator.prototype.getParentCategories = function (category, callback) {
      PluginAPI.request('get-parent-categories', category, callback);
    };
    /**
     * Returns all the parent elements that match the selector
     *
     * @param {String} id Id of element to find parents of
     * @param {String} selector Selector to filter parent elements with
     * @param {Function} callback function([String]), array of ids
     */


    AH5Communicator.prototype.getParentIds = function (id, selector, callback) {
      PluginAPI.request('get-parent-ids', {
        id: id,
        selector: selector
      }, callback);
    };
    /**
     * Retrieve information about all tagtypes
     *
     * @param {Function} callback function([Object Tagtype]), array of tagtypes with id, name and config object
     */


    AH5Communicator.prototype.getTagTypes = function (callback) {
      PluginAPI.request('get-tag-types', null, callback);
    };
    /**
     * Get information about the given tagtype
     *
     * @param {String} id The element id
     * @param {Function} callback function(Object Tagtype), tagtype object with id, name and config object
     */


    AH5Communicator.prototype.getTagType = function (id, callback) {
      PluginAPI.request('get-tag-type', {
        id: id
      }, callback);
    };
    /**
     * Clears the editor contents
     *
     * @param {Function} callback function(Boolean)
     */


    AH5Communicator.prototype.clear = function (callback) {
      PluginAPI.request('editor-clear', null, callback);
    };
    /**
     * Insert a string into the editor
     *
     * @param {String} string The string that should be inserted
     * @param {Function} callback function(String), id of the newly inserted element if it has one
     */


    AH5Communicator.prototype.insertString = function (string, callback) {
      PluginAPI.request('editor-insert-string', {
        string: string
      }, callback);
    };
    /**
     * Insert an element into the editor
     *
     * Note that the HTML of the element is what will be transferred, and nothing else!
     * The element will be given the class dp-plugin-element, and given a unique ID (if none is present)
     *
     * @param {Element} element The element that should be inserted
     * @param {Object | Function} options (can be omitted) Options object, supports option 'select' - set to true to automatically select the inserted element
     * @param {Function} [callback] function(String), id of the newly inserted element
     */


    AH5Communicator.prototype.insertElement = function (element, options, callback) {
      var select = false;

      if (_typeof(options) === 'object') {
        options = options || {};
        select = typeof options.select === 'boolean' ? options.select : false;
      } else if (typeof callback === 'undefined' && typeof options === 'function') {
        callback = options;
      }

      PluginAPI.request('editor-insert-element', {
        element: element.outerHTML,
        select: select,
        options: options
      }, callback);
    };
    /**
     * Remove classes from the element an element in the article
     *
     * @param {String} id Id of the element
     * @param {Array} classes Array of class names
     * @param {function} callback function(Boolean)
     */


    AH5Communicator.prototype.removeClasses = function (id, classes, callback) {
      PluginAPI.request('editor-classes-remove', {
        id: id,
        classes: classes
      }, callback);
    };
    /**
     * Add new classes to an element
     *
     * @param {String} id Id of the element
     * @param {Array} classes Array of class names
     * @param {function} callback function(Boolean)
     */


    AH5Communicator.prototype.addClasses = function (id, classes, callback) {
      PluginAPI.request('editor-classes-add', {
        id: id,
        classes: classes
      }, callback);
    };
    /**
     * Get data-attribute of the element
     *
     * @param {String} id Id of the element
     * @param {String} attribute attribute name
     * @param {function} callback function(Boolean)
     */


    AH5Communicator.prototype.getDataAttribute = function (id, attribute, callback) {
      PluginAPI.request('editor-attribute-get', {
        id: id,
        attribute: 'data-' + attribute
      }, callback);
    };
    /**
     * Update data-attribute of the element
     *
     * @param {String} id Id of the element
     * @param {String} attribute attribute name
     * @param {String} value attribute value
     * @param {function} callback function(Boolean)
     */


    AH5Communicator.prototype.updateDataAttribute = function (id, attribute, value, callback) {
      PluginAPI.request('editor-attribute-update', {
        id: id,
        attribute: 'data-' + attribute,
        value: value
      }, callback);
    };
    /**
     * Mark an element as currently selected (green border with default styling)
     *
     * @param {String} id Id of the element
     * @param {function} callback function(Boolean)
     */


    AH5Communicator.prototype.markAsActive = function (id, callback) {
      PluginAPI.request('editor-mark-as-active', {
        id: id
      }, callback);
    };
    /**
     * Sets the attribute of the element with the given ID to value
     *
     * @param {String} id The ID of the element to set the attribute on
     * @param {String} attribute The attribute to set
     * @param {String} value What to set the attribute to
     * @param {Function} callback function(Boolean)
     */


    AH5Communicator.prototype.setAttributeById = function (id, attribute, value, callback) {
      PluginAPI.request('editor-element-attribute-set-byid', {
        id: id,
        attribute: attribute,
        value: value
      }, callback);
    };
    /**
     * Sets a style of the element with the given ID to value
     *
     * @param {String} id The ID of the element to set the attribute on
     * @param {String} attribute The style attribute to set
     * @param {String} value What to set the attribute to
     * @param {Function} callback function(Boolean)
     */


    AH5Communicator.prototype.setStyleById = function (id, attribute, value, callback) {
      PluginAPI.request('editor-element-style-set-byid', {
        id: id,
        attribute: attribute,
        value: value
      }, callback);
    };
    /**
     * Initialize pre registered menus
     *
     * Available options are: simplePluginMenu, editContext, deleteButton, floatButtons
     *
     * @param {Array} menus Array of menu names
     * @param {Function} callback function(Boolean)
     */


    AH5Communicator.prototype.initMenu = function (menus, callback) {
      PluginAPI.request('editor-initialize-menu', {
        menus: menus
      }, callback);
    };
    /**
     * Opens the plugin editor for a given element.
     *
     * @param {String} id Plugin element ID
     */


    AH5Communicator.prototype.openPluginElementEditor = function (id) {
      PluginAPI.request('open-element-editor', {
        id: id
      });
    };
    /**
     * Returns the total number of words in the currently open article.
     *
     * @param {Function} callback Receives the total word count as its single parameter
     */


    AH5Communicator.prototype.getTotalWordCount = function (callback) {
      PluginAPI.request('total-word-count', null, callback);
    };
    /**
     * Returns the total number of characters in the currently open article.
     *
     * @param {Function} callback Receives the total character count as its single parameter
     */


    AH5Communicator.prototype.getTotalCharCount = function (callback) {
      PluginAPI.request('total-char-count', null, callback);
    };
    /**
     * Update one data option of the referenced embedded asset
     *
     * @param {Number} dpArticleId DrPublish's embedded asset id
     * @param {String} key Name of the property
     * @param {String} value Value of the property
     * @param {Function} callback Receives the total character count as its single parameter
     */


    AH5Communicator.prototype.updateAssetOption = function (dpArticleId, key, value, callback) {
      PluginAPI.request('update-asset-option', {
        dpArticleId: dpArticleId,
        key: key,
        value: value
      }, callback);
    };
    /**
     * Update all asset data of the referenced embedded asset
     *
     * @param {Object} data Updated data
     * @param {Function} callback Receives the total character count as its single parameter
     *
     * @example
     *  var data = {
     *   internalId: assetDpArticleId,
     *   assetElementId: activeAssetId,
     *   assetType: 'picture',
     *   assetSource: PluginAPI.getPluginName(),
     *   resourceUri: fullsizeUrl,
     *   previewUri: fullsizeUrl,
     *   renditions: {
     *       highRes: {uri: fullsizeUrl},
     *       thumbnail: {uri: thumbnailUrl}
     *   },
     *   options: {}
     * }
     * PluginAPI.Editor.updateAssetData(data);
     */


    AH5Communicator.prototype.updateAssetData = function (data, callback) {
      PluginAPI.request('update-asset-media', data, callback);
    };
    /**
     * Get all data option of the referenced embedded asset
     *
     * @param {Number} dpArticleId DrPublish's embedded asset id
     * @param {Function} callback Receives the total character count as its single parameter
     */


    AH5Communicator.prototype.getAssetData = function (dpArticleId, callback) {
      PluginAPI.request('get-asset-data', {
        data: dpArticleId
      }, callback);
    };
    /**
     * Insert an embedded asset inside of an existing one
     *
     * @param {Number} parentElementId DOM element id of the receiving asset
     * @param {String} markup HTML to inject
     * @param {Object} data Asset data
     * @param {Function} callback Receives the total character count as its single parameter
     *
     * @example
     * var title = response.data.title ? response.data.title : '';
     * var caption = response.data.description ? response.data.description : '';
     * var credit = response.data.byline ? response.data.byline : '';
     * var source = response.data.source ? response.data.source : '';
     * var markup = '<div class="dp-article-image-container"><img src="' + fullsizeUrl + '" /></div>';
     * markup += '<div class="dp-article-image-headline" data-dp-editable-type="textfield" data-dp-editable-name="headline">' + title + '</div>...';
     * var options = response.data.options ? response.data.options : {};
     * var callback = function () {
     *   // do something here
     *  };
     * var rends = renditions || {};
     * rends.highRes = {uri: fullsizeUrl};
     * rends.preview = {uri: fullsizeUrl};
     * var drpdata = {
     *               embeddedTypeId: 5,
     *               isMultiple: true,
     *               assetType: 'picture',
     *               externalId: id,
     *               assetClass: 'dp-picture',
     *               assetSource: 'images',
     *               resourceUri: fullsizeUrl,
     *               previewUri: fullsizeUrl,
     *               renditions: rends,
     *               options: options
     *           };
     * var  insertNested = function () {
     *   PluginAPI.Editor.insertNestedAsset(
     *       selectedSlideshowAsset.id,
     *       markup,
     *       drpdata
     * };
     * PluginAPI.Editor.getSelectedPluginElement(insertNested);
     */


    AH5Communicator.prototype.insertNestedAsset = function (parentElementId, markup, data, callback) {
      var self = this;
      PluginAPI.createEmbeddedObject(data.embeddedTypeId, function (dpArticleId) {
        insert(dpArticleId, parentElementId, function (data) {
          return addEmbeddedAssetRequest(callback);
        });
      });

      function insert(dpArticleId, parentElementId, callback) {
        data.internalId = dpArticleId;
        var elementId = 'asset-' + dpArticleId;
        var $element = $('<div />');
        $element.attr('id', elementId);
        $element.attr('data-internal-id', dpArticleId);
        $element.attr('data-ah5-type', data.assetSource);

        if (data.externalId) {
          $element.attr('data-external-id', data.externalId);
        }

        if (data.dpDigitalAssetId) {
          $element.attr('data-dp-digital-asset-id', data.dpDigitalAssetId);
        }

        if (data.assetClass) {
          $element.addClass(data.assetClass);
        }

        $element.addClass('dp-plugin-element');
        $element.html(markup);
        PluginAPI.Editor.getHTMLById(parentElementId, function (html) {
          var d = document.createElement('div');
          d.innerHTML = html;
          d.firstChild.setAttribute('id', parentElementId + 'tmp');
          self.replacePluginElementById(parentElementId, d.innerHTML, function () {
            d = document.createElement('div');
            d.innerHTML = html;
            var assetContainer = d.querySelector('.dp-fact-box-image, .dp-nested-asset-container');

            if (data.isMultiple) {
              $(assetContainer).append($element.get(0).outerHTML);
            } else {
              assetContainer.innerHTML = $element.get(0).outerHTML;
            }

            self.replacePluginElementById(parentElementId + 'tmp', d.innerHTML, callback);
          });
        });
      }

      function addEmbeddedAssetRequest(callback) {
        PluginAPI.request('add-embedded-asset', data, callback);
      }
    };
    /**
     * Insert an embedded asset
     *
     * @param {String} markup HTML to inject
     * @param {Object} data Asset data
     * @param {Function} callback Receives the total character count as its single parameter
     *
     * @example
     * var title = response.data.title ? response.data.title : '';
     * var caption = response.data.description ? response.data.description : '';
     * var credit = response.data.byline ? response.data.byline : '';
     * var source = response.data.source ? response.data.source : '';
     * var markup = '<div class="dp-article-image-container"><img src="' + fullsizeUrl + '" /></div>';
     * markup += '<div class="dp-article-image-headline" data-dp-editable-type="textfield" data-dp-editable-name="headline">' + title + '</div>';
     * markup += '<div class="dp-article-image-caption" data-dp-editable-type="html" data-dp-editable-name="caption">' + caption + '</div>...';
     * var options = response.data.options ? response.data.options : {};
     * var callback = function () {
     *   // do something here
     *  };
     * var rends = renditions || {};
     * rends.highRes = {uri: fullsizeUrl};
     * rends.preview = {uri: fullsizeUrl};
     * var drpdata = {
     *               embeddedTypeId: 5,
     *               isMultiple: true,
     *               assetType: 'picture',
     *               externalId: id,
     *               assetClass: 'dp-picture',
     *               assetSource: 'images',
     *               resourceUri: fullsizeUrl,
     *               previewUri: fullsizeUrl,
     *               renditions: rends,
     *               options: options
     *           };
     * PluginAPI.Editor.insertEmbeddedAsset(markup, drpdata, callback);
     */


    AH5Communicator.prototype.insertEmbeddedAsset = function (markup, data, callback) {
      var self = this;
      var updateContent = false;

      if (selectedPluginElement) {
        if (data.assetSource !== PluginAPI.getAppName()) {
          PluginAPI.showErrorMsg('Can\'t update selected plugin element since it doesn\'t belong to the \'' + PluginAPI.getAppName() + '\' plugin');
          return;
        } else {
          updateContent = true;
        }
      }

      if (selectedPluginElement) {
        var dpArticleId = selectedPluginElement.dpArticleId;

        if (!dpArticleId) {
          throw Error('Selected plugin element: expected dpArticleId not found (tried reading from attribute \'data-internal-id\')');
        }

        insert(dpArticleId, function (data) {
          return updateEmbeddedAssetRequest(typeof callback === 'function' ? callback(data) : null);
        });
      } else {
        PluginAPI.createEmbeddedObject(data.embeddedTypeId, function (dpArticleId) {
          insert(dpArticleId, function (data) {
            return addEmbeddedAssetRequest(typeof callback === 'function' ? callback(data) : null);
          });
        });
      }

      function insert(dpArticleId, callback) {
        data.internalId = dpArticleId;
        var elementId = 'asset-' + dpArticleId;
        var element = document.createElement('div');
        element.id = elementId;
        element.dataset.internalId = dpArticleId;

        if (data.externalId) {
          element.dataset.externalId = data.externalId;
        }

        if (data.dpDigitalAssetId) {
          element.dataset.dpDigitalAssetId = data.dpDigitalAssetId;
        }

        if (data.assetClass) {
          element.classList.add(data.assetClass);
        }

        element.innerHTML = markup;

        if (!updateContent) {
          data.select = true;
          self.insertElement(element, data);
        } else {
          self.setElementContentById(elementId, element.innerHTML, null);
        }

        if (typeof callback === 'function') {
          return callback();
        }
      }

      function addEmbeddedAssetRequest(callback) {
        PluginAPI.request('add-embedded-asset', data, callback);
      }

      function updateEmbeddedAssetRequest(callback) {
        PluginAPI.request('update-embedded-asset', data, callback);
      }
    };
    /**
     * Returns the total number of characters in the currently open article.
     *
     * @param {Function} callback Receives the total character count as its single parameter
     */


    AH5Communicator.prototype.getCurrentSelectionAbsolutePosition = function (callback) {
      PluginAPI.request('current-selection-absolute-position', null, callback);
    };
    /**
     * Wraps the current selection in a span
     *
     * @param {String} className the name of the class to apply
     * @param {Object} attributes to apply to the wrapper
     * @param {Function} callback
     */


    AH5Communicator.prototype.wrapSelection = function (className, attributes, callback) {
      PluginAPI.request('wrap-selection', {
        className: className,
        attributes: attributes
      }, callback);
    };
    /**
     * Removes the selected element, leaving all children in place
     *
     * @param {String} selector the selector for finding the elements to be removed
     * @param {Function} callback
     */


    AH5Communicator.prototype.removeInPlace = function (selector, callback) {
      PluginAPI.request('remove-in-place', {
        selector: selector
      }, callback);
    };
    /**
     * Triggers an event on all elements matching the selector
     *
     * @param {String} selector the selector for finding the elements
     * @param {String} event the event to trigger on the found elements
     * @param {Function} callback
     */


    AH5Communicator.prototype.triggerEvent = function (selector, event, callback) {
      PluginAPI.request('trigger-event', {
        selector: selector,
        event: event
      }, callback);
    };
    /**
     * Get ordered list of element IDs, for selector
     *
     * @param {String} selector the selector for finding the elements
     * @param {Function} callback Receives an ordered array of element IDs
     */


    AH5Communicator.prototype.getOrderedIDs = function (selector, callback) {
      PluginAPI.request('get-ordered-ids', {
        selector: selector
      }, callback);
    };

    return new AH5Communicator();
  };
});

/***/ }),

/***/ "./js/ArticleCommunicator.js":
/*!***********************************!*\
  !*** ./js/ArticleCommunicator.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module) {
  "use strict";

  /* eslint max-statements: ["error", 100000000] */

  /* eslint complexity: ["error", 100000000] */
  module.exports = function (PluginAPI) {
    /**
        * This class is used for communicating with the article, typically setting and getting values of metadata or in the article content itself.
        *
        * @class
        * @classdesc Functions for talking with the DrPublish article object. Accessed through PluginAPI.Article
        * @exports PluginAPI/Article
        */
    var ArticleCommunicator = function ArticleCommunicator() {
      this.DEBUG = false;
    };
    /**
        * Give focus to yourself
        *
        * @param {Function} callback function(Boolean), called as the plugin gets focus
        */


    ArticleCommunicator.prototype.focusPlugin = function (callback) {
      PluginAPI.request('app-focus', {}, callback);
    };
    /**
        * Give focus to yourself
        * @deprecated use focusPlugin instead
        * @param {Function} callback function(Boolean), called after plugin is started
        */


    ArticleCommunicator.prototype.focusApp = function (callback) {
      this.focusPlugin(callback);
    };
    /**
        * Start the given plugin
        *
        * @param {String} name Name of the plugin as defined on publication settings
        * @param {Object} options Options for initializing the plugin
        * @param {Function} callback function(Boolean), called after plugin is started
        */


    ArticleCommunicator.prototype.startPlugin = function (name, options, callback) {
      PluginAPI.request('app-start', {
        app: name,
        option: options
      }, callback);
    };
    /**
        * @deprecated use startPlugin instead
        * @param {String} name Name of the plugin as defined on publication settings
        * @param {Object} options Options for initializing the plugin
        * @param {Function} callback function(Boolean), called after plugin is started
        */


    ArticleCommunicator.prototype.startApp = function (name, options, callback) {
      this.startPlugin(name, options, callback);
    };
    /**
        * Stop the given plugin
        *
        * @param {String} name Name of the plugin, as defined on publication config
        */


    ArticleCommunicator.prototype.stopPlugin = function (name) {
      PluginAPI.request('app-stop', {
        app: name
      });
    };
    /**
        * @deprecated use  stopPlugin instead
        * @param {String} name Name of the plugin, as defined on publication config
        */


    ArticleCommunicator.prototype.stopApp = function (name) {
      this.stopPlugin(name);
    };
    /**
        * Get the id of the article currently edited
        *
        * @param {Function} callback function(Int), id of the current article
        */


    ArticleCommunicator.prototype.getId = function (callback) {
      PluginAPI.request('article-id-get', null, callback);
    };
    /**
        * Get the guid of the article package currently edited
        *
        * @param {Function} callback function(Int), id of the current article
        */


    ArticleCommunicator.prototype.getPackageId = function (callback) {
      PluginAPI.request('package-id-get', null, callback);
    };
    /**
        * Get the guid of the article package currently edited
        *
        * @param {Function} callback function(Int), id of the current article
        */


    ArticleCommunicator.prototype.getPackageGuid = function (callback) {
      PluginAPI.request('package-guid-get', null, callback);
    };
    /**
        * Clear the meta information summary
        *
        * @param {Function} callback function(Boolean), called when meta data has been cleared
        */


    ArticleCommunicator.prototype.clearMetaInfo = function (callback) {
      PluginAPI.request('article-metainfo-clear', null, callback);
    };
    /**
        * Get tags used in the article
        *
        * @param {Function} callback function([Object Tag]), array with tags connected to an article
        */


    ArticleCommunicator.prototype.getTags = function (callback) {
      PluginAPI.request('article-tags-get', null, callback);
    };
    /**
     * Get specific meta data of the article
     *
     * @param {String} name Name of the meta data
     * @param {Function} callback function(value)
     */


    ArticleCommunicator.prototype.getMeta = function (name, callback) {
      PluginAPI.request('article-meta-get', {
        name: name
      }, callback);
    };
    /**
     * Get specific meta data of the article
     *
     * @param {String} name Name of the meta data
     * @param {Object} value Value of the meta data
     * @param {Function} callback function(value)
     */


    ArticleCommunicator.prototype.setMeta = function (name, value, callback) {
      PluginAPI.request('article-meta-set', {
        name: name,
        value: value
      }, callback);
    };
    /**
        * Retrieve custom meta value for the article
        *
        * @param {String} name Name of the custom meta value
        * @param {Function} callback function(Object), the parameter is an object containing the given custom meta value
        */


    ArticleCommunicator.prototype.getCustomMeta = function (name, callback) {
      PluginAPI.request('article-custom-meta-get', {
        name: name
      }, callback);
    };
    /**
        * Set custom meta value for the article
        *
        * @param {String} name Name of the meta value
        * @param {Object} value Value to set
        * @param {Function} callback function()
        */


    ArticleCommunicator.prototype.setCustomMeta = function (name, value, callback) {
      PluginAPI.request('article-custom-meta-set', {
        name: name,
        value: value
      }, callback);
    };
    /**
        * Marks article model as having meta data changes
        *
        * @param {Function} callback function()
        */


    ArticleCommunicator.prototype.setMetaChanged = function (callback) {
      PluginAPI.request('article-meta-changed', null, callback);
    };
    /**
        * Set tags for the article
        *
        * @param {Array} tags List of tags that should be set
        * @param {Boolean} save Set to true to force save once the tags are updated
        * @param {Function} callback function(Boolean), called when tags have been set
        */


    ArticleCommunicator.prototype.setTags = function (tags, save, callback) {
      PluginAPI.request('article-tags-set', {
        save: save,
        tags: tags
      }, callback);
    };
    /**
        * Add tag for the article
        *
        * @param {Array} tags Tags to be added
        * @param {Function} errorFunction called if error
        * @param {Function} callback function(Boolean), called when tag has been set
        */


    ArticleCommunicator.prototype.addTags = function (tags, errorFunction, callback) {
      PluginAPI.request('article-tags-add', {
        tags: tags,
        onError: errorFunction
      }, callback);
    };
    /**
        * Add tag for the article
        *
        * @param {String} tag Tag to be added
        * @param {Function} errorFunction called if error
        * @param {Function} callback function(Boolean), called when tag has been set
        */


    ArticleCommunicator.prototype.addTag = function (tag, errorFunction, callback) {
      PluginAPI.request('article-tags-add', {
        tags: [tag],
        onError: errorFunction
      }, callback);
    };
    /**
        * Add tags for the article
        *
        * @param {String} tags Tags to be added
        * @param {Function} errorFunction called if error
        * @param {Function} callback function(Boolean), called when tag has been set
        */


    ArticleCommunicator.prototype.addTags = function (tags, errorFunction, callback) {
      PluginAPI.request('article-tags-add', {
        tags: tags,
        onError: errorFunction
      }, callback);
    };
    /**
        * Remove tag from article
        *
        * @param {String} tag Tag to remove
        * @param {Function} callback function(Boolean), called when tag has been removed
        */


    ArticleCommunicator.prototype.removeTag = function (tag, callback) {
      PluginAPI.request('article-tags-remove', {
        tag: tag
      }, callback);
    };
    /**
        * Get the selected categories
        *
        * @param {Function} callback function([String]), array with category ids
        */


    ArticleCommunicator.prototype.getSelectedCategories = function (callback) {
      PluginAPI.request('article-categories-selected-get', null, callback);
    };
    /**
        * Save the currently selected categories
        *
        * @param {Function} callback function(Boolean), called when categories has been saved
        */


    ArticleCommunicator.prototype.saveCategories = function (callback) {
      this.getSelectedCategories(function (categories) {
        this.setCategories(categories, callback);
      });
    };
    /**
        * Set selected categories
        *
        * @param {Array} categories List of category IDs that should be set
        * @param {Function} callback function(Boolean), called when categories have been set
        */


    ArticleCommunicator.prototype.setCategories = function (categories, callback) {
      PluginAPI.request('article-categories-selected-set', {
        categories: categories
      }, callback);
    };
    /**
        * Add the given categories to the list of categories
        *
        * @param {Array} categories List of category IDs to add
        * @param {Function} callback function(Boolean), called when the categories have been set
        */


    ArticleCommunicator.prototype.addCategories = function (categories, callback) {
      PluginAPI.request('article-categories-add', {
        categories: categories
      }, callback);
    };
    /**
        * Remove the given categories from the list of categories
        *
        * @param {Array} categories List of category IDs to remove
        * @param {Function} callback function(Boolean), called when the categories have been removed
        */


    ArticleCommunicator.prototype.removeCategories = function (categories, callback) {
      PluginAPI.request('article-categories-remove', {
        categories: categories
      }, callback);
    };
    /**
        * Set the main category of the current article
        *
        * @param {Number} category The ID of the category to set as the main category
        * @param {Function} callback function(Boolean), called when the main category has been set
        */


    ArticleCommunicator.prototype.setMainCategory = function (category, callback) {
      PluginAPI.request('article-categories-main-set', {
        category: category
      }, callback);
    };
    /**
        * Get the source set for the article
        *
        * @param {Function} callback function(String), name of the source
        */


    ArticleCommunicator.prototype.getSource = function (callback) {
      PluginAPI.request('article-source-get', null, callback);
    };
    /**
        * Set the source for the article
        *
        * @param {String} value The new value to be set as source
        * @param {Function} callback function(Boolean), called when the source has been set
        */


    ArticleCommunicator.prototype.setSource = function (value, callback) {
      PluginAPI.request('article-source-set', {
        source: value
      }, callback);
    };
    /**
        * Get the status for the article
        *
        * @param {Function} callback function(String), current status
        */


    ArticleCommunicator.prototype.getStatus = function (callback) {
      PluginAPI.request('article-status-get', null, callback);
    };
    /**
        * Set the status for the article
        *
        * @param {String} status The new status to be set (draft, waiting, published)
        * @param {Function} callback function(Boolean), called when the source has been set
        */


    ArticleCommunicator.prototype.setStatus = function (status, callback) {
      PluginAPI.request('article-status-set', {
        status: status
      }, callback);
    };
    /**
        * Get the published-date
        *
        * @param {Function} callback function(String), current published datetime
        */


    ArticleCommunicator.prototype.getPublishedDatetime = function (callback) {
      PluginAPI.request('article-published-get', null, callback);
    };
    /**
        * Set the published-date
        *
        * @param {String} published Date to be set (YYYY-MM-DD HH:MM:SS)
        * @param {Function} callback function(Boolean), called when done
        */


    ArticleCommunicator.prototype.setPublishedDatetime = function (published, callback) {
      PluginAPI.request('article-published-set', {
        published: published
      }, callback);
    };
    /**
        * Get the authors set in the article
        *
        * @param {Function} callback function([String]), currently set authors
        */


    ArticleCommunicator.prototype.getAuthors = function (callback) {
      PluginAPI.request('article-authors-get', null, callback);
    };
    /**
        * Set authors for the article
        *
        * @param {Array} authors List of authors that should be set
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.setAuthors = function (authors, callback) {
      PluginAPI.request('article-authors-set', {
        authors: authors
      }, callback);
    };
    /**
        * Add the given authors to the list of authors
        *
        * @param {Array} authors List of authors to add
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.addAuthors = function (authors, callback) {
      PluginAPI.request('article-authors-add', {
        authors: authors
      }, callback);
    };
    /**
        * Remove the given authors from the list of authors
        *
        * @param {Array} authors List of authors to remove
        * @param {Function} callback function([String]), author list as it is after the authors has been removed
        */


    ArticleCommunicator.prototype.removeAuthors = function (authors, callback) {
      PluginAPI.request('article-authors-remove', {
        authors: authors
      }, callback);
    };
    /**
        * Set the keyword-list on the article
        *
        * @deprecated Use tags instead
        * @param {Array} keywords List of keywords to add
        * @param {Function} callback Function to call when keywords have been set
        */


    ArticleCommunicator.prototype.setKeywords = function (keywords, callback) {
      PluginAPI.request('article-keywords-set', {
        keywords: keywords
      }, callback);
    };
    /**
        * Get the current set of keywords on the article
        *
        * @deprecated Use tags instead
        * @param {Function} callback Function to call with the result
        */


    ArticleCommunicator.prototype.getKeywords = function (callback) {
      PluginAPI.request('article-keywords-get', null, callback);
    };
    /**
        * Gets the main article content
        *
        * @param {Function} callback function(Object Content)
        */


    ArticleCommunicator.prototype.getCurrentContent = function (callback) {
      PluginAPI.request('article-content-get', null, callback);
    };
    /**
        * Updates main article content
        *
        * @param {String} content The new content for the article
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.setCurrentContent = function (content, callback) {
      PluginAPI.request('article-content-set', {
        content: content
      }, callback);
    };
    /**
        * Updates sub article content
        *
        * @param {Integer} articleId Sub article id
        * @param {String} content The new content for the sub article
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.setSubArticleContent = function (articleId, content, callback) {
      PluginAPI.request('sub-article-content-set', {
        articleId: articleId,
        content: content
      }, callback);
    };
    /**
        * Get the article type of the current article
        *
        * @param {Function} callback function(Int)
        */


    ArticleCommunicator.prototype.getArticletypeId = function (callback) {
      PluginAPI.request('article-type-get', null, callback);
    };
    /**
        * Set the article type of the current article
        *
        * @param {Number} articletypeId The new article type of the article
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.setArticletypeId = function (articletypeId, callback) {
      PluginAPI.request('article-type-set', {
        articletype: articletypeId
      }, callback);
    };
    /**
        * Maximize the plugin view
        *
        * @param {String} title Title to give the maximized view
        * @param {function} onClose Function to call when the window is closed/minimized
     * @param {Function} callback function(Boolean)
        */


    ArticleCommunicator.prototype.maximizePluginWindow = function (title, onClose, callback) {
      var event = 'editor-pane-close-' + new Date().getTime();
      PluginAPI.request('editor-pane-maximize', {
        title: title,
        event: event
      }, callback);
      PluginAPI.eventListeners.removeAll(event);
      PluginAPI.eventListeners.add(event, onClose);
    };
    /**
        * @deprecated use maximizePluginWindow instead
        *  @param {String} title Window title
        *  @param {function} onClose Callback to call after everything is done
     *  @param {Function} callback function(Boolean), called when it has been set
        *
        */


    ArticleCommunicator.prototype.maximizeAppWindow = function (title, onClose, callback) {
      this.maximizePluginWindow(title, onClose, callback);
    };
    /**
        * Restore the plugin pane to the default size
        *
        * @param {function} callback Callback to call after everything is done
        */


    ArticleCommunicator.prototype.restorePluginWindow = function (callback) {
      PluginAPI.request('restore-app-window', {}, callback);
    };
    /**
        * Restore the plugin pane to the default size
        *
        * @deprecated use restorPluginWindow instead
        * @param {function} callback Callback to call after everything is done
        */


    ArticleCommunicator.prototype.restoreAppWindow = function (callback) {
      this.restorePluginWindow(callback);
    };
    /**
        * Get the current byline
        *
        * @param {function} callback function(String), xml string with the current byline
        */


    ArticleCommunicator.prototype.getByline = function (callback) {
      PluginAPI.request('article-byline-get', null, callback);
    };
    /**
        * Set the byline
        *
        * @param {String} byline XML version of byline to use
        * @param {Boolean} save If true, force save after updating byline information
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.setByline = function (byline, save, callback) {
      PluginAPI.request('article-byline-set', {
        save: save,
        byline: byline
      }, callback);
    };
    /**
        * Set geolocation
        *
        * @param {Object} geolocations The location to set
        * @param {Function} callback function(Boolean), called when it has been set
        */


    ArticleCommunicator.prototype.setGeolocations = function (geolocations, callback) {
      PluginAPI.request('article-geolocations-set', {
        geolocations: geolocations
      }, callback);
    };
    /**
        * Get geolocation
        *
        * @param {Function} callback function(Object), retrieves the currently set geo location
        */


    ArticleCommunicator.prototype.getGeolocations = function (callback) {
      PluginAPI.request('article-geolocations-get', null, callback);
    };
    /**
        * Fetches a list of all properties available to an article.
        *
        * @param {Function} callback Callback called with an array of property objects.
        */


    ArticleCommunicator.prototype.getProperties = function (callback) {
      PluginAPI.request('article-properties-get', null, callback);
    };
    /**
        * Updates and saves one or more property values. The input is a simple object with property names and their
        * new value. The supplied callback is called with an updated list of properties.
        *
        * @example
        * PluginAPI.Article.setProperties({
        *     fooProperty: "bar",
        *     barProperty: "foo"
        * }, function(properties) {
        *     // Returns a complete and updated list of properties.
        * })
        *
        * @param {Object} properties An object of property names and corresponding values.
        * @param {Function} callback Callback called with an updated list of properties.
        */


    ArticleCommunicator.prototype.setProperties = function (properties, callback) {
      PluginAPI.request('article-properties-set', {
        properties: properties
      }, callback);
    };
    /**
        * Updates and saves a single property.
        *
        * @param {String} name The property to update.
        * @param {Object} value The updated value.
        * @param {Function} callback Callback called with an updated list of properties.
        */


    ArticleCommunicator.prototype.setProperty = function (name, value, callback) {
      var data = {};
      data[name] = value;
      PluginAPI.request('article-properties-set', {
        properties: data
      }, callback);
    };

    ArticleCommunicator.prototype.getTopic = function (callback) {
      PluginAPI.request('article-topic-get', null, callback);
    };

    ArticleCommunicator.prototype.setTopic = function (name, callback) {
      PluginAPI.request('article-topic-set', {
        topic: name
      }, callback);
    };
    /**
     * Get article package data, including content of sub articles
     *
     * @param {Function} callback function(Object)
     */


    ArticleCommunicator.prototype.getPackage = function (callback) {
      PluginAPI.request('package-get', null, callback);
    };
    /**
     * Get information on the multi channel setup of the loaded article
     *
     * @param {Function} callback function(Object)
     */


    ArticleCommunicator.prototype.channelInfo = function (callback) {
      PluginAPI.request('channel-info', null, callback);
    };
    /**
     * Save the article
     *
     * @param {Function} callback function(Boolean), called when the source has been set
     */


    ArticleCommunicator.prototype.save = function (callback) {
      PluginAPI.request('article-save', {
        status: status
      }, callback);
    };

    return new ArticleCommunicator();
  };
});

/***/ }),

/***/ "./js/Listeners.js":
/*!*************************!*\
  !*** ./js/Listeners.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(/*! ./PluginAPI */ "./js/PluginAPI.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module, PluginAPI) {
  "use strict";

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Listeners = function () {
    function Listeners() {
      _classCallCheck(this, Listeners);

      this._listeners = {};
    }
    /**
     * @deprecated Use PluginAPI.on(...) instead
     * @param {Object} listeners
     */


    _createClass(Listeners, [{
      key: "addAll",
      value: function addAll(listeners) {
        'use strict';

        var createCallback = function createCallback(callback) {
          return function (data) {
            callback(data.data);
          };
        };

        for (var eventName in listeners) {
          if (listeners.hasOwnProperty(eventName)) {
            var callback = listeners[eventName];
            var callWrapper = createCallback(callback);
            PluginAPI.on(eventName, callWrapper);
          }
        }
      }
    }, {
      key: "add",
      value: function add(event, callback) {
        if (typeof callback !== 'function') {
          throw new Error('not a function');
        }

        if (this._listeners[event] === undefined) {
          this._listeners[event] = [];
        }

        this._listeners[event].push(callback);

        return this._listeners[event].length - 1;
      }
    }, {
      key: "remove",
      value: function remove(event, index) {
        if (this._listeners[event] === undefined || this._listeners[event][index] === undefined) {
          return;
        }
        /*
         * Set to null instead of remove to retain callback indexes
         */


        this._listeners[event][index] = false;
      }
    }, {
      key: "removeAll",
      value: function removeAll(event) {
        if (!event) {
          this._listeners = [];
        } else {
          this._listeners[event] = [];
        }
      }
    }, {
      key: "notify",
      value: function notify(event, payload) {
        var returnValue = true;

        if (this._listeners[event] === undefined) {
          return returnValue;
        } // If the payload is an object with a key data, we use that value as the payload we pass to the listener functions.
        // This is needed as we have some inconsistencies in how we pass data around. This normalization should preferably
        // be done at the call site.


        this._listeners[event].forEach(function (listenerFn) {
          if (typeof listenerFn !== 'function') {
            return;
          }

          var res = null;

          if (payload && payload.params && payload.params === true) {
            res = listenerFn.apply(null, payload.data);
          } else if (_typeof(payload) === 'object' && payload !== null && typeof payload.data !== 'undefined') {
            res = listenerFn(payload.data);
          } else {
            res = listenerFn(payload);
          }

          if (res === false) {
            returnValue = false;
          }
        });

        return returnValue;
      }
    }]);

    return Listeners;
  }();

  module.exports = Listeners;
});

/***/ }),

/***/ "./js/PluginAPI.js":
/*!*************************!*\
  !*** ./js/PluginAPI.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(/*! ./AH5Communicator */ "./js/AH5Communicator.js"), __webpack_require__(/*! ./ArticleCommunicator */ "./js/ArticleCommunicator.js"), __webpack_require__(/*! ./Listeners */ "./js/Listeners.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module, ah5Communicator, articleCommunicator, Listeners) {
  "use strict";

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var PluginAPI = function () {
    /**
     *
     * Namespace for all public DrPublish methods available from plugins.
     *
     * @class
     * @classdesc The basic API object
     * @exports PluginAPI
     *
     */
    var Api = function Api() {
      var queryParameters = {};
      window.location.search.substr(1).split('&').forEach(function (queryPair) {
        queryParameters[queryPair.split('=')[0]] = queryPair.split('=')[1];
      });
      this.DEBUG = false;
      this.Version = '1.0';
      this.Editor = null;
      this.Article = null;
      this.errorListeners = new Listeners();
      this.eventListeners = new Listeners();
      this.appName = queryParameters.appName || '';
      this.jwt = queryParameters.jwt || '';
      this.standAlone = queryParameters.standAlone && queryParameters.standAlone === 'true' || false;
      this.selectedPluginElement = null;
      var self = this;
      pm.bind('event', function (data) {
        var createEventFunction = function createEventFunction(eventName) {
          return function (data) {
            PluginAPI.request(eventName, data);
          };
        };

        var updateObject = function updateObject(data) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (_typeof(data[key]) === 'object' && data[key] !== null && data[key].type === 'function') {
                data[key] = createEventFunction(data[key].eventKey);
              } else if (_typeof(data[key]) === 'object' && data[key] !== null && typeof data[key].map === 'function') {
                data[key] = data[key].map(updateObject);
              } else if (_typeof(data[key]) === 'object' && data[key] !== null) {
                data[key] = updateObject(data[key]);
              }
            }
          }

          return data;
        };

        data.data = updateObject(data.data);
        data = self.eventListeners.notify(data.type, data.data);

        if (typeof data === 'undefined') {
          return true;
        }

        if (data === false) {
          return {
            'abort': true
          };
        }

        return data;
      }, '*');
    };
    /**
     * Dispatches a request to DrPublish, and returns the reply to callback On error, notifies all error listeners based on the index .type of the thrown object
     *
     * @param {String} callSpec What do you want to call?
     * @param {Object} data The data attached to the request
     * @param {Function} callback The function to call upon return
     */


    Api.prototype.request = function (callSpec, data, callback) {
      var self = this;

      if (this.DEBUG) {
        console.info(this.getPluginName() + ': Requesting ' + callSpec + ' from parent with data', data);
      }

      if (!data) {
        data = {};
      }

      if (typeof callback === 'undefined') {
        callback = null;
      }

      if (typeof data.length === 'number') {
        data = {
          data: data
        };
      }

      data['src_app'] = this.getPluginName();

      var createEventFunction = function createEventFunction(func, eventKey) {
        return function () {
          self.eventListeners.remove(eventKey, eventKey);
          return func.apply(null, arguments);
        };
      };

      var createCallbackObject = function createCallbackObject(key, callback) {
        var random = Math.floor(Math.random() * 1000);
        var eventKey = key + random + 'functioncallback' + new Date().getTime();
        var eventFunction = createEventFunction(callback, eventKey);
        self.eventListeners.add(eventKey, eventFunction);
        return {
          type: 'function',
          eventKey: eventKey
        };
      };

      var updateObject = function updateObject(data) {
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            var val = data[key];

            if (typeof val === 'function') {
              data[key] = createCallbackObject(key, val);
            } else if (_typeof(val) === 'object' && val !== null && typeof val.map === 'function') {
              data[key] = val.map(updateObject);
            } else if (_typeof(val) === 'object' && val !== null) {
              data[key] = updateObject(val);
            }
          }
        }

        return data;
      };

      data = updateObject(data);
      pm({
        target: parent,
        type: callSpec,
        data: data,
        success: callback,
        error: function error(data) {
          self.errorListeners.notify(data.type, data);
        },
        origin: '*',
        // TODO: Find a way of avoiding all-origins
        hash: false
      });
    };
    /**
     * Creates a new tag
     *
     * @param {String} tag The tag to create
     * @param {Function} callback function(Boolean)
     */


    Api.prototype.openTagCreationDialog = function (tag, callback) {
      this.request('create-tag', {
        tag: tag
      }, callback);
    };
    /**
     * Reloads the plugins's iframe
     */


    Api.prototype.reloadIframe = function () {
      this.request('app-reload', {
        app: this.getPluginName()
      });
    };
    /**
     * Get the name of the loaded plugin
     *
     * @return {String} The name of the plugin, or false if it couldn't be detected
     */


    Api.prototype.getPluginName = function () {
      return this.appName;
    };
    /**
     * Get the name of the loaded plugin
     * @deprecated: use getPluginName instead
     * @return {String} The name of the plugin, or false if it couldn't be detected
     */


    Api.prototype.getAppName = function () {
      return this.getPluginName();
    };
    /**
     * Set the name of the plugin
     *
     * @param {String} name The name of the plugin
     */


    Api.prototype.setPluginName = function (name) {
      this.appName = name;
    };
    /**
     * Set the name of the plugin
     * @deprecated: use setPluginName instead
     *
     * @param {String} name The name of the plugin
     */


    Api.prototype.setAppName = function (name) {
      this.setPluginName(name);
    };
    /**
     * Show info-message to the user
     *
     * @param {String} msg Message to be displayed
     */


    Api.prototype.showInfoMsg = function (msg) {
      this.request('show-message-info', {
        message: msg
      });
    };
    /**
     * Show warning-message to the user
     *
     * @param {String} msg Message to be displayed
     */


    Api.prototype.showWarningMsg = function (msg) {
      this.request('show-message-warning', {
        message: msg
      });
    };
    /**
     * Show error-message to the user
     *
     * @param {String} msg Message to be displayed
     */


    Api.prototype.showErrorMsg = function (msg) {
      this.request('show-message-error', {
        message: msg
      });
    };
    /**
     * Show the loader
     *
     * @param {String} msg Message to display in progress loader
     */


    Api.prototype.showLoader = function (msg) {
      this.request('show-loader', {
        message: msg
      });
    };
    /**
     * Hide the loader
     */


    Api.prototype.hideLoader = function () {
      this.request('hide-loader');
    };
    /**
     * Loads an old revision of an article
     *
     * @param {Number} id The id of the revision to load
     * @param {Function} callback The function to call when the new revision has been loaded
     * @private
     */


    Api.prototype.__loadArticleRevision = function (id, callback) {
      this.request('load-revision', {
        revision: id
      }, callback);
    };
    /**
     * Creates a new tag
     *
     * @param {String} tag JSON object with the tag to create, must contain tagTypeId and name properties
     * @param {Function} callback function(Boolean)
     */


    Api.prototype.createTag = function (tag, callback) {
      this.request('tag-create', {
        tag: tag
      }, callback);
    };
    /**
     * Sends a query to DrLib
     *
     * @example
     * PluginAPI.searchDrLib({
     *      query: 'articles.json?q=awesome',
     *      secure: true,
     *      success: function(data) {
     *          data.items.forEach(doStuffWithArticle);
     *      },
     *      error: function(data) {
     *          console.warn('something went wrong');
     *      }
     * })
     *
     * @param {Object} data Object with three properties; 'query' which is the query to send to DrLib, 'success' which is the callback to execute on success, and 'secure' a boolean to add the internal API key to the query and thus allow searching on unpublished article. This callback's parameter is an object which is the query result as an object. See the json output of DrLib to learn more about this object
     * @param {Function} callback function(Boolean)
     *
     */


    Api.prototype.searchDrLib = function (data, callback) {
      this.request('drlib-search', {
        query: data.query,
        access: data.access,
        secure: data.secure,
        success: data.success,
        error: data.error
      }, callback);
    };
    /**
     * Generates proper html code to represent the dom element. This is NOT an asynchronous function
     *
     * @param {Object} dom The dom node to convert
     * @return {String} The html code
     */
    // TODO: This function should also be able to take a DOMElement or similar.


    Api.prototype.convertDomToHTML = function (dom) {
      if (_typeof(dom) === 'object' && typeof dom.wrap === 'function') {
        return dom.wrap('<div>').parent().html();
      } else {
        var domClone = dom.cloneNode(true);
        var wrapper = document.createElement('div');
        wrapper.appendChild(domClone);
        return wrapper.innerHTML;
      }
    };
    /**
     * Generates an url to a published article
     *
     * @param {String} id The id of the article to generate url for
     * @param {Function} callback function(String), where the parameter is the generated url
     */


    Api.prototype.generateArticleUrl = function (id, callback) {
      this.request('generate-article-url', {
        id: id
      }, callback);
    };
    /**
     * Extends the PluginAPI with custom functionality that other plugins can use
     *
     * @param {String} group Group name for functionality to add
     * @param {String} name Name of the specific function to add
     * @param {Function} action function(Object) Function to call when the API is invoked, recieves one parameter as given in PluginAPI.callExtendedApi and return value is passed back to the caller
     */


    Api.prototype.extendApi = function (group, name, _action) {
      var self = this;
      this.request('extend-api', {
        group: group,
        name: name,
        action: function action(data) {
          var a = _action(data.data);

          self.request(data.eventKey, {
            'data': a
          });
        }
      });
    };
    /**
     * Call the extended PluginAPI
     *
     * @param {String} group Group name for functionality to call
     * @param {String} name Name of the specific function to call
     * @param {Object} data Data object to pass as parameter to the api call
     * @param {Function} callback function(Object) Function to recieve the API response, parameter is the response from the API call
     */


    Api.prototype.callExtendedApi = function (group, name, data, callback) {
      this.request('call-extended-api', {
        group: group,
        name: name,
        data: data,
        callback: callback
      });
    };
    /**
     * Gets logged in user
     *
     * @param {Function} callback function(Object)
     */


    Api.prototype.getCurrentUser = function (callback) {
      this.request('get-current-user', null, callback);
    };
    /**
     * Get configuration information about the plugin
     *
     * @param {Function} callback function(Object)
     */


    Api.prototype.getConfiguration = function (callback) {
      this.request('get-configuration', null, callback);
    };
    /**
     * Get DrPublish configuration
     *
     * @param {Function} callback function(Object)
     */


    Api.prototype.getDrPublishConfiguration = function (callback) {
      this.request('get-drpublish-configuration', null, callback);
    };
    /**
     * Set configuration information about the plugin
     *
     * @param {Object} config The configuration object to save
     * @param {Object} options Object, can have three keys.
     *      'onlyPublication' (boolean) If true the configuration is set for the current publication only
     *      'success' (function) Called if the configuration was saved successfully
     *      'error' (function) Called if there was an error, recieves and error object as first parameter
     * @param {Function} callback function()
     */


    Api.prototype.setConfiguration = function (config, options, callback) {
      // support old function signature
      if (typeof options === 'boolean') {
        options = {
          onlyPublication: options
        };
      } else if (_typeof(options) !== 'object' || options === null) {
        options = {};
      }

      var data = {
        config: config,
        onlyPublication: typeof options.onlyPublication === 'boolean' ? options.onlyPublication : false,
        success: typeof options.success === 'function' ? options.success : null,
        error: typeof options.error === 'function' ? options.error : null
      };
      this.request('set-configuration', data, callback);
    };
    /**
     * Emits an event to DrPublish, and possibly other apps
     *
     * @param {String} name Name of the event
     * @param {String} data Data object to send with the event
     */


    Api.prototype.emit = function (name, data) {
      this.request('emit-api-event', {
        name: name,
        data: data
      });
    };
    /**
     * Listen for an event. If the callback returns false the event may cancel continued actions, e.g beforeSave can cancel article save. Look at documentation for Listeners to learn more.
     *
     * @param {String} name Name of the event
     * @param {Function} callback function(Object) Function to call when the event is triggered. Recieves one data object parameter of the form {source: <source plugin name or DrPublish>, data: <data object>}
     */


    Api.prototype.on = function (name, callback) {
      var self = this;
      self.eventListeners.add(name, callback);
      this.request('on-api-event', {
        name: name
      });
    };
    /**
     * Increase the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Function} callback function(Object) function to call once the counter has been increased, returns the new counter value
     */


    Api.prototype.increaseRequiredActionCounter = function (callback) {
      this.request('increase-required-action-counter', {}, callback);
    };
    /**
     * Decrease the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Function} callback function(Object) function to call once the counter has been decrease, returns current counter value
     */


    Api.prototype.decreaseRequiredActionCounter = function (callback) {
      this.request('decrease-required-action-counter', {}, callback);
    };
    /**
     * Clear the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Function} callback function(Object) function to call once the counter has been cleared
     */


    Api.prototype.clearRequiredActionCounter = function (callback) {
      this.request('clear-required-action-counter', {}, callback);
    };
    /**
     * Set the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Number} count The value to set the counter to
     * @param {Function} callback function(Object) function to call once the counter has been cleared
     */


    Api.prototype.setRequiredActionCounter = function (count, callback) {
      this.request('set-required-action-counter', {
        count: count
      }, callback);
    };
    /**
     * Create a new instance of the Api class
     *
     * @private
     * @return {Object}
     */


    Api.prototype.create = function () {
      return new Api();
    };
    /**
     * Create an embedded object of the given type
     *
     * @param {Number} typeId Type Id of the embedded object to create
     * @param {Function} callback function(embeddedObjectId) called once the object has been created, first parameter is the new embedded object id
     */


    Api.prototype.createEmbeddedObject = function (typeId, callback) {
      this.request('create-embedded-object', {
        typeId: typeId,
        callback: callback
      });
    };
    /**
     * Get information about the available embedded object types
     *
     * @param {Function} callback function([Object]) recieves an array with objects describing the available embedded object types in the form of `{typeId: 'embedded object type id', cssClass: 'css class used to style the objects'}`
     */


    Api.prototype.getEmbeddedObjectTypes = function (callback) {
      this.request('get-embedded-object-types', null, callback);
    };
    /**
     * Gives focus to another plugin
     *
     * @param {String} pluginName The name of the plugin to recieve focus
     * @param {Object} argument Optional option argument to pass along to the plugin recieving focus
     * @param {Boolean} start Flag to decide if the plugin should be started if it has not been loaded previously, default true
     * @return {Boolean}
     */


    Api.prototype.giveFocus = function (pluginName, argument, start) {
      if (typeof pluginName !== 'string') {
        return false;
      }

      if (typeof start !== 'boolean') {
        start = true;
      }

      this.request('give-focus', {
        pluginName: pluginName,
        start: start,
        argument: argument
      });
      return true;
    };
    /**
     * Hide the plugin, so it is no longer visible on the list of open plugins
     * @return {Boolean}
     */


    Api.prototype.hide = function () {
      this.request('hide');
      return true;
    };
    /**
     * <p>Creates a jQuery UI modal in the main editor window, detached from the plugin itself. Modals are unique on a
     * per-plugin basis, meaning that a plugin can only have a single modal at a time. Creating a new modal will
     * overwrite the previous.</p>
     *
     * <a href="http://api.jqueryui.com/dialog">See the official documentation for a list of available options.</a></p>
     *
     * <p>Note that you do not have direct access to the DOM of the modal. Use the provided helper methods to
     * manipulate or read from the modal:
     *   <ul>
     *     <li><a href="#closeModal">closeModal</a></li>
     *     <li><a href="#updateModal">updateModal</a></li>
     *     <li><a href="#getModalInputs">getModalInputs</a></li>
     *   </ul>
     * </p>
     *
     * @example
     *
     * PluginAPI.createModal('<h1>This is a modal</h1>', {
     *   buttons: {
     *     Ok: function () {
     *       alert('Ok!');
     *     }
     *   }
     * });
     *
     * PluginAPI.updateModal('<h1>This is the same modal</h1>');
     *
     * PluginAPI.createModal('<h1>This is a brand new modal</h1>', {
     *   buttons: {
     *     cancel: function() {
     *       PluginAPI.closeModal(true);
     *     }
     *   }
     * });
     *
     * @param {String} content An HTML string
     * @param {Object} options A standard jQuery UI options object.
     * @return {Boolean}
     */


    Api.prototype.createModal = function (content, options) {
      this.request('create-custom-modal', {
        content: content,
        options: options
      });
      return true;
    };
    /**
     * Updates the HTML content of a live modal. Has no effect if the modal does not exist.
     *
     * @param {String} content An HTML string
     * @return {Boolean}
     */


    Api.prototype.updateModal = function (content) {
      this.request('update-custom-modal', {
        content: content
      });
      return true;
    };
    /**
     * Closes and optionally deletes the modal. Has no effect if the modal does not exists.
     *
     * @param {Boolean} destroy Whether or not to delete the modal
     * @return {Boolean}
     */


    Api.prototype.closeModal = function (destroy) {
      this.request('close-custom-modal', {
        destroy: destroy
      });
      return true;
    };
    /**
     * Returns the values of all input or select elements within a modal.
     *
     * The values are keyed by one of the following properties in order of priority: element ID, element name
     * or input type + index.
     *
     * @example
     * Given a modal with the following HTML content:
     *
     *  <form>
     *      <input type="number">
     *      <input name="name" type="text">
     *      <select id="languages">
     *          <option selected>en</option>
     *          <option>no</option>
     *      </select>
     *  </form>
     *
     *  getModalInputs would return:
     *
     *  {
     *      "number-0": {VALUE}
     *      "name": {VALUE},
     *      "languages": "en"
     *  }
     *
     * @param {Function} callback
     */


    Api.prototype.getModalInputs = function (callback) {
      this.request('get-custom-modal-inputs', null, callback);
    };

    Api.prototype.confirmAuthenticated = function () {
      this.request('confirm-authenticated', {
        pluginName: this.appName
      });
    };

    Api.prototype.isStandAlone = function () {
      return this.standAlone;
    };
    /**
        * Get the JWT as defined on DrPublish publication config. This token can be used to authenticate the request
        * @return {*|string}
        */


    Api.prototype.getJWT = function () {
      return this.jwt;
    };

    Api.prototype.replaceEditorComponentsExtension = function (data) {
      this.request('replace-editor-components-extension', data);
    };

    Api.prototype.clearEditorComponentsExtension = function (data) {
      this.request('clear-editor-components-extension', data);
    };

    Api.prototype.highlightAnnotation = function (data) {
      this.request('highlight-annotation', data);
    };

    Api.prototype.underemphasizeAnnotations = function (data) {
      this.request('underemphasize-annotations', data);
    };

    Api.prototype.registerExternallyDefinedProperties = function (data) {
      this.request('register-externally-defined-properties', data);
    };

    return new Api();
  }();

  PluginAPI.Article = articleCommunicator(PluginAPI);
  PluginAPI.Editor = ah5Communicator(PluginAPI);
  module.exports = PluginAPI;
});

/***/ })

/******/ });
});
//# sourceMappingURL=bundle.js.map