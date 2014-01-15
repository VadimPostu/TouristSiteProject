<?
	$email 	= $_POST['email'];
	$data 	= array();
	
	connect();
	selectEverythingFromTrips();
	determineBookedTrips();
	disconnect();
	
	echo json_encode($data);
	
	function connect(){
		$myServer = "localhost";
		$myUser = "root";
		$myPass = "";
		$myDB = "TouristSiteDB";
		global $connection;
		$connection = mysql_connect($myServer, $myUser, $myPass) or die("Could not connect to mysql!");
		$db = mysql_select_db($myDB) or die("Could not connect to database!");
	}
	
	function selectEverythingFromTrips(){
		global $data;
		$sql = "SELECT * from trips;";
		$result = mysql_query($sql);
		while ($row = mysql_fetch_array($result, MYSQL_BOTH)) {
			$data[$row[0]] = array();
			$data[$row[0]]['id'] = $row[0];
			$data[$row[0]]['destination'] = $row[1];
			$data[$row[0]]['tripDate'] = $row[2];
			$data[$row[0]]['price'] = $row[3];
			$data[$row[0]]['tickets'] = $row[4];
		}
	}
	
	function determineBookedTrips(){
		global $email, $data;
		$sql = "SELECT * from bookings where email = '".$email."';";
		$result = mysql_query($sql);
		while ($row = mysql_fetch_array($result, MYSQL_BOTH)) {
			$data[$row[0]]['booked'] = true;
		}
	}
	
	function disconnect(){
		global $connection;
		mysql_close($connection);
	}
?>