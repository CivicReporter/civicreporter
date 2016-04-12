<?php

	require('../db/db.php');

	session_start();

	$userName = $_SESSION['username'];

	$queryString = "SELECT p.menuid menuid FROM security.user u "; 
	$queryString.= "INNER JOIN security.permissions p ON u.groupid = p.groupid ";
	$queryString.= "INNER JOIN security.menu m ON p.menuid = m.id ";
	$queryString.= "WHERE u.username = '$userName' ";

	$folder = array();

	if ($sth = pg_query($dbh, $queryString)) {
		
		$in = '(';

		while ($user = pg_fetch_assoc($sth)) {
			$in.= $user['menuid'] .',';
		}

		$in = substr($in, 0, -1) .')';

		pg_free_result($sth);

		$sql = "SELECT * FROM security.menu WHERE parentid IS NULL AND id IN $in";

		if ($sth = pg_query($dbh, $sql)) {
			while ($r = pg_fetch_assoc($sth)) {
				$sqlquery = "SELECT * FROM security.menu WHERE parentid = ";
				$sqlquery.= $r['id'] ." AND id in $in ORDER BY ttext";

				if ($nodes = pg_query($dbh, $sqlquery)) {
					$count = pg_num_rows($nodes);

					if ($count > 0) {
						$r['leaf'] = false;
						$r['items'] = array();

						while ($item = pg_fetch_assoc($nodes)) {
							$item['leaf'] = true;
							$r['items'][] = $item;
						}
					}

					$folder[] = $r;
				}

			}
		}

		pg_close($dbh);
	}

	echo json_encode(array(
		"items" => $folder
	));

?>