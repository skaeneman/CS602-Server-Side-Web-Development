<?php

    require_once('database.php');

    // GET the params from the URL
    $action = filter_var($_GET['action'], FILTER_SANITIZE_STRING);
    $format_type = filter_var($_GET['format'], FILTER_SANITIZE_STRING);

        // if the format is XML
        if ($format_type == 'xml') {
            // if the action is courses
            if ($action == 'courses') {
                // query to find courses
                $query = 'SELECT * FROM sk_courses ORDER BY courseID';
                $statement = $db->prepare($query);
                $statement->execute();
                $courses = $statement->fetchAll();
                $statement->closeCursor();

                // first root element
                $xml = new SimpleXMLElement('<courses/>');

                // loop through courses and build child XML elements
                for ($i = 0; $i < count($courses); ++$i) {
                    $crs = $xml->addChild('course');
                    $crs->addChild('courseID', $courses[$i]['courseID']);
                    $crs->addChild('courseName', $courses[$i]['courseName']);
                }
                echo header("Content-type: text/xml");
                print($xml->asXML());
            } 
        };
?>
