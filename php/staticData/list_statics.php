<?php
	require('../db/db.php');

	$stores = json_decode($_POST['stores']);

	foreach ($stores as $store) {
				
		$items = $new = array();

		$sql = "SELECT * FROM $store";

		if ($sth = pg_query($dbh, $sql)) {
			
			$c = pg_num_rows($sth);

			if ($c > 0) {

				while ($items = pg_fetch_assoc($sth)) {

					foreach ($items as $key => $value) {

						if ($key != 'password' && $key != 'shape_leng' && $key != 'shape_area' && $key != 'geom') {

							$new[$key] = $value;
						}
					};

					$r['stores'][$store][] = $new;
				}
			}	
		}
	
	}

	$r['success'] = true;

	pg_close($dbh);

	echo json_encode($r);
?>