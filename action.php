<?php 
	require 'drivers.php';
	$driver = new drivers;
	$driver->setId($_REQUEST['id']);
	$driver->setLat($_REQUEST['lat']);
	$driver->setLng($_REQUEST['lng']);
	$status = $driver->updatecarsWithLatLng();
	if($status == true) {
		echo "Updated...";
	} else {
		echo "Failed...";
	}
 ?>