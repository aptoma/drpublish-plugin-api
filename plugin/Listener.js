/**
 * This class should be used to create a "listener" that should be
 * notified on events that occur in the article
 * 
 * Should be used like this:
 * 
 * DP.addListener({
 *     statusChange: function() {
 *         alert('user changed status!');
 *     }
 * });
 */
Listener = Class.create(
{
	/**
	 * Constructor for this class
	 */
	initialize: function(inst, options)
	{
		this.DP = inst;
		if (typeof(inst) == 'object') {
			this.windowId = this.DP.getWindow().frameElement.id;
		} else {
			this.windowId = inst;
		}
		this.id = this.windowId + '-' + new Date().getTime();
		
		if (this.windowId.match("plugin-")) {
			Plugins.addListener(this);
		}
		
		this.options = Object.extend({
			beforeLoaded: null,
			afterLoaded: null,
			editorReady: null,
			beforeCreated: null,
			afterCreated: null,
			beforeSave: null,
			afterSave: null,
			beforePublished: null,
			afterPublished: null,
			beforeDelete: null,
			afterDelete: null,
			addTag: null,
			removeTag: null,
			addAwaitingResponseFromUser: null,
			removeAwaitingResponseFromUser: null,
			addAuthor: null,
			removeAuthor: null,
			modifiedContent: null,
			modifiedSource: null,
			modifiedStatus: null,
			modifiedCategory: null,
			modifiedPublishedDate: null,
			modifiedPendingMessage: null,
			beforePreview: null,
			afterPreview: null
		}, options || {});

		Listeners.add(this);
	},
	
	/**
	 * Run the given callback
	 *
	 * @param string Name of the callback to run
	 */
	run: function(name)
	{
		var args = Array.prototype.slice.call(arguments);
		args.shift();
		var status = true;
		if (this.options[name] && typeof(this.options[name]) == 'function') {
			//console.log('Running callback for event: ' + name + ' (' + this.id + ')');
			status = this.options[name].apply(this, args);
			if (typeof(status) == 'undefined') {
				status = true;
			}
		}
		return status;
	},
	
	/**
	 * Remove and unregister the listener
	 */
	remove: function()
	{
		Listeners.remove(this);
	}
});
