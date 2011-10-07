How does the API work?
==========================
First and foremost, all plugins are now loaded directly in iframes (i.e. the src= of the iframe points directly to the URL as given in the DrPublish config).
Next, all communication between the plugin and DrPublish is sent using [postMessage{https://developer.mozilla.org/en/DOM/window.postMessage}, a standardized method for cross-domain frame communication.

PostMessage works by one side listening for incoming messages, and determining whether to act upon that message or not depending on its origin host, its origin frame and its contents.
In DrPublish, these binding are written in js/classes/binds/\*.js, and are mapped through js/classes/DPPAPI.js, which also handles delegation of events from DrPublish to plugins.
On the plugin side, the files DP.js, DP\_Editor.js and DP\_Article.js provide functions for sending all the supported postMessage calls without the caller having to know that that's what's being done.

Behind the scenes, the DP\*.js files wrap the incoming parameters in a JSON object, adds on the name of sending plugin and what method on the remote side it wants to call (RPC anyone?), and send this over postMessage using a [thin jQuery PM wrapper]{http://postmessage.freebaseapps.com/}.

On the other side, DPPAPPI.js determines which function should be called, executes it, wraps its response in a JSON object, and returns it to the sending plugin. The plugin side (DP.js) then receives this reply, and sends the received data to a callback (if any is specified).

Authentication
==============
DrPublish now always sends an encrypted token to all plugins that are being loaded so that the plugin can check that they are in fact being loaded by DrPublish with a valid user logged in.
Plugins should therefore always verify this token.
Conversely, plugins now also have to authenticate themselves to DrPublish before they are allowed to access the API. They are also hidden until this has been done.
If a plugin does not authenticate itself within 60 seconds of being loaded, it is killed.

This two-way authentication provides enhanced security both for DrPublish (it won't load unauthorized plugins) and for the user (plugins may only be accessed through DrPublish).

The authentication works by defining a shared secret between DrPublish and the plugin on a per-install basis.
This is set in DrPublish in the panel where you add plugins to a publication.
This means that not only will the authentication verify that it is DrPublish that is loading the plugin, or that a plugin is made by someone we trust, it will verify that that DrPublish install and that plugin belong together.
So, to take it step by step:

A plugin is born
----------------
1. The DrPublish JS sends a request to the DrPublish backend for a URL for the plugin with an encrypted authentication token
2. The backend creates a JSON object with various data (DrPublish host, logged in user, active publication, timestamp, plugin name) + a large salt
3. The backend encrypts this with both the plugin's scheme + host + port and the shared secret, and returns the encrypted string and the initialization vector to the JS
4. The JS creates a new iframe with the src received from the backend (this includes two extra parameters, auth and iv, which represent the encrypted authentication token and the initialization vector)
5. The JS blocks all postMessage calls from that iframe until it has sent a postMessage with type "plugin-loaded" that contains the plugin name, the plugin's authentication token and the plugin's IV
6. The plugin's backend decrypts the incoming DrPublish token, checks that it can be decrypted and that it has not expired
7. If the token is invalid, the plugin kills itself.
8. The plugin's JS requests an encrypted token from the plugin's backend to prove its identity to DrPublish
9. The plugin's backend generates a JSON object containing the plugin's name, a timestamp and a salt, encrypts it, and sends this plus the IV to the JS
10. The JS then sends a "plugin-loaded" PM call to DrPublish containing plugin name, token (called a signature) and IV
11. The DrPublish JS sends this signature + IV to its backend for verification
12. The DrPublish backend decrypts the token, checks the time and returns true or false
13. The DrPublish JS either allows the plugin access to the API, or kills it depending on the response from the backend

*OBS: Only the initial load of the plugin is authenticated! This means that the plugin should somehow store the fact that the user was authenticated, and only allow access to other parts of the plugin (think AJAX requests and such) if the plugin was first accessed with a valid DrPublish token.*

So what do I do?
================
Luckily, thanks to the files in this repository, you don't really have to do much to write an authenticated plugin.
First, your backend should include php/auth.php and do something like this:

    require 'php/auth.php';
    $plugin = new DPPlugin ( 'penguin-plugin', 'super-secret-key', 'http://myhost.com:80' );
    
    session_start ( 'penguin-plugin' );
    
    if ( !array_key_exists ( 'authenticated', $_SESSION ) || $_SESSION['authenticated'] !== "yes" ) {
      if ( !array_key_exists ( 'auth', $_GET ) || !array_key_exists ( 'iv', $_GET ) ) {
        die ( "Get outta' here scum!" );
      }
    
      $dpdata = $plugin -> validate ( $_GET['auth'], $_GET['iv'] );
    
      if ( $dpdata === false ) {
        die ( 'Invalid DrPublish token received; giving up' );
      }
    
      $_SESSION['authenticated'] = "yes";
    }
This will both check that the token from DrPublish is valid and store the fact that the user is authenticated to his/her session so you can check it later on in your application as well (or during AJAX calls, etc...)
Then, in your AJAX controller somewhere (which should also check that a valid session is in place), you add another action like so:

    .
    .
    case 'get-authentication-token':
      echo json_encode ( $plugin -> getAuthenticationToken() ); // Will include two values, signature and iv
      break;
    .
    .
    
Now, in your HTML, all you need to do is include Listeners.js and DP.js, and optionally DP_Editor.js and DP_Article.js if you need their functionality, and run either DP.doStandardAuthentication or DP.doDirectAuthentication.
The former takes a URL that it will send an AJAX request to, expecting to get back a JSON object containing the indices, signature and iv (which is what you get with the above code), that it will then send to DrPublish.
The latter takes signature and iv as string parameters, and passes these directly to DrPublish for authentication.
Choose whichever best fits you application.

What about debugging?
=====================
It just so happens that I did a lot of debugging while setting this up, and to be nice, I've left the debugging code in there.
If you open up your browser JS console, you will see output detailing everything interesting that is happening under the bonnet.
Note especially warnings and errors since these indicate that something of special interest has happened.
