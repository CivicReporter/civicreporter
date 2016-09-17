<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$entity = $_REQUEST['entity'];
	$pkey = $_REQUEST['pkey'];
	$staticdata = json_decode($_POST['data'], true);

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		$r = array();
		$r['success'] = false;
			
		while ($user = pg_fetch_assoc($sth)) {
			
			if ($count == 1 && ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				foreach ($staticdata as $data) {
					
					pg_free_result($sth);

					$updateQuery = "UPDATE $entity SET ";					

					foreach ($data as $key => $value) {
						if ($key != $pkey && $data[$key] != '' && $key != 'last_update') {
							$value = strtoupper($value);
							$updateQuery.= "$key = '$value',";
						}
					}
					
					$updateQuery = substr($updateQuery, 0, -1). " WHERE $pkey = ";
					$updateQuery.= $data[$pkey];

					$sth = pg_query($dbh, $updateQuery);
				}
				
			}
			
		}

		if (!pg_last_error($dbh)) {			
			$r['msg'] = $entity.' details updated.';
			$r['success'] = true;
			
		} else {
			$r['msg'] = pg_last_error($dbh);
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>