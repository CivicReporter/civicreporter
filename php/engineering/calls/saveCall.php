<?php

	require('../../db/db.php');

	session_start();
 
	$callId = ($_POST['call_id'] != null) ? $_POST['call_id'] : 0;
	$callerId = $_POST['caller_id'];
	$fname = $_POST['firstname'];
	$sname = $_POST['lastname'];
	$phone = $_POST['phone'];
	$code = $_POST['code'];
	$suburb = $_POST['suburb'];
	$street = $_POST['street'];
	$standNo = $_POST['stand_no'];
	$severity = $_POST['severity'];
	$description = stripcslashes($_POST['description']);
	$prpDmg = ($_POST['property_damage'] != null) ? 't' : 'f';
	$jobId = $_POST['job_id'];


	if ($callId ==  0) { //create

		$insertQuery = "SELECT fault_handler('$code','$fname','$sname','$phone',$standNo,'$street','$suburb',$severity,'$prpDmg','$description')";

		$sth = pg_query($dbh, $insertQuery);

		$success = false;
		$msg = pg_last_error($dbh);

		while ($r = pg_fetch_assoc($sth)) {

			if ($r['fault_handler']) {
				$success = true;
				$msg = 'New call created!';
			} 				
		}	

	} else {//update

		$updateQuery = "SELECT fault_upd($callId,'$code',$callerId,'$fname','$sname','$phone',$standNo,'$street','$suburb',$severity,'$prpDmg','$description')";

		$sth = pg_query($dbh, $updateQuery);

		$success = false;
		$msg = pg_last_error($dbh);

		while ($r = pg_fetch_assoc($sth)) {

			if ($r['fault_upd']) {
				$success = true;
				$msg = 'Call #'.$callId.' updated.';
			} 				
		}	

	}

	header('Content-type: text/html');

	echo json_encode(array(
		"success" => $success,
		"msg" => $msg
	));

	pg_close($dbh);
?>