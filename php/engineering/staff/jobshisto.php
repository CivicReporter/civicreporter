<?php
	require('../../db/db.php');

	session_start();

	$userName = $_SESSION['username'];

	$offset = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];
	$staffid = $_REQUEST['staff_id'];
	

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$r = array();
			$r['data'] = array();
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT je.job_id, je.suburb, je.status, je.opened_on, je.opened_by, je.closed_on, je.last_update";
				$sql.= " FROM job_engineering je INNER JOIN engineering.assignment ea";
				$sql.= " ON je.job_id = ea.job_id";
				$sql.= " WHERE ea.staff_id = ". $staffid;
				$sql.= " ORDER BY je.job_id DESC";
				$sql.= " OFFSET $offset LIMIT $limit";

				if ($sth = pg_query($dbh, $sql)) {
					$c = pg_num_rows($sth);

					if ($c > 0) {
						$r['success'] = true;

						while ($items = pg_fetch_assoc($sth)) {
							$r['data'][] = $items;
						}

						pg_free_result($sth);

						$countQuery = "SELECT COUNT(*) count";
						$countQuery.= " FROM job_engineering je INNER JOIN engineering.assignment ea";
						$countQuery.= " ON je.job_id = ea.job_id";
						$countQuery.= " WHERE ea.staff_id = ". $staffid;
						
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