 <?php

	define ('TAX_RATES',
	  array(
		'Single' => array(
		  'Rates' => array(10, 15, 25, 28, 33, 35, 39.6),
		  'Ranges' => array(0, 9275, 37650, 91150, 190150, 413350, 415050),
		  'MinTax' => array(0, 927.50, 5183.75, 18558.75, 46278.75, 119934.75, 120529.75)
		  ),
		'Married_Jointly' => array(
		  'Rates' => array(10, 15, 25, 28, 33, 35, 39.6),
		  'Ranges' => array(0, 18550, 75300, 151900, 231450, 413350, 466950),
		  'MinTax' => array(0, 1855.00, 10367.50, 29517.50, 51791.50, 111818.50, 130578.50)
		  ),
		'Married_Separately' => array(
		  'Rates' => array(10, 15, 25, 28, 33, 35, 39.6),
		  'Ranges' => array(0, 9275, 37650, 75950, 115725, 206675, 233475),
		  'MinTax' => array(0, 927.50, 5183.75, 14758.75, 25895.75, 55909.25, 65289.25)
		  ),
		'Head_Household' => array(
		  'Rates' => array(10, 15, 25, 28, 33, 35, 39.6),
		  'Ranges' => array(0, 13250, 50400, 130150, 210800, 413350, 441000),
		  'MinTax' => array(0, 1325.00, 6897.50, 26835.00, 49417, 116258.50, 125936)
		  )
		)
	);

	/***********************************************************************************
	 *  This function will calculate taxes owed at various income levels 
	 *  $taxableIncome is the salary earned by an individual
	 *  $filingStatus is Single, Married_Jointly, Married_Separately, or Head_Household
	 ***********************************************************************************/
	function incomeTax($taxableIncome, $filingStatus) {
		$ranges = TAX_RATES[$filingStatus]['Ranges'];
		$minTax = TAX_RATES[$filingStatus]['MinTax'];
		$rates = TAX_RATES[$filingStatus]['Rates'];

		// get the greatest index in the array
		$maxIndex = max(array_keys($ranges));

		$taxesOwed = null;

		foreach ($ranges as $index => $range) {

			// echo $ranges[$index] + 1 .'$ranges[$index + 1]';

			// if taxableIncome equals one of the ranges or ranges + 1
			// if(($taxableIncome == $range) or ($taxableIncome == ($ranges[$index] + 1))) {
								
			// 	echo $rates[$index - 1]. "% equal to range in array <br>";
			// 	echo $index - 1 ." index - 1 <br>";

			// 	$rateDecimal = $rates[$index - 1] / 100; // convert to decimal
			// 	$taxesOwed =  (($taxableIncome - $ranges[$index]) * $rateDecimal) + $minTax[$index - 1];

			// 	break;
			// } 

			// if taxableIncome is greater than the maximum range value  
			if($taxableIncome > $ranges[$maxIndex]) {			
				
				// echo $rates[$maxIndex] ."% over array values <br>";
				// echo $maxIndex ." maxIndex <br>";

				// convert the rate at the max index to a decimal
				$rateDecimal = $rates[$maxIndex] / 100;
				// determine taxes owed
				$taxesOwed = (($taxableIncome - $ranges[$maxIndex]) * $rateDecimal) + $minTax[$maxIndex]; 
				break;
			}

			// if taxableIncome falls within the ranges in the array
			elseif(($taxableIncome <= $range) and ($taxableIncome > $ranges[$index - 1])) {
								
				// echo $rates[$index - 1]. "% in range of array <br>";
				// echo $index - 1 ." (index - 1) <br>";

				$rateDecimal = $rates[$index - 1] / 100; // convert to decimal
				$taxesOwed =  (($taxableIncome - $ranges[$index]) * $rateDecimal) + $minTax[$index];

				break;
			}   
		}  
		return $taxesOwed;
	};

	// $out = incomeTax(1000000, 'Single');
	// echo "$".number_format($out, 2) ." taxes owed";



	// get income from user input
      if(isset($_POST['SubmitButton'])) {
	  $incomeInput = $_POST["income"];
	}
	
	// hide tax table output by default
	$showOutput = FALSE;

	// variable to check user input
	$isInputNumeric = null;

	// if the form was submitted
    	if ($_SERVER['REQUEST_METHOD'] === 'POST') {


		// echo gettype($incomeInput);

	  	// check user input to see if it's valid number
		if (filter_var($incomeInput, FILTER_VALIDATE_FLOAT)) {
			$isInputNumeric = TRUE;
			// show output if user entered a number
			$showOutput = TRUE;			
		} else {
			$isInputNumeric = FALSE;
		}

		// $incomeSingle =  incomeTaxSingle($incomeInput);
		// $incomeTaxMarriedJointly = incomeTaxMarriedJointly($incomeInput, 2);
		// $incomeTaxMarriedSeparately = incomeTaxMarriedSeparately($incomeInput, 2);
		// $incomeTaxHeadOfHousehold = incomeTaxHeadOfHousehold($incomeInput, 2);

		// $output = incomeTax($incomeInput, 'Single');
		// echo "$".number_format($output, 2) ." taxes owed";		

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
				echo 'The input ';
				echo $incomeInput .' is not valid!  Please enter a number</div>';
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
			 // if it's a valid number show the output table.
			 // open a bracket.  php tag after html closes it.
			if($showOutput) {
				echo "With a net taxable income of $" .number_format($incomeInput, 2);
		?> 

			<!-- output the table for filing status -->
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
						<div class="col-sm-6"><?php echo "$" .number_format(incomeTax($incomeInput, 'Single'), 2); ?></div>
					</div>
				</li>			
				<li class="list-group-item">
					<div class="row">
						<div class="col-sm-6">Married Filing Jointly</div>
						<div class="col-sm-6"><?php echo "$" .number_format(incomeTax($incomeInput, 'Married_Jointly'), 2); ?></div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div class="col-sm-6">Maried Filing Separately</div>
						<div class="col-sm-6"><?php echo "$" .number_format(incomeTax($incomeInput, 'Married_Separately'), 2); ?></div>
					</div>
				</li>
				<li class="list-group-item">
					<div class="row">
						<div class="col-sm-6">Head Of Household</div>
						<div class="col-sm-6"><?php echo "$" .number_format(incomeTax($incomeInput, 'Head_Household'), 2); ?></div>
					</div>
				</li>      
			</ul>	

		<!-- closes php $showOutput tag -->
		<?php }; ?>

<br>
		<?php 
				foreach(TAX_RATES as $index => $taxArray) {


	echo $index;
 echo '<table class="table">
					<thead class="thead-light">
						<tr>
							<th scope="col">Taxable Income</th>
							<th scope="col">Tax Rate</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td scope="row">';
								echo  $taxArray;
				echo '</td>
							<td>';
							echo $taxArray;
				echo '</td>
						</tr>
					</tbody>
				</table> ';

				}
		?>

				<!-- <table class="table">
					<thead class="thead-light">
						<tr>
							<th scope="col">Taxable Income</th>
							<th scope="col">Tax Rate</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
						</tr>
					</tbody>
				</table> -->








	    </div>			
	  </div>
	</div>

    </main>
</body>
</html>


