<?php

	require('../../db/db.php');

	session_start();
 
	$calls = json_decode($_POST['calls']);
	$userName = $_SESSION['username'];
	$jobId = $_POST['job_id'];

	$callId = '{';

	foreach ($calls as $call) {
		$callId .= $call. ',';
	}

	$callId = substr($callId, 0, -1) . '}';


	$insertQuery = "SELECT job_handler('$jobId','$callId','$userName')";

	$sth = pg_query($dbh, $insertQuery);

	$success = false;
	$msg = pg_last_error($dbh);

	while ($r = pg_fetch_assoc($sth)) {

		if ($r['job_handler']) {
			$success = true;
			$msg = 'New job created!';
		} 				
	}	

	header('Content-type: text/html');

	echo json_encode(array(
		"success" => $success,
		"msg" => $msg
	));

	pg_close($dbh);
?>