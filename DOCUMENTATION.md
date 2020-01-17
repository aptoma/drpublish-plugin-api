# @aptoma/drpublish-plugin-api *3.12.5*



### js/PluginAPI.js


#### Api() 

Namespace for all public DrPublish methods available from plugins.






##### Returns


- `Void`



#### Api.request(callSpec, data, callback) 

Dispatches a request to DrPublish, and returns the reply to callback On error, notifies all error listeners based on the index .type of the thrown object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callSpec | `String`  | What do you want to call? | &nbsp; |
| data | `Object`  | The data attached to the request | &nbsp; |
| callback | `Function`  | The function to call upon return | &nbsp; |




##### Returns


- `Void`



#### Api.openTagCreationDialog(tag, callback) 

Creates a new tag




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tag | `String`  | The tag to create | &nbsp; |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### Api.reloadIframe() 

Reloads the plugins's iframe






##### Returns


- `Void`



#### Api.getPluginName() 

Get the name of the loaded plugin






##### Returns


- `String`  The name of the plugin, or false if it couldn't be detected



#### Api.getAppName() 

Get the name of the loaded plugin






##### Returns


- `String`  The name of the plugin, or false if it couldn't be detected



#### Api.setPluginName(name) 

Set the name of the plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | The name of the plugin | &nbsp; |




##### Returns


- `Void`



#### Api.setAppName(name) 

Set the name of the plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | The name of the plugin | &nbsp; |




##### Returns


- `Void`



#### Api.showInfoMsg(msg) 

Show info-message to the user




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `String`  | Message to be displayed | &nbsp; |




##### Returns


- `Void`



#### Api.showWarningMsg(msg) 

Show warning-message to the user




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `String`  | Message to be displayed | &nbsp; |




##### Returns


- `Void`



#### Api.showErrorMsg(msg) 

Show error-message to the user




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `String`  | Message to be displayed | &nbsp; |




##### Returns


- `Void`



#### Api.showLoader(msg) 

Show the loader




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg | `String`  | Message to display in progress loader | &nbsp; |




##### Returns


- `Void`



#### Api.hideLoader() 

Hide the loader






##### Returns


- `Void`



#### Api.__loadArticleRevision(id, callback)  *private method*

Loads an old revision of an article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `Number`  | The id of the revision to load | &nbsp; |
| callback | `Function`  | The function to call when the new revision has been loaded | &nbsp; |




##### Returns


- `Void`



#### Api.createTag(tag, callback) 

Creates a new tag




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tag | `String`  | JSON object with the tag to create, must contain tagTypeId and name properties | &nbsp; |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### Api.searchDrLib(data, callback) 

Sends a query to DrLib




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | Object with three properties; 'query' which is the query to send to DrLib, 'success' which is the callback to execute on success, and 'secure' a boolean to add the internal API key to the query and thus allow searching on unpublished article. This callback's parameter is an object which is the query result as an object. See the json output of DrLib to learn more about this object | &nbsp; |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Examples

```javascript
PluginAPI.searchDrLib({
     query: 'articles.json?q=awesome',
     secure: true,
     success: function(data) {
         data.items.forEach(doStuffWithArticle);
     },
     error: function(data) {
         console.warn('something went wrong');
     }
})
```


##### Returns


- `Void`



#### Api.generateArticleUrl(id, callback) 

Generates an url to a published article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | The id of the article to generate url for | &nbsp; |
| callback | `Function`  | function(String), where the parameter is the generated url | &nbsp; |




##### Returns


- `Void`



#### Api.extendApi(group, name, action) 

Extends the PluginAPI with custom functionality that other plugins can use




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| group | `String`  | Group name for functionality to add | &nbsp; |
| name | `String`  | Name of the specific function to add | &nbsp; |
| action | `Function`  | function(Object) Function to call when the API is invoked, recieves one parameter as given in PluginAPI.callExtendedApi and return value is passed back to the caller | &nbsp; |




