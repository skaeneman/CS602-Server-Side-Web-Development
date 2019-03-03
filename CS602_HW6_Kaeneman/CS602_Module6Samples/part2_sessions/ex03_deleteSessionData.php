<?php

include('../common.inc.php');

   session_start();
   
   $_SESSION['username'] = "Charlie";
   printf("Your username is: %s <br />", 
   	$_SESSION['username']);

   unset($_SESSION['username']);
   printf("Username now set to: %s", 
   	isset($_SESSION['username'])?$_SESSION['username']:"NA");
   pr_dump($_SESSION);

?>

