/**
 * This will be used by editor plugins to communicate with the editor
 *
 * Should be used like this:
 *
 * DP.Editor.insert('string');
 */
DP_Editor = Class.create({
	getCategories: function () {
		return DPEditor.categories;
	},

	increment: 0,

	/**
	 * Constructor for this class
	 */
	initialize: function (inst) {
		this.DP = inst;
	},

	getTagTypes: function() {
		return DPEditor.tagTypes;
	},

	getTagType: function(id) {
		if (DPEditor.tagTypes === null || typeof DPEditor.tagTypes !== 'object' || typeof DPEditor.tagTypes.length !== 'number') {
			return null;
		}
		for (var i=0; i<DPEditor.tagTypes.length; i++) {
			if ((parseInt(id, 10) > 0 && DPEditor.tagTypes[i].id == id) || (typeof id === 'string' && DPEditor.tagTypes[i].name == id)) {
				return DPEditor.tagTypes[i];
			}
		}
		return null;
	},

	/**
	 * Will clear the content in the editor
	 */
	clear: function () {
		tinyMCE.activeEditor.execCommand('mceSetContent', false, '');
		var name = editor.editorId.replace('editor-', '');
		DPEditor.article.update(name, editor.getContent());
		tinyMCE.activeEditor.nodeChanged();
	},

	/**
	 * Move cursor to the start
	 */
	moveToStart: function () {
		var ed = tinyMCE.activeEditor;

		if (!ed) {
			return false;
		}

		var root = ed.dom.getRoot();
		var firstnode = root.firstChild.firstChild;

		ed.selection.select(firstnode);
		ed.selection.collapse(true);

		return true;
	},

	/**
	 * Move cursor to the end
	 */
	moveToEnd: function () {
		var ed = tinyMCE.activeEditor;
		if (!ed) {
			return false;
		}

		var root = ed.dom.getRoot();
		var lastnode = root.childNodes[root.childNodes.length - 1];

		if (tinymce.isGecko) {
			// But firefox places the selection outside of that tag, so we need to go one level deeper:
			lastnode = lastnode.childNodes[lastnode.childNodes.length - 1];
		}

		ed.selection.select(lastnode);
		ed.selection.collapse(false);

		return true;
	},


	/**
	 * Insert content or element into the editor, main difference of the two being
	 * that if you insert an element, we will magically add the dp-plugin-element class
	 * to ensure you can modify it in the editor using the plugin-menu (left + right-align etc)
	 *
	 * @param string_or_element String|Object The HTML content or element that should be inserted
	 */
	insert: function (string_or_element, template, content) {
		//check active editor
		var activeEditorTemplate = DPEditor.getActiveEditorTemplate();
		if (activeEditorTemplate && activeEditorTemplate.dataType === 'widget') {
			if (!activeEditorTemplate.validWidgetTypes.match(new RegExp(template.type._content + ",?"))) {
				showErrorMsg('Media type not supported by active editor. Supported types (' + activeEditorTemplate.validWidgetTypes + ')', 'Error');
				return;
			}

			Widget.createWidget(template, content, function (widget) {
				Widget.addWidgetToWidgetPane(DPEditor.activeEditor, widget);
			});
			
			return;
		}
		var editor = tinyMCE.activeEditor,	sel = editor.selection, doc = editor.getDoc();
		var selectedPluginElement = DPTiny.pluginElement.get(sel.getNode());
		var insertedPluginElement = null;

		//If its the new widget type
//		if (typeof(template) === 'object' && typeof(content) === 'object') {
//			Widget.createWidget(template, content, function (widget) {
//				Widget.addWidgetToTinyEditor(editor, widget);
//			});
//			return;
//		}
		// Check if the argument is a string or an ELEMENT_NODE
		if (typeof string_or_element == 'string') {
			content = string_or_element;
		} else if (typeof(string_or_element) === 'object' && string_or_element !== null && string_or_element.nodeType === 1) {
			string_or_element = this.removeDuplicateIds(string_or_element);
			insertedPluginElement = jQuery(string_or_element, doc);
			insertedPluginElement.addClass( 'dp-plugin-element dp-plugin-src-' + this.DP.getPluginName());
		    var tmpNode = jQuery("<div></div>", doc).append(insertedPluginElement);
			content = tmpNode.html();
		} else {
			return false;
		}

		if (selectedPluginElement) {
			jQuery(selectedPluginElement, doc).after(jQuery(content));
		} else {
			editor.execCommand('mceInsertContent', false, content);
			
		}
		editor.execCommand('mceCleanup', false);
		if (insertedPluginElement) {
			var pluginElement = DPTiny.pluginElement.get(insertedPluginElement.get(0), editor);
			DPTiny.pluginElement.cleanupPosition(pluginElement, editor);
			editor.execCommand('mceCleanup', false);
			DPTiny.editor.addPluginElementListeners(editor);
			DPTiny.pluginElements.deselectAll(editor);
			DPTiny.activeEditor.autoResizeHeight();
			pluginElement = tinymce.activeEditor.getDoc().getElementById(string_or_element.id);
			var name = editor.editorId.replace('editor-', '');
			DPEditor.article.update(name, editor.getContent());
			DPTiny.pluginElement.select(pluginElement);
		}
		if (typeof string_or_element == 'object') {
			return string_or_element;
		} else {
			return null;
		}
	},

	/**
	 * Prepares an element for insertion in editor
	 *
	 * @param string|object Id or object of the element that should be inserted
	 */
	prepareElement: function (element) {
		options = Object.extend({
			beforeInsert: null,
			src: unescape(Plugin.pluginUrl)
		}, arguments[1] || {});

		element = typeof(element) === 'object' ? element : this.DP.getWindow().document.getElementById(element);
		element = this.removeDuplicateIds(element);

		if (options.beforeInsert) {
			options.beforeInsert();
		}
		element = element.cloneNode(true);

		// required to get the element into the current dom structure so Prototype can do its' magic
		var div = new Element('div');
		div.appendChild(element);

		element.addClassName('dp-plugin-element');
		element.writeAttribute('onclick', false);

		div.removeChild(element);

		return element;
	},

	/**
	 * Removes duplicate id's from the element about to be inserted
	 * to prevent JavaScript and CSS bugs.
	 *
	 * @param object The element
	 * @return object The updated element
	 */
	removeDuplicateIds: function (parentNode) {
		if (parentNode.id && tinyMCE.activeEditor.dom.get(parentNode.id)) {
			++ this.increment;
			parentNode.id = 'dp-id-' + this.increment;
		}
		var elements = [parentNode];
		while (elements.length > 0) {
			var element = elements.pop();
			if (element.id && tinyMCE.activeEditor.dom.get(element.id)) {
				++ this.increment;
				element.id = 'dp-id-' + this.increment;
			}
			var children = element.childNodes;
			if (children) {
				for (var i = 0; i < children.length; ++i) {
					var child = children[i];
					elements.push(child);
				}
			}
		}
		return parentNode;
	},

	/**
	 * Gets the focused/selected element in editor
	 */
	getFocusElement: function () {
		var focusElement = tinyMCE.activeEditor.selection.getNode();
		if (focusElement.nodeName === 'BODY') {
			return null;
		}
		return focusElement;
	},

	/**
	 * Select the element identified by the id
	 */
	getElementById: function (id) {
		return tinyMCE.activeEditor.dom.get(id);
	},

	/**
	 * Select the element identified by the CSS selector
	 */
	getElementByCSS: function (css) {
		return tinyMCE.activeEditor.dom.select(css);
	},

	/**
	 * Select the given element
	 */
	select: function (element) {
		tinyMCE.activeEditor.selection.select(element);
	},

	/**
	 * Hide an element from the plugin element menu
	 */
	hideElementMenuItem: function (name) {
		DPTiny.pluginElements.menu.item.hide(name);
	},

	/**
	 * Add an element to the plugin element menu and add a function called when clicking on the added link
	 */
	addElementMenuItem: function (name, callback, prepend) {
		if (prepend) {
			DPTiny.pluginElements.menu.item.prepend(name, callback);
		} else {
			DPTiny.pluginElements.menu.item.append(name, callback);
		}
	},
	/**
	 * Add an element to the plugin element menu and add a function called when clicking on the added link
	 */
	appendElementMenuLabel: function (name) {
		DPTiny.pluginElements.menu.item.append(name + ':', false, {'className' : 'label'});
	},

	update: function () {
		tinyMCE.activeEditor.nodeChanged();
	},

	setAttribute: function (element, attribute, value) {
		tinyMCE.activeEditor.dom.setAttrib(element, attribute, value);
		tinyMCE.activeEditor.nodeChanged();
	},

	setStyle: function (element, attribute, value) {
		tinyMCE.activeEditor.dom.setStyle(element, attribute, value);
		tinyMCE.activeEditor.nodeChanged();
	},
	
	pluginElementChanged: function(element) {
		DPTiny.pluginElements.menu.align();
		DPTiny.pluginElement.addListeners(element);
	},
	


});
