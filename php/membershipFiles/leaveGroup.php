<?php
    // Pull in necessary files and start session
    require_once("../classFiles/db_setup.php");

    session_start();
    
    // Get user object and groupID
    $user = $_SESSION['user'];
    $groupID = $_POST['groupID'];
    $groupID = str_replace("specificGroup", "", $groupID);

    // Create group object
    $group = new Group($groupID);
    
    // Remove the member
    $group->deleteMember($user->getEmail());
    
    // Remove group from logged in user's groups list
    $user->removeGroup($groupID);
?>