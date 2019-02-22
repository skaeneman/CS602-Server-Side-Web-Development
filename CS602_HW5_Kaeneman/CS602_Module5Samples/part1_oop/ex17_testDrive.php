<?php

// Vehicle.php

interface Vehicle {
	public function drive($distance); 

	public function addFuel($amount); 

	public function readFuel(); 
}

// Car.php

class Car implements Vehicle {
	public $fuelAmount;

	function __construct() {
		$this->fuelAmount = 20;
		echo "Car created.<br>";
	}

	/* public function drive($distance) {
		echo "Vroooooom! Traveled " . $distance . " units";
		$this->fuelAmount -= ($distance/30);
	}  */

	public function addFuel($amount) {
		$this->fuelAmount += $amount;
	}

	public function readFuel() {
		return $this->fuelAmount;
	}

}

// testDrive.php

$myCar = new Car();
echo "Fuel Available: " . $myCar->readFuel() . "<br>";
echo $myCar->drive(300) . "<br>"; // trigger an intentional error
echo "Fuel Remaining: " . $myCar->readFuel() . "<br>";
echo "Adding fuel ... " . $myCar->addFuel(5) . "<br>";
echo "Fuel Available: " . $myCar->readFuel() . "<br>";


?>