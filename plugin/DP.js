/**
 * Namespace for all public Dr.Published methods available from plugins.
 * 
 * Listeners can be added through the Listeners objects DP.errorListeners and DP.eventListeners
 */
var DP = {
  /**
   * Constructor for this class
   */
  initialize : function () {
    
    this.Version = '1.0a';
    this.Editor = null;
    this.Article = null;
    this.errorListeners = new Listeners;
    this.eventListeners = new Listeners;
    this.authenticated = false;
    
    var _this = this;
    
    // Stores requests that couldn't be sent until we've been auth'd
    this.backlog = [];
    this.eventListeners.add ( 'pluginAuthenticated', function ( ) {
      _this.authenticated = true;
      
      if ( _this.backlog.length > 0 ) {
        console.warn ( _this.getPluginName() + ": Authenticated, now executing backlog (" + _this.backlog.length + " items)" );
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
    
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for ( var i = 0; i < hashes.length; i++ ) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    jQuery.get ( 'ajax.php?do=authenticate-plugin', { plugin: this.getPluginName(), auth: decodeURIComponent ( vars['auth'] ), iv: vars['iv'] },
      function ( reply ) {
        if ( reply ) {
          console.log ( _this.getPluginName() + ": Sent plugin-loaded signal with auth token to DrPublish" );
          pm ( {
            target : self.parent,
            type : "plugin-loaded",
            origin : "*", 
            data : {
              plugin: _this.getPluginName (),
              signature: reply.signature,
              iv: reply.iv
            }
          } );
        } else {
          console.err ( _this.getPluginName() + ": Invalid auth from DrPublish! Quitting" );
          self.close();
        }
      }
    );
  },
  
  /**
   * Dispatches a request to DrPublish, and returns the reply to callback On error, notifies all error listeners based on the index .type of the thrown object
   * 
   * @param {String} callSpec What do you want to call?
   * @param {Object} data The data attached to the request
   * @param {Function} callback The function to call upon return
   */
  request : function ( callSpec, data, callback ) {
    
    console.info ( this.getPluginName() + ': Requesting ' + callSpec + ' from parent with data', data );

    if ( data == null ) {
      data = {};
    }
    
    data['src_plugin'] = this.getPluginName (); 
    
    if ( !this.authenticated ) {
      console.warn ( "Call for " + callSpec + " delayed until plugin is authenticated" );
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
   * Creates a new jQuery dialog
   * 
   * @param {Object} options Dialog options
   * @returns {jQuery.dialog} New dialog
   */
  createDialog : function ( options ) {
    
    var dialog = jQuery ( '<div />' );
    return dialog.dialog ( options );
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
   * Reloads the plugin's iframe
   */
  reloadIframe : function () {
    
    this.request ( "plugin-reload", {
      plugin : this.getPluginName ()
    } );
  },
  
  log : function ( str ) {
    
  },
  
  /**
   * Get the name of the loaded plugin
   * 
   * @returns {String} The name of the plugin, or false if it couldn't be detected
   */
  getPluginName : function () {
    
    if ( !self.window.frameElement ) {
      return false;
    }
    
    var name = self.window.frameElement.id;
    if ( name.match ( 'plugin-' ) ) {
      return name.replace ( 'plugin\-', '' );
    } else {
      return false;
    }
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
   * Loads an old revision
   * 
   * @param {Integer} id The id of the revision to load
   */
  __loadArticleRevision : function ( id ) {
    
    this.request ( "load-revision", {
      revision : id
    } );
  }
};

DP.initialize ();
