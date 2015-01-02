var quizDate = new Date();
var wins = 0;
var losses = 0;

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function setRandomDate() {
    quizDate = randomDate(new Date(2015, 0, 1), new Date(2015, 11, 31));
    date.textContent = quizDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function checkAnswer(selected) {
    var success = selected == quizDate.getDay();
    results.textContent = success;

    if (success) {
        wins++;
        setRandomDate();
    } else {
        losses++;
    }
    updateScore();
}

function updateScore() {
    score_wins.textContent = "Wins: " + wins;
    score_losses.textContent = "Losses: " + losses;

    var d = losses + wins;

    if (d > 0) {
        score_percent.textContent = "Percent: " + (wins / d) * 100;
    } else {
        score_percent.textContent = "Percent: 0";
    }
}

$(document).ready(function() {
    setRandomDate();
    updateScore();
});
