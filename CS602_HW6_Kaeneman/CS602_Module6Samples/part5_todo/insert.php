<?php

	// Check to see if the form was submitted
	if(isset($_POST['submit'])) {

		// Write the code here
		
		$fName = filter_input(INPUT_POST, 'firstName');
		$lName = filter_input(INPUT_POST, 'lastName');
		 
		$json = file_get_contents('bu_students.json');
        $students = json_decode($json, true);
        $student = array('firstName' => $fName, 'lastName' => $lName);
        $students['students'][] = $student;
		

		$json_data = json_encode($students);
		echo $json_data;
        // file_put_contents('bu_students.json', $json_data);

		// header('Location:success.php');
	} else {
		echo 'Sorry, nothing was submitted.';
	}
?>

