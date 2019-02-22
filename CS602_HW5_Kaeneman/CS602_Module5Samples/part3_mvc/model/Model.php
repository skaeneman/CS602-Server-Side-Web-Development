<?php

	include_once("model/Stock.php");

	class Model {
		public function getStockList()
		{
			// This is our data source instead of a database
			return array(
				"MSFT" => new Stock("MSFT", 45.34, "Microsoft, Inc."),
				"GOOG" => new Stock("GOOG", 628.00, "Google, Inc."),
				"AAPL" => new Stock("AAPL", 123.38, "Apple, Inc.")
			);
		}
		
		public function getStock($title)
		{
			// find and return the matching stock from user form
			$allStocks = $this->getStockList();
			if (array_key_exists($title, $allStocks))
				return $allStocks[$title];
			else
				return NULL;
		}
	}

?>