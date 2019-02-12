<!DOCTYPE HTML>
<html>
<head>
 <meta charset="utf-8" />
 <title>Functions</title>
</head>
<body>
	<p>
	<?php 
		$checkingAccountBalance = 1000.00;

		function calcTotal($subtotal, $taxable) {
			$taxRate = 0.085; // 8.5%
			if ($taxable) {
				$total = $subtotal * (1 + $taxRate);
			} else {
				$total = $subtotal;
			}
			return $total;
		}

		$shoppingTrip = calcTotal(410.22, TRUE);

		echo "Your new balance is $".
		number_format($checkingAccountBalance - $shoppingTrip, 2);
	?>
	</p>
</body>
</html>