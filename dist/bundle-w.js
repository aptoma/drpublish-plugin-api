/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	/* jshint maxstatements:50 */
	/* global pm */
	
	const ah5Communicator = __webpack_require__(2);
	const articleCommunicator = __webpack_require__(3);
	const Listeners = __webpack_require__(4);
	
	const PluginAPI = (function () {
	
		/**
		 *
		 * Namespace for all public DrPublish methods available from apps.
		 *
		 * @class
		 * @classdesc The basic API object
		 * @exports PluginAPI
		 *
		 */
		const Api = function () {
			this.DEBUG = false;
	
			this.Version = '1.0';
			this.Editor = null;
			this.Article = null;
			this.errorListeners = new Listeners();
			this.eventListeners = new Listeners();
			this.appName = '';
			this.selectedPluginElement = null;
	
			const self = this;
	
			pm.bind('event', (data) => {
				const createEventFunction = function (eventName) {
					return function (data) {
						PluginAPI.request(eventName, data);
					};
				};
				const updateObject = function (data) {
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							if (typeof data[key] === 'object' && data[key] !== null && data[key].type === 'function') {
								data[key] = createEventFunction(data[key].eventKey);
							} else if (typeof data[key] === 'object' && data[key] !== null && typeof data[key].map === 'function') {
								data[key] = data[key].map(updateObject);
							} else if (typeof data[key] === 'object' && data[key] !== null) {
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
					return {'abort': true};
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
			const self = this;
			if (this.DEBUG) {
				console.info(this.getAppName() + ': Requesting ' + callSpec + ' from parent with data', data);
			}
	
			if (!data) {
				data = {};
			}
	
			if (typeof callback === 'undefined') {
				callback = null;
			}
	
			if (typeof data.length === 'number') {
				data = {data: data};
			}
	
			data['src_app'] = this.getAppName();
	
			const createEventFunction = function (func, eventKey) {
				return function () {
					self.eventListeners.remove(eventKey, eventKey);
					return func.apply(null, arguments);
				};
			};
	
	
			const createCallbackObject = function (key, callback) {
				const random = Math.floor(Math.random() * 1000);
				const eventKey = key + random + 'functioncallback' + (new Date()).getTime();
				const eventFunction = createEventFunction(callback, eventKey);
				self.eventListeners.add(eventKey, eventFunction);
				return {
					type: 'function',
					eventKey: eventKey
				};
			};
	
			const updateObject = function (data) {
				for (const key in data) {
					if (data.hasOwnProperty(key)) {
						const val = data[key];
						if (typeof val === 'function') {
							data[key] = createCallbackObject(key, val);
						} else if (typeof val === 'object' && val !== null && typeof val.map === 'function') {
							data[key] = val.map(updateObject);
						} else if (typeof val === 'object' && val !== null) {
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
				error: (data) => {
					self.errorListeners.notify(data.type, data);
				},
				origin: '*', // TODO: Find a way of avoiding all-origins
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
		 * Reloads the app's iframe
		 */
		Api.prototype.reloadIframe = function () {
	
			this.request('app-reload', {
				app: this.getAppName()
			});
		};
	
		/**
		 * Get the name of the loaded app
		 *
		 * @return {String} The name of the app, or false if it couldn't be detected
		 */
		Api.prototype.getAppName = function () {
			return this.appName;
		};
	
		/**
		 * Set the name of the app
		 *
		 * @param {String} name The name of the app
		 */
		Api.prototype.setAppName = function (name) {
			this.appName = name;
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
		 * @deprecated Use PluginAPI.on(...) instead
		 * @param {Object} listeners
		 */
		Api.prototype.addListeners = function (listeners) {
			const createCallback = function (callback) {
				return function (data) {
					callback(data.data);
				};
			};
			for (const eventName in listeners) {
				if (listeners.hasOwnProperty(eventName)) {
					const callback = listeners[eventName];
					const callWrapper = createCallback(callback);
					this.on(eventName, callWrapper);
				}
			}
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
			if (typeof dom === 'object' && typeof dom.wrap === 'function') {
				return dom.wrap('<div>').parent().html();
			}
			return '';
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
		 * Extends the PluginAPI with custom functionality that other apps can use
		 *
		 * @param {String} group Group name for functionality to add
		 * @param {String} name Name of the specific function to add
		 * @param {Function} action function(Object) Function to call when the API is invoked, recieves one parameter as given in PluginAPI.callExtendedApi and return value is passed back to the caller
		 */
		Api.prototype.extendApi = function (group, name, action) {
			const self = this;
			this.request('extend-api', {
				group: group,
				name: name,
				action: (data) => {
					const a = action(data.data);
					self.request(data.eventKey, {'data': a});
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
		 * Get configuration information about the app
		 *
		 * @param {Function} callback function(Object)
		 */
		Api.prototype.getConfiguration = function (callback) {
			this.request('get-configuration', null, callback);
		};
	
		/**
		 * Get DrPublish configuratin
		 *
		 * @param {Function} callback function(Object)
		 */
		Api.prototype.getDrPublishConfiguration = function (callback) {
			this.request('get-drpublish-configuration', null, callback);
		};
	
		/**
		 * Set configuration information about the app
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
			} else if (typeof options !== 'object' || options === null) {
				options = {};
			}
			const data = {
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
		 * @param {Function} callback function(Object) Function to call when the event is triggered. Recieves one data object parameter of the form {source: <source app name or DrPublish>, data: <data object>}
		 */
		Api.prototype.on = function (name, callback) {
			const self = this;
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
			this.request('set-required-action-counter', {count: count}, callback);
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
			this.request('create-embedded-object', {typeId: typeId, callback: callback});
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
			if (typeof pluginName !== 'string' || pluginName === '') {
				return false;
			}
			if (typeof start !== 'boolean') {
				start = true;
			}
			this.request('give-focus', {pluginName: pluginName, start: start, argument: argument});
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
			this.request('create-custom-modal', {content: content, options: options});
			return true;
		};
	
		/**
		 * Updates the HTML content of a live modal. Has no effect if the modal does not exist.
		 *
		 * @param {String} content An HTML string
		 * @return {Boolean}
		 */
		Api.prototype.updateModal = function (content) {
			this.request('update-custom-modal', {content: content});
			return true;
		};
	
		/**
		 * Closes and optionally deletes the modal. Has no effect if the modal does not exists.
		 *
		 * @param {Boolean} destroy Whether or not to delete the modal
		 * @return {Boolean}
		 */
		Api.prototype.closeModal = function (destroy) {
			this.request('close-custom-modal', {destroy: destroy});
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
	
		return new Api();
	})();
	
	PluginAPI.Article = articleCommunicator(PluginAPI);
	PluginAPI.Editor = ah5Communicator(PluginAPI);
	
	module.exports = PluginAPI;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
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
		let selectedPluginElement = null;
	
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
		const AH5Communicator = function () {
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
		 * @param {function} callback function(String)
		 */
		AH5Communicator.prototype.getActiveEditor = function (callback) {
			PluginAPI.request('get-active-editor', null, callback);
		};
	
		/**
		 * Registers/Modifies a context menu items for a app element
		 * The object send should have the following structure
		 *
		 * @param {Object} action The action object
		 * @param {function} callback function()
		 *
		 * @example
		 * PluginAPI.Editor.registerMenuAction({
		 *	  label: 'label in the menu',
		 *	  icon: '[Optional] url to possible icon image',
		 *	  trigger: '[Optional] css selector, only show menu element when this matches the element',
		 *	  callback: function(id, clickedElementId) {
		 *		  // callback function
		 *		  // first parameter is id of the app element
		 *		  // second paramter is id of closest element to the trigger element that has an id
		 *		  //	  in code: $(event.triggerElement).closest('[id]').attr('id');
		 *	  }
		 * })
		 */
		AH5Communicator.prototype.registerMenuAction = function (action, callback) {
			PluginAPI.request('register-menu-action', action, callback);
		};
	
	
		AH5Communicator.prototype.registerHoverAction = function (action, callback) {
			PluginAPI.request('register-hover-action', action, callback);
		};
	
		/**
		 * Swap positions between the provided element and the adjacent one
		 * in the specified direction
		 * PluginAPI.Editor.directionalCastle({
		 *  elementId: 'the provided element id',
		 *  direction: 'forward/backward'
		 * })
		 *  @param {String} movement Direction
		 * @param {Function} callback
		 * */
		AH5Communicator.prototype.directionalCastle = function (movement, callback) {
			PluginAPI.request('editor-directional-castle', movement, callback);
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
		 * Delete an element in the article
		 *
		 * @param {String} id Id of the element
		 * @param {function} callback function(Boolean), called after deletion is done
		 */
		AH5Communicator.prototype.deleteElementById = function (id, callback) {
			PluginAPI.request('editor-element-replace-byid', {
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
		 * The element will be given the class dp-app-element, and given a unique ID (if none is present)
		 *
		 * @param {Element} element The element that should be inserted
		 * @param {Object/Function} options (can be omitted) Options object, supports option 'select' - set to true to automatically select the inserted element
		 * @param {Function} [callback] function(String), id of the newly inserted element
		 */
		AH5Communicator.prototype.insertElement = function (element, options, callback) {
			let select = false;
			if (typeof options === 'object') {
				options = options || {};
				select = typeof options.select === 'boolean' ? options.select : false;
			} else if (typeof callback === 'undefined' && typeof options === 'function') {
				callback = options;
			}
			PluginAPI.request('editor-insert-element', {
				element: element.outerHTML,
				select: select
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
	
		AH5Communicator.prototype.updateAssetOption = function (dpArticleId, key, value, callback) {
			PluginAPI.request('update-asset-option', {dpArticleId: dpArticleId, key: key, value: value}, callback);
		};
	
		AH5Communicator.prototype.updateAssetData = function (data, callback) {
			PluginAPI.request('update-asset-media', data, callback);
		};
	
		AH5Communicator.prototype.getAssetData = function (dpArticleId, callback) {
			PluginAPI.request('get-asset-data', {data: dpArticleId}, callback);
		};
	
		AH5Communicator.prototype.insertNestedAsset = function (parentElementId, markup, data, callback) {
			const self = this;
			PluginAPI.createEmbeddedObject(
				data.embeddedTypeId,
				(dpArticleId) => {
					insert(dpArticleId, parentElementId, (data) => {
						return updateEmbeddedAssetRequest(callback);
					});
				}
			);
	
			function insert(dpArticleId, parentElementId, callback) {
				data.internalId = dpArticleId;
				const elementId = 'asset-' + dpArticleId;
				const $element = $('<div />');
				$element.attr('id', elementId);
				$element.attr('data-internalId', dpArticleId);
				$element.attr('data-ah5-type', data.assetSource);
				if (data.externalId) {
					$element.attr('data-externalId', data.externalId);
				}
				if (data.assetClass) {
					$element.addClass(data.assetClass);
				}
				$element.addClass('dp-plugin-element');
				$element.html(markup);
				PluginAPI.Editor.getHTMLById(parentElementId, (html) => {
					let d = document.createElement('div');
					d.innerHTML = html;
					d.firstChild.setAttribute('id', parentElementId + 'tmp');
					self.replacePluginElementById(parentElementId, d.innerHTML, () => {
						d = document.createElement('div');
						d.innerHTML = html;
						const assetContainer = d.querySelector('.dp-fact-box-image, .dp-nested-asset-container');
						if (data.isMultiple) {
							$(assetContainer).append($element.get(0).outerHTML);
						} else {
							assetContainer.innerHTML = $element.get(0).outerHTML;
						}
						self.replacePluginElementById(parentElementId + 'tmp', d.innerHTML, callback);
					});
				});
			}
	
			function updateEmbeddedAssetRequest(callback) {
				PluginAPI.request('update-embedded-asset', data, callback);
			}
		};
	
		AH5Communicator.prototype.insertEmbeddedAsset = function (markup, data, callback) {
			const self = this;
			let replaceElement = false;
			if (selectedPluginElement) {
				if (data.assetSource !== PluginAPI.getAppName()) {
					PluginAPI.showErrorMsg('Can\'t update selected plugin element since it doesn\'t belong to the \'' + PluginAPI.getAppName() + '\' plugin');
					return;
				} else {
					replaceElement = true;
				}
			}
	
			if (selectedPluginElement) {
				const dpArticleId = selectedPluginElement.dpArticleId;
				if (!dpArticleId) {
					throw Error('Selected plugin element: expected dpArticleId not found (tried reading from attribute \'data-internal-id\')');
				}
				insert(dpArticleId, (data) => {
					return updateEmbeddedAssetRequest(typeof callback === 'function' ? callback(data) : null);
				});
			} else {
				PluginAPI.createEmbeddedObject(
					data.embeddedTypeId,
					(dpArticleId) => {
						insert(dpArticleId, (data) => {
							return addEmbeddedAssetRequest(typeof callback === 'function' ? callback(data) : null);
						});
					}
				);
			}
	
			function insert(dpArticleId, callback) {
				data.internalId = dpArticleId;
				const elementId = 'asset-' + dpArticleId;
				const element = document.createElement('div');
				element.id = elementId;
				element.dataset.internalId = dpArticleId;
				if (data.externalId) {
					element.dataset.externalId = data.externalId;
				}
				if (data.assetClass) {
					element.classList.add(data.assetClass);
				}
				element.innerHTML = markup;
				if (!replaceElement) {
					self.insertElement(element, {select: true});
				} else {
					self.replaceElementById(elementId, element.outerHTML, null);
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
	
		AH5Communicator.prototype.getSelectedPluginElement = function (callback) {
			PluginAPI.request('get-selected-plugin-element', {}, callback);
		};
	
		return new AH5Communicator();
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	/* jshint maxstatements:52 */
	module.exports = function (PluginAPI) {
	
		/**
		 * This class is used for communicating with the article, typically setting and getting values of metadata or in the article content itself.
		 *
		 * @class
		 * @classdesc Functions for talking with the DrPublish article object. Accessed through PluginAPI.Article
		 * @exports PluginAPI/Article
		 */
		const ArticleCommunicator = function () {
			this.DEBUG = false;
		};
	
		/**
		 * Give focus to yourself
		 *
		 * @param {Function} callback function(Boolean), called as the app gets focus
		 */
		ArticleCommunicator.prototype.focusApp = function (callback) {
			PluginAPI.request('app-focus', {}, callback);
		};
		/**
		 * Start the given app
		 *
		 * @param {String} name Name of the app from settings.php
		 * @param {Object} options Options for initializing the app
		 * @param {Function} callback function(Boolean), called after app is started
		 */
		ArticleCommunicator.prototype.startApp = function (name, options, callback) {
			PluginAPI.request('app-start', {
				app: name,
				option: options
			}, callback);
		};
	
		/**
		 * Stop the given app
		 *
		 * @param {String} name Name of the app from settings.php
		 */
		ArticleCommunicator.prototype.stopApp = function (name) {
			PluginAPI.request('app-stop', {
				app: name
			});
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
		 * @param {Function} callback Function to call with the result
		 */
		ArticleCommunicator.prototype.getKeywords = function (callback) {
			PluginAPI.request('article-keywords-get', null, callback);
		};
	
		/**
		 * Gets the current article content
		 *
		 * @param {Function} callback function(Object Content)
		 */
		ArticleCommunicator.prototype.getCurrentContent = function (callback) {
			PluginAPI.request('article-content-get', null, callback);
		};
	
		/**
		 * Updates current article content
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
		 * Maximize the app view
		 *
		 * @param {String} title Title to give the maximized view
		 * @param {function} onClose Function to call when the window is closed/minimized
		 */
		ArticleCommunicator.prototype.maximizeAppWindow = function (title, onClose) {
			const event = 'editor-pane-close-' + new Date().getTime();
	
			PluginAPI.request('editor-pane-maximize', {
				title: title,
				event: event
			});
			PluginAPI.eventListeners.removeAll(event);
			PluginAPI.eventListeners.add(event, onClose);
		};
	
		/**
		 * Restore the app pane to the default size
		 *
		 * @param {function} callback Callback to call after everything is done
		 */
		ArticleCommunicator.prototype.restoreAppWindow = function (callback) {
			PluginAPI.request('restore-app-window', {}, callback);
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
			const data = {};
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
	
		return new ArticleCommunicator();
	
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = Listeners;
	
	/**
	 * @example
	 * PluginAPI.on('afterCreate', function() {
	 *     PluginAPI.Article.setSource('Ny Times');
	 * });
	 * PluginAPI.on('beforeSave', function() {
	 *     if (!articleIsAwesome()) {
	 *          return false;
	 *     }
	 * });
	 *
	 * @description
	 *
	 * <p>DrPublish provides a large set of default events that an app can listen for. All events that start their name with &#39;before&#39; can be stopped by an app. This is done by returning &#39;false&#39; from the callback function, as in the &#39;beforSave&#39; example given bellow. </p>
	 * <p>Other apps can also supply their own events using the PluginAPI.emit(...) function. Documention on these events are up to each app to create.</p>
	 * <h3 id="available-events">Available Events</h3>
	 * <p><code>addCategory</code></p>
	 * <blockquote>
	 * <p><em>triggered after a category has been added to the article</em></p>
	 * </blockquote>
	 * <p><code>addTag</code></p>
	 * <blockquote>
	 * <p><em>triggered after a tag had been added to the article</em></p>
	 * </blockquote>
	 * <p><code>appPaneMaximized</code></p>
	 * <blockquote>
	 * <p><em>triggered when the app pane is maximized</em></p>
	 * </blockquote>
	 * <p><code>appPaneRestored</code></p>
	 * <blockquote>
	 * <p><em>triggered when the app pane is restored to its&#39; original size</em></p>
	 * </blockquote>
	 * <p><code>appAuthenticated</code></p>
	 * <blockquote>
	 * <p><em>triggered when an app has been authenticated</em></p>
	 * </blockquote>
	 * <p><code>changedCustomMeta</code></p>
	 * <blockquote>
	 * <p><em>triggered when a custom meta property is changed/set, parameter is an object with property name and value</em></p>
	 * </blockquote>
	 * <p><code>receivedFocus</code></p>
	 * <blockquote>
	 * <p><em>triggered when a plugin receives focus. Receives a parameter object that has two predefined values: <code>previousPluginName</code> - name of previous plugin, <code>givenFocus</code> - true when focus was sent from another plugin. The parameter object can also contain other keys supplied by the plugin losing focus.</em></p>
	 * </blockquote>
	 * <p><code>afterCreate</code></p>
	 * <blockquote>
	 *     <p><em>triggered after a new article has been created</p></em>
	 * </blockquote>
	 * <p><code>beforeDelete</code></p>
	 * <blockquote>
	 *     <p><em>triggered before an article is deleted</p></em>
	 * </blockquote>
	 * <p><code>afterDelete</code></p>
	 * <blockquote>
	 *     <p><em>triggered after an article has been deleted</p></em>
	 * </blockquote>
	 * <p><code>afterLoad</code></p>
	 * <blockquote>
	 *     <p><em>triggered after an article has been loaded</p></em>
	 * </blockquote>
	 * <p><code>afterPublish</code></p>
	 * <blockquote>
	 *     <p><em>triggered after an article has been published</p></em>
	 * </blockquote>
	 * <p><code>afterSave</code></p>
	 * <blockquote>
	 *     <p><em>triggered after an article has been saved</p></em>
	 * </blockquote>
	 * <p><code>beforeCreate</code></p>
	 * <blockquote>
	 *     <p><em>triggered before a new article is created</p></em>
	 * </blockquote>
	 * <p><code>beforeLoad</code></p>
	 * <blockquote>
	 *     <p><em>triggered before an article is loaded into the editor</p></em>
	 * </blockquote>
	 * <p><code>beforePreview</code></p>
	 * <blockquote>
	 *     <p><em>triggered before the article is opened in the preview</p></em>
	 * </blockquote>
	 * <p><code>beforeSave</code></p>
	 * <blockquote>
	 *     <p><em>triggered before an article is saved</p></em>
	 * </blockquote>
	 * <p><code>beforePublish</code></p>
	 * <blockquote>
	 *     <p><em>triggered before an article is published</p></em>
	 * </blockquote>
	 * <p><code>editorFocus</code> </p>
	 * <blockquote>
	 * <p><em>triggered when an editor gets focus</em></p>
	 * </blockquote>
	 * <p><code>editorUnfocus</code> </p>
	 * <blockquote>
	 * <p><em>triggered when an editor loses focus</em></p>
	 * </blockquote>
	 * <p><code>editorsLostFocus</code> </p>
	 * <blockquote>
	 * <p><em>triggered when all editors loses focus</em></p>
	 * </blockquote>
	 * <p><code>editorReady</code></p>
	 * <blockquote>
	 *     <p><em>triggered when the editor has been fully loaded and is ready for input</p></em>
	 * </blockquote>
	 * <p><code>modifiedContent</code></p>
	 * <blockquote>
	 *     <p><em>triggered whenever content changes in the article</p></em>
	 * </blockquote>
	 * <p><code>elementRemoved</code></p>
	 * <blockquote>
	 * <p><em>triggered when a plugin element from the current plugin is removed, receives an object with element id as a parameter</em></p>
	 * </blockquote>
	 * <p><code>pluginElementClicked</code></p>
	 * <blockquote>
	 *     <p><em>triggered when someone clicks on a plugin element in the editor</p></em>
	 * </blockquote>
	 * <p><code>pluginElementSelected</code></p>
	 * <blockquote>
	 *     <p><em>triggers when someone selects a plugin element in the editor</p></em>
	 * </blockquote>
	 * <p><code>pluginElementDeselected</code></p>
	 * <blockquote>
	 *     <p><em>triggered when someone deselects a plugin element in the editor</p></em>
	 * </blockquote>
	 */
	function Listeners() {
		this._listeners = {};
	}
	
	/**
	 * @deprecated Use PluginAPI.on(...) instead
	 * @param {Object} listeners
	 */
	Listeners.prototype.addAll = function (listeners) {
		const PluginAPI = __webpack_require__(1);
		'use strict';
		const createCallback = function (callback) {
			return function (data) {
				callback(data.data);
			};
		};
		for (const eventName in listeners) {
			if (listeners.hasOwnProperty(eventName)) {
				const callback = listeners[eventName];
				const callWrapper = createCallback(callback);
				PluginAPI.on(eventName, callWrapper);
			}
		}
	};
	
	/**
	 * Adds a new listener
	 *
	 * @param {String} event Event name
	 * @param {Function} callback Function to call when an even of the type is received
	 * @return {number}
	 */
	Listeners.prototype.add = function (event, callback) {
	
		if (this._listeners[event] === undefined) {
			this._listeners[event] = [];
		}
	
		this._listeners[event].push(callback);
		return this._listeners[event].length - 1;
	};
	
	/**
	 * Removes the listener at the given index
	 *
	 * @param {String} event Event type
	 * @param {Function} index The index of the event handler to remove
	 */
	Listeners.prototype.remove = function (event, index) {
	
		if (this._listeners[event] === undefined || this._listeners[event][index] === undefined) {
			return;
		}
	
		/*
		 * Set to null instead of remove to retain callback indexes
		 */
		this._listeners[event][index] = false;
	};
	
	/**
	 * Removes all listeners for the given event type, or if !event then removes all listeners
	 *
	 * @param {String} event Event type to remove handlers for (!event for all)
	 */
	Listeners.prototype.removeAll = function (event) {
		if (!event) {
			this._listeners = [];
		} else {
			this._listeners[event] = [];
		}
	};
	
	/**
	 * Notifies all registered listeners that an event has occurred
	 *
	 * @param {String} event Event type
	 * @param {Object} payload The event data
	 * @return {Boolean}
	 */
	Listeners.prototype.notify = function (event, payload) {
		let returnValue = true;
		if (this._listeners[event] === undefined) {
			return returnValue;
		}
	
		// If the payload is an object with a key data, we use that value as the payload we pass to the listener functions.
		// This is needed as we have some inconsistencies in how we pass data around. This normalization should preferably
		// be done at the call site.
		this._listeners[event].forEach((listenerFn) => {
			if (typeof listenerFn !== 'function') {
				return;
			}
			let res = null;
			if (payload && payload.params && payload.params === true) {
				res = listenerFn.apply(null, payload.data);
			} else if (typeof payload === 'object' && payload !== null && typeof payload.data !== 'undefined') {
				res = listenerFn(payload.data);
			} else {
				res = listenerFn(payload);
			}
			if (res === false) {
				returnValue = false;
			}
		});
		return returnValue;
	};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle-w.js.map