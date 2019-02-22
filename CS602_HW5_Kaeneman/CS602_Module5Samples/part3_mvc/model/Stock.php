<?php

	class Stock {
		public $symbol;
		public $price;
		public $company;
		
		public function __construct($symbol, $price, $company)  
	    {  
	      $this->symbol = $symbol;
		    $this->price = $price;
		    $this->company = $company;
	    } 
	}

?>