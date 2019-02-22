<?php

	require('ex07_Dog.php');

	$dog1 = new Dog("Snoop", TRUE, "slow", FALSE);

	$dog1->setName("later");
	 
	var_dump($dog1);
?>