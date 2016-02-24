<?php
	require('../../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$offset = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$folder = array();
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT ej.job_id, ss.name suburb, ej.status, ej.opened_on, ej.closed_on, ej.last_update, ej.opened_by, ej.closed_by ";
				$sql.= "FROM engineering.job ej ";
				$sql.= "INNER JOIN staticdata.suburb ss ON ej.suburb_id = ss.suburb_id ";
				$sql.= "ORDER BY job_id DESC ";
				$sql.= "OFFSET $offset LIMIT $limit";

				if ($sth = pg_query($dbh, $sql)) {

					$c = pg_num_rows($sth);

					if ($c > 0) {

						$folder['success'] = true;

						while ($r = pg_fetch_assoc($sth)) {

							$sqlquery = "SELECT ec.call_id, sfc.code, CONCAT_WS(' ', sc.firstname, sc.surname) caller, ec.caller_id, ec.stand_no, ec.street, ss.name suburb, ec.severity, ec.property_damage, ec.status, ec.description, ec.reported_on, ec.last_update ";
							$sqlquery.= "FROM engineering.call ec INNER JOIN staticdata.fault_codes sfc ON ec.code_id = sfc.code_id ";
							$sqlquery.= "INNER JOIN staticdata.caller sc ON ec.caller_id = sc.caller_id ";
							$sqlquery.= "INNER JOIN staticdata.suburb ss ON ec.suburb_id = ss.suburb_id ";
							$sqlquery.= "WHERE ec.job_id = ".$r['job_id']; 
							$sqlquery.= " ORDER BY ec.call_id ";

							if ($nodes = pg_query($dbh, $sqlquery)) {

								$count = pg_num_rows($nodes);

								if ($count > 0) {

									$r['leaf'] = false;
									$r['calls'] = array();

									while ($call = pg_fetch_assoc($nodes)) {

										$call['leaf'] = true;
										$r['calls'][] = $call;
									}
								}

								$folder['jobs'][] = $r;
							}
						}

						pg_free_result($sth);

						$countQuery = "SELECT COUNT(*) count FROM engineering.job ";

						if ($sth = pg_query($dbh, $countQuery)) {
							while ($count = pg_fetch_assoc($sth)) {
								$folder['msg'] = $count['count'].' records retrieved.';
								$folder['total'] = $count['count'];
							}
						}

					} else {

						$folder['success'] = false;
					}	
				}
				
			} else {

				$r['success'] = false;
			}
			
		}

		pg_close($dbh);
	}

	echo json_encode($folder);
?>