 <?php

    // income tax brackets for single filers
    function incomeTaxSingle($income) {
	$taxesOwed = 0;  
		
        if ($income >= 0 && $income <= 9275) {
            $taxesOwed = ($income * 0.10);
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

    // tax brackets for married couples filing jointly
    function incomeTaxMarriedJointly($income) {
	$taxesOwed = 0;
		
        if ($income >= 0 && $income <= 18550 ) {
            $taxesOwed = ($income * 0.10);
		} 
		elseif ($income >= 18551 && $income <= 75300) {
            $taxesOwed = incomeTaxRate($income, 1855, 15, 18550);
		} 
		elseif ($income >= 73301 && $income <= 151900) {
            $taxesOwed = incomeTaxRate($income, 10367.50, 25, 75300);
		} 
		elseif ($income >= 151901 && $income <= 231450) {
            $taxesOwed = incomeTaxRate($income, 29517.50, 28, 151900);
		} 
		elseif ($income >= 231451 && $income <= 413350) {
            $taxesOwed = incomeTaxRate($income, 51791, 33, 231450);
		} 
		elseif ($income >= 413351 && $income <= 466950) {
            $taxesOwed = incomeTaxRate($income, 111818.50, 35, 413350);
		} 
		elseif ($income >= 466951) {
            $taxesOwed = incomeTaxRate($income, 130578.50, 39.6, 466950);
        }
        return $taxesOwed;
    }	 

     // tax brackets for married couples filing seperately
    function incomeTaxMarriedSeparately($income) {
	$taxesOwed = 0;
		
        if ($income >= 0 && $income <= 9275) {
            $taxesOwed = ($income * 0.10);
		} 
		elseif ($income >= 9276 && $income <= 37650) {
            $taxesOwed = incomeTaxRate($income, 927.50, 15, 9275);
		} 
		elseif ($income >= 37651 && $income <= 75950) {
            $taxesOwed = incomeTaxRate($income, 5183.75, 25, 37650);
		} 
		elseif ($income >= 75951 && $income <= 115725) {
            $taxesOwed = incomeTaxRate($income, 14758.75, 28, 75950);
		} 
		elseif ($income >= 115726 && $income <= 206675) {
            $taxesOwed = incomeTaxRate($income, 25895.75, 33, 115725);
		} 
		elseif ($income >= 206676 && $income <= 233475) {
            $taxesOwed = incomeTaxRate($income, 55909.25, 35, 206675);
		} 
		elseif ($income >= 233476) {
            $taxesOwed = incomeTaxRate($income, 65289.25, 39.6, 233475);
        }
        return $taxesOwed;
    }	

     // tax bracket for head of household
    function incomeTaxHeadOfHousehold($income) {
	$taxesOwed = 0;
		
        if ($income >= 0 && $income <= 13250) {
            $taxesOwed = ($income * 0.10);
		} 
		elseif ($income >= 13251 && $income <= 50400) {
            $taxesOwed = incomeTaxRate($income, 1325, 15, 13250);
		} 
		elseif ($income >= 50401 && $income <= 130150) {
            $taxesOwed = incomeTaxRate($income, 6897.5, 25, 50400);
		} 
		elseif ($income >= 130151 && $income <= 210800) {
            $taxesOwed = incomeTaxRate($income, 26835, 28, 130150);
		} 
		elseif ($income >= 210801 && $income <= 413350) {
            $taxesOwed = incomeTaxRate($income, 49417, 33, 210800);
		} 
		elseif ($income >= 413351 && $income <= 441000) {
            $taxesOwed = incomeTaxRate($income, 116258.5, 35, 413350);
		} 
		elseif ($income >= 441001) {
            $taxesOwed = incomeTaxRate($income, 125936, 39.6, 441000);
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

	// get income from user input
      if(isset($_POST['SubmitButton'])) {
	  $incomeInput = $_POST["income"];
	}
	
	// hide tax output by default
	$showOutput = FALSE;
	// variable to check user input
	$isInputNumeric = FALSE;

	// if the form was submitted
    	if ($_SERVER['REQUEST_METHOD'] === 'POST') {


		// echo gettype($incomeInput);

	  	// check user input to see if it's valid number
		if (filter_var($incomeInput, FILTER_VALIDATE_FLOAT)) {
			$isInputNumeric = TRUE;
		} else {
			$isInputNumeric = FALSE;
		}

		// show output
		$showOutput = TRUE;

		$incomeSingle =  incomeTaxSingle($incomeInput);
		$incomeTaxMarriedJointly = incomeTaxMarriedJointly($incomeInput, 2);
		$incomeTaxMarriedSeparately = incomeTaxMarriedSeparately($incomeInput, 2);
		$incomeTaxHeadOfHousehold = incomeTaxHeadOfHousehold($incomeInput, 2);

	}// $_SERVER
?>

<!DOCTYPE html>
<html>
<head>
    <!-- bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Income Tax Calculator</title>
</head>

<body>
    <main>

	<div class="container">
	  <div class="row">
	    <div class="col-sm-12">

		<!-- generate an alert when input is non-numeric -->
		<?php 
			if($isInputNumeric === FALSE) {	
				echo '<br>';				
				echo '<div class="alert alert-danger" role="alert">';
				echo $incomeInput .' is not valid!  Please enter a valid number</div>';
			} 				
		?>

		<br>
		<div class="text-center"><h1>Income Tax Calculator</h1></div><br>

		<!-- post form to same page -->
		<form method="POST" action="<?php htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
			<!-- user input -->
			<div class="form-row align-items-center">
			  <label class="col-sm-2 col-form-label"><strong>Your Net Income:</strong></label>
			  <div class="col-sm-8 my-1">
				<input type="text" name="income" class="form-control" placeholder="Taxable income">
			  </div>
			  <div class="col-auto my-1">
				<button type="submit" name="SubmitButton" class="btn btn-outline-primary">Submit</button>
			  </div>
			</div>
		</form>
		<br>

		<?php
			if ($showOutput) {
				echo "With a net taxable income of $" .number_format($incomeInput, 2);
			}
		?> 

		<br><br>
		<ul class="list-group">
		<li class="list-group-item active">
			<div class="row">
				<div class="col-sm-6">Status</div>
				<div class="col-sm-6">Tax</div>
			</div>
		</li>
		<li class="list-group-item">
			<div class="row">
				<div class="col-sm-6">Single</div>
				<div class="col-sm-6"><?php echo "$" .number_format($incomeSingle, 2); ?></div>
			</div>
		</li>
		<li class="list-group-item">
			<div class="row">
				<div class="col-sm-6">Married Filing Jointly</div>
				<div class="col-sm-6"><?php echo "$" .number_format($incomeTaxMarriedJointly, 2); ?></div>
			</div>
		</li>
		<li class="list-group-item">
			<div class="row">
				<div class="col-sm-6">Maried Filing Separately</div>
				<div class="col-sm-6"><?php echo "$" .number_format($incomeTaxMarriedSeparately, 2); ?></div>
			</div>
		</li>
		<li class="list-group-item">
			<div class="row">
				<div class="col-sm-6">Head Of Household</div>
				<div class="col-sm-6"><?php echo "$" .number_format($incomeTaxHeadOfHousehold, 2); ?></div>
			</div>
		</li>      
		</ul>		

	    </div>			
	  </div>
	</div>

    </main>
</body>
</html>


