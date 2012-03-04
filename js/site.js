$(document).ready(function() {
	$('#loginForm').submit(function() {
		login(event);
	});
});

function login(event)
{
	event.preventDefault();
	var data = $("form#loginForm").serialize();
	var url = $('form#loginForm').attr('action');
	
	$.post(url, data,
		function(data) {
	        console.log(data);
            if (data=="success"){
                window.location.replace("groups.html");
		    }
		    else {
		        document.getElementById("loginResult").innerHTML = "Wrong Username or Password";
		    }
	    }
	);
}

//function getDashboard() {
//    $.getJSON(
//        function(data) {
//            for (var i = 0; i < count; i++) {
//                $('body').append(i.name);
//            }
//        }
//    );
//}