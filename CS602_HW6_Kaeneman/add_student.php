<?php
// Get the student data
$course_id = filter_input(INPUT_POST, 'course_id', FILTER_SANITIZE_STRING);
$firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
$lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);

// Validate inputs
if ($course_id == null || $course_id == false ||
        $firstName == null || $firstName == false || 
        $lastName == null || $lastName == false || 
        $email == null || $email == false) {
    $error = "Invalid student data. Check all fields and try again.";
    include('error.php');
} else {
    require_once('database.php');

    // Add the product to the database  
    $query = 'INSERT INTO sk_students (courseID, firstName, lastName, email)
              VALUES (:course_id, :firstName, :lastName, :email)';
    $statement = $db->prepare($query);
    $statement->bindValue(':course_id', $course_id);
    $statement->bindValue(':firstName', $firstName);
    $statement->bindValue(':lastName', $lastName);
    $statement->bindValue(':email', $email);
    $statement->execute();
    $statement->closeCursor();

    // Display the student list page
    include('index.php');
}
?>