/**
 * Created by Sebastian on 19.01.2017.
 */
/**
 * Created by Sebastian on 18.01.2017.
 */
'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("logInController", ['$scope', '$http', '$window', '$mdToast', function ($scope, $http, $window, $mdToast) {
    $scope.verifyCredentials = function(){
        var data = {
            user: $scope.name,
            password: $scope.passwd
        };
        $http.post('todoAPI/userAuthentification', data).then(function successCallback(response) {
            alert(response.data);
            if(response.data == "Correct Credentials"){
                $window.location = "todoUI";
            }else{
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Invalid Username or Password")
                        .hideDelay(3000)
                );
            }
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("There is no connection to the server. Please try it later.")
                    .hideDelay(3000)
            );
        });
    }
}]);