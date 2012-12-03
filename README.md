How does the API work?
==========================
First and foremost, all apps are now loaded directly in iframes (i.e. the src= of the iframe points directly to the URL as given in the DrPublish config).
Next, all communication between the app and DrPublish is sent using [postMessage](https://developer.mozilla.org/en/DOM/window.postMessage), a standardized method for cross-domain frame communication.

PostMessage works by one side listening for incoming messages, and determining whether to act upon that message or not depending on its origin host, its origin frame and its contents.
In DrPublish, these binding are written in js/classes/binds/\*.js, and are mapped through js/classes/DPPAPI.js, which also handles delegation of events from DrPublish to apps.
On the app side, the files AppAPI.js, AH5Communicator.js and ArticleCommunicator.js provide functions for sending all the supported postMessage calls without the caller having to know that that's what's being done.

Behind the scenes, the API files wrap the incoming parameters in a JSON object, adds on the name of sending app and what method on the remote side it wants to call (RPC anyone?), and send this over postMessage using a [thin jQuery PM wrapper](http://postmessage.freebaseapps.com/).

On the other side, DPPAPPI.js determines which function should be called, executes it, wraps its response in a JSON object, and returns it to the sending app. The app side (AppAPI.js) then receives this reply, and sends the received data to a callback (if any is specified).

Authentication
==============
DrPublish always sends an encrypted token to all apps that are being loaded so that the app can check that they are in fact being loaded by DrPublish with a valid user logged in.
Apps should therefore always verify this token.
Conversely, apps now also have to authenticate themselves to DrPublish before they are allowed to access the API. They are also hidden until this has been done.
If a app does not authenticate itself within 60 seconds of being loaded, it is killed.

This two-way authentication provides enhanced security both for DrPublish (it won't load unauthorized apps) and for the user (apps may only be accessed through DrPublish).

The authentication works by defining a shared secret between DrPublish and the app on a per-install basis.
This is set in DrPublish in the panel where you add apps to a publication.
This means that not only will the authentication verify that it is DrPublish that is loading the app, or that a app is made by someone we trust, it will verify that that DrPublish install and that app belong together.
So, to take it step by step:

A app is born
----------------
1. The DrPublish JS sends a request to the DrPublish backend for a URL for the app with an encrypted authentication token
2. The backend creates a JSON object with various data (DrPublish host, logged in user, active publication, timestamp, app name) + a large salt
3. The backend encrypts this with both the app's scheme + host + port and the shared secret, and returns the encrypted string and the initialization vector to the JS
4. The JS creates a new iframe with the src received from the backend (this includes two extra parameters, auth and iv, which represent the encrypted authentication token and the initialization vector)
5. The JS blocks all postMessage calls from that iframe until it has sent a postMessage with type "app-loaded" that contains the app name, the app's authentication token and the app's IV
6. The app's backend decrypts the incoming DrPublish token, checks that it can be decrypted and that it has not expired
7. If the token is invalid, the app kills itself.
8. The app's JS requests an encrypted token from the app's backend to prove its identity to DrPublish
9. The app's backend generates a JSON object containing the app's name, a timestamp and a salt, encrypts it, and sends this plus the IV to the JS
10. The JS then sends a "app-loaded" PM call to DrPublish containing app name, token (called a signature) and IV
11. The DrPublish JS sends this signature + IV to its backend for verification
12. The DrPublish backend decrypts the token, checks the time and returns true or false
13. The DrPublish JS either allows the app access to the API, or kills it depending on the response from the backend

*OBS: Only the initial load of the app is authenticated! This means that the app should somehow store the fact that the user was authenticated, and only allow access to other parts of the app (think AJAX requests and such) if the app was first accessed with a valid DrPublish token.*

So what do I do?
================
Luckily, thanks to the files in this repository, you don't really have to do much to write an authenticated app.
First, your backend should include php/auth.php and do something like this:

```php
<?php
require 'php/auth.php';
$app = new AppAPI('penguin-app', 'super-secret-key', 'http://myhost.com:80');

session_start('penguin-app');

if (!array_key_exists('authenticated', $_SESSION) || $_SESSION['authenticated'] !== "yes") {
  if (!array_key_exists('auth', $_GET) || !array_key_exists('iv', $_GET)) {
    die("Get outta' here scum!");
  }

  $dpdata = $app->validate($_GET['auth'], $_GET['iv']);

  if ($dpdata === false) {
    die('Invalid DrPublish token received; giving up');
  }

  $_SESSION['authenticated'] = "yes";
}
```

}
This will both check that the token from DrPublish is valid and store the fact that the user is authenticated to his/her session so you can check it later on in your application as well (or during AJAX calls, etc...)
Then, in your AJAX controller somewhere (which should also check that a valid session is in place), you add another action like so:

```php
<?php
case 'get-authentication-token':
  echo json_encode($app->getAuthenticationToken()); // Will include two values, signature and iv
  break;
```
    
Now, in your HTML, all you need to do is include Listeners.js and AppAPI.js, and optionally AH5Communicator.js and ArticleCommunicator.js if you need their functionality, and run either AppAPI.doStandardAuthentication or AppAPI.doDirectAuthentication.
The former takes a URL that it will send an AJAX request to, expecting to get back a JSON object containing the indices, signature and iv (which is what you get with the above 'get-authentication-token' code), that it will then send to DrPublish.
The latter takes signature and iv as string parameters, and passes these directly to DrPublish for authentication.
Choose whichever best fits you application.

What about debugging?
=====================
It just so happens that we did a lot of debugging while setting this up, and to be nice, we've left the debugging code in there. All you need to do to enable it is to set the AppAPI.DEBUG flag to TRUE;
If you then open up your browser JS console, you will see output detailing everything interesting that is happening under the bonnet.
Note especially warnings and errors since these indicate that something of special interest has happened.
