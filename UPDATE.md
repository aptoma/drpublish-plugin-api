Upgrading from v1.* to v2.0
==========================
When upgrading from v1.* to v2.0 there are two important points to keep in mind:
 * The parent object has been renamed to ```PluginAPI```, so all occurences of ```AppAPI``` should be changed.
 * There is no longer an authentication step, so the ```AppAPI.doStandardAuthentication``` and ```AppAPI.doDirectAuthentication``` functions have been removed.
 * The removal of the authentication step also means that the ```appAuthenticated``` event is deprecated. DrPublish is still sending the event for backwards compatability, but it will be removed in a future version of DrPublish.


 Why remove the authentication?
 ==============================
 We decided to remove the authentication step since it was making development of plugins a lot harder for very little benefit. We added the authentication step to ensure that it was only possible to open up plugins in the plugin pane, since we thought that opening an unknown web page could give the journalists the impression that it the web page was a part of DrPublish even though that was not the case. But with the requirement to register plugins through the publication administration there is very little chance of a web page being loaded there without someone actually wanting it there, a DNS hijacking is the most probable cause of that happening. And even if it were to happen the new, stricter ways that browsers handle communication between the parent frame and the iframe there should not be any way for the rogue iframe to send information to DrPublish.

 So with this in mind we decided to remove the authentication step. This will make plugin development easier, since the plugin api is now a pure Javascript library, and the plugins should load faster since they will not have to wait for the authentication process to finish.
