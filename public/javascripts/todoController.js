'use strict';
var todoApp = angular.module("todo");

todoApp.controller("todoController", ['exchangeTodoID', '$scope', '$http', '$location', function (exchangeTodoID, $scope, $http, $location) {
    $http({
        method: 'GET',
        url: 'todoAPI/allTodosFromUser'
    }).then(function successCallback(response) {
        $scope.todos = response.data;
    }, function errorCallback(response) {
        alert("KERLE WAS MACHSCH!");
    });

    $scope.showTask = function(id){
        exchangeTodoID.set(id);
        $location.path("/taskUI");
    }

    $scope.addNewTodo = function(){
        $location.path("/newTodo");
    }
}]);