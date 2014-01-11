function removeInvisibleClass(){
	$(document).ready(function(){ $('.register').removeClass('invisible'); });
}

function addInvisibleClass(){
	$(document).ready(function(){ $('.register').addClass('invisible'); });
}

function showWelcomeBackMessage(){
	$(document).ready(function(){
		var user = getCookie("username");
		var data = '<div class= "login"> <span style="color:#FFFFFF">Welcome back, ' + user + '</span> <div>';
		$('.header').append(data);
		$('.login').append('<a class= "logOut" onClick= "deleteCookie()" href= "#"> > Log off </a>');
		addInvisibleClass();
	});
}

function loadHeaderAndFooter(){
	$(document).ready(function(){
		var data = '<div class = "header"><div class = "menu">'+
				'<table>'+
				'<tr>'+
				'<td><a href="home.html" class="menu">home</a></td>'+
				'<td><a href="trips.html" class="menu">trips</a></td>'+
				'<td><a href="gallery.html" class="menu">gallery</a></td>'+
				'<td><a href="feedback.html" class="menu">feedback</a></td>'+
				'<td class="register"><a href="register.html" class="menu">register</a></td>'+
				'</tr>'+
				'</div><div>';
		$('body').prepend(data);
		$('body').append('<div class="footer"><em> &#169 V </em><div>');
	});
}

function showLoginForm(){
	$(document).ready(function(){
		var data = '<form method = "POST" class = "login" id = "loginForm" onsubmit = "login()">' +
					'<input type="email" placeHolder="email" id="email" tabindex="1">' +
					'<input type="password" placeHolder="password" id="pass" tabindex="2">' +
					'<input type="submit" value="Log In" tabindex="3" class="button">' +
					'</form>' +
					'<br>'+
					'<br>'+
					'<span class = "login" id = "loginInfo"></span>';
					
		$('.header').append(data);
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
