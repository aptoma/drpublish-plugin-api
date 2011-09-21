/**
 * editor-clear 
 * Clear the editor
 */
$.pm.bind ( 'editor-clear', function ( data ) {

  
} );

/**
 * editor-element-attribute-set-byid 
 * Set an attribute value by element ID
 */
$.pm.bind ( 'editor-element-attribute-set-byid', function ( data ) {
  var id = data.id; // string; ID of the element to change the attribute of  
  var attribute = data.attribute; // string; The attribute to set  
  var value = data.value; // string; The value to set the attribute to  

  
} );

/**
 * editor-element-attribute-set-byselector 
 * Set an attribute value by element selector
 */
$.pm.bind ( 'editor-element-attribute-set-byselector', function ( data ) {
  var selector = data.selector; // string; The selector for finding the element to set the attribute on  
  var attribute = data.attribute; // string; The attribute to set  
  var value = data.value; // string; The value to set the attribute to  

  
} );

/**
 * editor-element-style-set-byid 
 * Set a style attribute value by element ID
 */
$.pm.bind ( 'editor-element-style-set-byid', function ( data ) {
  var id = data.id; // string; ID of the element to change the attribute of  
  var attribute = data.attribute; // string; The style attribute to set  
  var value = data.value; // string; The value to set the attribute to  

  
} );

/**
 * editor-element-style-set-byselector 
 * Set a style attribute value by element selector
 */
$.pm.bind ( 'editor-element-style-set-byselector', function ( data ) {
  var selector = data.selector; // string; The selector for finding the element to set the attribute on  
  var attribute = data.attribute; // string; The style attribute to set  
  var value = data.value; // string; The value to set the attribute to  

  
} );

/**
 * editor-insert 
 * Insert element into editor
 */
$.pm.bind ( 'editor-insert', function ( data ) {
  var element = data.element; // DOMElement|string; The element or string to insert  

  
} );

/**
 * editor-menu-element-add 
 * Add an element to the editor menu
 */
$.pm.bind ( 'editor-menu-element-add', function ( data ) {
  var element = data.element; // string; The name of the menu item to add  
  var event = data.event; // string; The event type to send when the menu item is clicked  
  var prepend = data.prepend; // boolean; True to prepend, False to append  

  
} );

/**
 * editor-menu-element-hide 
 * Hide an element from the editor menu panel
 */
$.pm.bind ( 'editor-menu-element-hide', function ( data ) {
  var element = data.element; // string; The name of the item to remove  

  
} );

/**
 * editor-menu-label-add 
 * Add a label to the editor menu
 */
$.pm.bind ( 'editor-menu-label-add', function ( data ) {
  var label = data.label; // string; The label to add  

  
} );

/**
 * editor-seek 
 * Seek to a position in the editor
 */
$.pm.bind ( 'editor-seek', function ( data ) {
  var position = data.position; // integer|end; The character to place the cursor before (end means at the end)  

  
} );

/**
 * editor-update 
 * Update the editor
 */
$.pm.bind ( 'editor-update', function ( data ) {

  
} );