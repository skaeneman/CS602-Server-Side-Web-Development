<?php
   session_start ();

   echo "Your session id number is ".session_id();

   echo "<p>Session Path ". session_save_path();
?>