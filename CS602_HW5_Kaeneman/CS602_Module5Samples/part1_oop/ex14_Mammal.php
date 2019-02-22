<?php
	/**
	 * Mammal Class.
	 */
	class Mammal {

		// Property declarations - self naming
		static private $count = 0;
		public $name;
		public $friendly;

		// Create our constructor
		public function __construct($pName, $pFriendly) {
			$this->name = $pName;
			$this->friendly = $pFriendly;
			Mammal::updateCount();
		}

		static private function updateCount() {
			Mammal::$count++;
		}

		static public function getCount() {
			return Mammal::$count;
		}

		// Declare setter methods

		public function setName($pName) {
			$this->name = $pName;
		}

		public function setFriendly($pFriendly) {
			$this->friendly = $pFriendly;
		}

		// Declare getter methods

		public function getName() {
			return $this->name;
		}

		public function getFriendly() {
			return $this->friendly;
		}

		// private method to indicate that the Mammal is sleeping
		private function sleeping() {
			echo "$this->name is now sleeping.<br>";
		}
	}
?>