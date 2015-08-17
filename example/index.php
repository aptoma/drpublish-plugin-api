<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Example Plugin</title>
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="../js/vendors/jquery.postmessage.js"></script>
    <script src="../js/Listeners.js"></script>
    <script src="../js/PluginAPI.js"></script>
    <script src="../js/AH5Communicator.js"></script>
    <script src="../js/ArticleCommunicator.js"></script>
    <script>
    $(document).ready(function() {
        var name = "<?=$_GET['appName']?>";
        var auth = "<?=$_GET['auth']?>";
        var iv = "<?=$_GET['iv']?>";
        // register name of the app, sent as a paramter in the iframe url
        PluginAPI.setAppName(name);

        function getValue() {
            var value = $('#textInput').val();
            if (value.trim() === '') {
                PluginAPI.showInfoMsg('I shall not insert an empty thing, that would just be silly');
                return null;
            }
            return value;
        }

        $('#textButton').click(function() {
            value = getValue();
            if (value === null) {
                return false;
            }
            // insert a string at the current cursor position
            PluginAPI.Editor.insertString(value);
        });

        $('#objectButton').click(function() {
            value = getValue();
            if (value === null) {
                return false;
            }
            // insert an element at the current cursor position
            // required parameters to make it draggable and non-editable are automatically added by the PluginAPI
            var element = $('<div>').append($('<p>').attr('data-source', 'foobar').text(value));
            PluginAPI.Editor.insertElement(element);
        });

        // triggers each time an element from this app is selected
        PluginAPI.on('pluginElementSelected', function(object) {
            PluginAPI.Editor.getHTMLById(object.data.id, function(element) {
                $('#title').html('Last selected element: ' + $(element).text());
            });
        });

        // register a delete button for elements inserted by this plugin
        PluginAPI.Editor.initMenu(['deleteButton']);
    });
    </script>
</head>
<body>
<h2 id='title'>Last selected element: </h2>
<p>Type stuff here: <input type="text" id="textInput" /></p>
<input type="button" value="Insert As Text" id="textButton" />
<input type="button" value="Insert As Draggable Object" id="objectButton" />
</body>
</html>
