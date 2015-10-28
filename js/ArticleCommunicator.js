/* global PluginAPI: true */

/* jshint maxstatements:50 */
PluginAPI.Article = (function() {
    "use strict";

    /**
     * This class is used for communicating with the article, typically setting and getting values of metadata or in the article content itself.
     *
     * @class
     * @classdesc Functions for talking with the DrPublish article object. Accessed through PluginAPI.Article
     * @exports PluginAPI/Article
     */
    var ArticleCommunicator = function() {
        this.DEBUG = false;
    };

    /**
     * Give focus to yourself
     *
     * @param {Function} callback function(Boolean), called as the app gets focus
     */
    ArticleCommunicator.prototype.focusApp = function(callback) {
        PluginAPI.request("app-focus", {}, callback);
    };
    /**
     * Start the given app
     *
     * @param {String} name Name of the app from settings.php
     * @param {Object} options Options for initializing the app
     * @param {Function} callback function(Boolean), called after app is started
     */
    ArticleCommunicator.prototype.startApp = function(name, options, callback) {
        PluginAPI.request("app-start", {
            app: name,
            option: options
        }, callback);
    };

    /**
     * Stop the given app
     *
     * @param {String} name Name of the app from settings.php
     */
    ArticleCommunicator.prototype.stopApp = function(name) {
        PluginAPI.request("app-stop", {
            app: name
        });
    };

    /**
     * Get the id of the article currently edited
     *
     * @param {Function} callback function(Int), id of the current article
     */
    ArticleCommunicator.prototype.getId = function(callback) {
        PluginAPI.request('article-id-get', null, callback);
    };


    /**
     * Get the guid of the article package currently edited
     *
     * @param {Function} callback function(Int), id of the current article
     */
    ArticleCommunicator.prototype.getPackageId = function(callback) {
        PluginAPI.request('package-id-get', null, callback);
    };


    /**
     * Get the guid of the article package currently edited
     *
     * @param {Function} callback function(Int), id of the current article
     */
    ArticleCommunicator.prototype.getPackageGuid = function(callback) {
        PluginAPI.request('package-guid-get', null, callback);
    };

    /**
     * Clear the meta information summary
     *
     * @param {Function} callback function(Boolean), called when meta data has been cleared
     */
    ArticleCommunicator.prototype.clearMetaInfo = function(callback) {
        PluginAPI.request("article-metainfo-clear", null, callback);
    };

    /**
     * Get tags used in the article
     *
     * @param {Function} callback function([Object Tag]), array with tags connected to an article
     */
    ArticleCommunicator.prototype.getTags = function(callback) {
        PluginAPI.request("article-tags-get", null, callback);
    };

    /**
     * Retrieve custom meta value for the article
     *
     * @param {String} name Name of the custom meta value
     * @param {Function} callback function(Object), the parameter is an object containing the given custom meta value
     */
    ArticleCommunicator.prototype.getCustomMeta = function(name, callback) {
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
    ArticleCommunicator.prototype.setCustomMeta = function(name, value, callback) {
        PluginAPI.request('article-custom-meta-set', {
            name: name,
            value: value
        }, callback);
    };

    /**
     * Set tags for the article
     *
     * @param {Array} tags List of tags that should be set
     * @param {Boolean} save Set to true to force save once the tags are updated
     * @param {Function} callback function(Boolean), called when tags have been set
     */
    ArticleCommunicator.prototype.setTags = function(tags, save, callback) {
        PluginAPI.request('article-tags-set', {
            save: save,
            tags: tags
        }, callback);
    };

    /**
     * Add tag for the article
     *
     * @param {String} tag Tag to be added
     * @param {Function} errorFunction called if error
     * @param {Function} callback function(Boolean), called when tag has been set
     */
    ArticleCommunicator.prototype.addTag = function(tag, errorFunction, callback) {
        PluginAPI.request('article-tags-add', {
            tag: tag,
            onError: errorFunction
        }, callback);
    };

    /**
     * Remove tag from article
     *
     * @param {String} tag Tag to remove
     * @param {Function} callback function(Boolean), called when tag has been removed
     */
    ArticleCommunicator.prototype.removeTag = function(tag, callback) {
        PluginAPI.request('article-tags-remove', {
            tag: tag
        }, callback);
    };

    /**
     * Get the selected categories
     *
     * @param {Function} callback function([String]), array with category ids
     */
    ArticleCommunicator.prototype.getSelectedCategories = function(callback) {
        PluginAPI.request('article-categories-selected-get', null, callback);
    };

    /**
     * Save the currently selected categories
     *
     * @param {Function} callback function(Boolean), called when categories has been saved
     */
    ArticleCommunicator.prototype.saveCategories = function(callback) {
        this.getSelectedCategories(function(categories) {
            this.setCategories(categories, callback);
        });
    };

    /**
     * Set selected categories
     *
     * @param {Array} categories List of category IDs that should be set
     * @param {Function} callback function(Boolean), called when categories have been set
     */
    ArticleCommunicator.prototype.setCategories = function(categories, callback) {
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
    ArticleCommunicator.prototype.addCategories = function(categories, callback) {

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
    ArticleCommunicator.prototype.removeCategories = function(categories, callback) {
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
    ArticleCommunicator.prototype.setMainCategory = function(category, callback) {
        PluginAPI.request('article-categories-main-set', {
            category: category
        }, callback);
    };

    /**
     * Get the source set for the article
     *
     * @param {Function} callback function(String), name of the source
     */
    ArticleCommunicator.prototype.getSource = function(callback) {

        PluginAPI.request('article-source-get', null, callback);
    };

    /**
     * Set the source for the article
     *
     * @param {String} value The new value to be set as source
     * @param {Function} callback function(Boolean), called when the source has been set
     */
    ArticleCommunicator.prototype.setSource = function(value, callback) {
        PluginAPI.request('article-source-set', {
            source: value
        }, callback);
    };

    /**
     * Get the status for the article
     *
     * @param {Function} callback function(String), current status
     */
    ArticleCommunicator.prototype.getStatus = function(callback) {
        PluginAPI.request('article-status-get', null, callback);
    };

    /**
     * Set the status for the article
     *
     * @param {String} status The new status to be set (draft, waiting, published)
     * @param {Function} callback function(Boolean), called when the source has been set
     */
    ArticleCommunicator.prototype.setStatus = function(status, callback) {
        PluginAPI.request('article-status-set', {
            status: status
        }, callback);
    };

    /**
     * Get the published-date
     *
     * @param {Function} callback function(String), current published datetime
     */
    ArticleCommunicator.prototype.getPublishedDatetime = function(callback) {
        PluginAPI.request('article-published-get', null, callback);
    };

    /**
     * Set the published-date
     *
     * @param {String} published Date to be set (YYYY-MM-DD HH:MM:SS)
     * @param {Function} callback function(Boolean), called when done
     */
    ArticleCommunicator.prototype.setPublishedDatetime = function(published, callback) {
        PluginAPI.request('article-published-set', {
            published: published
        }, callback);
    };

    /**
     * Get the authors set in the article
     *
     * @param {Function} callback function([String]), currently set authors
     */
    ArticleCommunicator.prototype.getAuthors = function(callback) {
        PluginAPI.request('article-authors-get', null, callback);
    };

    /**
     * Set authors for the article
     *
     * @param {Array} authors List of authors that should be set
     * @param {Function} callback function(Boolean), called when it has been set
     */
    ArticleCommunicator.prototype.setAuthors = function(authors, callback) {
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
    ArticleCommunicator.prototype.addAuthors = function(authors, callback) {
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
    ArticleCommunicator.prototype.removeAuthors = function(authors, callback) {
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
    ArticleCommunicator.prototype.setKeywords = function(keywords, callback) {
        PluginAPI.request('article-keywords-set', {
            keywords: keywords
        }, callback);
    };

    /**
     * Get the current set of keywords on the article
     *
     * @param {Function} callback Function to call with the result
     */
    ArticleCommunicator.prototype.getKeywords = function(callback) {
        PluginAPI.request('article-keywords-get', null, callback);
    };

    /**
     * Gets the current article content
     *
     * @param {Function} callback function(Object Content)
     */
    ArticleCommunicator.prototype.getCurrentContent = function(callback) {
        PluginAPI.request('article-content-get', null, callback);
    };

    /**
     * Updates current article content
     *
     * @param {String} content The new content for the article
     * @param {Function} callback function(Boolean), called when it has been set
     */
    ArticleCommunicator.prototype.setCurrentContent = function(content, callback) {
        PluginAPI.request('article-content-set', {
            content: content
        }, callback);
    };

    /**
     * Get the article type of the current article
     *
     * @param {Function} callback function(Int)
     */
    ArticleCommunicator.prototype.getArticletypeId = function(callback) {
        PluginAPI.request('article-type-get', null, callback);
    };

    /**
     * Set the article type of the current article
     *
     * @param {Number} articletypeId The new article type of the article
     * @param {Function} callback function(Boolean), called when it has been set
     */
    ArticleCommunicator.prototype.setArticletypeId = function(articletypeId, callback) {
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
    ArticleCommunicator.prototype.maximizeAppWindow = function(title, onClose) {
        var event = 'editor-pane-close-' + new Date().getTime();

        PluginAPI.request('editor-pane-maximize', {
            title : title,
            event : event
        });
        PluginAPI.eventListeners.removeAll(event);
        PluginAPI.eventListeners.add(event, onClose);
    };

    /**
     * Restore the app pane to the default size
     *
     * @param {function} callback Callback to call after everything is done
     */
    ArticleCommunicator.prototype.restoreAppWindow = function(callback) {
        PluginAPI.request('restore-app-window', {}, callback);
    };

    /**
     * Get the current byline
     *
     * @param {function} callback function(String), xml string with the current byline
     */
    ArticleCommunicator.prototype.getByline = function(callback) {
        PluginAPI.request("article-byline-get", null, callback);
    };

    /**
     * Set the byline
     *
     * @param {String} byline XML version of byline to use
     * @param {Boolean} save If true, force save after updating byline information
     * @param {Function} callback function(Boolean), called when it has been set
     */
    ArticleCommunicator.prototype.setByline = function(byline, save, callback) {
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
    ArticleCommunicator.prototype.setGeolocations = function(geolocations, callback) {
        PluginAPI.request('article-geolocations-set', {
            geolocations: geolocations
        }, callback);
    };

    /**
     * Get geolocation
     *
     * @param {Function} callback function(Object), retrieves the currently set geo location
     */
    ArticleCommunicator.prototype.getGeolocations = function(callback) {
        PluginAPI.request("article-geolocations-get", null, callback);
    };

    /**
     * Fetches a list of all properties available to an article.
     *
     * @param {Function} callback Callback called with an array of property objects.
     */
    ArticleCommunicator.prototype.getProperties = function(callback) {
        PluginAPI.request("article-properties-get", null, callback);
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
    ArticleCommunicator.prototype.setProperties = function(properties, callback) {
        PluginAPI.request("article-properties-set", {
            properties: properties
        }, callback);
    };

    /**
     * Updates and saves a single property.
     *
     * @param {String} name The property to update.
     * @param value The updated value.
     * @param {Function} callback Callback called with an updated list of properties.
     */
    ArticleCommunicator.prototype.setProperty = function(name, value, callback) {
        var data = {};
        data[name] = value;
        PluginAPI.request("article-properties-set", {
            properties: data
        }, callback);
    };

    return new ArticleCommunicator();

})();
