<?
	$email 		= $_POST['email'];
	$password 	= $_POST['password'];
	
	$connection;
	$errors = array();
	$data	= array();
	
	if(isValidPassword($password) && isValidEmail($email)){
		connect();
		if(!searchEmailAndPasswordInDb()){
			$errors['message'] = "The email or password is invalid";
		}else{}
		disconnect();
		}
	else $errors['message'] = "The email or password is invalid";
	
		
	if(!empty($errors)){
		$data['success'] = false;
		$data['errors'] = $errors;
	}
	else{
		$data['success'] = true;
		$data['email'] = $email;
	}
		
	echo json_encode($data);
	
	function isValidPassword($password){
		if(preg_match("/^[a-z0-9_-]{6,18}$/i", $password)) return true;
		return false;
	}
	function isValidEmail($password){
		if(preg_match("/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i", $password)) return true;
		return false;
	}
	function connect(){
		$myServer = "localhost";
		$myUser = "root";
		$myPass = "";
		$myDB = "TouristSiteDB";
		global $connection;
		$connection = mysql_connect($myServer, $myUser, $myPass) or die("Could not connect to mysql!");
		$db = mysql_select_db($myDB) or die("Could not connect to database!");
	}
	function searchEmailAndPasswordInDb(){
		global $email, $password;
		$sql = "SELECT password from users where email = '".$email."';";
		$result = mysql_query($sql);
		if(!$result) return false;
		$row = mysql_fetch_row($result);
		if($row[0] === $password) return true;
		return false;
	}
	function disconnect(){
		global $connection;
		mysql_close($connection);
	}