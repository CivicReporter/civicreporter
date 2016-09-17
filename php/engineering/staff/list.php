<?php
	require('../../db/db.php');

	session_start();

	$userName = $_SESSION['username'];

	if (isset($_REQUEST['status'])) {
		$status = $_REQUEST['status'];
	}
	if (isset($_REQUEST['station'])) {
		$station = $_REQUEST['station'];
	}
	if (isset($_REQUEST['start'])) {
		$offset = $_REQUEST['start'];
	}
	if (isset($_REQUEST['limit'])) {
		$limit = $_REQUEST['limit'];
	}

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$folder = array();
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT * FROM staticdata.staff ";//staff_engineering
				$sql.= "WHERE active = 't' ";

				if (isset($status) && isset($station)) {
					$sql.= "AND status IN ('$status', 'STANDBY') ";
					$sql.= "AND station_id = '$station' ";
				}
				$sql.= "ORDER BY staff_id";

				if (isset($offset) && isset($limit)) {
					$sql.= " OFFSET $offset LIMIT $limit";
				}

				if ($sth = pg_query($dbh, $sql)) {

					$c = pg_num_rows($sth);

					$folder['msg'] = $c.' records retrieved.';

					if ($c > 0) {

						$folder['success'] = true;

						while ($r = pg_fetch_assoc($sth)) {

							$jobsquery = "SELECT je.job_id, je.suburb, je.status, je.opened_on, je.opened_by, je.closed_on, je.last_update, je.closed_on-je.opened_on time_taken";
							$jobsquery.= " FROM job_engineering je INNER JOIN engineering.assignment ea";
							$jobsquery.= " ON je.job_id = ea.job_id";
							$jobsquery.= " WHERE ea.staff_id = ". $r['staff_id'];
							$jobsquery.= " ORDER BY je.job_id DESC";

							if ($job_nodes = pg_query($dbh, $jobsquery)) {
								
								$jcount = pg_num_rows($job_nodes);
								
								if ($jcount > 0) {

									$r['leaf'] = false;	
									$r['jobs'] = array();

									while ($job = pg_fetch_assoc($job_nodes)) {

										$job['leaf'] = true;
										$r['jobs'][] = $job;
									}
								}
							}

							$folder['data'][] = $r;
						}
					} else {

						$folder['success'] = false;
					}	
				}
				
			} else {

				$folder['success'] = false;
			}
			
		}

		pg_close($dbh);
	}

	echo json_encode($folder);
?>