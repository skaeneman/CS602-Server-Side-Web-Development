<?php
    require_once('database.php');

    // GET the params from the URL
    $action = filter_var($_GET['action'], FILTER_SANITIZE_STRING);
    $format_type = filter_var($_GET['format'], FILTER_SANITIZE_STRING);


            /******************************************************** 
             * GET all courses
             * *******************************************************/            
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
                // if the format is XML
                if ($format_type == 'xml') {
                    echo header("Content-type: text/xml");
                    print($xml->asXML());
                }
                // if the format is JSON
                else if ($format_type == 'json') {
                    echo header("Content-type: text/json");
                    echo json_encode($courses, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);                                        
                }
                else {
                    echo "Error: format type invalid.";
                }                
            }
            /******************************************************** 
             * GET the students for a particular course output XML   
             * *******************************************************/            
            else if ($action == 'students') {
                $course_id = filter_var($_GET['course'], FILTER_SANITIZE_STRING);

                // Get students for selected course
                $queryStudents = 'SELECT * FROM sk_students
                                  WHERE courseID = :course_id
                                  ORDER BY studentID';
                $statement3 = $db->prepare($queryStudents);
                $statement3->bindValue(':course_id', $course_id);
                $statement3->execute();
                $students = $statement3->fetchAll();
                $statement3->closeCursor();                

                // first root element
                $xml = new SimpleXMLElement('<students/>');

                // loop through courses and build child XML elements
                for ($i = 0; $i < count($students); ++$i) {                            
                    $crs = $xml->addChild('student');
                    $crs->addChild('studentID', $students[$i]['studentID']);
                    $crs->addChild('courseID', $students[$i]['courseID']);
                    $crs->addChild('firstName', $students[$i]['firstName']);
                    $crs->addChild('lastName', $students[$i]['lastName']);
                    $crs->addChild('email', $students[$i]['email']);
                }        
                echo header("Content-type: text/xml");
                print($xml->asXML());                
            } 
            else {
                echo "Error: action param is invalid.";
            }    
?>
