<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$suburb = strtoupper($_REQUEST['suburb']);
	

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$r = array();
			$r['data'] = array();
			$r['success'] = false;
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT ST_EXTENT(geom) bounds FROM osm.suburb ";
				$sql.= "WHERE suburb LIKE '%$suburb%' LIMIT 1"; 

				if ($sth = pg_query($dbh, $sql)) {
					$c = pg_num_rows($sth);

					if ($c > 0) {
						$r['success'] = true;

						while ($items = pg_fetch_assoc($sth)) {
							$bounds = '['.str_replace(' ', ',', substr($items['bounds'], 4, -1)).']';
							$r['data'] = $bounds;
						}

					} else {
						$r['msg'] = 'Suburb not found.';
					}						
				}
				
			} else {
				$r['msg'] = 'Operation denied.';
			}
			
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>