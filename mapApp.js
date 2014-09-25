var app = angular.module('mapApp', []);

app.controller("places", function($scope) {
	$scope.places = [];
	$scope.newPlace = {};

	$scope.PLACE_TYPES = [{id: 'party', label: 'Bulika'},
						{id : 'food',  label: 'Kajahely'},
						{id : 'apartment', label: 'Kiado lakas'},
						];

	$scope.placeSet = function(newPlace) {
		$scope.places.push(newPlace);

	    var infoContent = "<h2>" + newPlace.name + "</h2>"
	    				+ "<h3>" + newPlace.type + "</h3>"
	    				+ newPlace.description;

	    var infowindow = new google.maps.InfoWindow({
	        content: infoContent,
	    });
	    google.maps.event.addListener(newPlace.marker, "click", function() {
	     	infowindow.open(map, newPlace.marker);
	    });

		$scope.newPlace = {};
		console.log($scope.places);
	};

	$scope.setNewPlace = function(lng, lat) {
		$scope.newPlace.lng = lng;
		$scope.newPlace.lat = lat;
    	var marker = new google.maps.Marker({
      		position: new google.maps.LatLng(lng, lat),
      		animation: google.maps.Animation.DROP,
      		//icon: markerIcon,
      		draggable : true,
    	});
    	marker.setMap(map);
    	map.setCenter(marker.getPosition());
    	$scope.newPlace.marker = marker;
    	$scope.newPlace.show = true;
		$scope.$apply();
	};

	$scope.newPlaceAddressLookup = function(place) {
		geocoder.geocode({address : place.address}, function(result, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				console.log(result[0].geometry.location);
				$scope.setNewPlace(result[0].geometry.location.k, result[0].geometry.location.B);
			} else {
				console.log('ERROR: ' + status);
			}
		});
	};

	$scope.showPlace = function(place) {
		console.log(place.marker);
		google.maps.event.trigger(place.marker, "click");
	};
});