'use strict';
var todoApp = angular.module("todo");

todoApp.controller("newTodoController", ['$scope', '$http', '$location', '$mdToast', function ($scope, $http, $location, $mdToast) {
    $scope.newTodo = function(){
        var data = {
            userid: 1, //Todo: Über Service userid holen
            topic: $scope.todo.topic,
            description: $scope.todo.description,
            isdone: 0
        };
        $http.post('todoAPI/newSpecificTodo', data).then(function successCallback(response) {
            $location.path("/todoUI");
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't create Todo. Please try it later")
                    .hideDelay(3000)
            );
        });
    };
}]);