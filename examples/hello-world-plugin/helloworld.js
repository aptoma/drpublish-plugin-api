/**
 * global PluginAPI
 */

function initPlugin() {
    // fetch article id after the article has been loaded
    fetchArticleIdDynamically();
    fetchJWT();
    PluginAPI.on('afterSave', function() {
        afterArticleSave();
    });
}

function fetchJWT() {
    var jwt = PluginAPI.getJWT();
    if (jwt !== '') {
        var jwtParsed = parseJwt(jwt);
        jwtParsed.jwt = jwt;
        $('#jwt-result').val(JSON.stringify(jwtParsed));
    } else {
        $('#jwt-result').val('no JWT given');
    }
}

function fetchArticleIdDynamically() {
    PluginAPI.Article.getId(function(id) {
        $('#fetchArticleId-result').val(id);
    });
}

// insert HTML code into the active text editor, at cursor position
function insertHelloWorld() {
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


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};


// ----------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    initPlugin();
});
