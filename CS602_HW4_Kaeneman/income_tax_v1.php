 <?php
    if(isset($_POST['SubmitButton'])){
        $income = $_POST["income"];
        $message = $income;
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

		    <?php echo "Your income is " .$message; ?>
    </main>
</body>
</html>





    <!-- <!DOCTYPE html>
    <html>
    <head>
        <title></title>
    </head>
    <body>
        <form action="#" method="post">
            <input type="number" name="price"> <br>
            <input type="number" name="qty"><br>
            <input type="submit" name="SubmitButton">
        </form>

    </body>
    </html> -->