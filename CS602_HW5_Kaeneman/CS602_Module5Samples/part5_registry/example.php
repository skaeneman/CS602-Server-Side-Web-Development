<?php
	
	// Require needed files
	require_once('Registry.php');
	require_once('Product.php');
	require_once('entries.php');

	// Display objects in the registry
	var_dump(Registry::get("blender"));
	echo "<br><br>";
	var_dump(Registry::get("can opener"));
	echo "<br><br>";
	var_dump(Registry::get("waffle maker"));

?>