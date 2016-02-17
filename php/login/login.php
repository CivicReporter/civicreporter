<?php

	require('../db/db.php');

	session_start();

	$userName = $_POST['user'];

	$pass = $_POST['password'];

	$userName = stripslashes($userName);

	$pass = stripslashes($pass);

	$sql = "SELECT * FROM security.user WHERE username = '$userName' AND password = '$pass'";

	$result = array();

	if ($sth = pg_query($dbh, $sql)){
		
		$count = pg_num_rows($sth);

		if ($count==1) {
			
			$_SESSION['authenticated'] = "yes";
			$_SESSION['username'] = $userName;

			$result['success'] = true;
			$result['msg'] = 'User authenticated!';

		} else{

			$result['success'] = false;
			$result['msg'] = 'Incorrect username or password.';
		}
	}

	pg_close();

	echo json_encode($result);

?>