##### Returns


- `Void`



#### Api.callExtendedApi(group, name, data, callback) 

Call the extended PluginAPI




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| group | `String`  | Group name for functionality to call | &nbsp; |
| name | `String`  | Name of the specific function to call | &nbsp; |
| data | `Object`  | Data object to pass as parameter to the api call | &nbsp; |
| callback | `Function`  | function(Object) Function to recieve the API response, parameter is the response from the API call | &nbsp; |




##### Returns


- `Void`



#### Api.getCurrentUser(callback) 

Gets logged in user




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object) | &nbsp; |




##### Returns


- `Void`



#### Api.getConfiguration(callback) 

Get configuration information about the plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object) | &nbsp; |




##### Returns


- `Void`



#### Api.getDrPublishConfiguration(callback) 

Get DrPublish configuration




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object) | &nbsp; |




##### Returns


- `Void`



#### Api.setConfiguration(config, options, callback) 

Set configuration information about the plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| config | `Object`  | The configuration object to save | &nbsp; |
| options | `Object`  | Object, can have three keys.      'onlyPublication' (boolean) If true the configuration is set for the current publication only<br>     'success' (function) Called if the configuration was saved successfully<br>     'error' (function) Called if there was an error, recieves and error object as first parameter | &nbsp; |
| callback | `Function`  | function() | &nbsp; |




##### Returns


- `Void`



#### Api.emit(name, data) 

Emits an event to DrPublish, and possibly other apps




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | Name of the event | &nbsp; |
| data | `String`  | Data object to send with the event | &nbsp; |




##### Returns


- `Void`



#### Api.on(name, callback) 

Listen for an event. If the callback returns false the event may cancel continued actions, e.g beforeSave can cancel article save. Look at documentation for Listeners to learn more.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | Name of the event | &nbsp; |
| callback | `Function`  | function(Object) Function to call when the event is triggered. Recieves one data object parameter of the form {source: <source plugin name or DrPublish>, data: <data object>} | &nbsp; |




##### Returns


- `Void`



#### Api.increaseRequiredActionCounter(callback) 

Increase the counter of actions required by the user, used to tell the user that the plugin requires input of some kind




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object) function to call once the counter has been increased, returns the new counter value | &nbsp; |




##### Returns


- `Void`



#### Api.decreaseRequiredActionCounter(callback) 

Decrease the counter of actions required by the user, used to tell the user that the plugin requires input of some kind




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object) function to call once the counter has been decrease, returns current counter value | &nbsp; |




##### Returns


- `Void`



#### Api.clearRequiredActionCounter(callback) 

Clear the counter of actions required by the user, used to tell the user that the plugin requires input of some kind




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object) function to call once the counter has been cleared | &nbsp; |




##### Returns


- `Void`



#### Api.setRequiredActionCounter(count, callback) 

Set the counter of actions required by the user, used to tell the user that the plugin requires input of some kind




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| count | `Number`  | The value to set the counter to | &nbsp; |
| callback | `Function`  | function(Object) function to call once the counter has been cleared | &nbsp; |




##### Returns


- `Void`



#### Api.create()  *private method*

Create a new instance of the Api class






##### Returns


- `Object`  



#### Api.createEmbeddedObject(typeId, callback) 

Create an embedded object of the given type




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| typeId | `Number`  | Type Id of the embedded object to create | &nbsp; |
| callback | `Function`  | function(embeddedObjectId) called once the object has been created, first parameter is the new embedded object id | &nbsp; |




##### Returns


- `Void`



#### Api.getEmbeddedObjectTypes(callback) 

Get information about the available embedded object types




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function([Object]) recieves an array with objects describing the available embedded object types in the form of `{typeId: 'embedded object type id', cssClass: 'css class used to style the objects'}` | &nbsp; |




##### Returns


- `Void`



#### Api.giveFocus(pluginName, argument, start) 

