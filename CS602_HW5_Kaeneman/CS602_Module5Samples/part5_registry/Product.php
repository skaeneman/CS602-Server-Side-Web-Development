<?php

	/**
	 * Product Class.
	 */
	class Product {

		// Property declarations - self naming
		var $name;
		var $brand;
		var $model;
		var $price;
		var $description;

		// Create our constructor
		function __construct($name, $brand, $model, $price, $description) {
			$this->name = $name;
			$this->brand = $brand;
			$this->model = $model;
			$this->price = $price;
			$this->description = $description;
		}
	}
?>