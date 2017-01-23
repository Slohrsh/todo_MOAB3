'use strict';
var todoApp = angular.module("todo");

todoApp.controller("signInController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    function (
        $scope,
        $http,
        $location,
        $mdToast) {

    $scope.createNewAccount = function () {
        var data = {
            user: $scope.name,
            password: $scope.passwd
        };
        $http.post('todoAPI/createUser', data).then(function successCallback(response) {
            $location.path("/");
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("There was an error creating user. Please try it later.")
                    .hideDelay(3000)
            );
        });
    }
    }]);