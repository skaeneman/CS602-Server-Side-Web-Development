<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Switch</title>
</head>
<body>
	<p>
	<?php 
		$year = 2;
		switch ($year) {
			case 1:
				echo "You are in the Freshman year.";
				break;
			case 2:
				echo "You are in the Sophomore year.";
				break;
			case 3:
				echo "You are in the Junior year.";
				break;
			case 4:
				echo "You are in the Senior year.";
				break;
			default:
				echo "You need more time?";	
		}
	?>
	</p>
</body>
</html>