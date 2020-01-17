/**
 * global PluginAPI
 */

function initPlugin() {
    // fetch article id after the article has been loaded
    fetchArticleIdDynamically();
    PluginAPI.on('afterSave', function() {
        afterArticleSave();
    });
}

function fetchArticleIdDynamically() {
    PluginAPI.Article.getId(function(id) {
        console.log('stef:fetchedartid', id);
        $('#fetchArticleId-result').val(id);
    });
}

// insert HTML code into the active text editor, at cursor position
function insertHelloWorld() {
    console.log('stef:', PluginAPI);
    PluginAPI.Editor.insertString('<h3>Hello World</h3>');
}

// fetch all content from all text editors
function readContent() {
    PluginAPI.Editor.getHTMLBySelector('*', function (data) {
        $('#readContent-result').val(data);
    });
}

// get article id
function getId() {
    PluginAPI.Article.getId(function (id) {
        $('#getId-result').val(id);
    });
}

// get article tags
function getTags() {
    PluginAPI.Article.getTags(function (tags) {
        $('#getTags-result').val(tags.length > 0 ? JSON.stringify(tags) : 'article has no tags');
    });
}


// get article metadata
function getCustomMeta() {
    PluginAPI.Article.getCustomMeta($('#getCustomMeta-input').val(), function (customMeta) {
        $('#getCustomMeta-result').val(JSON.stringify(customMeta));
    });
}


// set article metadata
function setCustomMeta() {
    PluginAPI.Article.setCustomMeta($('#setCustomMeta-name-input').val(), $('#setCustomMeta-value-input').val(), function (data) {
        $('#setCustomMeta-result').val(JSON.stringify(data));
    });
}



// ----------------------------------------

initPlugin();



