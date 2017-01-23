'use strict';
var todoApp = angular.module("todo");

todoApp.controller("todoController", [
    'exchangeTodoID',
    '$scope',
    '$mdToast',
    '$http',
    '$location',
    'exchangeSessionKey',
    'exchangeValues',
    function (
        exchangeTodoID,
        $scope,
        $mdToast,
        $http,
        $location,
        exchangeSessionKey,
        exchangeValues) {

    var sessionKey = exchangeSessionKey.get();
    if(sessionKey == 0){
        $location.path("/");
    }else{
        $http({
            method: 'GET',
            url: 'todoAPI/allTodosFromUser/' + sessionKey
        }).then(function successCallback(response) {
            $scope.todos = response.data;
        }, function errorCallback(response) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent("Can't load Todos. Please try it later.")
                    .hideDelay(3000)
            );
        });

        $scope.showTask = function(todo){
            exchangeTodoID.set(todo.idtodos);
            exchangeValues.set(todo);
            $location.path("/taskUI");
        }

        $scope.logout = function () {
            var data = {
                sessionkey: sessionKey
            }
            $http.post('todoAPI/deleteSessionKey', data).then(function successCallback(response) {
            }, function errorCallback(response) {
            });
            $location.path("/");
        }

        $scope.addNewTodo = function(){
            $location.path("/newTodo");
        }

        $scope.updateTodoIsDone = function(task){
            //$scope.taskToChange = task;
            var isDone = task.isDone;
            if(isDone == 1){
                task.isDone = 0;
            }else{
                task.isDone = 1;
            }
            $scope.updateTodoInDB(task);
        };

        $scope.updateTodoInDB = function(todo){

            var data = {
                sessionkey : sessionKey,
                description : todo.description,
                topic : todo.topic,
                isdone : todo.isDone,
                idtodos: todo.idtodos,
            };
            $http.put('todoAPI/updateSpecificTodo', data).then(function successCallback(response) {
                //$scope.updateTodos(todo);
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("There was an error updating the Task. Pleasy try it later.")
                        .hideDelay(3000)
                );
            });
        };

        $scope.updateTodos = function (newTodo) {
            //$scope.tasks[newTodo.idtodos-1] = newTodo;
        }
    }
}]);