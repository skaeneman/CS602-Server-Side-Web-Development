<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Type Casting</title>
</head>
<body>
	<p>
	<?php 
		$price = "2.75";
		$discount = 1.00;
		$result = (float)$price - $discount;
		echo $result;
		echo " -> ";
		echo gettype($result);
		echo "<br/>";
		echo $price;
		echo " -> ";
		echo gettype($price);
	?>
	</p>
</body>
</html>