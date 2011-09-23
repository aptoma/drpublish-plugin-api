/**
 * Methods for interacting with DrPublish Plugins
 */
var DPPAPI = {
  
  /**
   * Sends a message to the given plugin's iframe
   * @param plugin Name of plugin to send message to
   * @param callSpec Type of message to send
   * @param data Data contained in message
   * @param callback Function to call on success
   * @param errorCallback Function to call on failure (i.e. plugin not loaded)
   */
  send : function ( plugin, callSpec, data, callback, errorCallback ) {
    
    if ( callSpec == "event" ) {
      console.log ( "notifying " + plugin + " of event " + data.type );
    } else {
      console.log ( 'sending ' + callSpec + ' signal to plugin ' + plugin );
    }
    
    var target = document.getElementById ( 'dp-plugin-' + plugin );
    
    if ( !target ) {
      console.log ( 'failed: plugin not loaded' );
      if ( typeof errorCallback == "function" ) {
        errorCallback ( 'plugin not loaded' );
      }
      return;
    }
    
    $.pm ( {
      target : target.frameElement.window,
      type : callSpec,
      data : data,
      success : callback,
      error: errorCallback,
      origin : "*", // TODO: Find a way of avoiding all-origins
      hash : false
    } );
  },
  
  /**
   * Send an event to a single plugin
   * @param plugin Name of plugin to send event to
   * @param event Type of event
   * @param data Event data
   */
  directedEvent : function ( plugin, event, data, callback, errorCallback ) {
    this.send ( plugin, 'event', {
      type : event,
      data : data
    }, callback, errorCallback );
  },
  
  /**
   * Send an event to all loaded plugins
   * 
   * Plugin events will be sent to one plugin at the time sequentially,
   * and will pass data from each one into the next
   * 
   * @param event Type of event
   * @param data Event data
   */
  event : function ( event, data, callback ) {
    
    var done = [];
    var notify = Plugins.list;
    var _this = this;
    
    console.log ( "Notifying plugins ", notify, " of " + event + " event" );
    
    function doMore ( data ) {
      var complete = function ( data ) {
        done.push ( true );
        
        if ( done.length == notify.length ) {
          if ( typeof callback == "function" ) {
            callback ( data.data );
          }
        } else {
          doMore ( data );
        }
      };
      
      _this.directedEvent ( notify[done.length].name, event, data, complete, complete );
    }
    
    if ( notify.length ) {
      doMore ( { data: data } );
    } else if ( typeof callback == "function" ) {
      callback ( data );
    }
  }
};