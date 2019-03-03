<?php
// Get the category data
$name = filter_input(INPUT_POST, 'name');
$courseId = filter_input(INPUT_POST, 'courseId');


// Validate inputs
if ($name == null || $courseId == null) {
    $error = "Invalid category data. Check all fields and try again.";
    include('error.php');
} else {
    require_once('database.php');

    // Add the product to the database  
    $query = 'INSERT INTO sk_courses (courseName, courseID)
              VALUES (:name, :courseId)';
    $statement = $db->prepare($query);
    $statement->bindValue(':name', $name);
    $statement->bindValue(':courseId', $courseId);
    $statement->execute();
    $statement->closeCursor();

    // Display the Course List page
    include('course_list.php');
}
?>