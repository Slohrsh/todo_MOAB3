'use strict';
var todoApp = angular.module("todo");

todoApp.controller("editTodoController", [
    '$scope',
    '$http',
    '$location',
    '$mdToast',
    'exchangeTodoID',
    'exchangeSessionKey',
    'exchangeValues',
    function (
        $scope,
        $http,
        $location,
        $mdToast,
        exchangeTodoID,
        exchangeSessionKey,
        exchangeValues) {

    var id = exchangeTodoID.get();
    var sessionKey = exchangeSessionKey.get();
    if(sessionKey == 0){
        $location.path("/");
    }else{
        var todoValues = exchangeValues.get();
        $scope.topic = todoValues.topic;
        $scope.description = todoValues.description;

        $scope.goBack = function () {
            $location.path("/taskUI");
        }

        $scope.updateTodo = function(){
            var data = {
                sessionkey : sessionKey,
                idtodos: id,
                topic: $scope.topic,
                description: $scope.description,
                isdone: todoValues.isDone
            };
            $http.put('todoAPI/updateSpecificTodo', data).then(function successCallback(response) {
                var newData = {
                    topic : $scope.topic,
                    description : $scope.description
                }
                exchangeValues.set(newData);
                $location.path("/taskUI");
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Can't update Todo. Please try it later")
                        .hideDelay(3000)
                );
            });
        };
    }
}]);
