<?php
	// Check to see if the form was submitted
	if(isset($_POST['submit'])) {

		// Create variables to hold our file path and name of the student nodes
		$file = 'bu_students.xml';
		$node = 'student';

		// Create new DOMDocument object (PHP feature) and set options
		$doc = new DOMDocument('1.0');
		$doc->preserveWhiteSpace = false;
		$doc->load($file);
		$doc->formatOutput = true;

		// Get root element - bu_students
		$root = $doc->documentElement;

		// Remove submit from our POST array, we don't want to add it to the file
		unset($_POST['submit']);

		// Create a new student element and append it to the bu_students (XML)
		$student = $doc->createElement($node);
		$student = $root->appendChild($student);

		// Take the firstName and lastName form data and insert it inside of 
		// the new student element
		foreach($_POST as $key => $value) {
			$i = $doc->createElement($key, $value);
			$student->appendChild($i);
		}
		
		// Save the file or give an error message. Redirect user to success.php
		$doc->save($file) or die('Oops! Something went wrong. Nothing saved.');
		header('Location:success.php');
	} else {
		echo 'Sorry, nothing was submitted.';
	}
?>