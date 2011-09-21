
/**
 * article-authors-add 
 * Add the given authors
 */
$.pm.bind ( 'article-authors-add', function ( data ) {
  var authors = data.authors; // array; List of authors to add  

  
} );

/**
 * article-authors-get 
 * Get authors for the current article
 */
$.pm.bind ( 'article-authors-get', function ( data ) {

  
  return null; // array; List of authors    
} );

/**
 * article-authors-remove 
 * Remove the given authors
 */
$.pm.bind ( 'article-authors-remove', function ( data ) {
  var authors = data.authors; // array; List of authors to remove  

  
} );

/**
 * article-authors-set 
 * Set authors for the current article
 */
$.pm.bind ( 'article-authors-set', function ( data ) {
  var categories = data.categories; // array; List of authors  

  
} );

/**
 * article-categories-add 
 * Add the given categories
 */
$.pm.bind ( 'article-categories-add', function ( data ) {
  var categories = data.categories; // array; List of IDs for the categories to add  

  
} );

/**
 * article-categories-main-set 
 * Set the main category of the current article
 */
$.pm.bind ( 'article-categories-main-set', function ( data ) {
  var category = data.category; // integer; ID of the category to set as main category  

  
} );

/**
 * article-categories-remove 
 * Remove the given categories
 */
$.pm.bind ( 'article-categories-remove', function ( data ) {
  var categories = data.categories; // array; List of IDs for the categories to remove  

  
} );

/**
 * article-categories-selected-get 
 * Get selected categories
 */
$.pm.bind ( 'article-categories-selected-get', function ( data ) {

  
  return null; // array; List of IDs for the selected categories    
} );

/**
 * article-categories-selected-set 
 * Set selected categories
 */
$.pm.bind ( 'article-categories-selected-set', function ( data ) {
  var categories = data.categories; // array; List of IDs for the selected categories  

  
} );

/**
 * article-content-get 
 * Get the current article content
 */
$.pm.bind ( 'article-content-get', function ( data ) {

  
  return null; // string; The current article content    
} );

/**
 * article-content-set 
 * Set the content of the current article
 */
$.pm.bind ( 'article-content-set', function ( data ) {
  var content = data.content; // string; The new content of the article  

  
} );

/**
 * article-id-get 
 * Get the ID of the current article
 */
$.pm.bind ( 'article-id-get', function ( data ) {

  
  return null; // int; ID of the current article    
} );

/**
 * article-metainfo-clear 
 * Clear the meta info summary
 */
$.pm.bind ( 'article-metainfo-clear', function ( data ) {

  
} );

/**
 * article-published-get 
 * Get the published date of the current article
 */
$.pm.bind ( 'article-published-get', function ( data ) {

  
  return null; // string; The published date of the current article    
} );

/**
 * article-published-set 
 * Set the published date of the current article
 */
$.pm.bind ( 'article-published-set', function ( data ) {
  var publish = data.publish; // string; What to set the published date to  

  
} );

/**
 * article-source-get 
 * Get the source of the current article
 */
$.pm.bind ( 'article-source-get', function ( data ) {

  
  return null; // string; The source of the current article    
} );

/**
 * article-source-set 
 * Set the source of the current article
 */
$.pm.bind ( 'article-source-set', function ( data ) {
  var source = data.source; // string; What to set the source to  

  
} );

/**
 * article-status-get 
 * Get the status of the current article
 */
$.pm.bind ( 'article-status-get', function ( data ) {

  
  return null; // string; The status of the current article    
} );

/**
 * article-status-set 
 * Set the status of the current article
 */
$.pm.bind ( 'article-status-set', function ( data ) {
  var status = data.status; // string; What to set the status to  

  
} );

/**
 * article-tags-add 
 * Add the given tag to the tags of the current article
 */
$.pm.bind ( 'article-tags-add', function ( data ) {
  var tag = data.tag; // string; Tag to add  

  
} );

/**
 * article-tags-get 
 * Get the tags for the current article
 */
$.pm.bind ( 'article-tags-get', function ( data ) {

  
  return null; // Array; All tags used in the article    
} );

/**
 * article-tags-remove 
 * Remove the given tag from the tags of the current article
 */
$.pm.bind ( 'article-tags-remove', function ( data ) {
  var tag = data.tag; // string; Tag to remove  

  
} );

/**
 * article-tags-set 
 * Set the tags for the current article
 */
$.pm.bind ( 'article-tags-set', function ( data ) {
  var tags = data.tags; // array; Tags to set  

  
} );

/**
 * article-type-get 
 * Get the type of the current article
 */
$.pm.bind ( 'article-type-get', function ( data ) {

  
  return null; // integer; The ID of the type of the current article    
} );

/**
 * article-type-set 
 * Set the article type for the current article
 */
$.pm.bind ( 'article-type-set', function ( data ) {
  var articletype = data.articletype; // integer; The new article type of the article  

  
} );