<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Example App</title>
    <script src="http://code.jquery.com/jquery.min.js"></script>
    <script src="../js/vendors/jquery.postmessage.js"></script>
    <script src="../js/Listeners.js"></script>
    <script src="../js/AppAPI.js"></script>
    <script src="../js/AH5Communicator.js"></script>
    <script src="../js/ArticleCommunicator.js"></script>
    <script>
    $(document).ready(function() {
        var name = "<?=$_GET['appName']?>";
        // register name of the app, sent as a paramter in the iframe url
        AppAPI.setAppName(name);
        // authenticate the app, again using variables sent in the iframe url
        AppAPI.doStandardAuthentication("./authenticate.php?auth=<?=($_GET['auth'])?>&iv=<?=$_GET['iv']?>");

        function getValue() {
            var value = $('#textInput').val();
            if (value.trim() === '') {
                AppAPI.showInfoMsg('I shall not insert an empty thing, that would just be silly');
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
            AppAPI.Editor.insertString(value);
        });

        $('#objectButton').click(function() {
            value = getValue();
            if (value === null) {
                return false;
            }
            // insert an element at the current cursor position, adding required parameters to make it draggable and non-editable
            var element = $('<div>').append($('<div>').attr('data-source', 'foobar').text(value));
            AppAPI.Editor.insertElement(element);
        });

        AppAPI.addListeners({
            // triggers each time an element from this app is selected
            pluginElementSelected: function(data) {
                AppAPI.Editor.getHTMLById(data.id, function(element) {
                    $('#title').html('Last selected element: ' + $(element).text());
                });
            }
        });
    });
    </script>
</head>
<body>
<h2 id='title'>foobar</h2>
<p>Type stuff here: <input type="text" id="textInput" /></p>
<input type="button" value="Insert As Text" id="textButton" />
<input type="button" value="Insert As Draggable Object" id="objectButton" />
</body>
</html>
