<?php

	require('ex05_Mammal.php');
	/**
	 * Dog Class.
	 */
	class Dog extends Mammal {

		// Property declarations - self naming
		var $barkRate;
		var $snores;

		// Create our constructor
		function __construct($pName, $pFriendly, $pBarkRate, $pSnores) {
			parent::__construct($pName, $pFriendly);
			$this->barkRate = $pBarkRate;
			$this->snores = $pSnores;
		}

		// Declare setter methods

		function setBarkRate($pBarkRate) {
			$this->barkRate = $pBarkRate;
		}

		function setSnores($pSnores) {
			$this->snores = $pSnores;
		}

		// Declare getter methods

		function getBarkRate() {
			return $this->barkRate;
		}

		function getSnores() {
			return $this->snores;
		}
	}
?>