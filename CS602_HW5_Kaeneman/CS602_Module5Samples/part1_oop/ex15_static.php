<?php

	require_once('ex14_Mammal.php');
	require_once('ex14_Dog.php');
	require_once('ex14_Cat.php');

	echo "Number of Mammals, Dogs, and Cats Instantiated: " . Mammal::getCount();

	$d1 = new Dog("Scooby Doo", TRUE, "slow", TRUE);
	echo "<br><br>" . $d1->getName() . " the " . get_class($d1) . " has been created.";

	echo "<br>Number of Mammals, Dogs, and Cats Instantiated: " . Mammal::getCount();

	$c1 = new Cat("Garfield", FALSE, "slow", 9);
	echo "<br><br>" . $c1->getName() . " the " . get_class($c1) . " has been created.";

	echo "<br>Number of Mammals, Dogs, and Cats Instantiated: " . Mammal::getCount();

	$m1 = new Mammal("John", FALSE);
	echo "<br><br>" . $m1->getName() . " the " . get_class($m1) . " has been created.";
	echo "<br>Number of Mammals, Dogs, and Cats Instantiated: " . Mammal::getCount();

	
?>