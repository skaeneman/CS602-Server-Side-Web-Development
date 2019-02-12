<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Else</title>
</head>
<body>
	<p>
	<?php 
		$age = 17;
		if ($age >= 18) {
			echo "You can legally vote in the USA.";
		} else {
			echo "Sorry, you are not old enough to vote yet.";
		}
	?>
	</p>
</body>
</html>