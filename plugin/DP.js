/**
 * Namespace for all public Dr.Published methods available from plugins.
 * 
 * Listeners can be added through the Listeners objects DP.errorListeners and
 * DP.eventListeners
 */
var DP = {
  /**
   * Constructor for this class
   */
  initialize : function ( ) {

    this.Version = '1.0a';
    this.Editor = null;
    this.Article = null;
    this.errorListeners = new Listeners;
    this.eventListeners = new Listeners;
    
    $.bind ( "event", function ( data ) {

      this.eventListeners.notify ( data.event, data.data );
    } );
  },
  
  /**
   * Dispatches a request to DrPublish, and returns the reply to callback On
   * error, notifies all error listeners based on the index .type of the thrown
   * object
   * 
   * @param callSpec What do you want to call?
   * @param data The data attached to the request
   * @param callback The function to call upon return
   */
  request : function ( callSpec, data, callback ) {

    var me = this;
    $.pm ( {
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
   * @param options Dialog options
   * @returns New dialog
   */
  createDialog : function ( options ) {

    var dialog = jQuery ( '<div />' );
    return dialog.dialog ( options );
  },
  
  /**
   * Creates a new tag
   * 
   * @param tag The tag to create
   * @param callback What do do when the tag was created
   */
  createNewTag : function ( tag, callback ) {

    this._request ( "create-tag", {
      tag : tag
    }, callback );
  },
  
  /**
   * Reloads the plugin's iframe
   */
  reloadIframe : function () {

    this._request ( "plugin-reload", {
      plugin : this.getPluginName ()
    } );
  },
  
  log : function ( str ) {

  },
  
  /**
   * Get the name of the loaded plugin
   * 
   * @returns the name of the plugin, or false if it couldn't be detected
   */
  getPluginName : function () {

    var name = self.window.frameElement.id
    if ( name.match ( 'plugin-' ) ) {
      return name.replace ( 'plugin\-', '' );
    } else {
      return false;
    }
  },
  
  /**
   * Show info-message to the user
   * 
   * @param string Message to be displayed
   */
  showInfoMsg : function ( msg ) {

    this._request ( "show-message-info", {
      message : msg
    } );
  },
  
  /**
   * Show warning-message to the user
   * 
   * @param string Message to be displayed
   */
  showWarningMsg : function ( msg ) {

    this._request ( "show-message-warning", {
      message : msg
    } );
  },
  
  /**
   * Show error-message to the user
   * 
   * @param string Message to be displayed
   */
  showErrorMsg : function ( msg ) {

    this._request ( "show-message-error", {
      message : msg
    } );
  },
  
  /**
   * Loads an old revision
   * 
   * @param id Int The id of the revision to load
   */
  __loadArticleRevision : function ( id ) {

    this._request ( "load-revision", {
      revision : id
    } );
  }
};

DP.initialize ();