Gives focus to another plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| pluginName | `String`  | The name of the plugin to recieve focus | &nbsp; |
| argument | `Object`  | Optional option argument to pass along to the plugin recieving focus | &nbsp; |
| start | `Boolean`  | Flag to decide if the plugin should be started if it has not been loaded previously, default true | &nbsp; |




##### Returns


- `Boolean`  



#### Api.hide() 

Hide the plugin, so it is no longer visible on the list of open plugins






##### Returns


- `Boolean`  



#### Api.createModal(content, options) 

<p>Creates a jQuery UI modal in the main editor window, detached from the plugin itself. Modals are unique on a
per-plugin basis, meaning that a plugin can only have a single modal at a time. Creating a new modal will
overwrite the previous.</p>

<a href="http://api.jqueryui.com/dialog">See the official documentation for a list of available options.</a></p>

<p>Note that you do not have direct access to the DOM of the modal. Use the provided helper methods to
manipulate or read from the modal:
  <ul>
    <li><a href="#closeModal">closeModal</a></li>
    <li><a href="#updateModal">updateModal</a></li>
    <li><a href="#getModalInputs">getModalInputs</a></li>
  </ul>
</p>




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| content | `String`  | An HTML string | &nbsp; |
| options | `Object`  | A standard jQuery UI options object. | &nbsp; |




##### Examples

```javascript

PluginAPI.createModal('<h1>This is a modal</h1>', {
  buttons: {
    Ok: function () {
      alert('Ok!');
    }
  }
});

PluginAPI.updateModal('<h1>This is the same modal</h1>');

PluginAPI.createModal('<h1>This is a brand new modal</h1>', {
  buttons: {
    cancel: function() {
      PluginAPI.closeModal(true);
    }
  }
});
```


##### Returns


- `Boolean`  



#### Api.updateModal(content) 

Updates the HTML content of a live modal. Has no effect if the modal does not exist.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| content | `String`  | An HTML string | &nbsp; |




##### Returns


- `Boolean`  



#### Api.closeModal(destroy) 

Closes and optionally deletes the modal. Has no effect if the modal does not exists.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| destroy | `Boolean`  | Whether or not to delete the modal | &nbsp; |




##### Returns


- `Boolean`  



#### Api.getModalInputs(callback) 

Returns the values of all input or select elements within a modal.

The values are keyed by one of the following properties in order of priority: element ID, element name
or input type + index.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  |  | &nbsp; |




##### Examples

```javascript
Given a modal with the following HTML content:

 <form>
     <input type="number">
     <input name="name" type="text">
     <select id="languages">
         <option selected>en</option>
         <option>no</option>
     </select>
 </form>

 getModalInputs would return:

 {
     "number-0": {VALUE}
     "name": {VALUE},
     "languages": "en"
 }
```


##### Returns


- `Void`




### js/AH5Communicator.js


#### module.exports(PluginAPI) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| PluginAPI | `Api`  |  | &nbsp; |




##### Returns


- `AH5Communicator`  



#### selectedPluginElement() 








##### Returns


- `Void`



#### pluginElementSelected(elementData) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| elementData | `selectedPluginElementData`  |  | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getActiveEditor(callback) 

Get name of current active editor




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `function`  | function(String) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.registerMenuAction(action, callback) 

Registers/Modifies a context menu items for a plugin element
The object send should have the following structure




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| action | `Object`  | The action object | &nbsp; |
| callback | `function`  | function() | &nbsp; |




##### Examples

```javascript
PluginAPI.Editor.registerMenuAction({
	  label: 'label in the menu',
	  icon: '[Optional] url to possible icon image',
	  trigger: '[Optional] css selector, only show menu element when this matches the element',
	  callback: function(id, clickedElementId) {
		  // callback function
		  // first parameter is id of the plugin element
		  // second paramter is id of closest element to the trigger element that has an id
		  //	  in code: $(event.triggerElement).closest('[id]').attr('id');
	  }
})
```


##### Returns


