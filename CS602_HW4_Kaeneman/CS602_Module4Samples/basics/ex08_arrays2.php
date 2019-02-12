<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Associative Arrays</title>
</head>
<body>
	<p>
	<?php 
		// declare and initialize the array in one statement

		$credits = array("CS 601" => 4, "CS 602" => 4, "CS 701" => 4);

		/* declare array with first value and 
				keep adding subsequent values
		*/

		$title['CS 601'] = "Web Application Development";
		$title['CS 602'] = "Server-Side Web Development";
		$title['CS 701'] = "Rich Internet Application Development";

		// Concatenate strings and array values

		echo $title['CS 601']. " is worth "
			.$credits['CS 601']." credits.";
		echo "<br/>";
		
		$course = 'CS 602';
		echo $title[$course]. " is worth "
			.$credits[$course]." credits.";

	?>
	</p>
</body>
</html>