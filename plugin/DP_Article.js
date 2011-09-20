/**
 * This class is crated for the sole purpose of limiting the
 * access of Article-actions to Plugins.
 *
 * Should be used like this from plugins:
 * DP.Article.getTags();
 */
DP_Article = Class.create(Article_Base,
{	
	/**
	 * Constructor for this class
	 */
	initialize: function(inst)
	{
		this.DP = inst;
	}
});