<?php

if (isset($_COOKIE['course'])) {
    foreach ($_COOKIE['course'] as $name => $value) {
        $name = htmlspecialchars($name);
        $value = htmlspecialchars($value);
        echo "$name : $value <br />\n";
    }
}
?>