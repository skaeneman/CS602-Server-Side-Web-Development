<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>For each</title>
</head>
<body>
	<p>
	<?php 
		// Create and initialize an array
		$scores = array(88,94,90,100,100,93,78,99,94); 
		
		// Foreach loop to iterate through the array
		foreach ($scores as $score) {
			echo "Score: $score <br/>";
		}
	?>
	</p>
</body>
</html>