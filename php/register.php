<?
	$name = $_POST['name'];
	$lastName = $_POST['lastName'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	
	$errors	= array();
	$data 	= array();
	
	if(!isValidName()) $errors['name'] = true;
	if(!isValidLastName()) $errors['lastName'] = true;
	if(!isValidEmail()) $errors['email'] = true;
	if(!isValidPassword()) $errors['password'] = true;
	
	if (!empty($errors)) {
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {
		registerUser();
		if(!isset($errors['email'])){
			$data['success'] = true;
			$data['name'] = $name;
			$data['lastName'] = $lastName;
			$data['email'] = $email;
		}
		else{
			$data['success'] = false;
			$data['errors']  = $errors;
		}
	}

	// return all our data to an AJAX call
	echo json_encode($data);
	
	function isValidPassword(){
		if(preg_match("/^[a-z0-9_-]{6,18}$/i", $GLOBALS['password'])) return true;
		return false;
	}
	function isValidName(){
		if(preg_match("/^[A-Z]{2,32}$/i", $GLOBALS['name'])) return true;
		return false;
	}
	function isValidLastName(){
		if(preg_match("/^[A-Z]{2,32}$/i", $GLOBALS['lastName'])) return true;
		return false;
	}
	function isValidEmail(){
		if(preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i", $GLOBALS['email'])) return true;
		return false;
	}
	function registerUser(){
		global $name, $email, $lastName, $password, $errors;
		$myServer = "localhost";
		$myUser = "root";
		$myPass = "";
		$myDB = "TouristSiteDB";
		$connection = mysql_connect($myServer, $myUser, $myPass) or die("Could not connect to mysql!");
		$db = mysql_select_db($myDB) or die("Could not connect to database!");
		$sql = "INSERT INTO users (email, name, lastname, password) values ('".$email."','".$name."','".$lastName."','".$password."');";
		if(!mysql_query($sql)) $errors['email'] = "The email is already in use...";
		mysql_close($connection);
	}
?>