<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Create Table</title>
</head>
<body>
	<p>
	<?php 
		$host = 'localhost';
		$username = 'cs602_user';
		$password = 'cs602_secret';
		$db = 'cs602db';

		@ $db_conn = mysqli_connect($host, $username, $password, $db);

		$connection_error = mysqli_connect_error();
		if ($connection_error != null) {
			echo "<p>We have a connection problem: " . $connection_error . "</p>";
		} 

		// create a database
		$query = "CREATE Table students (
				id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
				firstname VARCHAR(30) NOT NULL,
				lastname  VARCHAR(30) NOT NULL,
				email  VARCHAR(50)
			)";
		
		if (mysqli_query($db_conn, $query)) {
			echo "Table created";
		} else {
			echo "<p>Error creating table: " . 	mysqli_error($db_conn) . "</p>";
		}

		// close database connection
		mysqli_close($db_conn);
	?>
	</p>
</body>
</html>