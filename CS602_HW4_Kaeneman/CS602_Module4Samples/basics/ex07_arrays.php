<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Indexed Arrays</title>
</head>
<body>
	<p>
	<?php 
		
		// declare and initialize the array in one statement

		$online_web_dev_courses = array("CS 601", "CS 602", "CS 701");

		/* declare array with first value and 
				keep adding subsequent values
		*/

		$online_concentrations[0] = "Computer Networks";
		$online_concentrations[1] = "Data Analytics";
		$online_concentrations[2] = "Web Application Development";

		echo "I am currently taking ". $online_web_dev_courses[1]
		." and have selected ". $online_concentrations[2]
		." as my degree concentration.";
	?>
	</p>
</body>
</html>