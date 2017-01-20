'use strict';
var todoApp = angular.module("todo", ['ngMaterial']);

todoApp.controller("todoController", ['exchangeTodoID', '$scope', '$http', '$window', function (exchangeTodoID, $scope, $http, $window) {
    $http({
        method: 'GET',
        url: 'todoAPI/allTodosFromUser'
    }).then(function successCallback(response) {
        $scope.todos = response.data;
    }, function errorCallback(response) {
        alert("KERLE WAS MACHSCH!");
    });

    $scope.showTask = function(id){
        exchangeTodoID.set([{id:id}]);
        $window.location = "taskUI";
    }

    $scope.addNewTodo = function(){
        $window.location = "newTodo";
    }
}]);