<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Constants</title>
</head>
<body>
	<p>
	<?php 
		define("PI", 3.14);
		$radius = 10;
		$area = PI * $radius * $radius;
		echo "Circle with radius ".$radius." units has an area of ".$area." square units." 
	?>
	</p>
</body>
</html>