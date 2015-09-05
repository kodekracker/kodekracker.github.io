'use strict';

var app = angular.module('myApp',[
  'ngRoute',
  'ngResource'
  ]);

app.config(['$httpProvider', function($httpProvider){
  $httpProvider.defaults.headers.post = {
    'Content-Type': 'application/json',
    'Authorization' : 'Token e71339e1c235b269feb19bd5f3486f99b8feba58'};
}]);

app.service('webServiceApi', ['$resource', '$http',function($resource, $http){
  // Root url of a web service api
  var ROOT_URI = "https://webservices-akshayon-net.herokuapp.com";

  // Send mail to admin
  this.sendMail = function(form_data, success_callback, error_callback){
    $http.post(ROOT_URI+'/api/mails/', form_data).success(success_callback).
      error(error_callback);
  };

  // Get lastest tweets
  this.getTweets = function(cnt, success_callback){
    var Tweets = $resource(ROOT_URI+'/api/tweets/', { count: cnt}, {
      'query':  {method:'GET', isArray:true},
    });
    return Tweets.query().$promise.then(success_callback);
  };

}]);


app.controller('MyController', function($scope, $http, webServiceApi) {

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
      var form_data = {
        'first_name': $scope.person.firstname,
        'last_name': $scope.person.lastname,
        'email_from': $scope.person.email,
        'message': $scope.person.message
      }
      $scope.person = angular.copy($scope.defaultPerson);
      $scope.contactForm.$setPristine();

      // Send message to admin email-id
      webServiceApi.sendMail(form_data,
        function(data, status, headers, config){
          // success callback
          $scope.form.success = true;
          console.log("Success");
          console.log(status);
        },
        function(data, status, headers, config) {
          // error callback
          $scope.form.error = true;
          console.log("Failure");
          console.log(status);
        }
      );
    }
  };

  $scope.tweets = null;

  webServiceApi.getTweets(5, function(data){
    $scope.tweets = data;
    console.log($scope.tweets);
  });

});

