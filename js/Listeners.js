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
 * <p>DrPublish provides a large set of default events that an plugin can listen for. All events that start their name with &#39;before&#39; can be stopped by an plugin. This is done by returning &#39;false&#39; from the callback function, as in the &#39;beforSave&#39; example given bellow. </p>
 * <p>Other plugins can also supply their own events using the PluginAPI.emit(...) function. Documention on these events are up to each plugin to create.</p>
 * <h3 id="available-events">Available Events</h3>
 * <p><code>addCategory</code></p>
 * <blockquote>
 * <p><em>triggered after a category has been added to the article</em></p>
 * </blockquote>
 * <p><code>addTag</code></p>
 * <blockquote>
 * <p><em>triggered after a tag had been added to the article</em></p>
 * </blockquote>
 * <p><code>pluginWindowMaximized</code></p>
 * <blockquote>
 * <p><em>triggered when the plugin pane is maximized</em></p>
 * </blockquote>
 * <p><code>pluginWindowRestored</code></p>
 * <blockquote>
 * <p><em>triggered when the plugin pane is restored to its&#39; original size</em></p>
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
class Listeners {
	constructor() {
		this._listeners = {};
	}


	/**
	 * @deprecated Use PluginAPI.on(...) instead
	 * @param {Object} listeners
	 */
	addAll(listeners) {
		const PluginAPI = require('./PluginAPI');
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
	}

	/**
	 * Adds a new listener
	 *
	 * @param {String} event Event name
	 * @param {Function} callback Function to call when an even of the type is received
	 * @return {number}
	 */
	add(event, callback) {

		if (typeof callback !== 'function') {
			throw new Error('not a function');
		}

		if (this._listeners[event] === undefined) {
			this._listeners[event] = [];
		}

		this._listeners[event].push(callback);
		return this._listeners[event].length - 1;
	}

	/**
	 * Removes the listener at the given index
	 *
	 * @param {String} event Event type
	 * @param {Function} index The index of the event handler to remove
	 */
	remove(event, index) {

		if (this._listeners[event] === undefined || this._listeners[event][index] === undefined) {
			return;
		}

		/*
		 * Set to null instead of remove to retain callback indexes
		 */
		this._listeners[event][index] = false;
	}

	/**
	 * Removes all listeners for the given event type, or if !event then removes all listeners
	 *
	 * @param {String} event Event type to remove handlers for (!event for all)
	 */
	removeAll(event) {
		if (!event) {
			this._listeners = [];
		} else {
			this._listeners[event] = [];
		}
	}

	/**
	 * Notifies all registered listeners that an event has occurred
	 *
	 * @param {String} event Event type
	 * @param {Object} payload The event data
	 * @return {Boolean}
	 */
	notify(event, payload) {
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
	}

}

module.exports = Listeners;
