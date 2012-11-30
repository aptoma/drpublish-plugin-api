<?php

/**
 * This file provides a class for making authentication
 * with the AptomaApp API a breeze:
 *
 * To use it, create a new object representing your app:
 * <code>$app = new AptomaApp('my-app', 'superfish', 'http://myhost.com:80');</code>
 *
 * Now, to check that incoming token from DrPublish is valid
 * (which you should check!), do:
 * <code>$dpdata = $app->validate($_GET['auth'], $_GET['iv']);</code>
 *
 * If $dpdata === false, then the validation failed
 * Otherwise, $dpdata is an object containing information
 * about the DrPublish session (@see AptomaApp.validate)
 *
 * Now, to get the token to return to DrPublish to authenticate, do:
 * <code>$token = $app->getAuthenticationToken();</code>
 *
 * $token will now contain two indices, 'signature' and 'iv'.
 * Both have to be sent to DrPublish for successful authentication!
 *
 * If you think you have found a bug, please report it on
 * the issue tracker here:
 * https://github.com/aptoma/no.aptoma.app-api
 */

/**
 * ======================================================
 *	 YOU SHOULD NOT NEED TO TOUCH ANYTHING BELOW HERE!
 * ======================================================
 */

class AptomaApp {

	protected $_name;
	protected $_key;

	/**
	 * @param string $name The app's name as defined in DrPublish
	 * @param string $key The API key for this app, default is DrPublish
	 * @param URL $host The scheme, host and port of the app.
	 *		Note that this must be in accordance with the URL given
	 *		in the DrPublish setup
	 *		The default is the	URL of the current page
	 *		Format: scheme://host:port
	 */
	public function __construct($name, $key, $host = '') {
		$this->_name = $name;

		$urlParts = parse_url($host);

		if(!$urlParts || empty($urlParts['scheme']) || empty($urlParts['host'])) {
			$urlParts = array (
				'scheme' => 'http' .(empty($_SERVER['HTTPS']) ? '' : 's'),
				'host' => $_SERVER["SERVER_NAME"],
				'port' => $_SERVER["SERVER_PORT"]
			);
		}

		$this->_key = $key . $urlParts['scheme'] . '://' . $urlParts['host'] . ':' .(empty($urlParts['port']) ? '80' : $urlParts['port']);
	}

	/**
	 * Checks the DrPublish authentication token and
	 * returns false on failure, and an object containing the following
	 * on success:
	 *	drpublish: URL to DrPublish installation
	 *	time: When the signature was created
	 *	app: Name of the app
	 *	user: The username of the current user
	 *	publication: The currently active publication ID
	 *
	 * All three of these parameters are normally added to the query
	 * string of the iframe the app is loaded with, and should
	 * thus be available in $_GET
	 *
	 * @param string $appName Name of the app
	 * @param string $auth The authentication token received from DrPublish
	 * @param string $iv The IV received from DrPublish
	 */
	public function validate($auth, $iv) {
		if(!$auth || !$iv) {
			return false;
		}

		// fix the conversion between + and ' ' that happens when passing stuff through an url
		$auth = str_replace(' ', '+', $auth);
		$incoming = $this->_decryptAppData( base64_decode($auth), $iv);

		if(is_null($incoming)) {
			return false;
		}

		// Make sure we're not being replayed
		if(!property_exists($incoming, 'time') || time() - $incoming->time > 60) {
			return false;
		}

		// Make sure the auth is for the correct app
		if(!property_exists($incoming, 'app') || $incoming->app !== $this->_name) {
			return false;
		}

		// No need to expose the salt to the end user
		unset($incoming->salt);

		return $incoming;
	}

	/**
	 * Creates an encrypted token with various information
	 * about the app to be sent to the DrPublish API
	 *
	 * Returns an object containing two indexes that both
	 * have to be sent to authenticate:
	 *	signature: An encrypted string
	 *	iv: An IV for the signature
	 */
	function getAuthenticationToken() {
		$outgoing = $this->_encryptAppData (
			array (
				'app' => $this->_name,
				'time' => time(),
				'salt' => self::_getSalt(128)
			)
		);

		return array (
			'signature' => base64_encode($outgoing['data']),
			'iv' => $outgoing['iv']
		);
	}

	/**
	 * Decrypts the given data block using the given key and IV
	 * Expects the result to be a valid JSON block
	 */
	protected function _decryptAppData($data, $iv) {
		/**
		 * Servers that do not have mcrypt installed will get a dummy object
		 * Avoid this at all costs!
		 * Note especially that the path to DrPublish is then unknown, making all
		 * non-AFW modules break.
		 * cross-check in DrPublishController
		 */
		if (!function_exists('mcrypt_module_open')) {
			return (object) array(
				'iv' => 'trust',
				'data' => 'always',
				'time' => time(),
				'app' => $this->_name,
				'drpublish' => ''
			);
		}
		/* Open the cipher */
		$td = mcrypt_module_open('rijndael-128', '', 'cbc', '');

		/* Initialize encryption module for decryption */
		mcrypt_generic_init($td, self::_cutKey($td, $this->_key), $iv);

		/* Decrypt encrypted string */
		$decrypted = mdecrypt_generic($td, $data);

		/* Terminate decryption handle and close module */
		mcrypt_generic_deinit($td);
		mcrypt_module_close($td);

		return json_decode(trim($decrypted));
	}

	/**
	 * Encrypts a JSON representation of the given data
	 * using the given key, and returns both the encrypted
	 * data and the used IV
	 */
	protected function _encryptAppData($data) {
		/**
		 * Servers that do not have mcrypt installed will get a dummy object
		 * Avoid this at all costs!
		 * Note especially that the path to DrPublish is then unknown, making all
		 * non-AFW modules break.
		 * cross-check in DrPublishController
		 */
		if (!function_exists('mcrypt_module_open')) {
			return array(
				'iv' => 'trust',
				'data' => 'always'
			);
		}

		/* Open the cipher */
		$td = mcrypt_module_open('rijndael-128', '', 'cbc', '');

		/* Create the IV and determine the keysize length	*/
		$iv = substr(sha1(mcrypt_create_iv(mcrypt_enc_get_iv_size($td), MCRYPT_DEV_URANDOM)), 0, mcrypt_enc_get_iv_size($td));

		/* Intialize encryption */
		mcrypt_generic_init($td, self::_cutKey($td, $this->_key), $iv);

		/* Encrypt data */
		$encrypted = mcrypt_generic($td, json_encode($data));

		/* Terminate encryption handler */
		mcrypt_generic_deinit($td);
		mcrypt_module_close($td);

		return array('iv' => $iv, 'data' => $encrypted);
	}

	/**
	 * Makes the a key a certain length
	 */
	protected static function _cutKey($td, $key) {
		return substr(sha1($key), 0, mcrypt_enc_get_key_size($td));
	}

	/**
	 * Generates a random salt of the given size
	 */
	protected static function _getSalt($saltSize) {
		$salt = "";
		while(@$c++ * 16 < $saltSize) {
			@$salt .= sha1( mt_rand(), false);
		}
		return substr( $salt, 0, $saltSize);
	}
}
