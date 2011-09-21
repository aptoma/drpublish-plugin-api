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
		this._errorListeners = [];
		
		$.bind("event", function ( data ) {
		  Listeners.notify ( data.event, data.data );
		});
	},
	
	/**
	 * Dispatches a request to DrPublish, and returns the reply to callback
	 * On error, notifies all error listeners based on the index .type of the thrown object
	 * @param callSpec What do you want to call?
	 * @param data The data attached to the request
	 * @param callback The function to call upon return
	 */
	_request: function ( callSpec, data, callback ) {
	  var me = this;
	  $.pm ( {
	    target: parent,
	    type: callSpec,
	    data: data,
	    success: callback,
	    error: function ( data ) {
	      me._notifyListeners ( data.type, data );
	    },
	    origin: "*", // TODO: Find a way of avoiding all-origins
	    hash: false
	  } );
	},
	
	/**
	 * Adds an error listener for errors of the given type
	 * @param error Type of errors to listen for
	 * @param callback Function to call upon error
	 * @returns {Integer} The index of the callback for later removal 
	 */
	addErrorListener: function ( error, callback ) {
	  if ( this._errorListeners[error] == undefined ) {
	    this._errorListeners[error] = [];
	  }
	  
	  var index = this._errorListeners[error].length;
	  this._errorListeners[error][index] = callback;
	  return index;
	},
	
	/**
	 * Removes the error listener at the given index
	 * @param error Error type
	 * @param index The index of the error handler to remove
	 */
	removeErrorListener: function ( error, index ) {
	  /*
	   * Set to null instead of remove to retain callback indexes
	   */
	  this._errorListeners[error][index] = null;
	},
	
	/**
	 * Removes the first matching error listener by callback lookup (if you don't have the index)
	 * @param error Error type
	 * @param callback Function originally bound to error type
	 * @returns {Boolean} Whether a handler was removed
	 */
	removeErrorListenerByCallback: function ( error, callback ) {
	  $.each ( this._errorListeners[error], function ( i, e ) {
	    if ( e == callback ) {
	      this.removeErrorListener ( error, i );
	      return true;
	    }
	  } );
	  
	  return false;
	},
	
	/**
	 * Removes all error listeners for the given error type, or if !error then removes all listeners
	 * @param error Error type to remove handlers for (!error for all)
	 */
	removeAllErrorListeners: function ( error ) {
	  if ( !error ) {
	    this._errorListeners = [];
	  } else {
	    this._errorListeners[error] = [];
	  }
	},
	
	/**
	 * Notifies all registered error listeners that an error has occured
	 * @param error Error type
	 * @param data The error data
	 */
	_notifyListeners: function ( error, data ) {
	  if ( this._errorListeners[error] != undefined ) {
	    $.each ( this.errorListeners[error], function ( ) {
	      this ( data );
	    } );
	  }
	},

	/**
	 * Creates a new jQuery dialog
	 * @param options Dialog options
	 * @returns New dialog
	 */
	createDialog: function(options) {
		var dialog = jQuery('<div />');
		return dialog.dialog(options);
	},

	/**
	 * Creates a new tag
	 * @param tag The tag to create
	 * @param callback What do do when the tag was created
	 */
	createNewTag: function(tag, callback) {
		this._request ( "create-tag", { tag: tag }, callback );
	},

	/**
	 * Reloads the plugin's iframe
	 */
	reloadIframe: function ( ) {
	  this._request ( "reload", { plugin: this.getPluginName() } );
	},

	log: function(str) { },

	/**
	 * Get the name of the loaded plugin
	 * @returns the name of the plugin, or false if it couldn't be detected
	 */
	getPluginName: function() {
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
	addListener: function ( options ) {
		return new Listener ( this, options );
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
