<!DOCTYPE HTML>
<html>
	<meta charset="utf-8" />
	<title>View Stock</title>
</head>
<body>
<?php 

	if (isset($stock) && ($stock != NULL)) {
		echo "Stock symbol: " . $stock->symbol . '<br>';
		echo "Stock price: $" . number_format($stock->price, 2) . '<br>';
		echo "Company: " . $stock->company;
	} else {
		echo "Symbol not found!<br><br>";
		echo "Hint: Try MSFT, GOOG, or AAPL";
	}

?>
<br><br>
<button onclick="window.location.href='example.php'">Go Back</button> 
</body>
</html>