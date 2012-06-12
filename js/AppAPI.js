/**
 * Namespace for all public Dr.Published methods available from apps.
 *
 * Listeners can be added through the Listeners objects AppAPI.errorListeners and AppAPI.eventListeners
 */
var AppAPI = {
	/**
	 * Constructor for this class
	 */
	initialize : function () {
		this.DEBUG = false;

		this.Version = '1.0a';
		this.Editor = null;
		this.Article = null;
		this.errorListeners = new Listeners;
		this.eventListeners = new Listeners;
		this.authenticated = false;
		this.appName = '';

		var _this = this;

		// Stores requests that couldn't be sent until we've been auth'd
		this.backlog = [];
		this.eventListeners.add ( 'appAuthenticated', function ( ) {
			_this.authenticated = true;
			if ( _this.backlog.length > 0 ) {
				if (_this.DEBUG) console.warn ( _this.getAppName() + ": Authenticated, now executing backlog (" + _this.backlog.length + " items)" );
				for ( var i = _this.backlog.length - 1; i >= 0; i-- ) {
					_this.request ( _this.backlog[i]['spec'], _this.backlog[i]['data'], _this.backlog[i]['callback'] );
					_this.backlog.splice ( i, 1 );
				}
			}
		} );

		pm.bind ( "event", function ( data ) {
			_this.eventListeners.notify ( data.type, data.data );
			return true;
		}, "*" );
	},

	/**
	 * Performs authentication to DrPublish by sending a GET request
	 * to the given URL (or ajax.php?do=authenticate-app if nothing
	 * else is specified), and using .signature and .iv from the response
	 * object as the authentication reply to the DrPublish API
	 *
	 * @param {String} url Url to call, default is 'ajax.php?do=authentication-app'
	 */
	doStandardAuthentication : function ( url ) {
		url = url || 'ajax.php?do=authenticate-app';

		jQuery.getJSON ( url, { app: this.getAppName() },
			function ( reply ) {
				if ( reply ) {
					AppAPI.doDirectAuthentication ( reply.signature, reply.iv );
				} else {
					if (this.DEBUG) console.err ( _this.getAppName() + ": No authentication token provided by backend", reply );
					self.close();
				}
			}
		);
	},

	/**
	 * Directly authenticates with the DrPublish API with the given
	 * signature and iv
	 *
	 * @param {String} signature Signature to send
	 * @param {String} iv Iv to send
	 */
	doDirectAuthentication : function ( signature, iv ) {
		pm ( {
			target : self.parent,
			type : "app-loaded",
			origin : "*",
			data : {
				app: this.getAppName (),
				signature: signature,
				iv: iv
			}
		} );
		if (this.DEBUG) console.log ( this.getAppName() + ": Sent app-loaded signal with auth token to DrPublish" );
	},

	/**
	 * Dispatches a request to DrPublish, and returns the reply to callback On error, notifies all error listeners based on the index .type of the thrown object
	 *
	 * @param {String} callSpec What do you want to call?
	 * @param {Object} data The data attached to the request
	 * @param {Function} callback The function to call upon return
	 */
	request : function ( callSpec, data, callback ) {

		if (this.DEBUG) console.info ( this.getAppName() + ': Requesting ' + callSpec + ' from parent with data', data );

		if ( data == null ) {
			data = {};
		}

		data['src_app'] = this.getAppName ();

		if ( !this.authenticated ) {
			if (this.DEBUG) console.warn ( "Call for " + callSpec + " delayed until app is authenticated" );
			this.backlog.push ( { spec: callSpec, data: data, callback: callback } );
			return;
		}

		var _this = this;
		pm ( {
			target : parent,
			type : callSpec,
			data : data,
			success : callback,
			error : function ( data ) {

				_this.errorListeners.notify ( data.type, data );
			},
			origin : "*", // TODO: Find a way of avoiding all-origins
			hash : false
		} );
	},


	/**
	 * Creates a new tag
	 *
	 * @param {String} tag The tag to create
	 * @param {Function} callback What do do when the tag was created
	 */
	createNewTag : function ( tag, callback ) {
		this.request ( "create-tag", {
			tag : tag
		}, callback );
	},

	/**
	 * Reloads the app's iframe
	 */
	reloadIframe : function () {

		this.request ( "app-reload", {
			app : this.getAppName ()
		} );
	},

	/**
	 * Get the name of the loaded app
	 *
	 * @returns {String} The name of the app, or false if it couldn't be detected
	 */
	getAppName : function () {
		return this.appName;
	},

	/**
	 * Set the name of the app
	 *
	 * @param {String} name The name of the app
	 */
	setAppName : function (name) {
		this.appName = name;
	},

	/**
	 * Show info-message to the user
	 *
	 * @param {String} Message to be displayed
	 */
	showInfoMsg : function ( msg ) {

		this.request ( "show-message-info", {
			message : msg
		} );
	},

	/**
	 * Show warning-message to the user
	 *
	 * @param {String} Message to be displayed
	 */
	showWarningMsg : function ( msg ) {

		this.request ( "show-message-warning", {
			message : msg
		} );
	},

	/**
	 * Show error-message to the user
	 *
	 * @param {String} Message to be displayed
	 */
	showErrorMsg : function ( msg ) {

		this.request ( "show-message-error", {
			message : msg
		} );
	},

	/**
	 * Show the loader
	 *
	 * @param {String} Message to display in progress loader
	 */
	showLoader : function ( msg ) {
		this.request ( "show-loader", {
			message: msg
		} );
	},

	/**
	 * Hide the loader
	 */
	hideLoader : function ( ) {
		this.request ( "hide-loader" );
	},

	/**
	 * Loads an old revision of an article
	 *
	 * @param {Integer} id The id of the revision to load
	 * @param {Function} callback The function to call when the new revision has been loaded
	 */
	__loadArticleRevision : function ( id, callback ) {

		this.request ( "load-revision", {
			revision : id
		}, callback );
	}
};

AppAPI.initialize ();
