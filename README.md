The Plugin API
==========================
The DrPublish plugin API allows you to plug your own web-apps into DrPublish to extend the feature set of the DrPublish writer. Your web-apps will be allowed to create, read, update and delete content in the DrPublish writer in real-time.

These web-apps can be deployed and run on any location of your choice, be it your in-house servers or some cloud location. It follows from this that you can write these web-apps in the backend programming language of your choice.

How the API works
==========================
The apps are loaded directly in iframes (i.e. the src= of the iframe points directly to the URL as given in the DrPublish config) and all communication between the app and DrPublish is sent using [postMessage](https://developer.mozilla.org/en/DOM/window.postMessage) (a standardized method for cross-domain frame communication).

PostMessage works by one side listening for incoming messages, and determining whether to act upon that message or not depending on its origin host, its origin frame and its contents.
In DrPublish, these binding are written in js/classes/binds/\*.js, and are mapped through js/classes/controller/AppEvents.js, which also handles delegation of events from DrPublish to apps.
On the app side, the files AppAPI.js, AH5Communicator.js and ArticleCommunicator.js provide functions for sending and recieving all the supported postMessage calls without the caller having to know what is being done.

Behind the scenes, the API files wrap the incoming parameters in a JSON object, adds on the name of sending app and what method on the remote side it wants to call, and send this over postMessage using a [thin jQuery PM wrapper](http://postmessage.freebaseapps.com/).

DrPublish then determines which function should be called, executes it, wraps its response in a JSON object, and returns it to the sending app. The app then receives this reply, and sends the received data to a callback (if any is specified).

How to get started
================
Take a look at the example app to see how to get started. There you will see a few simple examples of sending data between the app and DrPublish.

When you're bored of that you can look through the method listings avaiable on the right and that is hopefully enough to set you on the right track to create any app you want.

Custom configuration
==============
Apps can ask for and specify a customized configuration object. The API function to retrieve the configuration option is AppAPI.getConfiguration, and you can find documentation on that in the AppAPI module.

To specify the format of the configuration object the App needs to provide an URL where other applications (in most cases DrPublish's App Admin tool) can recieve an [JSON schema](http://json-schema.org/) describing the desired configuration setup. In case of DrPublish this URL is then registered alongside the URL to the app in the Publication configuration.

A simple example JSON schema for an image app could look like:
```JSON
{
    "search": {
        "type": "string",
        "title": "Default Search",
        "required": true
    },
    "images": {
        "type": "array",
        "title": "Image Sizes",
        "items": {
            "type": "object",
            "title": "Image Size",
            "properties": {
                "name": {
                    "type": "string",
                    "title": "name",
                    "required": true
                },
                "filter": {
                    "type": "string",
                    "title": "Filter",
                    "enum": [
                        "grayscale",
                        "sepia",
                        "none"
                    ]
                },
                "height": {
                    "type": "integer",
                    "title": "Height"
                }
            }
        }
    }
}
```

What about debugging?
=====================
It just so happens that we did a lot of debugging while setting this up, and we've left the debugging code in there for your convenience. All you need to do to enable it is to set the AppAPI.DEBUG flag to TRUE; If you then open up your browser JS console, you will see output detailing everything interesting that is happening under the bonnet. Note especially warnings and errors since these indicate that something of special interest has happened.

Documentation Generation
========================
Documentation has been generated using [jsdoc](https://github.com/jsdoc3/jsdoc) and the supplied jsdoc.json file
