<?php

	require('ex01_Dog.php');

	$dog1 = new Dog;
	$dog2 = new Dog;
	$dog3 = new Dog;

	$dog1->setName("Rhett");
	$dog2->setName("Lassie");
	$dog3->setName("Cujo");

	$dog1->setBreed("Boston Terrier");
	$dog2->setBreed("Rough Collie");
	$dog3->setBreed("St. Bernard");

	$dog1->setFriendly(TRUE);
	$dog2->setFriendly(TRUE);
	$dog3->setFriendly(FALSE);

	echo "Dog 1 is a " . $dog1->getBreed() . " named " . $dog1->getName() . ". This dog
		 is " . (($dog1->getFriendly() == TRUE) ? "friendly" : "not Friendly") .
		 ".<br>";

	echo "Dog 3 is a " . $dog3->getBreed() . " named " . $dog3->getName() . ". This dog
		 is " . (($dog3->getFriendly() == TRUE) ? "friendly" : "not friendly") .
	 	 ".<br>";
?>