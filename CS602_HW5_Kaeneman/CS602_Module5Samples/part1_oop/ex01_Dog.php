<?php
	/**
	 * Dog Class.
	 */
	class Dog {

		// Property declarations - self naming
		var $name;
		var $breed;
		var $friendly;

		// Declare setter methods

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