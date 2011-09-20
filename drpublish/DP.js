/**
 * Namespace for all public Dr.Published methods available from plugins.
 * A new instance of this class will be created automatically for each plugin.
 */
DPClient = Class.create(
{
	/**
	 * Constructor for this class
	 */
	initialize: function(w)
	{
		this.Version =  '0.1';
		this.windowReference = w;
		this.Editor = new DP_Editor(this);
		this.Article = new DP_Article(this);
		this.account = w ? window.account : null;
	},

	createDialog: function(options)
	{
		var dialog = jQuery('<div />');
		return dialog.dialog(options);
	},

	createNewTag: function(callback, data)
	{
		return DPEditor.createNewTag(callback, data);
	},

	/**
	 * Reloads the iframe
	 */
	reloadIframe: function()
	{
		var name = this.getPluginName();
		var plugins = parent.window.Plugins;
		plugins.stop(name);
		plugins.remove(name);
		plugins.start(name);
	},

	log: function(str) { },

	/**
	 * Get the name of the loaded plugin
	 */
	getPluginName: function()
	{
		var name = this.getWindow().frameElement.id;
		if (name.match('plugin-')) {
			return name.replace('plugin\-', '');
		} else {
			return false;
		}
	},

	getPlugins: function () {
		return Plugins;
	},

	postForm: function(id)
	{
		var name = this.getPluginName();
		if (name) {
			var form = this.getWindow().frameElement.contentDocument.getElementById(id);
			var plugin = Plugins.get(name);
			plugin.removeListeners();
			plugin.showLoader('Updating page ..');
			plugin.loadContent(form.action.blank() ? plugin.url : form.action, {
				method: 'post',
				postBody: Form.serialize(form)
			});
		}
	},

	/**
	 * Get AJAX proxy URL (required for making cross-domain requests)
	 *
	 * @param string The wanted URL
	 * @return string The rewritten URL which is using the proxy
	 */
	getProxyUrl: function(url)
	{
		return getProxyUrl(url);
	},

	/**
	 * Load an external javascript into the plugin window
	 *
	 * @param string URL to the javascript resource
	 */
	loadScript: function(url, callback) {
		AjaxController.get(this.getProxyUrl(url), {
			errorTitle: 'Error loading external javascript',
			  evalJS: false,
			  evalJSON: false,
			  onSuccess: function(transport) {
				this.getWindow().eval(transport.responseText);
				if (callback) {
					callback();
				}
			  }.bind(this)
		});
	},

	/**
	 * Adds a new listener which is called when events occur in the article
	 *
	 * Example:
	 * <code>
	 * DP.addListener({
	 * 	afterCreated: function() {
	 * 		DP.Article.setSource('Ny Times');
	 * 	},
	 * 	beforeSave: function() {
	 * 		return confirm('Sure you wanna save?');
	 * 	}
	 * });
	 * </code>
	 *
	 * @param object A list of callbacks that should be called on events
	 *
	 */
	addListener: function(options)
	{
		return new Listener(this, options);
	},

	/**
	 * Get the plugin window object
	 */
	getWindow: function() {
		return this.windowReference;
	},

	/**
	 * Show info-message to the user
	 *
	 * @param string Message to be displayed
	 */
	showInfoMsg: function(msg) {
		showInfoMsg(msg);
	},

	/**
	 * Show warning-message to the user
	 *
	 * @param string Message to be displayed
	 */
	showWarningMsg: function(msg) {
		showWarningMsg(msg);
	},

	/**
	 * Show error-message to the user
	 *
	 * @param string Message to be displayed
	 */
	showErrorMsg: function(msg) {
		showErrorMsg(msg);
	},
	
	/**
	 * Loads an old revision
	 *
	 * @param id Int The id of the revision to load
	 */
	__loadArticleRevision: function(id) {
		activeArticle.getRevision(id);
	}
});
