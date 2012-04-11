$(document).ready(function() {

    /** Login, join, logout, and validation **/
    
    // Sniffer for login submit
	$('#loginForm').submit(login);
	
	// Sniffer for join submit
	$('#joinForm').submit(function() {
	    newAccount(event);
	});
	
	// Sniffers for blurs on the email, password, and confirm password for create account page
	$('#joinEmail').blur(validateEmail);
    $('#joinPassword').blur(validatePass1);
    $('#joinConfirm').blur(validatePass2);
    
    // Sniffer for logout
    $('.navLogout').click(function(){window.location.replace("index.php");});
    
    
    /** Profile edit buttons **/
    
    // Sniffer for profile button click
    $('.navProfile').click(showProfile);
    
    // Sniffer for edit profile click
    $('#profileEdit').click(showEditProfile);
    
    // Sniffer for profile cancel click    
    $('#profileCancel').click(hideProfile);
    $('#editProfileCancel').click(hideProfile);
    
    // Sniffers for blurs on the password and confirm password
    $('#editProfilePassword').blur(validatePass1);
    $('#editProfileConfirm').blur(validatePass2);
    $('#editProfileForm').submit(editProfile);
    
    
    /** Group functions **/
    
    // Sniffer for creating a new group and canceling group
    $('#groupCreate').click(
    	function(){
    		event.stopPropagation();
    		$('#createGroupOverlay').fadeIn('fast');
    		$('#createGroupBox').fadeIn('fast');
    		$("#createGroupName").focus();
    	}
    );
    $('#createGroupCancel').click(
        function(){
            $('#createGroupOverlay').fadeOut('fast');
            $('#createGroupBox').fadeOut('fast');
            $("#createGroupInvalidEmail").fadeOut('fast');
            $("#createGroupEmptyField").fadeOut('fast');
        }
    );
    $('#createGroupCreate').click(createGroup);
    
    // Sniffer for admin's delete group button
    $('.groupDelete').click(deleteGroup);
    
    // Sniffer for leave group
    $('#specificGroupDelete').click(leaveGroup);
    
    // Sniffer for searching for groups
    $('#groupSearch').keyup(function(event){
        if (event.keyCode == 13 && $('#groupSearch').val() != ""){
            window.location.replace("groupSearch.php?search=" + $("#groupSearch").val());
        }
    });
    
    $('.groupAdd').click(groupAdd);
    
    // Sniffer for accept invitation button
    $('.accept').click(acceptInvitation);
    
    // Sniffer for accept invitation button
    $('.decline').click(declineInvitation);
    
    // Sniffer for feed click
    $('.navFeed').click(loadFeedSelection);
    
    // Sniffer for closing feed select
    
    // Sniffer for each group click for feed
    $(".feedGroupBlock").click(moveToFeedPage);
    
    /** Group's admin privileges **/
    
    // Sniffer for remove member click 
    $('.specificGroupRemove').click(removeMember);
    
    // Sniffer for admin edit group button and cancel
    $('.specificGroupEdit').click(
        function(){
            event.stopPropagation();
            $('#editGroupBox').fadeIn('fast'); 
            $('.overlay').fadeIn('fast');
        }
    );
    
    // Cancel button for edit group popover
    $('#editGroupCancel').click(
        function(){
            $('#editGroupBox').fadeOut('fast');
            $('.overlay').fadeOut('fast');
        }
    );
    
    // Click for edit group
    $('#editGroupCreate').click(editGroup);
    
    // Sniffer for admin invite member button and cancel
    $('#specificGroupAdd').click(
        function(){
            event.stopPropagation();
            $('#inviteBox').fadeIn('fast');
            $('.overlay').fadeIn('fast');
            $('#inviteEmails').focus();
        }
    );
    
    // Submit for inviting new members
    $('#inviteSubmit').click(inviteMembers);
    
    // Cancel click for invite box
    $('#inviteCancel').click(
        function(){
            $('#inviteBox').fadeOut('fast');
            $('.overlay').fadeOut('fast');
        }
    );
    
    // Sniffer for click on deny request
    
    
    
    // Sniffer for click on permit request
    
    /** Post stuff **/
    $(".postButton").click(
        function(){
            event.stopPropagation();
            $("#postBox").fadeIn('fast');
            $(".overlay").fadeIn('fast');
            $("#postContent").focus();
        }
    );
    $("#postCancel").click(
        function(){
            $("#postBox").fadeOut('fast');
            $(".overlay").fadeOut('fast');
        }
    );
    
    $('#postCreate').click(newPost);
    
    $('#postBox').keypress(function(event){
        if (event.keyCode == 13){
            newPost();
        }
    });
    
    
    $('.overlay').click(
        function() {
            //Hide the menus if visible
            $('.overlay').fadeOut('fast');
            $('#profilePopover').fadeOut('fast');
            $('#editProfilePopover').fadeOut('fast');
            $('#createGroupBox').fadeOut('fast');
            $('#inviteBox').fadeOut('fast');
            $('#editGroupBox').fadeOut('fast');
            $('#postBox').fadeOut('fast');
         }
     );
     
//     $('html').mousemove(function(event){
//         console.log(event.pageX + " " + event.pageY);
//     });
});


