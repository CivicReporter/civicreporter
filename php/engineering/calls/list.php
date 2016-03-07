<?php
	require('../../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$offset = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];

	if (isset($_REQUEST['status'])) {
		$status = $_REQUEST['status'];
	}

	if (isset($_REQUEST['suburb'])) {
		$suburb = $_REQUEST['suburb'];
	}
	

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$r = array();
			$r['data'] = array();
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT ec.call_id, sfc.code, CONCAT_WS(' ', sc.firstname, sc.surname) caller, ec.caller_id, ec.stand_no, ec.street, ss.name suburb, ec.severity, ec.property_damage, ec.status, ec.description, ec.reported_on, ec.last_update, ec.job_id ";
				$sql.= "FROM engineering.call ec INNER JOIN staticdata.fault_codes sfc ON ec.code_id = sfc.code_id ";
				$sql.= "INNER JOIN staticdata.caller sc ON ec.caller_id = sc.caller_id ";
				$sql.= "INNER JOIN staticdata.suburb ss ON ec.suburb_id = ss.suburb_id ";
				if (isset($status)) {
					$sql.= "WHERE status = '$status' ";
				}
				if (isset($suburb)) {
					$sql.= "AND ec.suburb_id = '$suburb' ";
				}
				$sql.= "ORDER BY ec.call_id DESC ";
				$sql.= "OFFSET $offset LIMIT $limit";

				if ($sth = pg_query($dbh, $sql)) {
					$c = pg_num_rows($sth);

					if ($c > 0) {
						$r['success'] = true;

						while ($items = pg_fetch_assoc($sth)) {
							$r['data'][] = $items;
						}

						pg_free_result($sth);

						$countQuery = "SELECT COUNT(*) count FROM engineering.call ";
						
						if (isset($status)) {
							$countQuery.= " WHERE status = '$status' ";
						}
						if (isset($suburb)) {
							$countQuery.= " AND suburb_id = '$suburb' ";
						}

						if ($sth = pg_query($dbh, $countQuery)) {
							while ($count = pg_fetch_assoc($sth)) {
								$r['msg'] = $count['count'].' records retrieved.';
								$r['total'] = $count['count'];
							}
						}

					} else {
						$r['success'] = false;
						$r['msg'] = 'No records retrieved.';
					}						
				}
				
			} else {
				$r['success'] = false;
				$r['msg'] = 'Operation denied.';
			}
			
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>