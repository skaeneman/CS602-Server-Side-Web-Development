<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Elseif</title>
</head>
<body>
	<p>
	<?php 
		$age = 18;
		$citizen = FALSE;
		if ($age >= 18 && $citizen == TRUE) {
				echo "You can legally vote in the USA.";
		} elseif ($age >= 18 && $citizen == FALSE) {
				echo "Sorry, you are old enough to vote, but you must also be a citizen.";
		} else {
				echo "Sorry, you are not eligible to vote yet.";
		}
	?>
	</p>
</body>
</html>