<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];
	$offset = $_REQUEST['start'];
	$limit = $_REQUEST['limit'];	
	$entity = $_REQUEST['entity'];	

	$queryString = "SELECT g.name urole FROM security.user u, security.groups g ";
	$queryString.= "WHERE u.groupid = g.id AND u.username = '$userName'";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$count = pg_num_rows($sth);

		while ($user = pg_fetch_assoc($sth)) {

			$geojson = array(
				'type' => 'FeatureCollection',
				'crs' => array(
					'type' => 'name',
					'properties' => array(
						'name' => 'urn:ogc:def:crs:OGC:1.3:CRS84'
					)
				),
				'features' => array()
			);
			
			if ($count == 1 && ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT *, ST_ASGEOJSON(geom) geometry ";
				$sql.= "FROM $entity ";
				$sql.= "ORDER BY gid ASC ";
				$sql.= "OFFSET $offset LIMIT $limit";

				if ($sth = pg_query($dbh, $sql)) {
					$c = pg_num_rows($sth);

					if ($c > 0) {
						$geojson['success'] = true;

						while ($row = pg_fetch_assoc($sth)) {

							$feature = array( 
								'type' => 'Feature',
								'properties' => array(),
								'geometry' => json_decode($row['geometry'])
							);

							foreach ($row as $key => $value) {
								if ($key != 'geometry' && $key != 'geom') {
									$feature['properties'][$key] = $value;
								}
							};

						   array_push($geojson['features'], $feature);
						}

						pg_free_result($sth);

						$countQuery = "SELECT COUNT(*) count FROM gis.suburb_all ";

						if ($sth = pg_query($dbh, $countQuery)) {
							while ($count = pg_fetch_assoc($sth)) {
								$geojson['msg'] = $count['count'].' records retrieved.';
								$geojson['total'] = $count['count'];
							}
						}

					} else {
						$geojson['success'] = false;
						$geojson['msg'] = 'No records retrieved.';
					}						
				}
				
			} else {
				$geojson['success'] = false;
				$geojson['msg'] = 'Operation denied.';
			}
			
		}

		pg_close($dbh);
	}

	header("Content-Type:application/json",true);
	echo json_encode($geojson);
?>