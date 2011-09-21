/**
 * editor-clear
 * 
 * Clear the editor
 */
$.pm.bind ( 'editor-clear', function ( data ) {
  
  tinyMCE.activeEditor.execCommand ( 'mceSetContent', false, '' );
  var name = editor.editorId.replace ( 'editor-', '' );
  DPEditor.article.update ( name, editor.getContent () );
  tinyMCE.activeEditor.nodeChanged ();
  
  return true;
} );

function getEditorElementById ( id ) {
  
  return tinyMCE.activeEditor.dom.get ( id );
}

function getEditorElementBySelector ( selector ) {
  
  return tinyMCE.activeEditor.dom.select ( selector );
}

/**
 * editor-element-attribute-set-byid Set an attribute value by element ID
 */
$.pm.bind ( 'editor-element-attribute-set-byid', function ( data ) {
  
  var id = data.id; // string; ID of the element to change the attribute of  
  var attribute = data.attribute; // string; The attribute to set  
  var value = data.value; // string; The value to set the attribute to  
  
  tinyMCE.activeEditor.dom.setAttrib ( getEditorElementById ( id ), attribute, value );
  tinyMCE.activeEditor.nodeChanged ();
  
  return true;
} );

/**
 * editor-element-attribute-set-byselector
 * 
 * Set an attribute value by element selector
 */
$.pm.bind ( 'editor-element-attribute-set-byselector', function ( data ) {
  
  var selector = data.selector; // string; The selector for finding the element to set the attribute on  
  var attribute = data.attribute; // string; The attribute to set  
  var value = data.value; // string; The value to set the attribute to  
  
  tinyMCE.activeEditor.dom.setAttrib ( getEditorElementBySelector ( selector ), attribute, value );
  tinyMCE.activeEditor.nodeChanged ();
  
  return true;
} );

/**
 * editor-element-style-set-byid
 * 
 * Set a style attribute value by element ID
 */
$.pm.bind ( 'editor-element-style-set-byid', function ( data ) {
  
  var id = data.id; // string; ID of the element to change the attribute of  
  var attribute = data.attribute; // string; The style attribute to set  
  var value = data.value; // string; The value to set the attribute to  
  
  tinyMCE.activeEditor.dom.setStyle ( getEditorElementById ( id ), attribute, value );
  tinyMCE.activeEditor.nodeChanged ();
  
  return true;
} );

/**
 * editor-element-style-set-byselector
 * 
 * Set a style attribute value by element selector
 */
$.pm.bind ( 'editor-element-style-set-byselector', function ( data ) {
  
  var selector = data.selector; // string; The selector for finding the element to set the attribute on  
  var attribute = data.attribute; // string; The style attribute to set  
  var value = data.value; // string; The value to set the attribute to  
  
  tinyMCE.activeEditor.dom.setStyle ( getEditorElementBySelector ( selector ), attribute, value );
  tinyMCE.activeEditor.nodeChanged ();
  
  return true;
} );

/**
 * Used to assign unique, incrementing IDs for nodes with conflicting IDs
 */
var increment = 0;

/**
 * editor-insert
 * 
 * Insert element into editor
 */
