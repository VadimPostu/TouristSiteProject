
var logged = false;

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

function showLogin(){
	$(document).ready(function(){
		$('.register').removeClass('invisible');
		$('.login').remove();
		var data = '<div class = "login">'+
				'<table>'+
				'<tr>'+
				'<td><input type="text" name="email" id="email" tabindex="1"></td>'+
				'<td><input type="password" name="pass" id="pass" tabindex="2"></td>'+
				'<td><input value="Log In" tabindex="3" type="submit" class="button" onClick="hideStuff()"></td>'+
				'</tr>'+
				'</div>';
		$('.header').append(data);
	});
}

function hideStuff(){
	$(document).ready(function(){
		$('.register').addClass('invisible');
		$('.login').remove();
		var data = '<div class= "login"> <span style="color:#FFFFFF">You are logged in</span> <div>';
		$('.header').append(data);
		$('.login').append('<a class= "logOut" onClick= "showLogin()" href= "#"> > Log off </a>');
		
		logged = true;
	});
}