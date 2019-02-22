<?php

	$statement = "SELECT * FROM City";

	$cities = $db->query($statement);
	echo "<h1>Results for " . $cities->rowCount() . " cities</h1><br>";

	echo "<table>" . 
		 "<tr><td>ID</td><td>Country Name</td><td>Country Code</td>" .
		 "<td>District</td><td>Population</td></tr>";

	foreach($cities->FetchAll() as $city) {
    	echo "<tr>" .
    		 "<td>" . $city['ID'] . "</td>" .
        	 "<td>" . $city['Name'] . "</td>" .
        	 "<td>" . $city['CountryCode'] . "</td>" .
        	 "<td>" . $city['District'] . "</td>" .
             "<td>" . $city['Population'] . "</td>" .
    		 "</tr>";
	}
	echo "</table>";

?>