<?php
require_once('database.php');

// Get course ID
if (!isset($course_id)) {
    $course_id = filter_input(INPUT_GET, 'course_id', 
            FILTER_SANITIZE_STRING);
    if ($course_id == NULL || $course_id == FALSE) {
        $course_id = 'cs601';  //default value
    }
}
// Get name for selected course
$queryCourse = 'SELECT * FROM sk_courses
                  WHERE courseID = :course_id';
$statement1 = $db->prepare($queryCourse);
$statement1->bindValue(':course_id', $course_id);
$statement1->execute();
$course = $statement1->fetch();
$course_name = $course['courseName'];
$statement1->closeCursor();


// Get all courses
$query = 'SELECT * FROM sk_courses
                       ORDER BY courseID';
$statement = $db->prepare($query);
$statement->execute();
$courses = $statement->fetchAll();
$statement->closeCursor();


// Get students for selected course
$queryStudents = 'SELECT * FROM sk_students
                  WHERE courseID = :course_id
                  ORDER BY studentID';
$statement3 = $db->prepare($queryStudents);
// echo $course_id;
$statement3->bindValue(':course_id', $course_id);
$statement3->execute();
$students = $statement3->fetchAll();
$statement3->closeCursor();
?>
<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
</head> 

<!-- the body section -->
<body>
<header><h1>Course Manager</h1></header>
<main>
    <div id="center"><h1>Student List</h1></div>


    <aside>
        <!-- display a list of courses in left nav -->
        <h2>Courses</h2>
        <nav>
        <ul>
            <?php foreach ($courses as $course) : ?>
            <li><a href="./index.php?course_id=<?php echo $course['courseID']; ?>">
                    <?php echo $course['courseID']; ?>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
        </nav>          
    </aside>


    <section>
        <!-- display a table of products -->
        <h2><?php echo $course_id . " - " . $course_name; ?></h2>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th class="right">Email</th>
                <th>&nbsp;</th>
            </tr>

            <?php foreach ($students as $student) : ?>
            <tr>
                <td><?php echo $student['firstName']; ?></td>
                <td><?php echo $student['lastName']; ?></td>
                <td class="right"><?php echo $student['email']; ?></td>
                <td><form action="delete_student.php" method="post">
                    <input type="hidden" name="student_id"
                           value="<?php echo $student['studentID']; ?>">
                    <input type="hidden" name="course_id"
                           value="<?php echo $student['courseID']; ?>">
                    <input type="submit" value="Delete">
                </form></td>
            </tr>
            <?php endforeach; ?>
        </table>
        <p><a href="add_student_form.php">Add Student</a></p>
        <p><a href="course_list.php">List Courses</a></p>        
    </section>
</main>
<footer>
    <p>&copy; <?php echo date("Y"); ?> Scott Kaeneman</p>
</footer>
</body>
</html>