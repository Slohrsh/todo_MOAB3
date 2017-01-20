'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("newTodoController", ['$scope', '$http', '$window', '$mdToast', function ($scope, $http, $window, $mdToast) {
    $scope.newTodo = function(){
        var data = {
            userid: 1,
            topic: $scope.todo.topic,
            description: $scope.todo.description,
            isdone: 0
        };
        $http.post('todoAPI/newSpecificTodo', data).then(function successCallback(response) {
            $window.location = "todoUI";
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't create Todo. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);