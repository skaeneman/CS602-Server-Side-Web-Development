<?php

	include_once("model/Model.php");

	class Controller {
		public $model;
		
		public function __construct()  
	    {  
	        $this->model = new Model();

	    } 
		
		public function main()
		{
			// strip tags, remove whitespace, convert to UPPERCASE
			if (isset($_POST['stock']))
				$cleanQuery = strip_tags(trim(strtoupper($_POST['stock'])));
			else
				$cleanQuery = NULL;

			// if form is submitted with data
			if (isset($cleanQuery) && $cleanQuery != NULL)
			{
				// show the stock that has been queried
				$stock = $this->model->getStock($cleanQuery);
				include 'view/viewstock.php';
			}
			else
			{	// show the user form
				include 'view/form.php';
			}
		}
	}

?>