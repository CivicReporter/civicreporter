<?php
	require('../../db/db.php');

	session_start();

	$userName = $_SESSION['username'];

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$r = array();
			$r['data'] = array();
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT * FROM staff_engineering ";
				$sql.= "ORDER BY staff_id";

			/*	if (isset($start) && isset($limit)) {
					$sql.= " OFFSET $offset LIMIT $limit";
				}

			*/	if ($sth = pg_query($dbh, $sql)) {
					$c = pg_num_rows($sth);

					$r['msg'] = $c.' records retrieved.';

					if ($c > 0) {
						$r['success'] = true;

						while ($items = pg_fetch_assoc($sth)) {
							$r['data'][] = $items;
						}
					} else {
						$r['success'] = false;
					}	
				}
				
			} else {
				$r['success'] = false;
			}
			
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>