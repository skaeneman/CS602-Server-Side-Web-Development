<?php
	/**
	 * BetterDog Class.
	 */
	class BetterDog {

		// Property declarations - self naming
		var $name;
		var $breed;
		var $friendly;

		// Create our constructor
		function __construct($pName, $pBreed, $pFriendly) {
			$this->name = $pName;
			$this->breed = $pBreed;
			$this->friendly = $pFriendly;
		}

		// Declare setter methods, we still want these ...

		function setName($pName) {
			$this->name = $pName;
		}

		function setBreed($pBreed) {
			$this->breed = $pBreed;
		}

		function setFriendly($pFriendly) {
			$this->friendly = $pFriendly;
		}

		// Declare getter methods

		function getName() {
			return $this->name;
		}

		function getBreed() {
			return $this->breed;
		}

		function getFriendly() {
			return $this->friendly;
		}
	}
?>