- `Void`



#### AH5Communicator.registerHoverAction(action, callback) 

Adds a mouseover action to plugin elements




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| action | `function`  | to perform | &nbsp; |
| callback | `function`  | function(String) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getSelectedPluginElement(callback) 

Gets the selected plugin element from the editor




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `function`  | function(String) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.directionalCastle(elementId, direction, callback) 

Swap positions between the provided element and the adjacent one
in the specified direction
PluginAPI.Editor.directionalCastle({
 elementId: 'the provided element id',
 direction: 'forward/backward'
})




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| elementId | `String`  | DOM element id | &nbsp; |
| direction | `String`  | Direction | &nbsp; |
| callback | `function`  |  | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.registerMenuActionGroup(group, callback) 

Registers/Modifies a group of items to in the context menu
The object send should have the following structure




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| group | `Object`  | The action object | &nbsp; |
| callback | `function`  | function() | &nbsp; |




##### Examples

```javascript
PluginAPI.Editor.registerMenuActionGroup({
	  label: 'label for the group in the menu',
	  icon: '[Optional] url to possible icon image',
	  actions: [
		  {
			  label: 'label for the action #1',
			  callback: function(id, clickedElementId) {
				  // same as for registerMenuAction
			  }
		  },
		  {
			  label: 'label for the action #2',
			  callback: function(id, clickedElementId) {
				  // same as for registerMenuAction
			  }
		  }
	  ]
})
```


##### Returns


- `Void`



#### AH5Communicator.getEditorType(callback) 

Retrieves the type of editor that currently has focus




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `function`  | function(String) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.replaceElementById(id, element, callback) 

Replace an element in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| element | `String`  | The new element | &nbsp; |
| callback | `function`  | function(Boolean), called after replacement is done | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.replacePluginElementById(id, element, callback) 

Replace a plugin element in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| element | `String`  | The new element | &nbsp; |
| callback | `function`  | function(Boolean), called after replacement is done | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.setElementContentById(id, content, callback) 

Set the content of an element in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| content | `String`  | The new content | &nbsp; |
| callback | `function`  | function(Boolean), called when done | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.deleteElementById(id, callback) 

Delete an element in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| callback | `function`  | function(Boolean), called after deletion is done | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getHTMLById(id, callback) 

Get HTML code of an element




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | The element id | &nbsp; |
| callback | `function`  | function(String), html content of the element | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getHTMLBySelector(selector, callback) 

Get HTML code of all elements that match the selector




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| selector | `String`  | The CSS selector | &nbsp; |
| callback | `function`  | function([String]), html content of matching elements | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getCategories(callback) 

Get all categories




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function([Object Category]), list of Category objects with id, name and pid | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getParentCategories(category, callback) 

Returns all the parent categories of the given category




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| category | `Object`  | The category to find parents of | &nbsp; |
| callback | `Function`  | function([Object Category]), array of parent Category objects | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getParentIds(id, selector, callback) 

Returns all the parent elements that match the selector




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of element to find parents of | &nbsp; |
| selector | `String`  | Selector to filter parent elements with | &nbsp; |
| callback | `Function`  | function([String]), array of ids | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getTagTypes(callback) 

Retrieve information about all tagtypes




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function([Object Tagtype]), array of tagtypes with id, name and config object | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getTagType(id, callback) 

Get information about the given tagtype




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | The element id | &nbsp; |
| callback | `Function`  | function(Object Tagtype), tagtype object with id, name and config object | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.clear(callback) 

Clears the editor contents




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.insertString(string, callback) 

Insert a string into the editor




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| string | `String`  | The string that should be inserted | &nbsp; |
| callback | `Function`  | function(String), id of the newly inserted element if it has one | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.insertElement(element, options[, callback]) 

Insert an element into the editor

