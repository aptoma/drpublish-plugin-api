/**
 * Will hold a list of listeners that are created and should be notified on
 * events
 */
function Listeners () {

  this._listeners = [];
}

/**
 * Adds several listeners
 * 
 * Example: <code>
 * var l = new Listeners;
 * l.addListeners ( {
 *  afterCreated: function() {
 *    DP.Article.setSource('Ny Times');
 *  },
 *  beforeSave: function() {
 *    return confirm('Sure you wanna save?');
 *  }
 * });
 * </code>
 * 
 * @param object A list of callbacks that should be called on events
 * @returns A dictionary of events => listener ID for later removal
 */
Listeners.prototype.addAll = function ( events ) {

  var out = {};
  for ( event in events ) {
    out[event] = this.addListener ( event, events.event );
  }
  
  return out;
};

/**
 * Adds a new listener
 */
Listeners.prototype.add = function ( event, callback ) {

  if ( this._listeners[event] == undefined ) {
    this._listeners[event] = [];
  }
  
  var index = this._listeners[event].length;
  this._listeners[event][index] = callback;
  return index;
};

/**
 * Removes the listener at the given index
 * 
 * @param event Event type
 * @param index The index of the event handler to remove
 */
Listeners.prototype.remove = function ( event, index ) {

  if ( this._listeners[event] == undefined ) return;
  
  /*
   * Set to null instead of remove to retain callback indexes
   */
  this._listeners[event][index] = null;
};

/**
 * Removes the first matching listener by callback lookup (if you don't have the
 * index)
 * 
 * @param event Event type
 * @param callback Function originally bound to event type
 * @returns {Boolean} Whether a handler was removed
 */
Listeners.prototype.removeByCallback = function ( event, callback ) {

  $.each ( this._listeners[event], function ( i, e ) {

    if ( e == callback ) {
      this.removeListener ( event, i );
      return true;
    }
  } );
  
  return false;
};

/**
 * Removes all listeners for the given event type, or if !event then removes all
 * listeners
 * 
 * @param event event type to remove handlers for (!event for all)
 */
Listeners.prototype.removeAll = function ( event ) {

  if ( !event ) {
    this._listeners = [];
  } else {
    this._listeners[event] = [];
  }
};

/**
 * Notifies all registered listeners that an event has occurred
 * 
 * @param event event type
 * @param data The event data
 */
Listeners.prototype.notify = function ( event, data ) {

  if ( this._listeners[event] != undefined ) {
    $.each ( this.eventListeners[event], function () {

      this ( data );
    } );
  }
};
