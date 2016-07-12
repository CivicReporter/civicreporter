<?php
	require('../../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
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

					$insertQuery = "INSERT INTO staticdata.staff(";					

					foreach ($data as $key => $value) {
						if ($key != staff_id && $key != 'last_update' && $data[$key] != '') {
							$insertQuery.= "$key,";
						}
					}
					
					$insertQuery = substr($insertQuery, 0, -1). ") VALUES(";
					
					foreach ($data as $key => $value) {
						if ($key != staff_id && $key != 'last_update' && $data[$key] != '') {
							$value = strtoupper($value);
							$insertQuery.= "'$value',";
						}
					}

					$insertQuery = substr($insertQuery, 0, -1). ")";

					$sth = pg_query($dbh, $insertQuery);
				}
				
			}
			
		}

		if (!pg_last_error($dbh)) {			
			$r['msg'] = 'New record created';
			$r['success'] = true;
			
		} else {
			$r['msg'] = pg_last_error($dbh);
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>