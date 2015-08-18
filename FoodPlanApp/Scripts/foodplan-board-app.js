/// <reference path="angular.js" />
/// <reference path="board-script-for-styling.js" />

(function (angular) {
    "use strict";

    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    foodplanBoardApp.controller("BoardController", ["$scope", "$http", function ($scope, $http) {
        $http.get("/api/board/5")
        .then(function(response) {
            console.log("success", response);
            $scope.board = response.data;

            $scope.styleForBoard = {
                width : $scope.board.days.length * 220 + "px"
            };

            $scope.$watch("board", function(newBoard, oldBoard) {
                console.log("old board", oldBoard);
                console.log("new board", newBoard);

                // TODO: do the request for put (to update the board)
                // $http.put("url to put..", newBoard);

            }, true);

            $scope.changeBoard = function() {
                $scope.board.days[0].categories[0].title = "the new category title";
            }

        }, function(error) {
            console.log("error", error);
        });

    }]);

})(window.angular);