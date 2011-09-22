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
   */
  send : function ( plugin, callSpec, data, callback ) {
    $.pm ( {
      target : document.getElementById ( 'dp-plugin-' + plugin ).frameElement.window,
      type : callSpec,
      data : data,
      success : callback,
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
  directedEvent : function ( plugin, event, data, callback ) {
    this.send ( plugin, 'event', {
      type : event,
      data : data,
      onSuccess : callback
    } );
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
    
    function doMore ( data ) {
      this.directedEvent ( notify[done.length].name, event, data, function ( data ) {
        done.push ( true );
        
        if ( done.length == done.length ) {
          callback ( data.data );
        } else {
          doMore ( data );
        }
      } );
    }
    
    if ( notify.length ) {
      doMore ( { data: data } );
    }
  }
};