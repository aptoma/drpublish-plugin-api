/**
 * This will be used by editor apps to communicate with the editor
 *
 * Should be used like this:
 *
 * AppAPI.Editor.insert('string');
 */
AH5Communicator = {

	/**
	 * Registers/Modifies menu items for a app element
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	registerMenuAction: function (action) {
		AppAPI.request('register-menu-action', action, function(data) {
			AppAPI.eventListeners.add(data.typeName, function(data) {
				if (typeof action.callback === 'function') {
					action.callback(data.id, $(data.element).get(0));
				}
			});
		});
	},

	registerMenuActionGroup: function (group) {
		AppAPI.request('register-menu-action-group', group, function(data) {
			if (data.typeNames.length !== group.actions.length) {
				if (this.DEBUG) console.warn('wrong amount of callback events recieved, not good');
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

				AppAPI.eventListeners.add(data.typeNames[i], callback);
			}
		});
	},

	replaceElementById : function(id, element, callback) {
		AppAPI.request('editor-element-replace-byid', {
			id: id,
			element: element
		}, callback);
	},

	setElementById : function(id, element, callback) {
		AppAPI.request('editor-element-set-byid', {
			id: id,
			element: element
		}, callback);
	},

	getElementById : function(id, callback) {
		AppAPI.request('editor-element-get-byid', {
			id: id
		}, callback);
	},

	/**
	 * Gives callback all categories
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	getCategories : function(callback) {
		AppAPI.request('get-categories', null, callback);
	},

	/**
	 * Returns all the parent categories of the given category
	 *
	 * @param {Object} category The category to find parents of
	 * @param {Function} callback The function to call with the list of parents
	 * @returns {Array} parent categories
	 */
	getParentCategories : function(category, callback) {
		AppAPI.request('get-parent-categories', category, callback);
	},

	/**
	 * Gives callback all tag types
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	getTagTypes : function(callback) {
		AppAPI.request('get-tag-types', null, callback);
	},

	/**
	 * Gives callback data about the given tag type
	 *
	 * @param {Function} callback The function to call with fetched data
	 */
	getTagType : function(id, callback) {
		AppAPI.request('get-tag-type', {
			id : id
		}, callback);
	},

	/**
	 * Clears the editor contents
	 *
	 * @param {Function} callback The function to call when editor has been cleared
	 */
	clear : function(callback) {
		AppAPI.request('editor-clear', null, callback);
	},

	/**
	 * Moves editor cursor to the beginning
	 *
	 * @param {Function} callback The function to call when cursor has been moved
	 */
	moveToStart : function(callback) {
		AppAPI.request('editor-seek', {
			position : 'start'
		}, callback);
	},

	/**
	 * Moves editor cursor to the end
	 *
	 * @param {Function} callback The function to call when cursor has been moved
	 */
	moveToEnd : function(callback) {
		AppAPI.request('editor-seek', {
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
		AppAPI.request('editor-insert-string', {
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
		AppAPI.request('editor-insert-element', {
			element: jQuery('<div>').append(element).html()
		}, callback);
	},

	removeClasses : function(id, classes, callback) {
		AppAPI.request('editor-classes-remove', {
			id: id,
			classes: classes
		}, callback);
	},

	addClasses : function(id, classes, callback) {
		AppAPI.request('editor-classes-add', {
			id: id,
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
		AppAPI.request('editor-menu-element-hide', {
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

		AppAPI.request('editor-menu-element-add', {
			element : name,
			event : event,
			prepend : prepend
		}, callback);
		AppAPI.eventListeners.removeAll(event);
		AppAPI.eventListeners.add(event, action);
	},

	/**
	 * Adds a menu label to the editor
	 *
	 * @param {String} name The name to add to the menu (will be suffixed with a colon)
	 * @param {Function} allback The function to call when the label has been added
	 */
	appendElementMenuLabel : function(name, callback) {
		AppAPI.request('editor-menu-label-add', {
			label : name
		}, callback);
	},

	/**
	 * Updates the editor
	 *
	 * @param {Function} callback The function to call when the editor has been updated
	 */
	update : function(callback) {
		AppAPI.request('editor-update', null, callback);
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
		AppAPI.request('editor-element-attribute-set-byid', {
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
		AppAPI.request('editor-element-attribute-set-byselector', {
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
		AppAPI.request('editor-element-style-set-byid', {
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
		AppAPI.request('editor-element-style-set-byselector', {
			selector : selector,
			attribute : attribute,
			value : value
		}, callback);
	},

	maximizeAppPane : function(title, onClose) {
		var event = 'editor-pane-close-' + new Date().getTime();

		AppAPI.request('editor-pane-maximize', {
			title : title,
			event : event
		});
		AppAPI.eventListeners.removeAll(event);
		AppAPI.eventListeners.add(event, onClose);
	},

	restoreAppPane : function(callback) {
		AppAPI.request('editor-pane-restore', null, callback);
	},
	initMenu: function(menus) {
		AppAPI.request('editor-initialize-menu', {
			menus: menus
		});
	}

};

AppAPI.Editor = AH5Communicator;
