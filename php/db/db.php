<?php 

//connection details for civicdb database use '192.135.20.25' for db on acer machine
	$server = '127.0.0.1';
	$port = '5432';
	$user = 'postgres';
	$pass = 'pumkin987!';
	$dbname = 'civicdb';
	$dbh = pg_connect("host=$server port=$port user=$user password=$pass dbname=$dbname");
	if (!$dbh){
		printf('Connect Failed: %s\n', pg_error());
		exit();
	}
?>