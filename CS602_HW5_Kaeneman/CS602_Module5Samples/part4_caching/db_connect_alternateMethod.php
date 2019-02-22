<?php
// not in the lecture notes, this is an alternate way of connecting to the db
class dbConnection {

	private var $dbname;
	private var $username;
	private var $password;
	private var $host;
	private var $dsn;
	private var $db;

	public function __construct($dbname, $username, $password, $host) {
		$this->dbname = $dbname;
		$this->username = $username;
		$this->password = $password;
		$this->dsn = "mysql:dbname=" . $dbname . ";host=" . $host . ";";

		try {
	    $this->db = new PDO($dsn, $username, $password, array (
    			  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)); 
		} 
		catch(PDOException $e) {
	    die('Could not connect to the database:<br/>' . $e);
		}


	}

	public function getDBC() {
		return $this->db;
	}

	
}

$databaseObj = new dbConnection("cs602", "cs602_user", "cs602_secret", "localhost"); // enter real info here
getDBC();
?>
