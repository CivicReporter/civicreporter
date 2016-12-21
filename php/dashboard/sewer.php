<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$dob = date_create('2016-01-01', timezone_open('Africa/Harare'));
	
	$from_date = ($_REQUEST['from_date'] != null) ? ($_REQUEST['from_date'] !== 'From Date' ? $_REQUEST['from_date']: date_format($dob, 'Y-m-d')) : date_format($dob, 'Y-m-d');
	$to_date = ($_REQUEST['to_date'] != null) ? ($_REQUEST['to_date'] !== 'To Date' ? $_REQUEST['to_date'] : date('Y-m-d')) : date('Y-m-d');

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$r = array();
			$r['data'] = array();
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				if ($_REQUEST['query'] == 'suburbs') {
					
					$sql = "
					SELECT gs.suburb_id, gs.sewer_catch_id, gs.name, COALESCE(c.completed,0) completed, COALESCE(p.pending,0) pending, COALESCE(b.carried,0) carried, COALESCE(r.received,0) received
					FROM (
							SELECT suburb_id, COUNT(call_id) completed 
							FROM call_engineering
							WHERE status = 'CLOSED' AND last_update >= '$to_date'
							GROUP BY suburb_id
						) c 
						RIGHT OUTER JOIN
							gis.suburb gs
						ON c.suburb_id = gs.suburb_id
						LEFT OUTER JOIN (
							SELECT suburb_id, COUNT(call_id) pending 
							FROM call_engineering
							WHERE status IN ('ASSIGNED','PENDING') AND reported_on > '$from_date'
							GROUP BY suburb_id
						) p
						ON gs.suburb_id = p.suburb_id
						LEFT OUTER JOIN (
							SELECT suburb_id, COUNT(call_id) carried 
							FROM call_engineering
							WHERE status = 'OPEN' AND reported_on > '$from_date'
							GROUP BY suburb_id
						) b
						ON gs.suburb_id = b.suburb_id
						LEFT OUTER JOIN (
							SELECT suburb_id, COUNT(call_id) received 
							FROM call_engineering
							WHERE reported_on >= '$to_date'
							GROUP BY suburb_id
						) r
						ON gs.suburb_id = r.suburb_id
					ORDER BY pending DESC";

				} else if ($_REQUEST['query'] == 'stations') {
					
					$sql = "
					SELECT gs.sewer_catch_id, gsw.name, SUM(COALESCE(c.completed,0)) completed, SUM(COALESCE(p.pending,0)) pending, SUM(COALESCE(b.carried,0)) carried, SUM(COALESCE(r.received,0)) received
					FROM (
							SELECT suburb_id, COUNT(call_id) completed 
							FROM call_engineering
							WHERE status = 'CLOSED' AND last_update >= '$to_date'
							GROUP BY suburb_id
						) c 
						RIGHT OUTER JOIN
							gis.suburb gs
						ON c.suburb_id = gs.suburb_id
						LEFT OUTER JOIN (
							SELECT suburb_id, COUNT(call_id) pending 
							FROM call_engineering
							WHERE status IN ('ASSIGNED','PENDING') AND reported_on > '$from_date' 
							GROUP BY suburb_id
						) p
						ON gs.suburb_id = p.suburb_id
						LEFT OUTER JOIN (
							SELECT suburb_id, COUNT(call_id) carried 
							FROM call_engineering
							WHERE status = 'OPEN' AND reported_on > '$from_date'
							GROUP BY suburb_id
						) b
						ON gs.suburb_id = b.suburb_id
						LEFT OUTER JOIN (
							SELECT suburb_id, COUNT(call_id) received 
							FROM call_engineering
							WHERE reported_on >= '$to_date'
							GROUP BY suburb_id
						) r
						ON gs.suburb_id = r.suburb_id
						RIGHT OUTER JOIN
							gis.sewer_catchment gsw
						ON gs.sewer_catch_id = gsw.catch_id
					GROUP BY sewer_catch_id, gsw.name
					ORDER BY pending DESC";
				}
				
					
				//also consider gerater or equal to in your inequalities
				if ($sth = pg_query($dbh, $sql)) {
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