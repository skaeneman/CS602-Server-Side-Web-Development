<?php

	$dsn = 'mysql:dbname=cs602;host=localhost;port=3306'; //enter real details here
	$username = 'cs602_user'; //enter real details here
	$password = 'cs602_secret'; //enter real details here
	try {
		$db = new PDO($dsn, $username, $password, array (
				   PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
		}
	catch(PDOException $e) {
		die('Could not connect to the database:<br/>' . $e);
	}

?>