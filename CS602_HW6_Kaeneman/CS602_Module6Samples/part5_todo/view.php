<?php
	include('../common.inc.php');

	$file = 'bu_students.json';
	$str_data = file_get_contents($file);
	$json_data = json_decode($str_data,true);
		
	pr_dump($json_data['students']);;


?>