/** Login and join functions **/

// AJAX function for login. Checking to see if correct login.
function login(event){
	event.preventDefault();
	
	// Create data form form and get action
	var data = $("form#loginForm").serialize();
	var url = $('form#loginForm').attr('action');
	
	// AJAX function to submit data for login.php, if successful move user to next page, otherwise present error
	$.post(url, data,
		function(data) {
	        console.log(data);
            if (data=="success"){
                window.location.replace("groups.php");
		    }
		    else {
                $('#loginError').fadeIn('fast');
		    }
	    }
	);
}


// Function that handles the returns of php validation and moving user to next page upon successful account creation
function newAccount(event){
    event.preventDefault();
    
    // Create data form form and get action
    var data = $("form#joinForm").serialize();
    var url = $("form#joinForm").attr('action');
    
    if($("#joinFirst").val()=="" || $("#joinLast").val()=="" || $("#joinPhone").val()==""){
        $('#blankError').fadeIn('fast');
    }
    else{
        $('#blankError').fadeOut('fast');
    }
    
    var file = $('#createProfileImage').val();
    console.log(file);
    var fileName = file.fileName;
    var fileSize = file.fileSize;
    
    alert("Uploading: "+fileName+" @ "+fileSize+"bytes");
  
    
    // Use AJAX post to prevent refresh of page
    $.post (url, data,
        function(data) {       
            console.log(data);     
            // Check for each error in the return data and present error windows accordingly
            if (data.indexOf("exists") != -1){
                $('#creationError').fadeIn('fast');
            }
            else {$('#creationError').fadeOut('fast');}
            
            if (data.indexOf("emailError") != -1){
                $('#emailError').fadeIn('fast');
            }
            else {$('#emailError').fadeOut('fast');}
            
            if (data.indexOf("passwordError") != -1){
                $('#invalidPassError').fadeIn('fast');
            }
            else {$('#invalidPassError').fadeOut('fast');}
            
            if (data.indexOf("passwordMatchError") != -1){
                $('#passMatchError').fadeIn('fast');
            }
            else {$('#passMatchError').fadeOut('fast');}
            
            if (data.indexOf("blankError") != -1){
                $('#blankError').fadeIn('fast');
            }
            else {$('blankError').fadeOut('fast');}
            
            
            // If there are no errors then move the user to the next page
            if (data=='success'){window.location.replace("groups.php");}
        }
    );
}

/** Validation functions **/

// Validate email using a regular expression
function validateEmail(){
    var regEmail = (/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);    
    
    if(regEmail.test(this.value)){
        $('#emailError').fadeOut('fast');
        return true;
    }
    
    else {
        $('#emailError').fadeIn('fast');
        return false;
    }
}

// Validate password, much meet 5 character criteria
function validatePass1(){    
    if (this.value.length > 4){
        $('#invalidPassError').fadeOut('fast');
        return true;
    }
    
    else {
        $('#invalidPassError').fadeIn('fast');
        return false;
    }
}

// Validate confirm password by comparing it to the first one and ensuring they are identical
function validatePass2(){
    var pass = $('#joinPassword');
    
    if (pass.val() == this.value){
        $('#passMatchError').fadeOut('fast');
        return true;
    }
    
    else {
        $('#passMatchError').fadeIn('fast');
        return false;
    }
}

/** Create and delete a group **/

