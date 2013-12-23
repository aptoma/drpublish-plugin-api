How does the API work?
==========================
The apps are loaded directly in iframes (i.e. the src= of the iframe points directly to the URL as given in the DrPublish config) and all communication between the app and DrPublish is sent using [postMessage](https://developer.mozilla.org/en/DOM/window.postMessage) (a standardized method for cross-domain frame communication).

PostMessage works by one side listening for incoming messages, and determining whether to act upon that message or not depending on its origin host, its origin frame and its contents.
In DrPublish, these binding are written in js/classes/binds/\*.js, and are mapped through js/classes/controller/AppEvents.js, which also handles delegation of events from DrPublish to apps.
On the app side, the files AppAPI.js, AH5Communicator.js and ArticleCommunicator.js provide functions for sending and recieving all the supported postMessage calls without the caller having to know what is being done.

Behind the scenes, the API files wrap the incoming parameters in a JSON object, adds on the name of sending app and what method on the remote side it wants to call, and send this over postMessage using a [thin jQuery PM wrapper](http://postmessage.freebaseapps.com/).

DrPublish then determines which function should be called, executes it, wraps its response in a JSON object, and returns it to the sending app. The app then receives this reply, and sends the received data to a callback (if any is specified).

So how do I get started?
================
Take a look at the example app to see how to get started. There you will see an example of how to write the authentication code required to get the app started, and a few simple examples of sending data between the app and DrPublish.

When you're bored of that you can look through the method listings avaiable on the right and that is hopefully enough to set you on the right track to create any app you want.

Authentication explained
==============
When an app is loaded DrPublish send an encrypted token to the app, this is done so the app can check that it is actually being loaded by a DrPublish instance with a valid user logged in. Apps should always verify this token, otherwise this security aspect dissappears.
Conversely, apps also have to authenticate themselves to DrPublish before they are allowed to access the API. The iframe that contains them are hidden until this has been done.
If a app does not authenticate itself within 60 seconds of being loaded, it is killed.

This two-way authentication provides enhanced security both for DrPublish (it won't load unauthorized apps) and for the user (apps may only be accessed through DrPublish).

The authentication works by defining a shared secret between DrPublish and the app on a per-install basis.

So, to take the authentication process step by step:

The authentication process in detail
----------------
1. The DrPublish frontend sends a request to the DrPublish backend for a URL for the app with an encrypted authentication token
2. The backend creates a JSON object with various data (DrPublish host, logged in user, active publication, timestamp, app name) + a large salt
3. The backend encrypts this with both the app's scheme + host + port and the shared secret, and returns the encrypted string and the initialization vector to the DrPublish frontend
4. The DrPublish frontend creates a new iframe with the src received from the backend (this includes two extra parameters, auth and iv, which represent the encrypted authentication token and the initialization vector)
5. The DrPublish frontend blocks all postMessage calls from that iframe until it has sent a postMessage with type "app-loaded" that contains the app name, the app's authentication token and the app's IV
6. The app's frontend recieves the incoming DrPublish token and sends it to its' backend to ensure that it can be decrypted and that it has not expired
7. If the token is invalid, the app kills itself.
8. If the token is valid, the app's frontend gets an encrypted token from the app's backend to prove its identity to DrPublish
10. The app frontend then sends a "app-loaded" postMessage call to DrPublish containing app name, token (called a signature) and IV
11. The DrPublish frontend sends this signature + IV to its' backend for verification
12. The DrPublish backend decrypts the token, checks the time and returns true or false
13. The DrPublish frontend either allows the app access to the API, or kills it depending on the response from the backend

*OBS: Only the initial load of the app is authenticated! This means that the app should somehow store the fact that the user was authenticated, and only allow access to other parts of the app (think AJAX requests and such) if the app was first accessed with a valid DrPublish token.*

What about debugging?
=====================
It just so happens that we did a lot of debugging while setting this up, and to be nice, we've left the debugging code in there. All you need to do to enable it is to set the AppAPI.DEBUG flag to TRUE;
If you then open up your browser JS console, you will see output detailing everything interesting that is happening under the bonnet.
Note especially warnings and errors since these indicate that something of special interest has happened.

Documentation Generation
========================
Documentation has been generated using [jsdoc](https://github.com/jsdoc3/jsdoc) and the supplied conf.json file
