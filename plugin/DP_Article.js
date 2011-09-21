/**
 * This class is used for communicating with the article in DOM, typically
 * setting and getting values of metadata or in the article content itself.
 * 
 * TODO: Find the necessity of getDocument, getContent, getAside, setContent
 */
var DP_Article = {
  
  /**
   * Start the given plugin
   * 
   * @param {String} name Name of the plugin from settings.php
   * @param {Object} options Options for initializing the plugin
   * @param {Function} callback The function to call when the plugin has been
   *          started
   */
  startPlugin : function ( name, options, callback ) {

    DP.request ( "plugin-start", {
      plugin : name,
      option : options
    }, callback );
  },
  
  /**
   * Stop the given plugin
   * 
   * @param {String} name Name of the plugin from settings.php
   * @param {Function} callback The function to call when the plugin has been
   *          stopped
   */
  stopPlugin : function ( name ) {

    DP.request ( "plugin-stop", {
      plugin : name
    }, callback );
  },
  
  /**
   * Get the id of the article currently edited
   * 
   * @param {Function} callback The function to call with the ID of the article
   */
  getId : function ( callback ) {

    DP.request ( 'article-id-get', null, callback );
  },
  
  /**
   * Clear the meta information summary
   * 
   * @param {Function} callback The function to call when info has been cleared
   */
  clearMetaInfo : function ( callback ) {

    DP.request ( "article-metainfo-clear", null, callback );
  },
  
  /**
   * Get tags used in the article
   * 
   * @param {Function} callback The function to call with all tags
   */
  getTags : function ( callback ) {

    DP.request ( "article-tags-get", null, callback );
  },
  
  /**
   * Set tags for the article
   * 
   * @param {String} tags Comma-separated list of tags that should be set
   * @param {Function} callback The function to call when tags have been set
   */
  setTags : function ( tags, callback ) {

    DP.request ( 'article-tags-set', {
      tags : tags
    }, callback );
  },
  
  /**
   * Add tag for the article
   * 
   * @param {String} tag Tag to be added
   * @param {Function} callback Function to call when tag has been added
   */
  addTag : function ( tag, callback ) {

    DP.request ( 'article-tags-add', {
      tag : tag
    }, callback );
  },
  
  /**
   * Remove tag from article
   * 
   * @param {String} tag Tag to remove
   * @param {Function} callback The function to call when tag has been removed
   */
  removeTag : function ( tag ) {

    DP.request ( 'article-tags-remove', {
      tag : tag
    }, callback );
  },
  
  /**
   * Get the selected categories
   * 
   * @param {Function} callback The function to call with the selected
   *          categories
   */
  getSelectedCategories : function ( callback ) {

    DP.request ( 'article-categories-selected-get', null, callback );
  },
  
  /**
   * Save the currently selected categories
   * 
   * @param {Function} callback The function to call when the categories have
   *          been saved
   */
  saveCategories : function ( callback ) {

    this.getSelectedCategories ( function ( categories ) {

      this.setCategories ( categories, callback );
    } );
  },
  
  /**
   * Set selected categories
   * 
   * @param {String} categories Comma-separated list of category IDs that should
   *          be set
   * @param {Function} callback The function to call when the categories have
   *          been set
   */
  setCategories : function ( categories, callback ) {

    DP.request ( 'article-categories-selected-set', {
      categories : categories
    }, callback );
  },
  
  /**
   * Add the given categories to the list of categories
   * 
   * @param {String} categories Comma-separated list of category IDs to add
   * @param {Function} callback The function to call when the categories have
   *          been added
   */
  addCategories : function ( categories, callback ) {

    DP.request ( 'article-categories-add', {
      categories : categories
    }, callback );
  },
  
  /**
   * Remove the given categories from the list of categories
   * 
   * @param {String} categories Comma-separated list of category IDs to remove
   * @param {Function} callback The function to call when the categories have
   *          been removed
   */
  removeCategories : function ( categories, callback ) {

    DP.request ( 'article-categories-remove', {
      categories : categories
    }, callback );
  },
  
  /**
   * Set the main category of the current article
   * 
   * @param {Integer} category The ID of the category to set as the main
   *          category
   * @param {Function} callback The function to call when the main category has
   *          been updated
   */
  setMainCategory : function ( category, callback ) {

    DP.request ( 'article-categories-main-set', {
      category : category
    }, callback );
  },
  
  /**
   * Get the source set for the article
   * 
   * @param {Function} callback The function to call with the source
   */
  getSource : function ( callback ) {

    DP.request ( 'article-source-get', null, callback );
  },
  
  /**
   * Set the source for the article
   * 
   * @param {String} value The new value to be set as source
   * @param {Function} callback The function to call when the source has been
   *          set
   */
  setSource : function ( value, callback ) {

    DP.request ( 'article-source-set', {
      source : value
    }, callback );
  },
  
  /**
   * Get the status for the article
   * 
   * @param {Function} callback The function to call with the status
   */
  getStatus : function ( callback ) {

    DP.request ( 'article-status-get', null, callback );
  },
  
  /**
   * Set the status for the article
   * 
   * @param {String} status The new status to be set (draft, waiting, published)
   * @param {Function} callback The function to call when the status has been
   *          set
   */
  setStatus : function ( status, callback ) {

    DP.request ( 'article-status-set', {
      status : status
    }, callback );
  },
  
  /**
   * Get the published-date
   * 
   * @param {Function} callback The function to call with the published date
   */
  getStatus : function ( callback ) {

    DP.request ( 'article-published-get', null, callback );
  },
  
  /**
   * Set the published-date
   * 
   * @param {String} published Date to be set (YYYY-MM-DD HH:MM:SS)
   * @param {Function} callback The function to call when the publication date
   *          has been set
   */
  setPublishedDatetime : function ( published, callback ) {

    DP.request ( 'article-published-set', {
      published : published
    }, callback );
  },
  
  /**
   * Get the authors set in the article
   * 
   * @param {Function} callback The function to call with the authors
   */
  getAuthors : function ( callback ) {

    DP.request ( 'article-authors-get', null, callback );
  },
  
  /**
   * Set authors for the article
   * 
   * @param {String} categories Comma-separated list of authors that should be set
   * @param {Function} callback The function to call when the authors have been set
   */
  setAuthors : function ( authors, callback ) {

    DP.request ( 'article-authors-set', {
      authors : authors
    }, callback );
  },
  
  /**
   * Add the given authors to the list of authors
   * 
   * @param {String} categories Comma-separated list of authors to add
   * @param {Function} callback The function to call when the authors have been added
   */
  addAuthors : function ( authors, callback ) {

    DP.request ( 'article-authors-add', {
      authors : authors
    }, callback );
  },
  
  /**
   * Remove the given authors from the list of authors
   * 
   * @param {String} categories Comma-separated list of authors to remove
   * @param {Function} callback The function to call when the authors have been removed
   */
  removeCategories : function ( authors, callback ) {

    DP.request ( 'article-authors-remove', {
      authors : authors
    }, callback );
  },
  
  /**
   * Gets the current article content
   * 
   * @param {Function} callback The function to call with the article contents
   */
  getCurrentContent : function ( callback ) {
    DP.request ( 'article-content-get', null, callback );
  },
  
  /**
   * Updates current article content
   * 
   * @param {String} content The new content for the article
   * @param {Function} callback The function to call when the contents have been updated
   */
  setCurrentContent : function ( content, callback ) {
    DP.request ( 'article-content-set', { content: content }, callback );
  },
  
  /**
   * Get the article type of the current article
   * 
   * @param {Function} callback The function to call with the type of the article
   */
  getArticletypeId : function ( callback ) {
    DP.request ( 'article-type-get', null, callback );
  },
  
  /**
   * Set the article type of the current article
   * 
   * @param {Integer} articletypeId The new article type of the article
   * @param {Function} callback The function to call when the article type has been changed
   */
  setArticletypeId : function ( articletypeId, callback ) {
    DP.request ( 'article-type-set', { articletype: articletypeId }, callback );
  }
};

DP.Article = DP_Article;