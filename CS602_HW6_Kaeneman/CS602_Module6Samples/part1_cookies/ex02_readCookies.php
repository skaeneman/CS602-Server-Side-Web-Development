<?php

include('../common.inc.php');

// Print an individual cookie
echo $_COOKIE["CourseId"];


// Another way to debug/test is to view all cookies
pr_dump($_COOKIE);
?>