<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Functions</title>
</head>
<body>
	<p>
	<?php 
		function welcomeUser($name, $timeOfDay) {
			echo "Good $timeOfDay $name! Welcome to my web site.<br/>";
		}

		welcomeUser("John", "morning");
		welcomeUser("Jane", "evening");
	?>
	</p>
</body>
</html>