/**
 * create-tag
 * 
 * Create a new tag
 */
DPPAPI.bind_c ( 'create-tag', function ( data, replyCallback ) {
  var tag = data.tag; // string; The tag to create  
  
  DPEditor.createNewTag ( function ( tag ) {
    replyCallback ( tag );
  }, tag );
} );

/**
 * get-categories
 * 
 * Gets all categories
 */
DPPAPI.bind ( 'get-categories', function ( data ) {
  
  return DPEditor.categories; // set; Set of all categories    
} );

/**
 * get-parent-categories
 * 
 * Returns all the parent categories of the given category
 */
DPPAPI.bind ( 'get-parent-categories', function ( category ) {
  var id = category.pid;
  var pars = [];
  while (id != null) {
    var par = getCategoryObject(id);  
    pars.push(par);
    id = par.pid;
  }

  return pars;
} );

/**
 * get-tag-type
 * 
 * Gets data about the given tag type
 */
DPPAPI.bind ( 'get-tag-type', function ( data ) {
  var id = data.id; // integer; The id of the tag type  
  
  if ( DPEditor.tagTypes === null || typeof DPEditor.tagTypes !== 'object' || typeof DPEditor.tagTypes.length !== 'number' ) {
    return {};
  }
  
  for ( var i = 0; i < DPEditor.tagTypes.length; i++ ) {
    if ( ( parseInt ( id, 10 ) > 0 && DPEditor.tagTypes[i].id == id ) || ( typeof id === 'string' && DPEditor.tagTypes[i].name == id ) ) {
      return DPEditor.tagTypes[i];
    }
  }
  
  return {}; // object; DPEditor.tagTypes[id]    
} );

/**
 * get-tag-types
 * 
 * Gets all tag types
 */
DPPAPI.bind ( 'get-tag-types', function ( data ) {
  return DPEditor.tagTypes; // set; Set of all tag types    
} );

/**
 * load-revision
 * 
 * Load the given revision of the current article
 */
DPPAPI.bind ( 'load-revision', function ( data ) {
  var revision = data.revision; // integer; The revision to load  
  
  activeArticle.getRevision ( revision );
  
  return true;
} );

/**
 * plugin-reload
 * 
 * Reload the given plugin
 */
DPPAPI.bind ( 'plugin-reload', function ( data ) {
  var plugin = data.plugin; // string; Used to identify the plugin to reload  
  
  Plugins.stop ( plugin );
  Plugins.remove ( plugin );
  Plugins.start ( plugin );
  
  return true;
} );

/**
 * plugin-start
 * 
 * Start the given plugin
 */
DPPAPI.bind ( 'plugin-start', function ( data ) {
  var plugin = data.plugin; // string; Name of the plugin to start  
  var options = data.options; // JSON; Options for starting the plugin  
  
  Plugins.start ( plugin, options );
  
  return true;
} );

/**
 * plugin-stop
 * 
 * Stop the given plugin
 */
DPPAPI.bind ( 'plugin-stop', function ( data ) {
  var plugin = data.plugin; // string; Name of the plugin to start  
  
  Plugins.stop ( plugin );
  
  return true;
} );

/**
 * show-message-error
 * 
 * Show an error message to the user
 */
DPPAPI.bind ( 'show-message-error', function ( data ) {
  var message = data.message; // string; The message to display  
  
  showErrorMsg ( message );
  
  return true;
} );

/**
 * show-message-info
 * 
 * Show an info message to the user
 */
DPPAPI.bind ( 'show-message-info', function ( data ) {
  var message = data.message; // string; The message to display  
  
  showInfoMsg ( message );
  
  return true;
} );

/**
 * show-message-warning
 * 
 * Show a warning message to the user
 */
DPPAPI.bind ( 'show-message-warning', function ( data ) {
  var message = data.message; // string; The message to display  
  
  showWarningMsg ( message );
  
  return true;
} );