// Create a group by using a php file
function createGroup(){
    event.preventDefault();
    event.stopPropagation();

    var data = $("form#createGroupForm").serialize();
    var url = $("form#createGroupForm").attr('action');
    $('#createGroupName').val('');
    $('#createGroupDescription').val('');
    $('#createGroupEmails').val('');
    
    //if($("#createGroupName".val=="" || $("createGroupDescription").val==""
    
    $.post (url, data,
        function(data){
            console.log(data);
            // Check for each error
            if (data.indexOf("emailError") != -1){
                $("#createGroupInvalidEmail").fadeIn('fast');
            }
            else{
                $("#createGroupInvalidEmail").fadeOut('fast');
            }                
            if (data.indexOf("blankError") != -1){
                $("#createGroupEmptyField").fadeIn('fast');
            }
            else{
                $("#createGroupEmptyField").fadeOut('fast');
            }
            if (data==''){window.location.replace("groups.php");}
        }
    );
}

// Delete a group using a php file
function deleteGroup(){
    var id = this.id;
    var dataToSend = {groupID : id};
    $.ajax({
        type:    "POST",
        url:     "php/removeGroup",
        data:    dataToSend,
        success: function(){window.location.replace("groups.php");}
    });
}

/** Group admin's privileges **/

// Leave a group using a php file
function leaveGroup(){
    var id = $('.container').attr('id');
    var dataToSend = {groupID: id};
    console.log(id);
    $.ajax({
        type:    "POST",
        url:     "php/membershipFiles/leaveGroup.php",
        data:    dataToSend,
        success: function(){window.location.replace("groups.php");}
    });
}

// Admin's privilege to remove a member by using a php file
function removeMember(){
    var id = $('.container').attr('id');
    var email = this.id;
    var dataToSend = {groupID: id, email: email};
    $.ajax({
        type:     "POST",
        url:      "php/membershipFiles/deleteMember",
        data:     dataToSend,
        success:  function(){window.location.reload();}
    });
}

function editGroup(event){
    event.preventDefault();
    event.stopPropagation();

    var data = $("form#editGroupForm").serialize();
    var url = $("form#editGroupForm").attr('action');
    var groupID = $(".container").attr('id');
    groupID = groupID.replace("specificGroup", "");
    
    if ($("#editGroupName").val()=="" || $("#editGroupDescription").val()==""){
        $('#createGroupEmptyField').fadeIn('fast');
    }
    else {
        $('#createGroupEmptyField').fadeOut('fast');
        $.ajax({
            type:    "POST",
            url:     "php/editGroup.php",
            data:    data,
            success: function(data){window.location.reload();}
        });
    }
} 


// Invite new members to a group
function inviteMembers(){
    event.preventDefault();
    event.stopPropagation();

    var groupID = $('.container').attr('id');
    groupID = groupID.replace("specificGroup", "");
    
    var emails = $('#inviteForm :input').val();
    
    var groupID = $('.container').attr('id');
    groupID = groupID.replace("specificGroup", "");
    
    var url = $("form#inviteForm").attr('action');
    
    var dataToSend = {emails: emails, groupID: groupID};
    
    $('#inviteEmails').val('');
    
    $.ajax({
        type:       "POST",
        url:        "php/membershipFiles/invite.php",
        data:       dataToSend,
        success:    function(data){
                        console.log(data);
                        if(data.indexOf("emailError") != -1){
                            $("#inviteEmailError").fadeIn('fast');
                        }
                        else{$("#inviteEmailError").fadeOut('fast');}
                        
                        if(data==""){
                            $('#inviteBox').fadeOut('fast');
                            $('.overlay').fadeOut('fast');
                            $(':input','#inviteForm')
                            .removeAttr('inviteEmails');
                            
                        }                
        }
    });
}


// Permit a request from a user
function permitRequest(){
    var email = this.id;
    email = email.replace("permit", "");
    var id = $('.container').attr('id');
    var groupID = id.replace("specificGroup", "");
    
    var dataToSend = {emailToBePermitted: email, groupID: groupID};
    $.ajax({
        type:     "POST",
        url:      "php/membershipFiles/permitRequest",
        data:     dataToSend,
        success:  function(data){console.log(data);} //window.location.reload;}
    });
}

