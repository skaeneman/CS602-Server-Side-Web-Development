<?php

	// Create three Product objects
	$gift1 = new Product("Blender", "Vitamix", "TurboBlend 4500", 379.99, 
						 "Super Powerful blender for Sara's morning juice");


	$gift2 = new Product("Can Opener", "Hamilton Beach", "76606ZA", 29.99,
						 "Electric can opener");

	$gift3 = new Product("Waffle Maker", "Waring Pro", "WMK 600", 99.99,
						 "Double Belgian Waffle Maker for Jim");

	// Add objects to the Registry
	Registry::set("blender", $gift1);
	Registry::set("can opener", $gift2);
	Registry::set("waffle maker", $gift3);

?>