<?
	$errors	= array();
	$data 	= array(); 
	
	if (empty($_POST['name']))
		$errors['name'] = 'Name is required.';

	if (empty($_POST['lastName']))
		$errors['lastName'] = 'Last name is required.';
		
	if (!empty($errors)) {

		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {

		// if there are no errors, return a message
		$data['success'] = true;
		$data['message'] = 'Success!';
	}

	// return all our data to an AJAX call
	echo json_encode($data);
?>