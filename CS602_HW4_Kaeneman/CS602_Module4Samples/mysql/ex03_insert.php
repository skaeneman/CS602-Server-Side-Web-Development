<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Insert Data</title>
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
		$query = "INSERT INTO students
				(firstname, lastname, email)
				VALUES 
				('John', 'Doe', 'john@doe.com'),
				('Jane', 'Doe', 'jane@doe.com')
			";
		
		if (mysqli_query($db_conn, $query)) {
			echo "Data inserted";
		} else {
			echo "<p>Error inserting data: " . 	mysqli_error($db_conn) . "</p>";
		}

		// close database connection
		mysqli_close($db_conn);
	?>
	</p>
</body>
</html>