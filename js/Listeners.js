/* global AppAPI: true */
/**
 * @example
 * AppAPI.on('afterCreate', function() {
 *     AppAPI.Article.setSource('Ny Times');
 * });
 * AppAPI.on('beforeSave', function() {
 *     if (!articleIsAwesome()) {
 *          return false;
 *     }
 * });
 *
 * @description
 *
 * DrPublish provides a large set of default events that an app can listen for. All events that start their name with 'before' can be stopped by an app. This is done by returning 'false' from the callback function, as in the 'beforSave' example given bellow. 
 *
 * Other apps can also supply their own events using the AppAPI.emit(...) function. Documention on these events are up to each app to create.
 *
 * *Available events are:*
 *
 *  `addCategory`
 *
 *  `appPaneMaximized`
 *
 *  `appPaneRestored`
 *
 *  `appAuthenticated`
 *
 *  `afterCreate`
 *
 *  `beforeDelete`
 *
 *  `afterDelete`
 *
 *  `afterLoad`
 *
 *  `afterPublish`
 *
 *  `afterSave`
 *
 *  `beforeCreate`
 *
 *  `beforeLoad`
 *
 *  `beforePreview`
 *
 *  `beforeSave`
 *
 *  `beforePublish`
 *
 *  `editorFocus`
 *
 *  `editorReady`
 *
 *  `modifiedContent`
 *
 *  `pluginElementClicked`
 *
 *  `pluginElementSelected`
 *
 *  `pluginElementDeselected`
 */
function Listeners () {
    "use strict";
	this._listeners = [];
}

/**
 * @deprecated Use AppAPI.on(...) instead
 */
Listeners.prototype.addAll = function(listeners) {
    "use strict";
    var createCallback = function(callback) {
        return function(data) {
            callback(data.data);
        };
    };
    for (var eventName in listeners) {
        if (listeners.hasOwnProperty(eventName)) {
            var callback = listeners[eventName];
            var callWrapper = createCallback(callback);
            AppAPI.on(eventName, callWrapper);
        }
    }
};

/**
 * Adds a new listener
 *
 * @param {String} event Event name
 * @param {Function} callback Function to call when an even of the type is received
 */
Listeners.prototype.add = function(event, callback) {
    "use strict";

	if (this._listeners[event] === undefined) {
		this._listeners[event] = [];
	}

	var index = this._listeners[event].length;
	this._listeners[event][index] = callback;
	return index;
};

/**
 * Removes the listener at the given index
 *
 * @param {String} event Event type
 * @param {Function} index The index of the event handler to remove
 */
Listeners.prototype.remove = function(event, index) {
    "use strict";

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
Listeners.prototype.removeAll = function(event) {
    "use strict";
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
 * @param {Object} data The event data
 */
Listeners.prototype.notify = function(event, data) {
    "use strict";
    var returnValue = true;
	if (this._listeners[event] !== undefined) {
		jQuery.each(this._listeners[event], function(i, e) {
			if (e && typeof e === "function") {
				if (data && data.params && data.params === true) {
					var r = e.apply(null, data.data);

					if (r === false) {
						returnValue = false;
					}

				} else if (e(data) === false) {
                    returnValue = false;
                }
			}
		});
	}
	return returnValue;
};
