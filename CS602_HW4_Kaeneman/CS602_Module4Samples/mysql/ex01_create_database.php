<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Create Database</title>
</head>
<body>
	<p>
	<?php 
		$host = 'localhost';
		$username = 'root';
		$password = '';

		@ $db_conn = mysqli_connect($host, $username, $password);

		$connection_error = mysqli_connect_error();
		if ($connection_error != null) {
			echo "<p>We have a connection problem: " . $connection_error . "</p>";
		} 

		// create a database
		$query = "CREATE DATABASE cs602db";
		if (mysqli_query($db_conn, $query)) {
			echo "Database created";
		} else {
			echo "<p>We have a creation problem: " . 	mysqli_error($db_conn) . "</p>";
		}

		// close database connection
		mysqli_close($db_conn);
	?>
	</p>
</body>
</html>