$.pm.bind ( 'editor-insert', function ( data ) {
  
  var element = data.element; // DOMElement|string; The element or string to insert  
  
  // check active editor
  var editor = tinyMCE.activeEditor, sel = editor.selection, doc = editor.getDoc ();
  var selectedPluginElement = DPTiny.pluginElement.get ( sel.getNode () );
  var insertedPluginElement = null;
  
  // Check if the argument is a string or an ELEMENT_NODE
  if ( typeof element == 'string' ) {
    content = element;
  } else if ( typeof ( element ) === 'object' && element !== null && element.nodeType === 1 ) {
    
    var elements = [];
    elements.push ( element );
    
    while ( elements.length > 0 ) {
      var e = elements.pop ();
      if ( e.id && tinyMCE.activeEditor.dom.get ( e.id ) ) {
        ++increment;
        e.id = 'dp-id-' + increment;
      }
      
      for ( i in e.childNodes ) {
        elements.push ( e.childNodes[i] );
      }
    }
    
    // Insert
    insertedPluginElement = jQuery ( element, doc );
    insertedPluginElement.addClass ( 'dp-plugin-element dp-plugin-src-' + data.src_plugin );
    var tmpNode = jQuery ( "<div></div>", doc ).append ( insertedPluginElement );
    content = tmpNode.html ();
  } else {
    throw ( {
      type : 'editor-insert-invalid'
    } );
  }
  
  if ( selectedPluginElement ) {
    jQuery ( selectedPluginElement, doc ).after ( jQuery ( content ) );
  } else {
    editor.execCommand ( 'mceInsertContent', false, content );
  }
  
  editor.execCommand ( 'mceCleanup', false );
  if ( insertedPluginElement ) {
    var pluginElement = DPTiny.pluginElement.get ( insertedPluginElement.get ( 0 ), editor );
    DPTiny.pluginElement.cleanupPosition ( pluginElement, editor );
    editor.execCommand ( 'mceCleanup', false );
    DPTiny.editor.addPluginElementListeners ( editor );
    DPTiny.pluginElements.deselectAll ( editor );
    DPTiny.activeEditor.autoResizeHeight ();
    pluginElement = tinymce.activeEditor.getDoc ().getElementById ( element.id );
    var name = editor.editorId.replace ( 'editor-', '' );
    DPEditor.article.update ( name, editor.getContent () );
    DPTiny.pluginElement.select ( pluginElement );
  }
  
  return true;
} );

/**
 * editor-menu-element-add
 * 
 * Add an element to the editor menu
 */
$.pm.bind ( 'editor-menu-element-add', function ( data ) {
  var element = data.element; // string; The name of the menu item to add  
  var event = data.event; // string; The event type to send when the menu item is clicked  
  var prepend = data.prepend; // boolean; True to prepend, False to append  
  
  if ( prepend ) {
    DPTiny.pluginElements.menu.item.prepend ( element, function ( e ) {
      DPAPI.event ( data.src_plugin, event, e );
    } );
  } else {
    DPTiny.pluginElements.menu.item.append ( element, function ( e ) {
      DPAPI.event ( data.src_plugin, event, e );
    } );
  }
  
  return true;
} );

/**
 * editor-menu-element-hide
 * 
 * Hide an element from the editor menu panel
 */
$.pm.bind ( 'editor-menu-element-hide', function ( data ) {
  var element = data.element; // string; The name of the item to remove  
  
  DPTiny.pluginElements.menu.item.hide ( element );
  
  return true;
} );

/**
 * editor-menu-label-add
 * 
 * Add a label to the editor menu
 */
$.pm.bind ( 'editor-menu-label-add', function ( data ) {
  var label = data.label; // string; The label to add  
  
  DPTiny.pluginElements.menu.item.append ( label + ':', false, {
    'className' : 'label'
  } );
  
  return true;
} );

/**
 * editor-seek
 * 
 * Seek to a position in the editor
 */
$.pm.bind ( 'editor-seek', function ( data ) {
  var position = data.position; // integer|end; The character to place the cursor before (end means at the end)  
  
  var ed = tinyMCE.activeEditor;
  
  if ( !ed ) {
    throw ( {
      type : 'no-editor',
      message : "Fant ikke editoren"
    } );
  }
  
  var root = ed.dom.getRoot ();
  var seekto = null;
  
  switch (position) {
    case 'start':
      seekto = root.firstChild.firstChild;
      break;
    
    case 'end':
      seekto = root.childNodes[root.childNodes.length - 1];
      
      if ( tinymce.isGecko ) {
        // But firefox places the selection outside of that tag, so we need to go one level deeper:
        seekto = seekto.childNodes[seekto.childNodes.length - 1];
      }
      break;
    
    default:
      throw ( {
        type : 'unsupported',
        message : "Kun søking til start og slutt er støttet foreløpig"
      } );
  }
  
  ed.selection.select ( seekto );
  ed.selection.collapse ( true );
  
  return true;
} );

/**
 * editor-update
 * 
 * Update the editor
 */
$.pm.bind ( 'editor-update', function ( data ) {
  
  tinyMCE.activeEditor.nodeChanged ();
  
  return true;
} );