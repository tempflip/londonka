var app = angular.module('mapApp', []);

app.controller("places", function($scope) {
	$scope.places = [];
	$scope.newPlace = {};

	$scope.placeSet = function(newPlace) {
		newPlace.marker = selectedMarker;
		$scope.places.push(newPlace);
		setMarker(selectedMarker);
		$scope.newPlace = {};
		console.log($scope.places);
	};

	$scope.setNewPlace = function(lng, lat) {
		$scope.newPlace.lng = lng;
		$scope.newPlace.lat = lat;
		$scope.$apply();
	};

	$scope.newPlaceAddressLookup = function() {

	};

	$scope.showPlace = function(place) {
		console.log(place.marker);
		google.maps.event.trigger(place.marker, "click");
	};
});