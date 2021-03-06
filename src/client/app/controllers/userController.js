'use strict';

angular.module('petApp')
.controller('UsrProfCtrl', ['$scope', '$http', '$routeParams', '$log', '$location', '$cookies', function($scope,$http,$routeParams,$log,$location,$cookies) {
    console.log('userController 1 sounding off');

(function() {
    $http.get('/api/profile/'+parseInt($cookies.get('id')))
    .success(function(data) {
        console.log('This should be the id: ', $routeParams.id)
        $scope.user = data[0];
        console.log('here is my data: ', $scope.user);
    });
  })();

    $scope.register = function(){
       var data = {
                     firstName: $scope.firstName,
                     lastName: $scope.lastName,
                     email: $scope.registerEmail,
                     password: $scope.registerPassword
                   }
       console.log(data);
       $http.post('/api/auth/register', data)
       .success(function(data) {
           $scope.hello = data;
           $location.url('/pets/main')
       });
    };

    // $scope.userFormData = {};
    // $scope.newUser = function() {
    //     $http.post('/api/profile/new', $scope.userFormData)
    //     .success(function(data) {
    //         console.log('This user has been added');
    //     });
    // }

    $scope.updateUser = function() {
        $http.put('/api/profile/'+$routeParams.id+'/edit', $scope.userFormData)
        .success(function(data) {
            console.log('This user has been updated');
        });
    }

    $scope.removeUser = function() {
        $http.delete('/api/profile/'+$routeParams.id+'/delete')
        .success(function(data) {
            console.log('This user has been removed');
        });
    }
}])
.controller('MainUsrProfCtrl', ['$scope', '$http', '$routeParams', '$log', function($scope, $http, $routeParams,$log) {
  console.log('main user controller')

    $http.get('/api/profile')
    .success(function(data) {
        $scope.users = data[0];
        $log.info($scope.users);
        console.log('here is my data: ', $scope.users);
    })
}]);
