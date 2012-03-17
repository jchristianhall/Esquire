<!DOCTYPE html>
<?php
    // Pull in required files and make sure the user is logged in, if not redirect ot log in
    require_once("php/userClass.php");
    require("php/groupClass.php");
    require_once("php/db_setup.php");
    session_start();
    if (!array_key_exists('user', $_SESSION)){
    header('Location:index.php');
    } 
?>

<html>
<head>
	<meta charset="utf-8" />
	<title>Groups | Esquire</title>
	<link rel="stylesheet" href="css/style.css" type="text/css" />
	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="js/site.js" type="text/javascript"></script>
</head>
<body>

	<!-- Create Group Box -->
	<div class="overlay" id="createGroupOverlay"></div>
	<div class="box" id="createGroupBox">
		<div id="createGroupTitle">Create a Group</div>
		<form action="createGroup.php" id="createGroupForm">
		<input type="text" name="createGroupName" placeholder="name" id="createGroupName" />
		<textarea name="createGroupDescription" placeholder="description" id="createGroupDescription"></textarea>
		<textarea name="createGroupEmails" placeholder="emails to invite" id="createGroupEmails"></textarea>
		<input type="submit" value="Create" class="buttonG" id="createGroupCreate" />
	</div>
	
	<!-- Group Page -->
	<div class="container">
		<header>
			<div class="mainTitle"></div>
			<div class="postButton"></div>
			<nav>
				<ul>
					<li class="button navFeed"><a href="feed.php">Feed</a></li>
					<li class="button navProfile">Profile</li>
					<li class="button navGroup"><a href="groups.php">Groups</a></li>
					<li class="button navLogout">Logout</li>
				</ul>
			</nav>
		</header>
		<input type="text" name="search" placeholder="search groups" id="groupSearch" />
		<div id="groupList">
		
            <?php 
                // Connect to database
                $con = mysql_connect("$host", "$sqlusername", "$sqlpassword");
                mysql_select_db("$db_name", $con);
                
                // Get current user from the session and get group IDs
                $user = $_SESSION['user'];
                $groupIDs = $user->getGroups();
                
                // Walk over each ID and add a group block for each one
                foreach($groupIDs as $groupID){
                    $group = new groupClass($groupID);
             ?>
                 	<div class="groupBlock">
                 		<div id="<?php echo $group->getGroupID(); ?>" class="groupTitle">
                 			<?php echo $group->getName(); ?>
                 		</div>
                 		<div class="groupText">
                 			<?php echo $group->getDescription(); ?>
                 		</div>
                 		<?php if($user->getEmail() == $group->getAdmin()){
                 		?>
                 		    <!-- Insert yo button -->
                 		    
                 		<?php } ?>
                 	</div>              
            <?php
                }
                mysql_close($con);
             ?>    
		</div>
		<div class="buttonG" id="groupCreate">Create</div> 
	</div>
	<footer>&copy; Copyright 2012 Esquire. Imaginary Rights Reserved.</footer>
</body>
</html>