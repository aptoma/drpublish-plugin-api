/**
 * Namespace for all public Dr.Published methods available from plugins.
 * A new instance of this class will be created automatically for each plugin.
 */
DPClient = Class.create(
{
	/**
	 * Constructor for this class
	 */
	initialize: function() {
		this.Version =  '1.0a';
		this.Editor = new DP_Editor(this);
		this.Article = new DP_Article(this);
	},
	
	/**
	 * Dispatches a request to DrPublish, and returns the reply to callback
	 * @param callSpec What do you want to call?
	 * @param data The data attached to the request
	 * @param callback The function to call upon return
	 * @param error The function to call upon error
	 */
	_request: function ( callSpec, data, callback, error ) {
	  $.pm ( {
	    target: parent,
	    type: callSpec,
	    data: data,
	    success: callback,
	    error: error,
	    origin: "*", // TODO: Find a way of avoiding all-origins
	    hash: false
	  } );
	},

	createDialog: function(options) {
		var dialog = jQuery('<div />');
		return dialog.dialog(options);
	},

	createNewTag: function(callback, data) {
		return DPEditor.createNewTag(callback, data);
	},

	/**
	 * Reloads the iframe
	 */
	reloadIframe: function()
	{
	  this._request ( "reload", { plugin: this.getPluginName() } );
	},

	log: function(str) { },

	/**
	 * Get the name of the loaded plugin
	 */
	getPluginName: function()
	{
	  var name = self.window.frameElement.id
		if (name.match('plugin-')) {
			return name.replace('plugin\-', '');
		} else {
			return false;
		}
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
	 * Show info-message to the user
	 *
	 * @param string Message to be displayed
	 */
	showInfoMsg: function(msg) {
		this._request ( "show-message-info", { message: msg } );
	},

	/**
	 * Show warning-message to the user
	 *
	 * @param string Message to be displayed
	 */
	showWarningMsg: function(msg) {
	  this._request ( "show-message-warning", { message: msg } );
	},

	/**
	 * Show error-message to the user
	 *
	 * @param string Message to be displayed
	 */
	showErrorMsg: function(msg) {
	  this._request ( "show-message-error", { message: msg } );
	},
	
	/**
	 * Loads an old revision
	 *
	 * @param id Int The id of the revision to load
	 */
	__loadArticleRevision: function(id) {
	  this._request ( "load-revision", { revision: id } ); 
	}
});
