<?
	$data = $_POST['text'];
	$ret = array();
	formatData();
	function formatData(){
		global $data;
		$data = wordwrap($data, 60, "\r\n");
	}
	if( ini_get('smtp_server') != 'myserver' ) ini_set('smtp_server', 'myserver');
	ini_set('smtp_port',25);
	ini_set('sendmail_from','noreply@mypage.com');
	//mail('vadimpostu@yahoo.com', 'feedback', $data);
	$ret['message'] = "We thank you for your support, your opinion matters!";
	echo json_encode($ret);
?>