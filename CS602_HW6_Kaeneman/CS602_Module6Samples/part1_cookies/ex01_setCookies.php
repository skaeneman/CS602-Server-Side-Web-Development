<?php

$value1 = 'cs602';
$value2 = 'Server Side Web Development';

setcookie("CourseId", $value1);

	/* expire in 1 hour */
setcookie("CourseName1", $value2, 
	time()+3600, "/cs602");  

?>