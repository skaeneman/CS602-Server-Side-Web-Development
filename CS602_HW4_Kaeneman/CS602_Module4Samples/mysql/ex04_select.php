<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Select Data</title>
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
		$query = "SELECT id, firstname, lastname, email FROM students";
		$result = mysqli_query($db_conn, $query);

		// use a loop to display records
		
		if (mysqli_num_rows($result) > 0) {
			while ($row = mysqli_fetch_assoc($result)) {
				echo "ID: " . $row["id"] . "<br/>" .
						"First Name: " . $row["firstname"] . "<br/>" .
						"Last Name: " . $row["lastname"] . "<br/>" .
						"Email: " . $row["email"] . "<br/><p>"; 
			}
		} else {
			echo "No results were found";
		}

		// close database connection
		mysqli_close($db_conn);
	?>
	</p>
</body>
</html>