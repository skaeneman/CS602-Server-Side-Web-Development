<?php

	require('ex07_Dog.php');

	$dog1 = new Dog("Snoop", TRUE, "slow", FALSE);

	$dog1->setName("Calvin");
	 
	var_dump($dog1);
?>