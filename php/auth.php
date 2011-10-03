<?php 

/**
 * This file will check a DrPublish authentication token,
 * and a call to getAuthenticationToken() will return the
 * appropriate response token.
 * 
 * The first section contains configuration options that
 * should be adjust for each plugin.
 * 
 * The code below the first section should not need to be
 * touched. If you have found a bug, please report it to
 */
$pluginName = $this -> getGetRequestVar("plugin");
$auth = $this -> getGetRequestVar("auth");
$iv = $this -> getGetRequestVar("iv");

if ( !$auth || !$iv ) {
  return $this -> _sendJSONResponse(null);
}

$key = $this -> _getPluginKey ( $this -> _getPluginByName ( $pluginName ), $this -> _getPageURL() );

$incoming = $this -> _decryptPluginData( base64_decode ( $auth ), $key, $iv );

if ( is_null ( $incoming ) ) {
  return $this -> _sendJSONResponse(null);
}

// Make sure we're not being replayed
if ( !property_exists ( $incoming, 'time' ) || time() - $incoming -> time > 60 ) {
  return $this -> _sendJSONResponse(null);
}

$outgoing = $this -> _encryptPluginData(array(
  'plugin' => $pluginName,
  'time' => time(),
  'salt' => $this -> _getSalt(128)
), $key);

$this -> _sendJSONResponse(array(
  'signature' => base64_encode ( $outgoing['data'] ),
  'iv' => $outgoing['iv'],
  'drpublish' => $incoming -> drpublish,
  'user' => $incoming -> user,
  'publication' => $incoming -> publication
));