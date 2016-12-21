<?php

	require('../../db/db.php');

	session_start();
 
	$callId = $_POST['call_id'];
	$status = $_POST['status'];
	$success = false;

	$cancelQuery = "UPDATE engineering.call ";
	$cancelQuery.= "SET status = '$status' ";
	$cancelQuery.= "WHERE call_id = '$callId'";

	$sth = pg_query($dbh, $cancelQuery);

	if (!pg_last_error($dbh)) {
		$msg = 'Call status updated.';
		$success = true;

	} else {
		$msg = pg_last_error($dbh);
	}
	

	header('Content-type: text/html');

	echo json_encode(array(
		"success" => $success,
		"msg" => $msg
	));
	
	pg_close($dbh);
?>
