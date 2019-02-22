<?php

class Registry {

    // Create an array to hold objects that are added to the Registry
    private static $_objects = array(); 

    // We intentionally make __construct and __clone inaccessible
    private function __construct() {}
    private function __clone() {}

    // Create function to add object to Registry
    public static function set($name, $object) {
        if (!isset(self::$_objects[$name])) {
            self::$_objects[$name] = $object;
        } else {
            throw new Exception($name . " is already in the registry!");
        }

    }

    // Create function to retrieve an object from the registry 
    public static function get($name) {
        if (isset(self::$_objects[$name])) {
            return self::$_objects[$name];
        } else {
            throw new Exception($name . " does not exist in the registry!");
        }

    }
}
?>