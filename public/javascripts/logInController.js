'use strict';
var todoApp = angular.module("todo");

todoApp.controller("logInController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeSessionKey',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeSessionKey) {

    $scope.signIn = function(){
        $location.path("/signIn");//Todo Sign in erstellen
    }
    $scope.verifyCredentials = function(){
        var data = {
            user: $scope.name,
            password: $scope.passwd
        };
        $http.post('todoAPI/userAuthentification', data).then(function successCallback(response) {
            if(response.data != 0){
                if(response.data != "-1"){
                    exchangeSessionKey.set(response.data);
                    $location.path("/todoUI");
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("There was an internal Error. Pleasy try it later")
                            .hideDelay(3000)
                    );
                }
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