var map;
var geocoder;
         var infoWindow ;

function loadMap() {
	var pune = {lat: 18.5204, lng: 73.8567};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
                    disableDefaultUI: true,
 mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
              position: google.maps.ControlPosition.TOP_CENTER
          },
 zoomControl: true,
          zoomControlOptions: {

              position: google.maps.ControlPosition.RIGHT_CENTER
          },
      center: pune
    });

        infoWindow = new google.maps.InfoWindow;

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Start with intishaar');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        }else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

    var cdata = JSON.parse(document.getElementById('data').innerHTML);
    geocoder = new google.maps.Geocoder();  
    codeAddress(cdata);

    var allData = JSON.parse(document.getElementById('allData').innerHTML);
    showAllColleges(allData)
}
 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

function showAllColleges(allData) {
	var infoWind = new google.maps.InfoWindow;
	Array.prototype.forEach.call(allData, function(data){
		var content = document.createElement('div');
		var strong = document.createElement('strong');
		
		strong.textContent = data.owner;
		content.appendChild(strong);

		var img = document.createElement('img');
		img.src = 'img/marker.png';
		img.style.width = '100px';
		content.appendChild(img);
var iconBase = 'img/marker.png';
 		var marker = new google.maps.Marker({
	      position: new google.maps.LatLng(data.lat, data.lng),
	      map: map,
	          icon: iconBase 

 	    });

	    marker.addListener('mouseover', function(){
	    	infoWind.setContent(content);
	    	infoWind.open(map, marker);
	    })
	})
}

function codeAddress(cdata) {
   Array.prototype.forEach.call(cdata, function(data){
    	var Homeaddress = data.owner + ' ' + data.Homeaddress;
	    geocoder.geocode( { 'Homeaddress': Homeaddress}, function(results, status) {
	      if (status == 'OK') {
	        map.setCenter(results[0].geometry.location);
	        var points = {};
	        points.id = data.id;
	        points.lat = map.getCenter().lat();
	        points.lng = map.getCenter().lng();
	        updateCollegeWithLatLng(points);
	      } else {
	        alert('Geocode was not successful for the following reason: ' + status);
	      }
	    });
	});
}

function updateCollegeWithLatLng(points) {
	$.ajax({
		url:"action.php",
		method:"post",
		data: points,
		success: function(res) {
			console.log(res)
		}
	})
	
}