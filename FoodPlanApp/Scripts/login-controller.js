﻿/// <reference path="angular.js" />

(function(angular) {
    "use strict";

    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    foodplanBoardApp.controller("LoginController",
        ["$scope", "$http", function($scope, $http) {


            function loginRequestCallback(response) {
                console.log(response.data);

                
            }

            function loginRequestFailedCallback(error) {
                console.log("An error ocurred while trying to do login", error);
            }


            $scope.login = function () {
                var user = {
                    username: $scope.username,
                    password: $scope.password
                };
                $http.post("/api/user/login", user)
                    .then(loginRequestCallback, loginRequestFailedCallback);
            };


        }]);

})(window.angular);