/**
 * Will hold a list of listeners that are created and should be notified on events
 */
var Listeners = {

	listeners: [],
	notifyEnabled: true,
	
	notify: function(name)
	{
		var args = arguments;
		var status = true;
		if (this.notifyEnabled) {
			var debug = 'Listeners.notify(' + $A(args).inspect() + ')';
			this.listeners.each(function(listener) {
				if (!listener.run.apply(listener, args)) {
					status = false;
				}
			});
		}
		return status;
	},
	
	hasListener: function(listener)
	{
		var exists = false;
		this.listeners.each(function(obj) {
			if (obj == listener) {
				exists = true;
			}
		});
		return exists;
	},
	
	disableNotify: function()
	{
		this.notifyEnabled = false;
	},
	
	enableNotify: function()
	{
		this.notifyEnabled = true;
	},
	
	add: function(listener)
	{
		this.listeners.push(listener);
	},
	
	remove: function(listener)
	{
		var newListeners = [];
		this.listeners.each(function(obj) {
			if (obj == listener) {
				//console.log('Listener removed: ', listener.id);
				listener = null;
			} else {
				newListeners.push(obj);
			}
		});
		this.listeners = newListeners;
	}
};
