/**
 * article-authors-add
 * 
 * Add the given authors
 */
DPPAPI.bind ( 'article-authors-add', function ( data ) {
  var authors = data.authors; // array; List of authors to add  
  
  for ( a in authors ) {
    DPEditor.addAuthor ( authors[a] );
  }
  
  return true;
} );

/**
 * article-authors-get
 * 
 * Get authors for the current article
 */
DPPAPI.bind ( 'article-authors-get', function ( data ) {
  
  var authors = DPEditor.article.getMeta ( 'authors' );
  
  if ( !authors ) {
    return [];
  }
  
  return authors; // array; List of authors    
} );

/**
 * article-authors-remove
 * 
 * Remove the given authors
 */
DPPAPI.bind ( 'article-authors-remove', function ( data ) {
  var authors = data.authors; // array; List of authors to remove  
  
  for ( a in authors ) {
    DPEditor.removeAuthor ( authors[a] );
  }
  
  return true;
} );

/**
 * article-authors-set
 * 
 * Set authors for the current article
 */
DPPAPI.bind ( 'article-authors-set', function ( data ) {
  var authors = data.authors; // array; List of authors  
  
  DPEditor.setAuthors ( authors );
  
  return true;
} );

/**
 * article-categories-add
 * 
 * Add the given categories
 */
DPPAPI.bind ( 'article-categories-add', function ( data ) {
  var categories = data.categories; // array; List of IDs for the categories to add  
  
  DPEditor.addCategories ( categories.join ( "," ) );
  
  return true;
} );

/**
 * article-categories-main-set
 * 
 * Set the main category of the current article
 */
DPPAPI.bind ( 'article-categories-main-set', function ( data ) {
  var category = data.category; // integer; ID of the category to set as main category  
  
  DPEditor.setMainCategory ( category );
  
  return true;
} );

/**
 * article-categories-remove
 * 
 * Remove the given categories
 */
DPPAPI.bind ( 'article-categories-remove', function ( data ) {
  var categories = data.categories; // array; List of IDs for the categories to remove  
  
  DPEditor.removeCategories ( categories.join ( "," ) );
  
  return true;
} );

/**
 * article-categories-selected-get
 * 
 * Get selected categories
 */
DPPAPI.bind ( 'article-categories-selected-get', function ( data ) {
  
  var categories = DPEditor.article.getMeta ( 'categories' );
  
  if ( !categories ) {
    return [];
  }
  
  return categories; // array; List of IDs for the selected categories    
} );

/**
 * article-categories-selected-set
 * 
 * Set selected categories
 */
DPPAPI.bind ( 'article-categories-selected-set', function ( data ) {
  var categories = data.categories; // array; List of IDs for the selected categories  
  
  DPEditor.setCategories ( categories.join ( "," ) );
  
  return true;
} );

/**
 * article-content-get
 * 
 * Get the current article content
 */
DPPAPI.bind ( 'article-content-get', function ( data ) {
  
  return DPEditor.article.content; // string; The current article content    
} );

/**
 * article-content-set
 * 
 * Set the content of the current article
 */
DPPAPI.bind ( 'article-content-set', function ( data ) {
  var content = data.content; // string; The new content of the article  
  
  DPEditor.article.content = content;
  DPArticleRender.render ( DPEditor.article );
  
  return true;
} );

/**
 * article-id-get
 * 
 * Get the ID of the current article
 */
DPPAPI.bind ( 'article-id-get', function ( data ) {
  
  return DPEditor.article.id; // int; ID of the current article    
} );

/**
 * article-metainfo-clear
 * 
 * Clear the meta info summary
 */
DPPAPI.bind ( 'article-metainfo-clear', function ( data ) {
  
  this.setTags ( '', true );
  this.setCategories ( '', true );
  this.setSource ( null, true );
  this.setStatus ( 'draft', true );
  this.setPublishedDatetime ( '', true );
  this.setAuthors ( '', true );
  this.setAwaitingResponseFromUsers ( '', true );
  this.setPendingMessage ( '', true );
  //this.setRevisionHistory(null);
  
  return true;
} );

/**
 * article-published-get
 * 
 * Get the published date of the current article
 */
