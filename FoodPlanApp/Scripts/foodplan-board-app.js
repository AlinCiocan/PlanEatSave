/// <reference path="angular.js" />
/// <reference path="board-script-for-styling.js" />

(function (angular) {
    "use strict";

    var BOARD_ID = 1;

    var getBoardApiUrl = function(boardId) {
        var BOARD_API_URL = "/api/board/";

        return BOARD_API_URL + boardId;
    }

    var foodplanBoardApp = angular.module("foodplanBoardApp", []);

    foodplanBoardApp.controller("BoardController", ["$scope", "$http", function ($scope, $http) {
        $http.get(getBoardApiUrl(BOARD_ID))
        .then(function(response) {
            console.log("success", response);
            $scope.board = response.data;

            $scope.styleForBoard = {
                width : $scope.board.days.length * 220 + "px"
            };

            $scope.$watch("board", function (newBoard, oldBoard) {
                /*This is a special case for the first time when receiving the board
                from the server and from $watch will detect this a change, but both the
                new and old board are identical*/
                if (newBoard === oldBoard) {
                    return;
                }

                $http.put(getBoardApiUrl(newBoard.id), newBoard);
            }, true);


            $scope.changeBoard = function () {
                $scope.board.title = "my great board 2";

                $scope.board.days[0].categories[0].title = "some great category here";
            };


            $scope.addCategory = function () {
                var newCategory = prompt("New category name", "");
                if (!newCategory) {
                    alert("Unfortunatelly, you cannot add an empty category");
                }

                $scope.board.days[0].categories.push({
                    dayId: 1,
                    title: newCategory
                });
            };


        }, function(error) {
            console.log("error", error);
        });

    }]);

})(window.angular);