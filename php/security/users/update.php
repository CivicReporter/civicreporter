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

					$updateQuery = "UPDATE security.user SET ";					

					foreach ($data as $key => $value) {
						if ($key != 'id' && $key != 'last_update' && $key != 'created_on' && $data[$key] != '') {
							$updateQuery.= "$key = '$value',";
						}
					}
					
					$updateQuery = substr($updateQuery, 0, -1). " WHERE id = ";
					$updateQuery.= $data['id'];

					$sth = pg_query($dbh, $updateQuery);
				}
				
			}
			
		}

		if (!pg_last_error($dbh)) {			
			$r['msg'] = 'User details updated.';
			$r['success'] = true;
			
		} else {
			$r['msg'] = pg_last_error($dbh);
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>