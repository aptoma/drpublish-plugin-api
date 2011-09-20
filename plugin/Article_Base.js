/**
 * This class is used for communicating with the article in DOM, 
 * typically setting and getting values of metadata or in the
 * article content itself.
 * 
 * The class is extended to provide access to these functions to
 * plugins
 */

var Article_Base = Class.create({
	/**
	 * Constructor for this class
	 */
	initialize: function() {},
	
	/**
	 * Start the given plugin
	 * 
	 * @param string name of the plugin from settings.php
	 */
	startPlugin: function(name, options)
	{
		Plugins.start(name, options);
	},
	
	/**
	 * Stop the given plugin
	 * 
	 * @param string name of the plugin from settings.php
	 */
	stopPlugin: function(name) {
		Plugins.stop(name);
	},
	
	/**
	 * Get the id of the article currently edited
	 * 
	 * @return int
	 */
	getId: function()
	{
		return DPEditor.article.id;
	},
	
	/**
	 * Get the document object for the editor 
	 * 
	 * @return HTMLDocument
	 */ 
	getDocument: function() {
		return tinyMCE.getInstanceById('editor-'+DPEditor.article.templateName+'-story').contentDocument;
	},
	
	/**
	 * Get the content of the editor
	 * 
	 * @return Array(string)
	 */
	getContent: function()
	{
		return DPEditor.article.content;
	},

	/**
	 * Get the aside content
	 * 
	 * @return Array(string)
	 */
	getAside: function()
	{
		return DPEditor.article.aside;
	},
	
	/**
	 * Set the content of the editor
	 * 
	 * @param string Content to be set
	 */
	setContent: function(contentXmlString)
	{
		if (!contentXmlString) {
			return;
		}
		var xmlDoc = xmlStringToDom(contentXmlString);
		var articleRoot = xmlDoc.getElementsByTagName('dp-article-content');
		if (articleRoot && articleRoot.length > 0) {
			articleRoot = articleRoot[0];
		} else {
			return;
		}
		elementNodes = xmlDoc.documentElement.childNodes;
		for (var i=0; i<elementNodes.length; i++) {
			var dpElement = elementNodes[i];
			if (dpElement && dpElement.nodeType == 1) {
				var content = '';
				for (var j=0; j<dpElement.childNodes.length; j++) {
					content += domToXmlString(dpElement.childNodes[j]);
				}
				var name = dpElement.tagName;
				DPEditor.article.content[name] = content;
			}
		}
		DPArticleRender.render(DPEditor.article);
	},

	/**
	 * Clear the meta information summary
	 */
	clearMetaInfo: function()
	{
		this.setTags('', true);
		this.setCategories('', true);
		this.setSource(null, true);
		this.setStatus('draft', true);
		this.setPublishedDatetime('', true);
		this.setAuthors('', true);
		this.setAwaitingResponseFromUsers('', true);
		this.setPendingMessage('', true);
		//this.setRevisionHistory(null);
	},
	
	/**
	 * Get tags used in the article
	 *
	 * @return array
	 */
	getTags: function()
	{
		return DPEditor.article.getMeta('tags');
	},
	
	/**
	 * Set tags for the article
	 * 
	 * @param string Comma-seperated list of tags that should be set
	 */
	setTags: function(tags)
	{
		DPEditor.setTags(tags);
		DPArticleRender.renderMetaTags(DPEditor.article);
	},
	
	/**
	 * Add tags for the article
	 * 
	 * @param string Tag to be added
	 */
	addTag: function(tag)
	{
		DPEditor.addTag(tag);
		DPArticleRender.renderMetaTags(DPEditor.article);
	},

	removeTag: function(tag)
	{
		DPEditor.removeTag(tag);
		DPArticleRender.renderMetaTags(DPEditor.article);
	},
		
	/**
	 * Get the selected categories
	 * 
	 * @return object
	 */
	getSelectedCategories: function()
	{
		return DPEditor.article.getMeta('categories');
	},
	
	saveCategories: function()
	{
		this.setCategories(this.getSelectedCategories());
	},
	
	/**
	 * Set selected categories
	 * 
	 * @param string Comma-seperated list of category ids that should be set
	 */
	setCategories: function(categories)
	{
		DPEditor.setCategories(categories);
	},

	addCategories: function(categories)
	{
		DPEditor.addCategories(categories);
	},

	addCategory: function(category)
	{
		DPEditor.addCategory(category);
	},

	removeCategory: function(category)
	{
		DPEditor.removeCategory(category);
	},

	removeCategories: function(categories)
	{
		DPEditor.removeCategories(categories);
	},

	setMainCategory: function(category)
	{
		DPEditor.setMainCategory(category);
	},
	
	/**
	 * Get the source set for the article
	 * 
	 * @return string
	 */
	getSource: function()
	{
		return DPEditor.article.getMeta('source');
	},

	/**
	 * Set the source for the article
	 * 
	 * @param string The new value to be set
	 */	
	setSource: function(value)
	{
		DPEditor.setSource(value);
	},
	
	/**
	 * Get the selected status for the article
	 * 
	 * @return string
	 */
	getStatus: function()
	{
		return DPEditor.article.getMeta('status');
	},
	
	/**
	 * Set the status for the article
	 * 
	 * @param string The new status to be set (draft, waiting, published)
	 */
	setStatus: function(status)
	{		
		DPEditor.article.setMeta('status', status);
		DPArticleRender.renderMetaStatus(DPEditor.article);
	},
	
	
	
	/**
	 * Get the published-date
	 * 
	 * @return string
	 */
	getPublishedDatetime: function()
	{
		return DPEditor.article.getMeta('publishedTimestamp');
	},
	
	/**
	 * Set the published-date
	 * 
	 * @param string Date to be set (YYYY-MM-DD HH:MM:SS) 
	 */
	setPublishedDatetime: function(_date, readOnly)
	{
		if (!_date) {
			return false;
		}
		var splitDate = _date.split(" ");
		var ymd = splitDate[0].split(":");
		var hms = splitDate[1].split(":");
		var d = new Date();
		d.setYear(parseInt(ymd[0],10));
		d.setMonth(parseInt(ymd[1],10)-1);
		d.setDate(parseInt(ymd[2],10));
		d.setHours(parseInt(hms[0],10));
		d.setMinutes(parseInt(hms[1],10));
		if (parseInt(hms[2],10) > 0) {
			d.setSeconds(parseInt(hms[2],10));
		}
		DPEditor.article.setMeta('publishedTimestamp', d.getTime()*1000);
		DPArticleRender.renderMetaStatus(DPEditor.article);
	},
	
	/**
	 * Get the authors set in the article
	 * 
	 * @return array
	 */
	getAuthors: function()
	{
		return DPEditor.article.getMeta('authors');
	},
	
	/**
	 * Set authors for the article
	 * 
	 * @param string Comma-seperated list of authors that should be set
	 */
	setAuthors: function(authors, readOnly)
	{
		DPEditor.setAuthors(authors);
	},
	
	/**
	 * Add authors for the article
	 * 
	 * @param string Comma-seperated list of authors that should be added
	 */
	addAuthors: function(authors)
	{
		DPEditor.setAuthors(authors);
	},

	addAuthor: function(author)
	{
		DPEditor.addAuthor(author);
	},

	removeAuthor: function(author)
	{
		DPEditor.removeAuthor(author);
	},
	
	/**
	 * Get pending users for the article
	 * 
	 * @return array
	 */
	getAwaitingResponseFromUsers: function()
	{
		//return $F('awaiting-response-from-users').split(",").map(function(v) { return v.strip(); });
	},
	
	/**
	 * Set pending users for the article
	 * 
	 * @param string Comma-seperated list of users that should be set
	 */
	setAwaitingResponseFromUsers: function(users, readOnly)
	{
		// Listeners.notify('addAwaitingResponseFromUser', users);
		// $('awaiting-response-from-users').value = users;
		// if (!readOnly) AjaxController.post(MODULE_URL+'/ajax.php?do=saveWaitingUsers&id='+this.getId(), 'users='+users);
	},

	/**
	 * Set the waiting message
	 * 
	 * @param string Message
	 */
	setAwaitingResponseMessage: function(message, readOnly)
	{
		// $('message').value = message;
		// if (!readOnly) AjaxController.post(MODULE_URL+'/ajax.php?do=saveWaitingMessage&id='+this.getId(), 'message='+message);
	},

	/**
	 * Get the waiting message
	 */
	getAwaitingResponseMessage: function(message)
	{
	},
	
	/**
	 * Get pending message
	 * 
	 * @return string
	 */
	getPendingMessage: function()
	{
	},
	
	/**
	 * Set pending message
	 * 
	 * @param string Message to be set
	 */
	setPendingMessage: function(msg)
	{
	},
	
	
	/**
	 * Gets the current article content
	 */
	getCurrentContent: function() {
		return DPEditor.article.content;
	},
	
	/**
	 * Updates current article content
	 */
	setCurrentContent: function(content) {
		DPEditor.article.content = content;
		DPArticleRender.render(DPEditor.article);
	},
	
	/**
	 * Add pending users for the article
	 * 
	 * @param string Comma-seperated list of users that should be added
	 */
	addAwaitingResponseFromUsers: function(users)
	{
	},
	
	setArticletypeId: function(articletypeId)
	{
		DPEditor.article.setArticletypeId(articletypeId);
	},
	
	getArticletypeId: function()
	{
		return DPEditor.article.getArticletypeId();
	}
});
