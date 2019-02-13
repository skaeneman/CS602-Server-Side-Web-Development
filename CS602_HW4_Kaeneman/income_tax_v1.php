 <?php

	 // calculate income tax for single filers
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

	/**
	 * This function will calculate an income tax rate
	 * $income is a persons salary
	 * $minimumTax is the minumum amount of taxes owed
	 * $taxBracket is the percentage rate taxed on income
	 * $amountOver is the minimum income which is multiplied against the tax bracket  
	 */
	function incomeTaxRate($income, $minimumTax, $taxBracket, $amountOver) {
		// convert tax bracket to a percentage
		$taxBracket = $taxBracket / 100;
		echo $taxBracket;
	}

	// verify form was submitted and get user input
    if(isset($_POST['SubmitButton'])){
        $incomeInput = $_POST["income"];
        $message = $incomeInput;
	}
	
	// hide tax output by default
	$show_output = FALSE;

	// if the form was submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		// show output
		$show_output = TRUE;

	$incomeSingle =  incomeTaxSingle($incomeInput);
	echo $incomeSingle;


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
                <input type="submit" name="SubmitButton" income="Submit"><br>
            </div>
		</form>

			<?php
				if ($show_output) {
					echo "Your tax bracket is " .$message;
				}
			?> 
    </main>
</body>
</html>


