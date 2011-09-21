/**
 * create-tag 
 * Create a new tag
 */
$.pm.bind ( 'create-tag', function ( data ) {
  var tag = data.tag; // string; The tag to create  

  
} );

/**
 * get-categories 
 * Gets all categories
 */
$.pm.bind ( 'get-categories', function ( data ) {

  
  return null; // set; Set of all categories    
} );

/**
 * get-tag-type 
 * Gets data about the given tag type
 */
$.pm.bind ( 'get-tag-type', function ( data ) {
  var id = data.id; // integer; The id of the tag type  

  
  return null; // object; DPEditor.tagTypes[id]    
} );

/**
 * get-tag-types 
 * Gets all tag types
 */
$.pm.bind ( 'get-tag-types', function ( data ) {

  
  return null; // set; Set of all tag types    
} );

/**
 * load-revision 
 * Load the given revision of the current article
 */
$.pm.bind ( 'load-revision', function ( data ) {
  var revision = data.revision; // integer; The revision to load  

  
} );

/**
 * plugin-reload 
 * Reload the given plugin
 */
$.pm.bind ( 'plugin-reload', function ( data ) {
  var plugin = data.plugin; // string; Used to identify the plugin to reload  

  
} );

/**
 * plugin-start 
 * Start the given plugin
 */
$.pm.bind ( 'plugin-start', function ( data ) {
  var plugin = data.plugin; // string; Name of the plugin to start  
  var options = data.options; // JSON; Options for starting the plugin  

  
} );

/**
 * plugin-stop 
 * Stop the given plugin
 */
$.pm.bind ( 'plugin-stop', function ( data ) {
  var plugin = data.plugin; // string; Name of the plugin to start  

  
} );

/**
 * show-message-error 
 * Show an error message to the user
 */
$.pm.bind ( 'show-message-error', function ( data ) {
  var message = data.message; // string; The message to display  

  
} );

/**
 * show-message-info 
 * Show an info message to the user
 */
$.pm.bind ( 'show-message-info', function ( data ) {
  var message = data.message; // string; The message to display  

  
} );

/**
 * show-message-warning 
 * Show a warning message to the user
 */
$.pm.bind ( 'show-message-warning', function ( data ) {
  var message = data.message; // string; The message to display  

  
} );