Note that the HTML of the element is what will be transferred, and nothing else!
The element will be given the class dp-plugin-element, and given a unique ID (if none is present)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| element | `Element`  | The element that should be inserted | &nbsp; |
| options | `Object` `Function`  | (can be omitted) Options object, supports option 'select' - set to true to automatically select the inserted element | &nbsp; |
| callback | `Function`  | function(String), id of the newly inserted element | *Optional* |




##### Returns


- `Void`



#### AH5Communicator.removeClasses(id, classes, callback) 

Remove classes from the element an element in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| classes | `Array`  | Array of class names | &nbsp; |
| callback | `function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.addClasses(id, classes, callback) 

Add new classes to an element




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| classes | `Array`  | Array of class names | &nbsp; |
| callback | `function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.markAsActive(id, callback) 

Mark an element as currently selected (green border with default styling)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Id of the element | &nbsp; |
| callback | `function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.setAttributeById(id, attribute, value, callback) 

Sets the attribute of the element with the given ID to value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | The ID of the element to set the attribute on | &nbsp; |
| attribute | `String`  | The attribute to set | &nbsp; |
| value | `String`  | What to set the attribute to | &nbsp; |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.setStyleById(id, attribute, value, callback) 

Sets a style of the element with the given ID to value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | The ID of the element to set the attribute on | &nbsp; |
| attribute | `String`  | The style attribute to set | &nbsp; |
| value | `String`  | What to set the attribute to | &nbsp; |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.initMenu(menus, callback) 

Initialize pre registered menus

Available options are: simplePluginMenu, editContext, deleteButton, floatButtons




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| menus | `Array`  | Array of menu names | &nbsp; |
| callback | `Function`  | function(Boolean) | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.openPluginElementEditor(id) 

Opens the plugin editor for a given element.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| id | `String`  | Plugin element ID | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getTotalWordCount(callback) 

Returns the total number of words in the currently open article.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | Receives the total word count as its single parameter | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.getTotalCharCount(callback) 

Returns the total number of characters in the currently open article.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | Receives the total character count as its single parameter | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.updateAssetOption(dpArticleId, key, value, callback) 

Update one data option of the referenced embedded asset




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dpArticleId | `Number`  | DrPublish's embedded asset id | &nbsp; |
| key | `String`  | Name of the property | &nbsp; |
| value | `String`  | Value of the property | &nbsp; |
| callback | `Function`  | Receives the total character count as its single parameter | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.updateAssetData(data, callback) 

Update all asset data of the referenced embedded asset




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | Updated data | &nbsp; |
| callback | `Function`  | Receives the total character count as its single parameter | &nbsp; |




##### Examples

```javascript
 var data = {
  internalId: assetDpArticleId,
  assetElementId: activeAssetId,
  assetType: 'picture',
  assetSource: PluginAPI.getPluginName(),
  resourceUri: fullsizeUrl,
  previewUri: fullsizeUrl,
  renditions: {
      highRes: {uri: fullsizeUrl},
      thumbnail: {uri: thumbnailUrl}
  },
  options: {}
}
PluginAPI.Editor.updateAssetData(data);
```


##### Returns


- `Void`



#### AH5Communicator.getAssetData(dpArticleId, callback) 

Get all data option of the referenced embedded asset




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| dpArticleId | `Number`  | DrPublish's embedded asset id | &nbsp; |
| callback | `Function`  | Receives the total character count as its single parameter | &nbsp; |




##### Returns


- `Void`



#### AH5Communicator.insertNestedAsset(parentElementId, markup, data, callback) 

Insert an embedded asset inside of an existing one




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parentElementId | `Number`  | DOM element id of the receiving asset | &nbsp; |
| markup | `String`  | HTML to inject | &nbsp; |
| data | `Object`  | Asset data | &nbsp; |
| callback | `Function`  | Receives the total character count as its single parameter | &nbsp; |




##### Examples

```javascript
var title = response.data.title ? response.data.title : '';
var caption = response.data.description ? response.data.description : '';
var credit = response.data.byline ? response.data.byline : '';
var source = response.data.source ? response.data.source : '';
var markup = '<div class="dp-article-image-container"><img src="' + fullsizeUrl + '" /></div>';
markup += '<div class="dp-article-image-headline" data-dp-editable-type="textfield" data-dp-editable-name="headline">' + title + '</div>';
markup += '<div class="dp-article-image-caption" data-dp-editable-type="html" data-dp-editable-name="caption">' + caption + '</div>';
markup += '<div class="dp-article-image-credit" data-dp-editable-type="textfield" data-dp-editable-name="credit">' + credit + '</div>';
 markup += '<div class="dp-article-image-source" data-dp-editable-type="textfield" data-dp-editable-name="source">' + source + '</div>';
