var DPPAPI = {
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

  event : function ( plugin, event, data ) {
    this.send ( plugin, 'event', {
      type: event,
      data: data
    } );
  }
};