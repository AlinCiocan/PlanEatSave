/// <reference path="jquery-2.1.4.intellisense.js" />

(function () {
    function init() {
        console.log("hello world!!");

        var dayCardWidth = 200;
        var $daysBoard = $(".days-board"),
            $dayCards = $daysBoard.children(".day-card");




        // duplicate days (for prototyping purposes)
        // $daysBoard.append($dayCards.clone());
        // $daysBoard.append($dayCards.clone());

        // I kinda need something to do me the binding
        // because I have to query again dom to have the correct childs
        $dayCards = $daysBoard.children(".day-card");

        // calculate board width
        var daysBoardWidth = ((dayCardWidth + 10) * $dayCards.length) + "px";
        $daysBoard.css("width", daysBoardWidth);



    }

    $(document).ready(function () {
        init();
    });
})();
