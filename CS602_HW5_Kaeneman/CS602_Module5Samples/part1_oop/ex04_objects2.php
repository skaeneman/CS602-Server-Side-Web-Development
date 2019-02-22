<?php

	require('ex03_BetterDog.php');

	$dog1 = new BetterDog("Rhett", "Boston Terrier", TRUE);
	$dog2 = new BetterDog("Lassie", "Rough Collie", TRUE);
	$dog3 = new BetterDog("Cujo", "St. Bernard", FALSE);

	echo "Dog 1 is a " . $dog1->getBreed() . " named " . $dog1->getName() . ". This dog
		 is " . (($dog1->getFriendly() == TRUE) ? "friendly" : "not Friendly") .
		 ".<br>";

	echo "Dog 3 is a " . $dog3->getBreed() . " named " . $dog3->getName() . ". This dog
		 is " . (($dog3->getFriendly() == TRUE) ? "friendly" : "not friendly") .
	 	 ".<br>";
?>