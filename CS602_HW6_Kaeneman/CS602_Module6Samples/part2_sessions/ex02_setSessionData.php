<?php

include('../common.inc.php');

    session_start();
    $_SESSION['username'] = "John";
    printf("Your username is %s.", $_SESSION['username']);

    $courses_array = array("cs601", "cs602", "cs701");
    $_SESSION['courses'] = $courses_array;

    pr_dump($_SESSION);

?>

