<?php

	// Check to see if the form was submitted
	if(isset($_POST['submit'])) {

		// Write the code here


		
		
		header('Location:success.php');
	} else {
		echo 'Sorry, nothing was submitted.';
	}
?>