/**
 * This will be used by editor apps to communicate with the editor
 *
 * Should be used like this:
 *
 * AppMediator.Editor.insert('string');
 */
AH5Communicator = {

	/**
	 * Registers/Modifies menu items for a app element
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	registerMenuAction: function (action) {
		AppMediator.request('register-menu-action', action, function(data) {
			AppMediator.eventListeners.add(data.typeName, function(data) {
				if (typeof action.callback === 'function') {
					action.callback(data.id, $(data.element).get(0));
				}
			});
		});
	},

	registerMenuActionGroup: function (group) {
		AppMediator.request('register-menu-action-group', group, function(data) {
			if (data.typeNames.length !== group.actions.length) {
				console.warn('wrong amount of callback events recieved, not good');
				return;
			}
			for (var i=0; i<data.typeNames.length; i++) {
				var callback = (function(func) {
					return function(data) {
						if (typeof func === 'function') {
							func(data.id);
						}
					}
				})(group.actions[i].callback);

				AppMediator.eventListeners.add(data.typeNames[i], callback);
			}
		});
	},

	replaceElementById : function(id, element, callback) {
		AppMediator.request('editor-element-replace-byid', {
			id: id,
			element: element
		}, callback);
	},

	setElementById : function(id, element, callback) {
		AppMediator.request('editor-element-set-byid', {
			id: id,
			element: element
		}, callback);
	},

	getElementById : function(id, callback) {
		AppMediator.request('editor-element-get-byid', {
			id: id
		}, callback);
	},

	/**
	 * Gives callback all categories
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	getCategories : function(callback) {
		AppMediator.request('get-categories', null, callback);
	},

	/**
	 * Returns all the parent categories of the given category
	 *
	 * @param {Object} category The category to find parents of
	 * @param {Function} callback The function to call with the list of parents
	 * @returns {Array} parent categories
	 */
	getParentCategories : function(category, callback) {
		AppMediator.request('get-parent-categories', category, callback);
	},

	/**
	 * Gives callback all tag types
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	getTagTypes : function(callback) {
		AppMediator.request('get-tag-types', null, callback);
	},

	/**
	 * Gives callback data about the given tag type
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	getTagType : function(id, callback) {
		AppMediator.request('get-tag-type', {
			id : id
		}, callback);
	},

	/**
	 * Clears the editor contents
	 *
	 * @param {Function} callback The function to call when editor has been cleared
	 */
	clear : function(callback) {
		AppMediator.request('editor-clear', null, callback);
	},

	/**
	 * Moves editor cursor to the beginning
	 *
	 * @param {Function} callback The function to call when cursor has been moved
	 */
	moveToStart : function(callback) {
		AppMediator.request('editor-seek', {
			position : 'start'
		}, callback);
	},

	/**
	 * Moves editor cursor to the end
	 *
	 * @param {Function} callback The function to call when cursor has been moved
	 */
	moveToEnd : function(callback) {
		AppMediator.request('editor-seek', {
			position : 'end'
		}, callback);
	},

	/**
	 * Insert a string into the editor
	 *
	 * @param {String} string The string that should be inserted
	 * @param {Function} callback The function to call when content has been inserted
	 */
	insertString : function(string, callback) {
		AppMediator.request('editor-insert-string', {
			string: string
		}, callback);
	},

	/**
	 * Insert an element into the editor
	 *
	 * Note that the HTML of the element is what will be transferred, and nothing else!
	 * The element will be given the class dp-app-element, and given a unique ID (if none is present)
	 *
	 * @param {Element} element The element that should be inserted
	 * @param {Function} callback The function to call when content has been inserted
	 */
	insertElement : function(element, callback) {
		var e = jQuery(element);
		AppMediator.request('editor-insert-element', {
			element: jQuery('<div>').append(element).html()
		}, callback);
	},

	/**
	 * Returns the first DOM object in the editor that matches the given selector
	 *
	 * @param {String} selector The selector to select by
	 *
	 */
	fetch : function(selector, callback) {
		AppMediator.request('editor-fetch', {
			selector: selector
		}, function(html) { callback(jQuery(html)[0]); });
	},

	removeClasses : function(selector, classes, callback) {
		AppMediator.request('editor-classes-remove', {
			selector: selector,
			classes: classes
		}, callback);
	},

	addClasses : function(selector, classes, callback) {
		AppMediator.request('editor-classes-add', {
			selector: selector,
			classes: classes
		}, callback);
	},

	/**
	 * TODO: Figure out how to bypass the need to interact directly with the editor getElementById getElementByCSS select
	 */

	/**
	 * Hide an element from the app element menu
	 *
	 * @param {String} name The name of the element to hide
	 * @param {Function} callback The function to call when the item has been hidden
	 */
	hideElementMenuItem : function(name, callback) {
		AppMediator.request('editor-menu-element-hide', {
			element : name
		}, callback);
	},

	/**
	 * Adds a menu item to the editor with a callback for on click handling
	 *
	 * @param {String} name The name of the element to add
	 * @param {Function} action The function to call upon click
	 * @param {Function} callback The function to call when the menu item has been added
	 * @param {Boolean} prepend True to prepend instead of append
	 */
	addElementMenuItem : function(name, action, callback, prepend) {
		var event = 'menu-click-' + name;

		AppMediator.request('editor-menu-element-add', {
			element : name,
			event : event,
			prepend : prepend
		}, callback);
		AppMediator.eventListeners.removeAll(event);
		AppMediator.eventListeners.add(event, action);
	},

	/**
	 * Adds a menu label to the editor
	 *
	 * @param {String} name The name to add to the menu (will be suffixed with a colon)
	 * @param {Function} allback The function to call when the label has been added
	 */
	appendElementMenuLabel : function(name, callback) {
		AppMediator.request('editor-menu-label-add', {
			label : name
		}, callback);
	},

	/**
	 * Updates the editor
	 *
	 * @param {Function} callback The function to call when the editor has been updated
	 */
	update : function(callback) {
		AppMediator.request('editor-update', null, callback);
	},

	/**
	 * Sets the attribute of the element with the given ID to value
	 *
	 * @param {String} id The ID of the element to set the attribute on
	 * @param {String} attribute The attribute to set
	 * @param {String} value What to set the attribute to
	 * @param {Function} callback The function to call when the attribute has been set
	 */
	setAttributeById : function(id, attribute, value, callback) {
		AppMediator.request('editor-element-attribute-set-byid', {
			id : id,
			attribute : attribute,
			value : value
		}, callback);
	},

	/**
	 * Sets the attribute of the element identified by the given selector
	 *
	 * @param {String} selector The selector for finding the element to set the attribute on
	 * @param {String} attribute The attribute to set
	 * @param {String} value What to set the attribute to
	 * @param {Function} callback The function to call when the attribute has been set
	 */
	setAttributeByCSS : function(selector, attribute, value, callback) {
		AppMediator.request('editor-element-attribute-set-byselector', {
			selector : selector,
			attribute : attribute,
			value : value
		}, callback);
	},

	/**
	 * Sets a style of the element with the given ID to value
	 *
	 * @param {String} id The ID of the element to set the attribute on
	 * @param {String} attribute The style attribute to set
	 * @param {String} value What to set the attribute to
	 * @param {Function} callback The function to call when the attribute has been set
	 */
	setStyleById : function(id, attribute, value, callback) {
		AppMediator.request('editor-element-style-set-byid', {
			id : id,
			attribute : attribute,
			value : value
		}, callback);
	},

	/**
	 * Sets a style of the element identified by the given selector
	 *
	 * @param {String} selector The selector for finding the element to set the attribute on
	 * @param {String} attribute The style attribute to set
	 * @param {String} value What to set the attribute to
	 * @param {Function} callback The function to call when the attribute has been set
	 */
	setStyleByCSS : function(selector, attribute, value, callback) {
		AppMediator.request('editor-element-style-set-byselector', {
			selector : selector,
			attribute : attribute,
			value : value
		}, callback);
	},

	maximizeAppPane : function(title, onClose) {
		var event = 'editor-pane-close-' + new Date().getTime();

		AppMediator.request('editor-pane-maximize', {
			title : title,
			event : event
		});
		AppMediator.eventListeners.removeAll(event);
		AppMediator.eventListeners.add(event, onClose);
	},

	restoreAppPane : function(callback) {
		AppMediator.request('editor-pane-restore', null, callback);
	},

};

AppMediator.Editor = AH5Communicator;
