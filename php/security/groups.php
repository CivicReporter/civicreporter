<?php
	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];

	$queryString = "SELECT id, UPPER(name) AS name FROM security.groups";

	if ($sth = pg_query($dbh, $queryString)) {
		
		$r = array();
		$r['data'] = array();

		$count = pg_num_rows($sth);

		if (!$count) {

			$r['success'] = false;

		} else {

			$r['success'] = true;

			while ($items = pg_fetch_assoc($sth)) {

				$r['data'][] = $items;
			}
		}

		pg_close($dbh);
	}

	echo json_encode($r);
?>