DPPAPI.bind ( 'article-published-get', function ( data ) {
  
  return DPEditor.article.getMeta ( 'publishedTimestamp' ); // string; The published date of the current article    
} );

/**
 * article-published-set
 * 
 * Set the published date of the current article
 */
DPPAPI.bind ( 'article-published-set', function ( data ) {
  var published = data.published; // string; What to set the published date to  
  
  if ( !published ) {
    return false;
  }
  
  var splitDate = published.split ( " " );
  var ymd = splitDate[0].split ( ":" );
  var hms = splitDate[1].split ( ":" );
  var d = new Date ();
  d.setYear ( parseInt ( ymd[0], 10 ) );
  d.setMonth ( parseInt ( ymd[1], 10 ) - 1 );
  d.setDate ( parseInt ( ymd[2], 10 ) );
  d.setHours ( parseInt ( hms[0], 10 ) );
  d.setMinutes ( parseInt ( hms[1], 10 ) );
  if ( parseInt ( hms[2], 10 ) > 0 ) {
    d.setSeconds ( parseInt ( hms[2], 10 ) );
  }
  DPEditor.article.setMeta ( 'publishedTimestamp', d.getTime () * 1000 );
  DPArticleRender.renderMetaStatus ( DPEditor.article );
  
  return true;
} );

/**
 * article-source-get
 * 
 * Get the source of the current article
 */
DPPAPI.bind ( 'article-source-get', function ( data ) {
  
  return DPEditor.article.getMeta ( 'source' ); // string; The source of the current article    
} );

/**
 * article-source-set
 * 
 * Set the source of the current article
 */
DPPAPI.bind ( 'article-source-set', function ( data ) {
  var source = data.source; // string; What to set the source to  
  
  DPEditor.setSource ( source );
  
  return true;
} );

/**
 * article-status-get
 * 
 * Get the status of the current article
 */
DPPAPI.bind ( 'article-status-get', function ( data ) {
  
  return DPEditor.article.getMeta ( 'status' ); // string; The status of the current article    
} );

/**
 * article-status-set
 * 
 * Set the status of the current article
 */
DPPAPI.bind ( 'article-status-set', function ( data ) {
  var status = data.status; // string; What to set the status to  
  
  DPEditor.article.setMeta ( 'status', status );
  DPArticleRender.renderMetaStatus ( DPEditor.article );
  
  return true;
} );

/**
 * article-tags-add
 * 
 * Add the given tag to the tags of the current article
 */
DPPAPI.bind ( 'article-tags-add', function ( data ) {
  var tag = data.tag; // string; Tag to add  
  
  DPEditor.addTag ( tag );
  DPArticleRender.renderMetaTags ( DPEditor.article );
  
  return true;
} );

/**
 * article-tags-get
 * 
 * Get the tags for the current article
 */
DPPAPI.bind ( 'article-tags-get', function ( data ) {
  
  var tags = DPEditor.article.getMeta ( 'tags' );
  
  if ( !tags ) {
    return [];
  }
  
  return tags; // Array; All tags used in the article    
} );

/**
 * article-tags-remove
 * 
 * Remove the given tag from the tags of the current article
 */
DPPAPI.bind ( 'article-tags-remove', function ( data ) {
  var tag = data.tag; // string; Tag to remove  
  
  DPEditor.removeTag ( tag );
  DPArticleRender.renderMetaTags ( DPEditor.article );
  
  return true;
} );

/**
 * article-tags-set
 * 
 * Set the tags for the current article
 */
DPPAPI.bind ( 'article-tags-set', function ( data ) {
  var tags = data.tags; // array; Tags to set  
  
  DPEditor.setTags ( tags.join ( "," ) );
  DPArticleRender.renderMetaTags ( DPEditor.article );
  
  return true;
} );

/**
 * article-type-get
 * 
 * Get the type of the current article
 */
DPPAPI.bind ( 'article-type-get', function ( data ) {
  
  return DPEditor.article.getArticletypeId (); // integer; The ID of the type of the current article    
} );

/**
 * article-type-set
 * 
 * Set the article type for the current article
 */
DPPAPI.bind ( 'article-type-set', function ( data ) {
  var articletype = data.articletype; // integer; The new article type of the article  
  
  DPEditor.article.setArticletypeId ( articletype );
  
  return true;
} );