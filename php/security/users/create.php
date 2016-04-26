<?php
	require('../../db/db.php');

	$staticdata = json_decode($_POST['data'], true);

	$r = array();
	$r['success'] = false;

	foreach ($staticdata as $data) {

		$insertQuery = "INSERT INTO security.user(";					

		foreach ($data as $key => $value) {
			if ($key != 'id' && $key != 'last_update' && $key != 'created_on' && $data[$key] != '') {
				$insertQuery.= "$key,";
			}
		}
		
		$insertQuery = substr($insertQuery, 0, -1). ") VALUES(";
		
		foreach ($data as $key => $value) {
			if ($key != 'id' && $key != 'last_update' && $key != 'created_on' && $data[$key] != '') {
				$insertQuery.= "'$value',";
			}
		}

		$insertQuery = substr($insertQuery, 0, -1). ")";

		$sth = pg_query($dbh, $insertQuery);
	}

	if (!pg_last_error($dbh)) {			
		$r['msg'] = 'New record created';
		$r['success'] = true;
		
	} else {
		$r['msg'] = pg_last_error($dbh);
	}

	pg_close($dbh);

	echo json_encode($r);
?>