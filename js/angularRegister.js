var app = angular.module('myApp', []);

app.controller("MyController", function($scope, $http) {
	$scope.data = {name : "",
				lastName : "",
				email: "",
				password: ""}
	$scope.message = {name: "You should have a name.",
					lastName: "You should have a last name.",
					email: "You should enter a valid email.",
					password: "Your password is not long enough!"};
	$scope.error = {name: "",
					lastName: "",
					email: "",
					password: ""};
	
	$scope.nameChange = function() { 
		$scope.error.name = "";
		if($scope.isValidName()) $scope.message.name = "";
		else $scope.message.name = "Your name should be between 2 and 32 a-Z characters long.";
	}
	
	$scope.lastNameChange = function() { 
		$scope.error.lastName = "";
		if($scope.isValidLastName()) $scope.message.lastName = "";
		else $scope.message.lastName = "Your last name should be between 2 and 32 a-Z characters long.";
	}
	
	$scope.emailChange = function() { 
		$scope.error.email = "";
		if($scope.isValidEmail()) $scope.message.email = "";
		else $scope.message.email= "Your email is invalid.";
	}
	
	$scope.passwordChange = function() { 
		$scope.error.password = "";
		if($scope.isValidPassword()) $scope.message.password = "";
		else $scope.message.password = "Your password should be between 6 and 16 characters long.";
	}
	$scope.isValidName = function() {
		var re = /^[A-Z]{2,32}$/i;
		return re.test($scope.data.name);
	}
	$scope.isValidLastName = function() {
		var re = /^[A-Z]{2,32}$/i;
		return re.test($scope.data.lastName);
	}
	$scope.isValidPassword = function() {
		var re = /^[a-z0-9_-]{6,18}$/i;
		return re.test($scope.data.password);
	}
	$scope.isValidEmail = function() {
		var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
		return re.test($scope.data.email);
	}
	$scope.testRegistration = function(){
		var nameValid = $scope.isValidName();
		var lastNameValid = $scope.isValidLastName();
		var passwordValid = $scope.isValidPassword();
		var emailValid = $scope.isValidEmail();
		
		if(!nameValid) $scope.error.name = "Your name is Invalid!";
		if(!lastNameValid) $scope.error.lastName = "Your last name is Invalid!";
		if(!passwordValid) $scope.error.password = "Your password is Invalid!";
		if(!emailValid) $scope.error.email = "Your email is Invalid!";
		
		return nameValid && lastNameValid && passwordValid && emailValid;
	}
	
	$scope.submitForm = function() {		
		if($scope.testRegistration()){
			$scope.sendRequest();
		}
	}
	
	$scope.sendRequest = function() {
		$http({
			method 	: 'POST',
			url		: 'php/register.php',
			data	: $.param($scope.data),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).success(function(data) {
            console.log(data);

            if (!data.success) {
            	// if not successful, bind errors to error variables
                $scope.error.name = data.errors.name;
                $scope.error.lastName = data.errors.lastName;
            }
			else {
            	// if successful, bind success message to message
                alert(data.message);
            }
		});
	}
});