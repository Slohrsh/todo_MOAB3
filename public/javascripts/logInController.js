/**
 * Created by Sebastian on 19.01.2017.
 */
/**
 * Created by Sebastian on 18.01.2017.
 */
'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("logInController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    //login Abfragen
    $scope.verifyCredentials = function(){
        /*$scope.user.passwd;
        $scope.user.name;*/
        $window.location = "todoUI";
    }
}]);