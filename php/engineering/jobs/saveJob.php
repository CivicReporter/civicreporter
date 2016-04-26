<?php

	require('../../db/db.php');

	session_start();
 
	$userName = $_SESSION['username'];
	$jobId = $_POST['job_id'];
	$suburb = $_POST['suburb'];
	$station = $_POST['station'];
	
	$success = false;

	if (isset($_POST['calls']) && isset($_POST['staff'])) { //create or edit job details
		
		$calls = json_decode($_POST['calls']);
		$staff = json_decode($_POST['staff']);

		$callId = '{';
		$staffId = '{';

		foreach ($calls as $call) {
			$callId .= $call. ',';
		}

		foreach ($staff as $tech) {
			$staffId .= $tech. ',';
		}

		$callId = substr($callId, 0, -1) . '}';
		$staffId = substr($staffId, 0, -1) . '}';


		$insertQuery = "SELECT job_handler('$jobId','$suburb','$station','$callId','$staffId','$userName')";

		$sth = pg_query($dbh, $insertQuery);

		$msg = pg_last_error($dbh);

		while ($r = pg_fetch_assoc($sth)) {

			if ($r['job_handler']) {
				$success = true;
				$msg = 'New job created!';
			} 				
		}

	} else { //modify job status only

		$status = $_POST['status'];
		
		$updateQuery = "UPDATE engineering.job ";
		$updateQuery.= "SET status = '$status', closed_by = '$userName' ";
		$updateQuery.= "WHERE job_id = '$jobId'";

		$sth = pg_query($dbh, $updateQuery);

		if (!pg_last_error($dbh)) {			
			$msg = 'Job status updated.';
			$success = true;
			
		} else {
			$msg = pg_last_error($dbh);
		}

	}
	
		

	header('Content-type: text/html');

	echo json_encode(array(
		"success" => $success,
		"msg" => $msg
	));

	pg_close($dbh);
?>