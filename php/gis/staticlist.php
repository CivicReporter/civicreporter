<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];	
	$layer = $_REQUEST['layer'];	

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
						'name' => 'urn:ogc:def:crs:EPSG::32735'
					)
				),
				'features' => array()
			);
			
			if ($count == 1 && ($user['urole'] == 'admin' || $user['urole'] == 'call centre')) {

				pg_free_result($sth);

				$sql = "SELECT *, ST_ASGEOJSON(geom) geometry ";
				$sql.= "FROM gis.".$layer;

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