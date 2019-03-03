<?php

include('../common.inc.php');

$str_data = file_get_contents("my_favorite_movies.json");
$data = json_decode($str_data,true);

pr_dump($data);
 
echo "<p>Movie count: ".count($data["my_favorite_movies"])."<p>";

echo "<p>First Movie: ".$data["my_favorite_movies"][0]["movie"]["title"]."<p>";

foreach ($data["my_favorite_movies"] as $movie) {
	foreach ($movie["movie"] as $key => $value) {
		echo $key . " ---> " . $value . "<br/>";
	}
	echo "<br/>";
	
}
 
// Modify the value, and write the structure to a file "data_out.json"
//
$data["my_favorite_movies"][0]["movie"]["title"] = "Oceans Eleven";
 
 echo "<p>Modified Data<br/>";
 pr_dump($data);

$fh = fopen("data_out.json", 'w')
      or die("Error opening output file");
fwrite($fh, json_encode($data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
fclose($fh);