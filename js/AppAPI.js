/* global Listeners: true, pm: true */

/* jshint maxstatements:32 */
var AppAPI = (function() {
    "use strict";

    /**
     *
     * Namespace for all public DrPublish methods available from apps.
     *
     * @class
     * @classdesc The basic API object
     * @exports AppApi
     *
     */
    var Api = function () {
        this.DEBUG = false;

        this.Version = '1.0';
        this.Editor = null;
        this.Article = null;
        this.errorListeners = new Listeners();
        this.eventListeners = new Listeners();
        this.authenticated = false;
        this.appName = '';

        var self = this;

        // Stores requests that couldn't be sent until we've been auth'd
        this.backlog = [];
        this.eventListeners.add('appAuthenticated', function() {
            self.authenticated = true;
            if(self.backlog.length > 0) {
                if (self.DEBUG) {
                    console.warn(self.getAppName() + ": Authenticated, now executing backlog (" + self.backlog.length + " items)");
                }
                for(var i = self.backlog.length - 1; i >= 0; i--) {
                    self.request(self.backlog[i]['spec'], self.backlog[i]['data'], self.backlog[i]['callback']);
                    self.backlog.splice(i, 1);
                }
            }
        });

        pm.bind("event", function(data) {
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
     * Performs authentication to DrPublish by sending a GET request
     * to the given URL (or ajax.php?do=authenticate-app if nothing
     * else is specified), and using .signature and .iv from the response
     * object as the authentication reply to the DrPublish API
     *
     * @param {String} url Url to call, default is 'ajax.php?do=authentication-app'
     */
    Api.prototype.doStandardAuthentication = function(url) {
        var self = this;
        url = url || 'ajax.php?do=authenticate-app';

        jQuery.getJSON(url, {app: this.getAppName()},
            function(reply) {
                if(reply) {
                    self.doDirectAuthentication(reply.signature, reply.iv);
                } else {
                    if (this.DEBUG) {
                        console.err(self.getAppName() + ": No authentication token provided by backend", reply);
                    }
                }
            }
        );
    };

    /**
     * Directly authenticates with the DrPublish API with the given
     * signature and iv
     *
     * @param {String} signature Signature to send
     * @param {String} iv Iv to send
     */
    Api.prototype.doDirectAuthentication = function(signature, iv) {
        pm({
            target: parent,
            type: "app-loaded",
            origin: "*",
            data: {
                app: this.getAppName (),
                signature: signature,
                iv: iv
            }
        });
        if (this.DEBUG) {
            console.log(this.getAppName() + ": Sent app-loaded signal with auth token to DrPublish");
        }
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

        if(data == null) {
            data = {};
        }

        if (typeof callback === 'undefined') {
            callback = null;
        }

        data['src_app'] = this.getAppName ();

        if(!this.authenticated) {
            if (this.DEBUG) {
                console.warn("Call for " + callSpec + " delayed until app is authenticated");
            }
            this.backlog.push({ spec: callSpec, data: data, callback: callback });
            return;
        }

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
     * @deprecated Use AppAPI.on(...) instead
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
     * AppAPI.searchDrLib({
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
     * Extends the AppAPI with custom functionality that other apps can use
     *
     * @param {String} group Group name for functionality to add
     * @param {String} name Name of the specific function to add
     * @param {Function} action function(Object) Function to call when the API is invoked, recieves one parameter as given in AppAPI.callExtendedApi and return value is passed back to the caller
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
     * Call the extended AppAPI
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
        this.request('on-api-event', {
            name: name,
        }, function() {
            self.eventListeners.add(name, callback);
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

    return new Api();
})();
