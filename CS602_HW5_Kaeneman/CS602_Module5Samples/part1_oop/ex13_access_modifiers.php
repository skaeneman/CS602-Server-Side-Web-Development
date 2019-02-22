<?php

	require('ex13_Dog.php');

	$dog1 = new Dog("Rhett", TRUE, "fast", TRUE);

	var_dump($dog1);
	
	$dog1->sleeping(); // intentional error

?>