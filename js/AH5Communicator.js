/* global PluginAPI: true */

PluginAPI.Editor = (function () {
    "use strict";

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
    var AH5Communicator = function() {
        this.DEBUG = false;
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
     *      label: 'label in the menu',
     *      icon: '[Optional] url to possible icon image',
     *      trigger: '[Optional] css selector, only show menu element when this matches the element',
     *      callback: function(id, clickedElementId) {
     *          // callback function
     *          // first parameter is id of the app element
     *          // second paramter is id of closest element to the trigger element that has an id
     *          //      in code: $(event.triggerElement).closest('[id]').attr('id');						
     *      }
     * })
     */
    AH5Communicator.prototype.registerMenuAction = function (action, callback) {
        PluginAPI.request('register-menu-action', action, callback);
    };

    /**
     * Registers/Modifies a group of items to in the context menu
     * The object send should have the following structure
     *
     * @example
     * PluginAPI.Editor.registerMenuActionGroup({
     *      label: 'label for the group in the menu',
     *      icon: '[Optional] url to possible icon image',
     *      actions: [
     *          {
     *              label: 'label for the action #1',
     *              callback: function(id, clickedElementId) {
     *                  // same as for registerMenuAction
     *              }
     *          },
     *          {
     *              label: 'label for the action #2',
     *              callback: function(id, clickedElementId) {
     *                  // same as for registerMenuAction
     *              }
     *          }
     *      ]
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
    AH5Communicator.prototype.getEditorType = function(callback) {
        PluginAPI.request('editor-get-type', null, callback);
    };

    /**
     * Replace an element in the article
     *
     * @param {String} id Id of the element
     * @param {String} element The new element
     * @param {function} callback function(Boolean), called after replacement is done
     */
    AH5Communicator.prototype.replaceElementById = function(id, element, callback) {
        PluginAPI.request('editor-element-replace-byid', {
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
    AH5Communicator.prototype.deleteElementById = function(id, callback) {
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
    AH5Communicator.prototype.getHTMLById = function(id, callback) {
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
    AH5Communicator.prototype.getHTMLBySelector = function(selector, callback) {
        PluginAPI.request('editor-elements-get-byselector', {
            selector: selector
        }, callback);
    };

    /**
     * Get all categories
     *
     * @param {Function} callback function([Object Category]), list of Category objects with id, name and pid
     */
    AH5Communicator.prototype.getCategories = function(callback) {
        PluginAPI.request('get-categories', null, callback);
    };

    /**
     * Returns all the parent categories of the given category
     *
     * @param {Object} category The category to find parents of
     * @param {Function} callback function([Object Category]), array of parent Category objects
     */
    AH5Communicator.prototype.getParentCategories = function(category, callback) {
        PluginAPI.request('get-parent-categories', category, callback);
    };

    /**
     * Returns all the parent elements that match the selector
     *
     * @param {String} id Id of element to find parents of
     * @param {String} selector Selector to filter parent elements with
     * @param {Function} callback function([String]), array of ids
     */
    AH5Communicator.prototype.getParentIds = function(id, selector, callback) {
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
    AH5Communicator.prototype.getTagTypes = function(callback) {
        PluginAPI.request('get-tag-types', null, callback);
    };

    /**
     * Get information about the given tagtype
     *
     * @param {String} id The element id
     * @param {Function} callback function(Object Tagtype), tagtype object with id, name and config object
     */
    AH5Communicator.prototype.getTagType = function(id, callback) {
        PluginAPI.request('get-tag-type', {
            id: id
        }, callback);
    };

    /**
     * Clears the editor contents
     *
     * @param {Function} callback function(Boolean)
     */
    AH5Communicator.prototype.clear = function(callback) {
        PluginAPI.request('editor-clear', null, callback);
    };

    /**
     * Insert a string into the editor
     *
     * @param {String} string The string that should be inserted
     * @param {Function} callback function(String), id of the newly inserted element if it has one
     */
    AH5Communicator.prototype.insertString = function(string, callback) {
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
     * @param {Options/Function} options (can be omitted) Options object, supports option 'select' - set to true to automatically select the inserted element
     * @param {Function} callback function(String), id of the newly inserted element
     */
    AH5Communicator.prototype.insertElement = function(element, options, callback) {
        var select = false;
        if (typeof options === 'object') {
            options = options || {};
            select = typeof options.select === 'boolean' ? options.select : false;
        } else if (typeof callback === 'undefined' && typeof options === 'function') {
            callback = options;
        }
        PluginAPI.request('editor-insert-element', {
            element: jQuery('<div>').append(element).html(),
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
    AH5Communicator.prototype.removeClasses = function(id, classes, callback) {
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
    AH5Communicator.prototype.addClasses = function(id, classes, callback) {
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
    AH5Communicator.prototype.markAsActive = function(id, callback) {
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
    AH5Communicator.prototype.setAttributeById = function(id, attribute, value, callback) {
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
    AH5Communicator.prototype.setStyleById = function(id, attribute, value, callback) {
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
    AH5Communicator.prototype.initMenu = function(menus, callback) {
        PluginAPI.request('editor-initialize-menu', {
            menus: menus
        }, callback);
    };

    return new AH5Communicator();

})();
