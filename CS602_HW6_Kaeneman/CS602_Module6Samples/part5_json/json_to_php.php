<?php

include('../common.inc.php');
	
	$json = '{"apples":3,"bananas":5,"oranges":1}';
	
	// Return objects
	pr_dump(
		json_decode($json)
		);
	
	// A variation that converts the returned objects into associative arrays
	
	pr_dump(
		json_decode($json, true)
		);
	
?>