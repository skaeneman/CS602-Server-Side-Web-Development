<?php
	$students = simplexml_load_file('bu_students.xml');

	foreach($students->student as $student) {
		echo "<p>" . $student->firstName . " " . $student->lastName . "</p>";
	}

?>