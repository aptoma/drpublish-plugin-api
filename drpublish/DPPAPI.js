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
   * @param event Type of event
   * @param data Event data
   */
  event : function ( event, data, callback ) {
    var done = [];
    var noPlugins = Plugins.list;
    for ( p in Plugins.list ) {
      this.directedEvent ( p.name, event, data, function ( ) {
        if ( done.length == noPlugins - 1 ) {
          callback();
        }
        done.push ( p.name );
      } );
    }
  }
};