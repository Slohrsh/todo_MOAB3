'use strict';
var todoApp = angular.module("todoAPI");

todoApp.controller("logInController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeUserID',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeUserID) {
    $scope.verifyCredentials = function(){
        var data = {
            user: $scope.name,
            password: $scope.passwd
        };
        $http.post('todoAPI/userAuthentification', data).then(function successCallback(response) {
            if(response.data[0].Result == 1){
                exchangeUserID.set(response.data[0].iduser);
                $location.path("/todoUI");
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