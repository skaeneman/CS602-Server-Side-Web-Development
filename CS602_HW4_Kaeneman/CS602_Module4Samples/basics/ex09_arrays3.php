<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Multidimensional Arrays</title>
</head>
<body>
	<p>
	<?php 
		
		// declare multidimensional array

		
		$catalog = array(
			"CS 601" => array(
				"title" => "Web Application Development",
				"credits" => 4,
				"grade" => "A"
				), 
			"CS 602" => array(
				"title" => "Server-Side Web Development",
				"credits" => 4,
				"grade" => "A-"
				), 
			"CS 701" => array (
				"title" => "Rich Internet Application Development",
				"credits" => 4,
				"grade" => "B+"
				)
			);

		
	
		// Concatenate strings and array values

		echo $catalog['CS 601']['title']. " is worth "
			.$catalog['CS 601']['credits']." credits. I earned an "
			.$catalog['CS 601']['grade'] . " in the course.";
		echo "<br/>";
		
		$course = 'CS 602';
		echo $catalog[$course]['title']. " is worth "
			.$catalog[$course]['credits']." credits. I earned an "
			.$catalog[$course]['grade'] . " in the course.";
		echo "<br/>";
		
		$course = 'CS 701';
		echo $catalog[$course]['title']. " is worth "
			.$catalog[$course]['credits']." credits. I earned an "
			.$catalog[$course]['grade'] . " in the course.";

	?>
	</p>
</body>
</html>