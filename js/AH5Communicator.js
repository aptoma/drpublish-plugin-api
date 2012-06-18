/**
 * This will be used by editor apps to communicate with the editor
 *
 * Should be used like this:
 *
 * AppAPI.Editor.insert('string');
 */
AH5Communicator = {
	/**
	 * Registers/Modifies a context menu items for a app element
	 * The object send should have the following structure
	 *	{
	 *		app: <name of the app>
	 *		label: <label in the menu>
	 *		icon: <optional url to possible icon image>
	 * 		trigger: <optional css selector, only show menu element when this matches the element>
	 *		callback: function(id) {
	 *			// callback function, paramter is the id of the element clicked
	 *		}
	 *	}
	 *
	 * @param {Object} action The action object
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

	/**
	 * Registers/Modifies a group of items to in the context menu
	 * The object send should have the following structure
	 *	{
	 *		app: <name of the app>,
	 *		label: <label for the group in the menu>,
	 *		icon: <optional url to possible icon image>,
	 *		actions: [
	 *			{
	 *				label: <label for the action>,
	 *				callback: function(id) {
	 *					// callback function, paramter is the id of the element clicked
	 *				}
	 *			}
	 *		]
	 *	}
	 *
	 * @param {Object} action The action object
	 */
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

	/**
	 * Replace an element in the article
	 *
	 * @param {String} id Id of the element
	 * @param {String} element The new element
	 * @param {function} callback Callback to call afte the replacement is done
	 */
	replaceElementById : function(id, element, callback) {
		AppAPI.request('editor-element-replace-byid', {
			id: id,
			element: element
		}, callback);
	},

	/**
	 * Replace the element content in the article
	 *
	 * @param {String} id Id of the element
	 * @param {String} element The new content to give the element
	 * @param {function} callback Callback to call afte the replacement is done
	 */
	setElementById : function(id, element, callback) {
		AppAPI.request('editor-element-set-byid', {
			id: id,
			element: element
		}, callback);
	},

	/**
	 * Get HTML code of an element
	 *
	 * @param {String} id The element id
	 * @param {function} callback Callback to call with the content
	 */
	getHTMLById : function(id, callback) {
		AppAPI.request('editor-element-get-byid', {
			id: id
		}, callback);
	},

	/**
	 * Get HTML code of all elements that match the selector
	 *
	 * @param {String} selector The CSS selector
	 * @param {function} callback Callback to call with the content
	 */
	getHTMLBySelector : function(selector, callback) {
		AppAPI.request('editor-elements-get-byselector', {
			selector: selector
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
	 * @param {String} id The element id
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

	/**
	 * Remove classes from the element an element in the article
	 *
	 * @param {String} id Id of the element
	 * @param {Array} classes Array of class names
	 * @param {function} callback Callback to call after everything is done
	 */
	removeClasses : function(id, classes, callback) {
		AppAPI.request('editor-classes-remove', {
			id: id,
			classes: classes
		}, callback);
	},

	/**
	 * Add new classes to an element
	 *
	 * @param {String} id Id of the element
	 * @param {Array} classes Array of class names
	 * @param {function} callback Callback to call after everything is done
	 */
	addClasses : function(id, classes, callback) {
		AppAPI.request('editor-classes-add', {
			id: id,
			classes: classes
		}, callback);
	},

	/**
	 * Mark an element as currently selected (green border with default styling)
	 *
	 * @param {String} id Id of the element
	 * @param {function} callback Callback to call after everything is done
	 */
	markAsActive : function(id, callback) {
		AppAPI.request('editor-mark-as-active', {
			id: id
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

	/**
	 * Initialize pre registered menus
	 * available options are: simplePluginMenu, editContext
	 *
	 * @param {Array} menus Array of menu names
	 */
	initMenu: function(menus) {
		AppAPI.request('editor-initialize-menu', {
			menus: menus
		});
	}

};

AppAPI.Editor = AH5Communicator;
