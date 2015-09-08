/* global Listeners: true, pm: true */

/* jshint maxstatements:38 */
var PluginAPI = (function() {
    "use strict";

    /**
     *
     * Namespace for all public DrPublish methods available from apps.
     *
     * @class
     * @classdesc The basic API object
     * @exports PluginAPI
     *
     */
    var Api = function () {
        this.DEBUG = false;

        this.Version = '1.0';
        this.Editor = null;
        this.Article = null;
        this.errorListeners = new Listeners();
        this.eventListeners = new Listeners();
        this.appName = '';
        this.selectedPluginElement = null;

        var self = this;

        pm.bind("event", function(data) {
            var createEventFunction = function(eventName) {
                return function(data) {
                    PluginAPI.request(eventName, data);
                };
            };
            var updateObject = function(data) {
                for (var key in data) {
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
        }, "*");
    };

    /**
     * Dispatches a request to DrPublish, and returns the reply to callback On error, notifies all error listeners based on the index .type of the thrown object
     *
     * @param {String} callSpec What do you want to call?
     * @param {Object} data The data attached to the request
     * @param {Function} callback The function to call upon return
     */
    Api.prototype.request = function(callSpec, data, callback) {
        var self = this;
        if (this.DEBUG) {
            console.info(this.getAppName() + ': Requesting ' + callSpec + ' from parent with data', data);
        }

        if (!data) {
            data = {};
        }

        if (typeof callback === 'undefined') {
            callback = null;
        }

        if (typeof data.length === "number") {
            data = {data: data};
        }

        data['src_app'] = this.getAppName();

        var createEventFunction = function(func, eventKey) {
            return function() {
                self.eventListeners.remove(eventKey, eventKey);
                return func.apply(null, arguments);
            };
        };


        var createCallbackObject = function(key, callback) {
            var random = Math.floor(Math.random()*1000);
            var eventKey = key+random+'functioncallback'+(new Date()).getTime();
            var eventFunction = createEventFunction(callback, eventKey);
            self.eventListeners.add(eventKey, eventFunction);
            return {
                type: 'function',
                eventKey: eventKey
            };
        };

        var updateObject = function(data) {
            for (var key in data) {
                if(data.hasOwnProperty(key)) {
                    var val = data[key];
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
            error: function(data) {
                self.errorListeners.notify(data.type, data);
            },
            origin: "*", // TODO: Find a way of avoiding all-origins
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
        this.request("create-tag", {
            tag: tag
        }, callback);
    };

    /**
     * Reloads the app's iframe
     */
    Api.prototype.reloadIframe = function () {

        this.request("app-reload", {
            app: this.getAppName ()
        });
    };

    /**
     * Get the name of the loaded app
     *
     * @returns {String} The name of the app, or false if it couldn't be detected
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
    Api.prototype.showInfoMsg = function(msg) {

        this.request("show-message-info", {
            message: msg
        });
    };

    /**
     * Show warning-message to the user
     *
     * @param {String} msg Message to be displayed
     */
    Api.prototype.showWarningMsg = function(msg) {

        this.request("show-message-warning", {
            message: msg
        });
    };

    /**
     * Show error-message to the user
     *
     * @param {String} msg Message to be displayed
     */
    Api.prototype.showErrorMsg = function(msg) {

        this.request("show-message-error", {
            message: msg
        });
    };

    /**
     * Show the loader
     *
     * @param {String} msg Message to display in progress loader
     */
    Api.prototype.showLoader = function(msg) {
        this.request("show-loader", {
            message: msg
        });
    };

    /**
     * Hide the loader
     */
    Api.prototype.hideLoader = function() {
        this.request("hide-loader");
    };

    /**
     * @deprecated Use PluginAPI.on(...) instead
     */
    Api.prototype.addListeners = function(listeners) {
        var createCallback = function(callback) {
            return function(data) {
                callback(data.data);
            };
        };
        for (var eventName in listeners) {
            if (listeners.hasOwnProperty(eventName)) {
                var callback = listeners[eventName];
                var callWrapper = createCallback(callback);
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
    Api.prototype.__loadArticleRevision = function(id, callback) {
        this.request("load-revision", {
            revision: id
        }, callback);
    };

    /**
     * Creates a new tag
     *
     * @param {String} tag JSON object with the tag to create, must contain tagTypeId and name properties
     * @param {Function} callback function(Boolean)
     */
    Api.prototype.createTag = function(tag, callback) {
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
    Api.prototype.searchDrLib = function(data, callback) {
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
    //TODO: This function should also be able to take a DOMElement or similar.
    Api.prototype.convertDomToHTML = function(dom) {
        if (typeof dom === 'object' && typeof dom.wrap === 'function') {
            return dom.wrap("<div>").parent().html();
        }
        return '';
    };

    /**
     * Generates an url to a published article
     *
     * @param {String} id The id of the article to generate url for
     * @param {Function} callback function(String), where the parameter is the generated url
     */
    Api.prototype.generateArticleUrl = function(id, callback) {
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
    Api.prototype.extendApi = function(group, name, action) {
        var self = this;
        this.request('extend-api', {
            group: group,
            name: name,
            action: function(data) {
                var a = action(data.data);
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
     * @param {Function} action function(Object) Function to recieve the API response, parameter is the response from the API call
     */
    Api.prototype.callExtendedApi = function(group, name, data, callback) {
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
    Api.prototype.getCurrentUser = function(callback) {
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
    Api.prototype.emit = function(name, data) {
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
    Api.prototype.on = function(name, callback) {
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
    Api.prototype.increaseRequiredActionCounter = function(callback) {
        this.request('increase-required-action-counter', {}, callback);
    };

    /**
     * Decrease the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Function} callback function(Object) function to call once the counter has been decrease, returns current counter value
     */
    Api.prototype.decreaseRequiredActionCounter = function(callback) {
        this.request('decrease-required-action-counter', {}, callback);
    };

    /**
     * Clear the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Function} callback function(Object) function to call once the counter has been cleared
     */
    Api.prototype.clearRequiredActionCounter = function(callback) {
        this.request('clear-required-action-counter', {}, callback);
    };

    /**
     * Set the counter of actions required by the user, used to tell the user that the plugin requires input of some kind
     *
     * @param {Number} count The value to set the counter to
     * @param {Function} callback function(Object) function to call once the counter has been cleared
     */
    Api.prototype.setRequiredActionCounter = function(count, callback) {
        this.request('set-required-action-counter', {count: count}, callback);
    };

    /**
     * Create a new instance of the Api class
     *
     * @private
     */
    Api.prototype.create = function() {
        return new Api();
    };

    /**
     * Create an embedded object of the given type
     *
     * @param {Number} typeId Type Id of the embedded object to create
     * @param {Function} callback function(embeddedObjectId) called once the object has been created, first parameter is the new embedded object id
     */
    Api.prototype.createEmbeddedObject = function(typeId, callback) {
        this.request('create-embedded-object', {typeId: typeId, callback: callback});
    };

    /**
     * Get information about the available embedded object types
     *
     * @param {Function} callback function([Object]) recieves an array with objects describing the available embedded object types in the form of `{typeId: 'embedded object type id', cssClass: 'css class used to style the objects'}`
     */
    Api.prototype.getEmbeddedObjectTypes = function(callback) {
        this.request('get-embedded-object-types', null, callback);
    };

    /**
     * Gives focus to another plugin
     *
     * @param {String} pluginName The name of the plugin to recieve focus
     * @param {Object} argument Optional option argument to pass along to the plugin recieving focus
     * @param {Boolean} start Flag to decide if the plugin should be started if it has not been loaded previously, default true
     */
    Api.prototype.giveFocus = function(pluginName, argument, start) {
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
     */
    Api.prototype.hide = function() {
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
     */
    Api.prototype.createModal = function(content, options) {
        this.request('create-custom-modal', {content: content, options: options});
        return true;
    };

    /**
     * Updates the HTML content of a live modal. Has no effect if the modal does not exist.
     *
     * @param {String} content An HTML string
     */
    Api.prototype.updateModal = function(content) {
        this.request('update-custom-modal', {content: content});
        return true;
    };

    /**
     * Closes and optionally deletes the modal. Has no effect if the modal does not exists.
     *
     * @param {Boolean} destroy Whether or not to delete the modal
     */
    Api.prototype.closeModal = function(destroy) {
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

    return new Api();
})();
