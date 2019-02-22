<?php

	require('ex05_Mammal.php');
	/**
	 * Cat Class.
	 */
	class Cat extends Mammal {

		// Property declarations - self naming
		var $purrRate;
		var $livesRemaining;

		// Create our constructor
		function __construct($pName, $pFriendly, $pPurrRate, $pLivesRemaining) {
			parent::__construct($pName, $pFriendly);
			$this->purrRate = $pPurrRate;
			$this->livesRemaining = $pLivesRemaining;
		}

		// Declare setter methods

		function setPurrRate($pPurrRate) {
			$this->purrRate = $pPurrRate;
		}

		function setLivesRemaining($pLivesRemaining) {
			$this->livesRemaining = $pLivesRemaining;
		}

		// Declare getter methods

		function getPurrRate() {
			return $this->purrRate;
		}

		function getLivesRemaining() {
			return $this->livesRemaining;
		}
	}
?>