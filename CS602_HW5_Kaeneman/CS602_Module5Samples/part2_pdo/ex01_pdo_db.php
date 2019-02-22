<?php

	// Data Source Name, user/pass, and options
	$dsn = 'mysql:host=localhost;dbname=cs602db';
	$username = 'cs602_user';
	$password = 'cs602_secret';
	$options = array(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	try {
		$pdo = new PDO($dsn, $username, $password, $options);
		$conn = $pdo->prepare('INSERT INTO Students (firstname, lastname, email) 
				VALUES (:firstname, :lastname, :email)');
		$conn->execute(array(
			':firstname' => "John",
			':lastname' => "Doe",
			':email' => "jd@xyz.com"
			));
		echo $conn->rowCount();
	} catch(PDOException $e) {
		echo "ERROR: " . $e->getMessage();
	}
?>