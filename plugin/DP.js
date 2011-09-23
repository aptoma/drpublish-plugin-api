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
    
    pm.bind ( "event", function ( data ) {
      console.log ( this.getPluginName() + ": Received " + event.type + " event", data.data );
      this.eventListeners.notify ( data.event, data.data );
      return true;
    }, "*" );
    
    console.log ( this.getPluginName() + ": Sent plugin-loaded signal to DrPublish" );
    pm ( {
      target : self.parent,
      type : "plugin-loaded",
      origin : "*", 
      data : {
        plugin : this.getPluginName ()
      }
    } );
  },
  
  /**
   * Dispatches a request to DrPublish, and returns the reply to callback On error, notifies all error listeners based on the index .type of the thrown object
   * 
   * @param {String} callSpec What do you want to call?
   * @param {Object} data The data attached to the request
   * @param {Function} callback The function to call upon return
   */
  request : function ( callSpec, data, callback ) {
    
    if ( data == null ) {
      data = {};
    }
    
    data['src_plugin'] = this.getPluginName ();
    
    var me = this;
    pm ( {
      target : parent,
      type : callSpec,
      data : data,
      success : callback,
      error : function ( data ) {
        
        me.errorListeners.notify ( data.type, data );
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