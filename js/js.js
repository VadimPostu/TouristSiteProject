function removeInvisibleClass(){
	$(document).ready(function(){ 
		$('.register').removeClass('invisible'); 
		$('.trips').addClass('invisible');
	});
}

function addInvisibleClass(){
	$(document).ready(function(){ 
		$('.register').addClass('invisible'); 
		$('.trips').removeClass('invisible'); 
	});
}

function showWelcomeBackMessage(){
	$(document).ready(function(){
		var user = getCookie("username");
		var data = '<div class="navbar-right"> <span style="color:#FFFFFF">Welcome back, ' + user + '</span> <div>';
		$('.navbar').append(data);
		$('.navbar').append('<br><a class= "logOut navbar-right" onClick= "deleteCookie()" href= "#"> > Log off </a>');
		addInvisibleClass();
	});
}

function loadHeaderAndFooter(){
	$(document).ready(function(){
		var data = '<div class = "header"><nav class="navbar navbar-inverse" role="navigation">'+
				'<a href="home.html" class="navbar-brand" >home</a>'+
				'<a href="trips.html" class="navbar-brand trips" >trips</a>'+
				'<a href="gallery.html" class="navbar-brand" >gallery</a>'+
				'<a href="feedback.html" class="navbar-brand" >feedback</a>'+
				'<a href="register.html" class="navbar-brand register" >register</a>'+
				'</nav></div>';
		$('body').prepend(data);
		$('body').append('<div class="footer"><em> &#169 V </em><div>');
	});
}

function showLoginForm(){
	$(document).ready(function(){
		var data = '<form method = "POST" class = "navbar-form navbar-right" id = "loginForm" onsubmit = "login()">' +
					'<div class="form-group"><input type="email" placeHolder="email" class= "form-control" id="email" tabindex="1"></div>' +
					'<div class="form-group"><input type="password" placeHolder="password" class= "form-control" id="pass" tabindex="2"></div>' +
					'<input type="submit" value="Log In" tabindex="3" class="button btn btn-default">' +
					'</form>' +
					'<span class = "login" id = "loginInfo"></span>';
					
		$('.navbar').append(data);
	});
}

function login(){
	$(document).ready(function(){
		var info = {};
		event.preventDefault();
		var email = $('#email').val();
		var password = $('#pass').val();
		info.email = email;
		info.password = password;
		if(!isValidPassword(password)){
			$("#loginInfo").text("Your password is invalid!");
		}
		if(password == "") {
			$("#loginInfo").text("Enter a password!");
		}
		if(isValidEmail(email) && isValidPassword(password)) {
			$.ajax({
				type: 		"POST",
				url: 		"php/login.php",
				data: 		info,
				dataType: 	'json',
				success: 	function(data, status){
								if(!data.success){
									$("#loginInfo").text(data.errors.message);
								}
								else{
									setCookie('username', data.email, 7);
									location.reload();
								}
							}
			});
		}
	});
}

var isValidPassword = function(password) {
	var re = /^[a-z0-9_-]{6,18}$/i;
	return re.test(password);
}

var isValidEmail = function(email) {
	var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
	return re.test(email);
}

function setCookie(cname, cvalue, exdays){
	var d = new Date();
	var expires;
	
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++){
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function deleteCookie() {
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
	location.reload();
}

function sendFeedback() {
	$(document).ready(function(){
		$("#mmm").html("").fadeIn();
		var content = $("#feedbackText").val();
		data = {text : content};
		if(content != "")
			$.ajax({
				type: 		"POST",
				data: 		data,
				dataType: 	"json",
				url: 		"php/feedback.php",
				success:	function(data, status){
					$('.body').html("<h3  class='alert alert-success'>" + data['message'] + "</h3>");
				}
			});
		else
			$("#mmm").append("<div class='alert alert-danger'> Please enter a feedback message </div").fadeOut(2000);
	});
}