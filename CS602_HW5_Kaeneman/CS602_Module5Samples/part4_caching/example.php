<?php

	/* Create cache file and set cache time */
	
	$cfile = dirname($_SERVER['SCRIPT_FILENAME']) . '/cache/cache.txt';
	$ctime = 30; // 30 seconds

	/* If the cache file modification time happened within cache time period,
	   show cache file and message that the results are cached and stop processing
	   the rest of the page 
	*/
	if (file_exists($cfile) && (time() - $ctime < filectime($cfile))) {
		echo "<h3>Showing cached results from " .
		date('F d, Y H:i:s', filemtime($cfile)) . "</h3>";
		include($cfile);
		exit;
		}
	ob_start(); // start the output buffer

	/* include/require our db connection info and the formatted results file */
	require_once('db_connect.php');
	require_once('results.php');

	$file = fopen($cfile, 'w'); // open the cache file and enable writing
	fwrite($file, ob_get_contents()); // save contents of output buffer to cache file
	fclose($file); // close the cache file
	ob_end_flush(); // send output to user/browser

?>