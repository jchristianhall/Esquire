<?php
    // Pull in necessary files and start session
    require_once("classFiles/db_setup.php");
    session_start();
    
    $con = mysql_connect("$host", "$sqlusername", "$sqlpassword");
    mysql_select_db("$db_name", $con);
    
    
    // Redirect back to log in if no one is logged in
    if (!array_key_exists('user', $_SESSION)){
        header('Location:index.php');
    }
    
    $postID = $_POST["postID"];
    $post = new Post($postID);	
    
	$post->removeFlag();
?>