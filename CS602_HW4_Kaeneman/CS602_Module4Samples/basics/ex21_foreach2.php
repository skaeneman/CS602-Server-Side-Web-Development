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
		$student = array(
				"first_name" => "Jane",
				"last_name"  => "Doe",
				"score"			=> 100
			); 
		
		// Foreach loop to iterate through the array
		foreach ($student as $attr => $value) {
			echo "$attr : $value<br/>";
		}
		echo "<hr/>";
		foreach ($student as $attr => $value) {
			$attr_clean = ucwords(str_replace("_", " ", $attr));
			echo "$attr_clean : $value<br/>";
		}


	?>
	</p>
</body>
</html>