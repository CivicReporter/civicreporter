<?php

	require('../../db/db.php');

	session_start();
 
	$callerId = $_POST['caller_id'];

	$deleteQuery = "DELETE FROM staticdata.caller WHERE caller_id = $callerId";

	$sth = pg_query($dbh, $deleteQuery) or die(pg_last_error($dbh));

	header('Content-type: text/html');

	echo json_encode(array(
		"success" => true,
		"msg" => ''
	));
	
	pg_close($dbh);
?>
