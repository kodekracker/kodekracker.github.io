'use strict';

var app = angular.module('myApp',['ngRoute']);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.post = {
    'Content-Type': 'application/json',
    'Authorization' : 'Token e71339e1c235b269feb19bd5f3486f99b8feba58'};

}]);

app.controller('MyController', function($scope, $http) {
  $scope.form = {
    title: "Contact Me",
    success : false,
    error : false
    };
  $scope.person = {
    firstname : null,
    lastname : null,
    email : null,
    message : null
    };

  $scope.defaultPerson = angular.copy($scope.person);

  var api_root_url = 'https://webservices-akshayon-net.herokuapp.com'

  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      var form_data = {
        'first_name': $scope.person.firstname,
        'last_name': $scope.person.lastname,
        'email_from': $scope.person.email,
        'message': $scope.person.message
      }
      $scope.person = angular.copy($scope.defaultPerson);
      $scope.contactForm.$setPristine();

      // Send message to admin email-id
      $http.post(api_root_url+'/api/mails/', form_data).
        success(function(data, status, headers, config){
          $scope.form.success = true;
        }).
        error(function(data, status, headers, config) {
          $scope.form.error = true;
        });
    }

  };
});

