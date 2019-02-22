 <?php

   // our interface
   interface Shape {
      public function calcArea();
   }

   // Square class
   class Square implements Shape {
      private $width;
      private $height;

      public function __construct($width, $height) {
         $this->width = $width;
         $this->height = $height;
      }

      public function calcArea(){
         return $this->width * $this->height;
      }
   }

   // Triangle class
   class Triangle implements Shape {
      private $base;
      private $height;

      public function __construct($base, $height) {
         $this->base = $base;
         $this->height = $height;
      }

      public function calcArea(){
         return (($this->base * $this->height) / 2);
      }
   }

   // Polymorphism in action, notice the type hinting
   function getArea(Shape $shape) {
      return $shape->calcArea();
   }

   $square = new Square(4, 4);
   $triangle = new Triangle(6, 9);

   echo "Our square has an area of: " . getArea($square) . "<br>";
   echo "Our triangle has an area of: " . getArea($triangle) . "<br>";
   // let's generate an error
   echo "Our triangle has an area of: " . getArea(25) . "<br>";
?>