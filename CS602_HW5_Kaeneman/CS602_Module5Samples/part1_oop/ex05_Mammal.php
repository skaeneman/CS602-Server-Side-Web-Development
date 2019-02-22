<?php
	/**
	 * Mammal Class.
	 */
	class Mammal {

		// Property declarations - self naming
		var $name;
		var $friendly;

		// Create our constructor
		function __construct($pName, $pFriendly) {
			$this->name = $pName;
			$this->friendly = $pFriendly;
		}

		// Declare setter methods

		function setName($pName) {
			$this->name = $pName;
		}

		function setFriendly($pFriendly) {
			$this->friendly = $pFriendly;
		}

		// Declare getter methods

		function getName() {
			return $this->name;
		}

		function getFriendly() {
			return $this->friendly;
		}
	}
?>