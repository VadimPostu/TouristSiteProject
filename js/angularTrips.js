var app = angular.module('newApp',[]);

app.controller('TripController', function($scope, $http){
	$scope.places =  [
		{	'name' : "usa",
			'date' : "tomorrow"},
		{	'name' : "england",
			'date' : "23 April 2014"}		
	];
});