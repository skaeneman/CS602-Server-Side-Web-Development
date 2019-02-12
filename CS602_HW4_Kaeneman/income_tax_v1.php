 <?php
	// verify form was submitted and get user input
    if(isset($_POST['SubmitButton'])){
        $income = $_POST["income"];
        $message = $income;
	}
	
	// hide tax output by default
	$show_output = FALSE;

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		// show output
		$show_output = TRUE;
	}
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
					echo "Your tax bracket is " .$message;
				}
			?> 
    </main>
</body>
</html>


