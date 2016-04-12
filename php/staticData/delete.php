<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$entity = $_POST['entity'];
	$pkey = $_POST['pkey'];
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

					$in = '(';

					$deleteQuery = "DELETE FROM staticdata.$entity ";					

					foreach ($data as $key => $value) {
						if ($key == $pkey) {
							$in.= "$value,";
						}
					}
					
					$in = substr($in, 0, -1). ')';

					$deleteQuery = "DELETE FROM staticdata.$entity WHERE $pkey IN $in";

					$sth = pg_query($dbh, $deleteQuery);
				}
				
			}
			
		}

		if (!pg_last_error($dbh)) {			
			$r['msg'] = 'Records deleted';
			$r['success'] = true;
			
		} else {
			$r['msg'] = pg_last_error($dbh);
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>