<?php
    require_once("db_setup.php");
    session_start();
    
    $groupID = $_POST['groupID'];
    $message = $_POST['message'];

    $user = $_SESSION['user'];
    $email = $user->getEmail();
        
    $postNums = array();
    
    $con = mysql_connect("$host", "$sqlusername", "$sqlpassword");
    mysql_select_db("$db_name", $con);
    
    
    $sql = "SELECT postID FROM posts WHERE groupID = $groupID";
    $result = mysql_query($sql) or die("Could not get posts: " . mysql_error());
    
    while ($postIDresult = mysql_fetch_array($result)){
        $postID = $postIDresult['postID'];
        $postIDarray = explode("-", $postID);
        $postNum = $postIDarray[1];
        $postNums[] = $postNum;

    }
    
    
    $largestPostNum = max($postNums);
    $nextPostNum = $largestPostNum + 1;
    
    
    $newPostID = $groupID . "-" . $nextPostNum;
    $phpDate = date($dateFormat);
    $sqlDate = strtotime($phpDate);    
    
    $sql = "INSERT INTO posts (email, groupID, postID, message, dateTime, flag) VALUES ('$email', $groupID, '$newPostID', '$message', $sqlDate, 0)";
    mysql_query($sql) or die("Could not add post: " . mysql_error());
?>