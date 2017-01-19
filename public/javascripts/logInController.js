/**
 * Created by Sebastian on 19.01.2017.
 */
/**
 * Created by Sebastian on 18.01.2017.
 */
'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("logInController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
    //login Abfragen
    $scope.verifyCredentials = function(){
        /*$scope.user.passwd;
        $scope.user.name;*/
        $location.path("todoUI"); // path not hash
    }
}]);