var options = response.data.options ? response.data.options : {};
var callback = function () {
  // do something here
 };
var rends = renditions || {};
rends.highRes = {uri: fullsizeUrl};
rends.preview = {uri: fullsizeUrl};
var drpdata = {
              embeddedTypeId: 5,
              isMultiple: true,
              assetType: 'picture',
              externalId: id,
              assetClass: 'dp-picture',
              assetSource: 'images',
              resourceUri: fullsizeUrl,
              previewUri: fullsizeUrl,
              renditions: rends,
              options: options
          };
var  insertNested = function () {
  PluginAPI.Editor.insertNestedAsset(
      selectedSlideshowAsset.id,
      markup,
      drpdata
};
PluginAPI.Editor.getSelectedPluginElement(insertNested);
```


##### Returns


- `Void`



#### AH5Communicator.insertEmbeddedAsset(markup, data, callback) 

Insert an embedded asset




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| markup | `String`  | HTML to inject | &nbsp; |
| data | `Object`  | Asset data | &nbsp; |
| callback | `Function`  | Receives the total character count as its single parameter | &nbsp; |




##### Examples

```javascript
var title = response.data.title ? response.data.title : '';
var caption = response.data.description ? response.data.description : '';
var credit = response.data.byline ? response.data.byline : '';
var source = response.data.source ? response.data.source : '';
var markup = '<div class="dp-article-image-container"><img src="' + fullsizeUrl + '" /></div>';
markup += '<div class="dp-article-image-headline" data-dp-editable-type="textfield" data-dp-editable-name="headline">' + title + '</div>';
markup += '<div class="dp-article-image-caption" data-dp-editable-type="html" data-dp-editable-name="caption">' + caption + '</div>';
markup += '<div class="dp-article-image-credit" data-dp-editable-type="textfield" data-dp-editable-name="credit">' + credit + '</div>';
 markup += '<div class="dp-article-image-source" data-dp-editable-type="textfield" data-dp-editable-name="source">' + source + '</div>';
var options = response.data.options ? response.data.options : {};
var callback = function () {
  // do something here
 };
var rends = renditions || {};
rends.highRes = {uri: fullsizeUrl};
rends.preview = {uri: fullsizeUrl};
var drpdata = {
              embeddedTypeId: 5,
              isMultiple: true,
              assetType: 'picture',
              externalId: id,
              assetClass: 'dp-picture',
              assetSource: 'images',
              resourceUri: fullsizeUrl,
              previewUri: fullsizeUrl,
              renditions: rends,
              options: options
          };
PluginAPI.Editor.insertEmbeddedAsset(markup, drpdata, callback);
```


##### Returns


- `Void`




### js/ArticleCommunicator.js


#### ArticleCommunicator() 

This class is used for communicating with the article, typically setting and getting values of metadata or in the article content itself.






##### Returns


- `Void`



#### ArticleCommunicator.focusPlugin(callback) 

Give focus to yourself




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Boolean), called as the plugin gets focus | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.focusApp() 

Give focus to yourself






##### Returns


- `Void`



#### ArticleCommunicator.startPlugin(name, options, callback) 

Start the given plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | Name of the plugin as defined on publication settings | &nbsp; |
| options | `Object`  | Options for initializing the plugin | &nbsp; |
| callback | `Function`  | function(Boolean), called after plugin is started | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.startApp() 








##### Returns


- `Void`



#### ArticleCommunicator.stopPlugin(name) 

Stop the given plugin




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | Name of the plugin, as defined on publication config | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.stopApp() 








##### Returns


- `Void`



#### ArticleCommunicator.getId(callback) 

Get the id of the article currently edited




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Int), id of the current article | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getPackageId(callback) 

Get the guid of the article package currently edited




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Int), id of the current article | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getPackageGuid(callback) 

Get the guid of the article package currently edited




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Int), id of the current article | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.clearMetaInfo(callback) 

Clear the meta information summary




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Boolean), called when meta data has been cleared | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getTags(callback) 

Get tags used in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function([Object Tag]), array with tags connected to an article | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getCustomMeta(name, callback) 

Retrieve custom meta value for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | Name of the custom meta value | &nbsp; |
| callback | `Function`  | function(Object), the parameter is an object containing the given custom meta value | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setCustomMeta(name, value, callback) 

Set custom meta value for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | Name of the meta value | &nbsp; |
| value | `Object`  | Value to set | &nbsp; |
| callback | `Function`  | function() | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setMetaChanged(callback) 

Marks article model as having meta data changes




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function() | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setTags(tags, save, callback) 

Set tags for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tags | `Array`  | List of tags that should be set | &nbsp; |
| save | `Boolean`  | Set to true to force save once the tags are updated | &nbsp; |
| callback | `Function`  | function(Boolean), called when tags have been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.addTags(tags, errorFunction, callback) 

Add tag for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tags | `Array`  | Tags to be added | &nbsp; |
| errorFunction | `Function`  | called if error | &nbsp; |
| callback | `Function`  | function(Boolean), called when tag has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.addTag(tag, errorFunction, callback) 

Add tag for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tag | `String`  | Tag to be added | &nbsp; |
| errorFunction | `Function`  | called if error | &nbsp; |
| callback | `Function`  | function(Boolean), called when tag has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.addTags(tags, errorFunction, callback) 

Add tags for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tags | `String`  | Tags to be added | &nbsp; |
| errorFunction | `Function`  | called if error | &nbsp; |
| callback | `Function`  | function(Boolean), called when tag has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.removeTag(tag, callback) 

Remove tag from article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| tag | `String`  | Tag to remove | &nbsp; |
| callback | `Function`  | function(Boolean), called when tag has been removed | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getSelectedCategories(callback) 

Get the selected categories




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function([String]), array with category ids | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.saveCategories(callback) 

Save the currently selected categories




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Boolean), called when categories has been saved | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setCategories(categories, callback) 

Set selected categories




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| categories | `Array`  | List of category IDs that should be set | &nbsp; |
| callback | `Function`  | function(Boolean), called when categories have been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.addCategories(categories, callback) 

Add the given categories to the list of categories




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| categories | `Array`  | List of category IDs to add | &nbsp; |
| callback | `Function`  | function(Boolean), called when the categories have been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.removeCategories(categories, callback) 

Remove the given categories from the list of categories




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| categories | `Array`  | List of category IDs to remove | &nbsp; |
| callback | `Function`  | function(Boolean), called when the categories have been removed | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setMainCategory(category, callback) 

Set the main category of the current article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| category | `Number`  | The ID of the category to set as the main category | &nbsp; |
| callback | `Function`  | function(Boolean), called when the main category has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getSource(callback) 

Get the source set for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(String), name of the source | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setSource(value, callback) 

Set the source for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `String`  | The new value to be set as source | &nbsp; |
| callback | `Function`  | function(Boolean), called when the source has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getStatus(callback) 

Get the status for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(String), current status | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setStatus(status, callback) 

Set the status for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| status | `String`  | The new status to be set (draft, waiting, published) | &nbsp; |
| callback | `Function`  | function(Boolean), called when the source has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getPublishedDatetime(callback) 

Get the published-date




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(String), current published datetime | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setPublishedDatetime(published, callback) 

Set the published-date




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| published | `String`  | Date to be set (YYYY-MM-DD HH:MM:SS) | &nbsp; |
| callback | `Function`  | function(Boolean), called when done | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getAuthors(callback) 

Get the authors set in the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function([String]), currently set authors | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setAuthors(authors, callback) 

Set authors for the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| authors | `Array`  | List of authors that should be set | &nbsp; |
| callback | `Function`  | function(Boolean), called when it has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.addAuthors(authors, callback) 

Add the given authors to the list of authors




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| authors | `Array`  | List of authors to add | &nbsp; |
| callback | `Function`  | function(Boolean), called when it has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.removeAuthors(authors, callback) 

Remove the given authors from the list of authors




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| authors | `Array`  | List of authors to remove | &nbsp; |
| callback | `Function`  | function([String]), author list as it is after the authors has been removed | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setKeywords(keywords, callback) 

Set the keyword-list on the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| keywords | `Array`  | List of keywords to add | &nbsp; |
| callback | `Function`  | Function to call when keywords have been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getKeywords(callback) 

Get the current set of keywords on the article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | Function to call with the result | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getCurrentContent(callback) 

Gets the current article content




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object Content) | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setCurrentContent(content, callback) 

Updates current article content




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| content | `String`  | The new content for the article | &nbsp; |
| callback | `Function`  | function(Boolean), called when it has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getArticletypeId(callback) 

Get the article type of the current article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Int) | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setArticletypeId(articletypeId, callback) 

Set the article type of the current article




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| articletypeId | `Number`  | The new article type of the article | &nbsp; |
| callback | `Function`  | function(Boolean), called when it has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.maximizePluginWindow(title, onClose) 

Maximize the plugin view




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| title | `String`  | Title to give the maximized view | &nbsp; |
| onClose | `function`  | Function to call when the window is closed/minimized | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.maximizeAppWindow() 








##### Returns


- `Void`



#### ArticleCommunicator.restorePluginWindow(callback) 

Restore the plugin pane to the default size




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `function`  | Callback to call after everything is done | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.restoreAppWindow() 

Restore the plugin pane to the default size






##### Returns


- `Void`



#### ArticleCommunicator.getByline(callback) 

Get the current byline




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `function`  | function(String), xml string with the current byline | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setByline(byline, save, callback) 

Set the byline




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| byline | `String`  | XML version of byline to use | &nbsp; |
| save | `Boolean`  | If true, force save after updating byline information | &nbsp; |
| callback | `Function`  | function(Boolean), called when it has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setGeolocations(geolocations, callback) 

Set geolocation




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| geolocations | `Object`  | The location to set | &nbsp; |
| callback | `Function`  | function(Boolean), called when it has been set | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getGeolocations(callback) 

Get geolocation




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | function(Object), retrieves the currently set geo location | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.getProperties(callback) 

Fetches a list of all properties available to an article.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | Callback called with an array of property objects. | &nbsp; |




##### Returns


- `Void`



#### ArticleCommunicator.setProperties(properties, callback) 

Updates and saves one or more property values. The input is a simple object with property names and their
new value. The supplied callback is called with an updated list of properties.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| properties | `Object`  | An object of property names and corresponding values. | &nbsp; |
| callback | `Function`  | Callback called with an updated list of properties. | &nbsp; |




##### Examples

```javascript
PluginAPI.Article.setProperties({
    fooProperty: "bar",
    barProperty: "foo"
}, function(properties) {
    // Returns a complete and updated list of properties.
})
```


##### Returns


- `Void`



#### ArticleCommunicator.setProperty(name, value, callback) 

Updates and saves a single property.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  | The property to update. | &nbsp; |
| value | `Object`  | The updated value. | &nbsp; |
| callback | `Function`  | Callback called with an updated list of properties. | &nbsp; |




##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
