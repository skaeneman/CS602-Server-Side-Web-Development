<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Type Juggling</title>
</head>
<body>
	<p>
	<?php 
		$x = "2";
		$y = 14;
		$result = $x + $y;
		echo $result;
		echo " -> ";
		echo gettype($result);
	?>
	</p>
</body>
</html>