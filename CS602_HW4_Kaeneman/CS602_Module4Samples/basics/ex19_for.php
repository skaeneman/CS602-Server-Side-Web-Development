<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>For</title>
</head>
<body>
	<p>
	<?php 
		for ($count = 1; $count <= 20000; $count *= 2) {
			echo $count . "<br/>";
		}
	?>
	</p>
</body>
</html>