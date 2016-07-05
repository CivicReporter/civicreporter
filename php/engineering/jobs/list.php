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

			$folder = array(
				'type' => 'FeatureCollection',
				'crs' => array(
					'type' => 'name',
					'properties' => array(
						'name' => 'urn:ogc:def:crs:OGC:1.3:CRS84'
					)
				),
				'features' => array()
			);
			
			if ($count == 1 AND ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT *, ST_ASGEOJSON(geom) geometry  FROM job_engineering ";
				$sql.= "ORDER BY job_id DESC ";
				//$sql.= "OFFSET $offset LIMIT $limit";

				if ($sth = pg_query($dbh, $sql)) {

					$c = pg_num_rows($sth);

					if ($c > 0) {

						$folder['success'] = true;

						while ($r = pg_fetch_assoc($sth)) {

							$feature = array( 
								'type' => 'Feature',
								'properties' => array(),
								'geometry' => json_decode($r['geometry'])
							);

							foreach ($r as $key => $value) {
								if ($key != 'geometry' && $key != 'geom') {
									$feature['properties'][$key] = $value;
								}
							};

							$sqlquery = "SELECT * FROM call_engineering ";
							$sqlquery.= "WHERE job_id = ".$r['job_id']; 
							$sqlquery.= " ORDER BY call_id";

							if ($nodes = pg_query($dbh, $sqlquery)) {

								$count = pg_num_rows($nodes);

								if ($count > 0) {

									$feature['properties']['leaf'] = false; //$r['leaf'] = false;
									$feature['properties']['calls'] = array(); //$r['calls'] = array();

									while ($call = pg_fetch_assoc($nodes)) {

										$call['leaf'] = true;
										$feature['properties']['calls'][] = $call; //$r['calls'][] = $call;
									}
								}

								//$folder['jobs'][] = $r;
								array_push($folder['features'], $feature);
							}
						}

						pg_free_result($sth);

						$countQuery = "SELECT COUNT(*) count FROM job_engineering ";

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