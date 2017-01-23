// create the module and name it
var todo = angular.module('todo', ['ngRoute', 'ngMaterial']);

// routes
todo.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            url : '/login',
            templateUrl : '/login',
            controller  : 'logInController'
        })

        .when('/signIn', {
            url : '/signIn',
            templateUrl : '/signIn',
            controller  : 'signInController'
        })

        // route for the about page
        .when('/todoUI', {
            url : '/todoUI',
            templateUrl : '/todoUI',
            controller  : 'todoController'
        })

        // route for the service page
        .when('/taskUI', {
            url : '/taskUI',
            templateUrl : '/taskUI',
            controller  : 'taskController'
        })
        // route for the service page
        .when('/newTodo', {
            url : '/newTodo',
            templateUrl : '/newTodo',
            controller  : 'newTodoController'
        })
        // route for the service page
        .when('/newTask', {
            url : '/newTask',
            templateUrl : '/newTask',
            controller  : 'newTaskController'
        })
        // route for the service page
        .when('/editTask', {
            url : '/editTask',
            templateUrl : '/editTask',
            controller  : 'editTaskController'
        })
        // route for the service page
        .when('/editTodo', {
            url : '/editTodo',
            templateUrl : '/editTodo',
            controller  : 'editTodoController'
        });
});

// create the controller and inject Angular's $scope
todo.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.info = 'Welcome to Oodles';
});
