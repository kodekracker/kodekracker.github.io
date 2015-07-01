'use strict';

var app = angular.module('myApp',[]);


app.controller('MyController', function($scope) {
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

  $scope.submitForm = function(isValid) {

    // check to make sure the form is completely valid
    if (isValid) {
      $scope.form.error = true;
      $scope.person = angular.copy($scope.defaultPerson);
      $scope.contactForm.$setPristine();
    }

  };
});

