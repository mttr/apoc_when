$(document).ready(function() {
    $(".button-collapse").sideNav();
    $(".dropdown-button").dropdown();
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

angular.module('apocWhen', [])
    .controller('ApocController', ['$scope', function($scope) {
        $scope.daysOfWeek = [
            { day: 'Sun', daynum: '0', offset: '' },
            { day: 'Mon', daynum: '1', offset: '' },
            { day: 'Tue', daynum: '2', offset: '' },
            { day: 'Wed', daynum: '3', offset: '' },
            { day: 'Thu', daynum: '4', offset: '' },
            { day: 'Fri', daynum: '5', offset: '' },
            { day: 'Sat', daynum: '6', offset: 'offset-s4' },
        ];

        $scope.difficulty = [
            { i:0, diff: "This year", start: new Date(2015, 0, 1), end: new Date(2015, 11, 31) },
            { i:1, diff: "This century", start: new Date(2000, 0, 1), end: new Date(2099, 11, 31) },
            { i:2, diff: "20th-21st", start: new Date(1900, 0, 1), end: new Date(2099, 11, 31) },
        ];

        $scope.selectedDiff = $scope.difficulty[0];

        $scope.modes = {
            normal: {
                directions: "Which day of the week does this date land on?",
                gen_date: function() {
                    var diff = $scope.selectedDiff;
                    var new_date = randomDate(diff["start"], diff["end"]);

                    return new_date;
                },
                date_string: function() {
                    return $scope.quizDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                },
            },
            doomsday: {
                directions: "What is the doomsday for this year?",
                start_date: new Date(1900, 0, 1),
                end_date: new Date(2015, 0, 1),
                gen_date: function() {
                    var diff = $scope.selectedDiff;
                    var new_date = randomDate(diff["start"], diff["end"]);

                    new_date.setMonth(11, 12); // Dec 12th

                    return new_date;
                },
                date_string: function() {
                    return $scope.quizDate.toLocaleDateString('en-US', { year: 'numeric' });
                },
            },
        };

        $scope.currentMode = $scope.modes["normal"];

        $scope.quizDate = $scope.currentMode["gen_date"]();

        $scope.score = { wins: 0, losses: 0, perc: 0 }

        $scope.checkAnswer = function(selected) {
            var success = selected == $scope.quizDate.getDay();
            var score = $scope.score;
            results.textContent = success;

            if (success) {
                score.wins++;
                $scope.quizDate = $scope.currentMode["gen_date"]();
            } else {
                score.losses++;
            }

            score.perc = (score.wins / (score.losses + score.wins)) * 100;
        };

        $scope.setMode = function(mode) {
            $scope.currentMode = $scope.modes[mode];
            $scope.quizDate = $scope.currentMode["gen_date"]();
        };

        $scope.setDiff = function(i) {
            $scope.selectedDiff = $scope.difficulty[i];
            $scope.quizDate = $scope.currentMode["gen_date"]();
        };
    }]);
