 <?php

	 // income tax brackets for single filers
    function incomeTaxSingle($income) {
		$taxesOwed = 0;
		
        if ($income >= 0 && $income <= 9275) {
            $taxesOwed = $income - ($income * 0.10);
		} 
		elseif ($income >= 9276 && $income <= 37650) {
            $taxesOwed = incomeTaxRate($income, 927.50, 15, 9275);
		} 
		elseif ($income >= 37651 && $income <= 91150) {
            $taxesOwed = incomeTaxRate($income, 5183.75, 25, 37650);
		} 
		elseif ($income >= 91151 && $income <= 190150) {
            $taxesOwed = incomeTaxRate($income, 18558.75, 28, 91150);
		} 
		elseif ($income >= 190151 && $income <= 413350) {
            $taxesOwed = incomeTaxRate($income, 46278.75, 33, 190150);
		} 
		elseif ($income >= 413351 && $income <= 415050) {
            $taxesOwed = incomeTaxRate($income, 119934.75, 35, 413350);
		} 
		elseif ($income >= 415051) {
            $taxesOwed = incomeTaxRate($income, 120529.75, 39.6, 415050);
        }
        return $taxesOwed;
    }	 

	/********************************************************************************
	 * This function will calculate an income tax rate when given the below parameters
	 * $income is a persons salary
	 * $minimumTax is the minumum amount of taxes owed in the particular tax bracket
	 * $taxRate is the percentage rate taxed on income
	 * $amountOver is the limit where additional taxes are added 
	 ********************************************************************************/
	function incomeTaxRate($income, $minimumTax, $taxRate, $amountOver) {
		// convert tax bracket to a percentage
		$taxRate = $taxRate / 100;
		// calculate the marginal tax rate
		$marginalTaxRate = (($income - $amountOver) * $taxRate) + $minimumTax;
		return $marginalTaxRate;
	}

	// verify form was submitted and get user input
    if(isset($_POST['SubmitButton'])){
        $incomeInput = $_POST["income"];
	}
	
	// hide tax output by default
	$show_output = FALSE;

	// if the form was submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		// show output
		$show_output = TRUE;

	$incomeSingle =  incomeTaxSingle($incomeInput);
	echo "incomeTaxSingle $" .number_format($incomeSingle, 2);


	}// $_SERVER
?>

<!DOCTYPE html>
<html>
<head>
    <title>Income Tax Calculator</title>
</head>

<body>
    <main>
		<h1>Income Tax Calculator</h1>
		<!-- post form to same page -->
		<form method="POST" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]); ?>">

            <div id="data">
                <label>Your Net Income:</label>
                <input type="text" name="income"><br>
            </div>

            <div id="buttons">
                <label>&nbsp;</label>
                <input type="submit" name="SubmitButton" value="Submit"><br>
            </div>
		</form>

			<?php
				if ($show_output) {
					echo "With a net taxable income of $" .number_format($incomeInput, 2);
				}
			?> 
    </main>
</body>
</html>


