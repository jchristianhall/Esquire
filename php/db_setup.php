<?php

    // DB info for connecting
    $host = "localhost";
    $sqlusername = "root";
    $sqlpassword = "root";
    $db_name = "Esquire";

    date_default_timezone_set('America/Chicago');
    
    $dateFormat = "g:ia M j, Y";
    require_once("userClass.php");
    require_once("groupClass.php");
    require_once("Post.php");
    
?>