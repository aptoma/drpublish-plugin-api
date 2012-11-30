<?php
require '../php/auth.php';

// registers the app using the name passed along in the iframe parameter
// second paramter is the shared secret key. Use DrPublish if a secret key is not specified in DrPublish for this App
$app = new AptomaApp($_GET['app'], 'DrPublish');
if (isset($_GET['auth'])) {
    // validates the two variables that were passed along in the iframe paramter
    $valid = $app->validate($_GET['auth'], $_GET['iv']);
    if (!$valid) {
        echo '';
    } else {
        $token = $app->getAuthenticationToken();
        echo json_encode($token);
    }
}
?>