// Deny a request from a user
function denyRequest(){
    var email = this.id;
    email = email.replace("deny", "");
    var id = $('.container').attr('id');
    var groupID = id.replace("specificGroup", "");
    
    
    var dataToSend = {emailToBeDenied: email, groupID: groupID};
    $.ajax({
        type:     "POST",
        url:      "php/membershipFiles/denyRequest",
        data:     dataToSend,
        success:  function(data){console.log(data);} //window.location.reload;}
    });
}    


/** User profile information **/

// Present the current user's information 
function showProfile(){
    event.stopPropagation();
    $('#profilePopover').html('').load("profile.php").fadeIn('fast');
    $('.overlay').fadeIn('fast');
}

// Close out the profile popover
function hideProfile(){
    $("#profilePopover").html('').fadeOut("fast");
    $("#editProfilePopover").html('');
    $('.overlay').fadeOut('fast');
}

// Change the popover to be editable
function showEditProfile(){
    event.stopPropagation();
    $("#profilePopover").html('').fadeOut('fast');
    console.log('what the fuck');
    $("#editProfilePopover").load("profileEdit.php").html('');
}

// Change the information 
function editProfile(event){
    event.preventDefault();
    // Create data form form and get action
    var data = $("form#editProfileForm").serialize();
    var url = $("form#editProfileForm").attr('action');
    
    if($("#joinFirst").val()=="" || $("#joinLast").val()=="" || $("#joinPhone").val()==""){
        $('#blankError').fadeIn('fast');
        return;
    }
    else{
        $('#blankError').fadeOut('fast');
    }
    
    // Use AJAX post to prevent refresh of page
    $.post (url, data,
        function(data) {       
            console.log(data);     
            
            // Check for each error in the return data and present error windows accordingly
            if (data.indexOf("passwordError") != -1){
                $('#invalidPassError').fadeIn('fast');
            }
            else {$('#invalidPassError').fadeOut('fast');}
            
            if (data.indexOf("passwordMatchError") != -1){
                $('#passMatchError').fadeIn('fast');
            }
            else {$('#passMatchError').fadeOut('fast');}
            
            if (data.indexOf("blankError") != -1){
                $('#blankError').fadeIn('fast');
            }
            else {$('blankError').fadeOut('fast');}
            
            
            // If there are no errors then move the user to the next page
            if (data==''){window.location.replace("groups.php");}
        }
    );
}
  
/** Miscellaneous group stuff **/

function groupAdd(){

    var groupID = this.id;
    groupID = groupID.replace("groupAdd", "");
    
    console.log(groupID);
    var dataToSend = {groupID: groupID};
    $.ajax({
        type:     "POST",
        url:      "php/membershipFiles/requestAdmission",
        data:     dataToSend,
        success:  function(data){window.location.replace("groupSearch.php?search=" + data);}  
    });
}
    
function acceptInvitation(){
    var groupID = this.id;
    groupID = groupID.replace("groupAccept", "");
    
    var dataToSend = {groupID: groupID};
    $.ajax({
        type:     "POST",
        url:      "php/membershipFiles/acceptInvitation",
        data:     dataToSend,
        success:  function(){window.location.replace("groups.php");}
    });
}    
    
function declineInvitation(){
    var groupID = this.id;
    groupID = groupID.replace("groupDecline", "");
    
    var dataToSend = {groupID: groupID};
    $.ajax({
        type:     "POST",
        url:      "php/membershipFiles/declineInvitation",
        data:     dataToSend,
        success:  function(){window.location.replace("groups.php");}
    });
}    

function loadFeedSelection(){
    event.preventDefault();
    event.stopPropagation();
    $('.overlay').fadeIn('fast');    
    $("#profilePopover").html('').load("groupSelect.php").fadeIn('fast');
}
    
function moveToFeedPage(){
    var groupID = this.id;
    
    window.location.replace("feed.php?groupID=" +groupID);
}

/** Post stuff **/

function newPost(){
    event.preventDefault();
    // groupID from somewhere?
    var message = $('#postForm :input').val();

	$('#postContent').val("");
	
    dataToSend = {message: message}
    
    $.ajax({
        type:     "POST",
        url:      "php/newPost.php",
        data:     dataToSend,
        success:  function(data){
                console.log(data);
                window.location.replace("feed.php?groupID=" + data)
            ;}
    });
}


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    