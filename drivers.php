<?php 
	
	class drivers	{
		private $id;
		private $owner;
		private $Homeaddress;
		private $Model;
		private $lat;
		private $lng;
		private $conn;
		private $tableName = "cars";

		function setId($id) { $this->id = $id; }
		function getId() { return $this->id; }
		function setName($owner) { $this->owner = $owner; }
		function getName() { return $this->owner; }
		function setAddress($Homeaddress) { $this->Homeaddress = $Homeaddress; }
		function getAddress() { return $this->Homeaddress; }
		function setType($Model) { $this->Model = $Model; }
		function getType() { return $this->Model; }
		function setLat($lat) { $this->lat = $lat; }
		function getLat() { return $this->lat; }
		function setLng($lng) { $this->lng = $lng; }
		function getLng() { return $this->lng; }

		public function __construct() {
			require_once('db/DbConnect.php');
			$conn = new DbConnect;
			$this->conn = $conn->connect();
		}

		public function getcarsBlankLatLng() {
			$sql = "SELECT * FROM $this->tableName WHERE lat IS NULL AND lng IS NULL";
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		public function getAllcars() {
			$sql = "SELECT * FROM $this->tableName";
			$stmt = $this->conn->prepare($sql);
			$stmt->execute();
			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		public function updatecarsWithLatLng() {
			$sql = "UPDATE $this->tableName SET lat = :lat, lng = :lng WHERE id = :id";
			$stmt = $this->conn->prepare($sql);
			$stmt->bindParam(':lat', $this->lat);
			$stmt->bindParam(':lng', $this->lng);
			$stmt->bindParam(':id', $this->id);

			if($stmt->execute()) {
				return true;
			} else {
				return false;
			}
		}
	}

?>