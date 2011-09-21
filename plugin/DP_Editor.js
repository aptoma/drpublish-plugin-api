/**
 * This will be used by editor plugins to communicate with the editor
 * 
 * Should be used like this:
 * 
 * DP.Editor.insert('string');
 */
DP_Editor = {
    
  /**
   * Gives callback all categories
   * 
   * @param {Function} callback The function to call with fetched data
   */
	getCategories: function ( callback ) {
	  DP.request ( 'get-categories', null, callback );
	},

	/**
   * Gives callback all tag types
   * 
   * @param {Function} callback The function to call with fetched data
   */
	getTagTypes: function ( callback ) {
	  DP.request ( 'get-tag-types', null, callback );
	},

	/**
   * Gives callback data about the given tag type
   * 
   * @param {Function} callback The function to call with fetched data
   */
	getTagType: function ( id, callback ) {
		DP.request ( 'get-tag-type', { id: id }, callback );
	},

	/**
   * Clears the editor contents
   * 
   * @param {Function} callback The function to call when editor has been cleared
   */
	clear: function ( callback ) {
		DP.request ( 'editor-clear', null, callback );
	},

	/**
   * Moves editor cursor to the beginning
   * 
   * @param {Function} callback The function to call when cursor has been moved
   */
	moveToStart: function ( callback ) {
	  DP.request ( 'editor-seek', { position: 0 }, callback );
	},

	/**
   * Moves editor cursor to the end
   * 
   * @param {Function} callback The function to call when cursor has been moved
   */
	moveToEnd: function ( callback ) {
		DP.request ( 'editor-seek', { position: 'end' }, callback );
	},

	/**
   * Insert content into the editor
   * 
   * Inserted content may either be an element or pure text. The former will be
   * encapsulated in an element with class dp-plugin-element
   * 
   * TODO: Handle insertion of DOM nodes
   * 
   * @param {Element} element The element or string that should be inserted
   * @param {Function} callback The function to call when content has been inserted
   */
	insertElement : function ( element, callback ) {
    DP.request ( 'editor-insert', { element: element }, callback );
	},

	/**
   * TODO: Figure out how to bypass the need to interact directly with the
   * editor getElementById getElementByCSS select
   */

	/**
   * Hide an element from the plugin element menu
   * 
   * @param {String} name The name of the element to hide
   * @param {Function} callback The function to call when the item has been hidden
   */
	hideElementMenuItem: function ( name, callback ) {
		DP.request ( 'editor-menu-element-hide', { element: name }, callback );
	},

	/**
   * Adds a menu item to the editor with a callback for on click handling
   * 
   * @param {String} name The name of the element to add
   * @param {Function} action The function to call upon click
   * @param {Function} callback The function to call when the menu item has been added
   * @param {Boolean} prepend True to prepend instead of append
   */
	addElementMenuItem: function ( name, action, callback, prepend ) {
	  var event = 'menu-click-' + name;
	  
	  DP.request ( 'editor-menu-element-add', { element: name, event: event, prepend: prepend }, callback );
	  DP.eventListeners.removeAll ( event );
	  DP.eventListeners.add ( event, action );
	},
	
	/**
   * Adds a menu label to the editor
   * @param {String} name The name to add to the menu (will be suffixed with a colon)
   * @param {Function} allback The function to call when the label has been added
   */
	appendElementMenuLabel: function ( name, callback ) {
	  DP.request ( 'editor-menu-label-add', { label: name }, callback );
	},

	/**
	 * Updates the editor
	 * @param {Function} callback The function to call when the editor has been updated
	 */
	update: function ( callback ) {
		DP.request ( 'editor-update', null, callback );
	},

	/**
	 * Sets the attribute of the element with the given ID to value
	 * @param {String} id The ID of the element to set the attribute on
	 * @param {String} attribute The attribute to set
	 * @param {String} value What to set the attribute to
	 * @param {Function} callback The function to call when the attribute has been set
	 */
	setAttributeById: function ( id, attribute, value, callback ) {
		DP.request ( 'editor-element-attribute-set-byid', { id: id, attribute: attribute, value: value }, callback );
	},
	
	/**
   * Sets the attribute of the element identified by the given selector
   * @param {String} selector The selector for finding the element to set the attribute on
   * @param {String} attribute The attribute to set
   * @param {String} value What to set the attribute to
   * @param {Function} callback The function to call when the attribute has been set
   */
  setAttributeByCSS: function ( elector, attribute, value, callback ) {
    DP.request ( 'editor-element-attribute-set-byselector', { selector: selector, attribute: attribute, value: value }, callback );
  },

  /**
   * Sets a style of the element with the given ID to value
   * @param {String} id The ID of the element to set the attribute on
   * @param {String} attribute The style attribute to set
   * @param {String} value What to set the attribute to
   * @param {Function} callback The function to call when the attribute has been set
   */
  setStyleById: function ( id, attribute, value, callback ) {
    DP.request ( 'editor-element-style-set-byid', { id: id, attribute: attribute, value: value }, callback );
  },
  
  /**
   * Sets a style of the element identified by the given selector
   * @param {String} selector The selector for finding the element to set the attribute on
   * @param {String} attribute The style attribute to set
   * @param {String} value What to set the attribute to
   * @param {Function} callback The function to call when the attribute has been set
   */
  setStyleByCSS: function ( elector, attribute, value, callback ) {
    DP.request ( 'editor-element-style-set-byselector', { selector: selector, attribute: attribute, value: value }, callback );
  },
  
  /**
   * TODO: Figure out what pluginElementChanged was supposed to do
   * pluginElementChanged: function(element) {
      DPTiny.pluginElements.menu.align();
      DPTiny.pluginElement.addListeners(element);
    },
   */

};

DP.Editor = DP_Editor;