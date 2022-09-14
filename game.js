var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;


function nextSequence() {

    userClickedPattern = [];

    level++;
    $('#level-title').html('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


var userClickedPattern = [];

$('.btn').click(function (event) {

    var userChosencolor = event.target.getAttribute('id');
    userClickedPattern.push(userChosencolor);

    playSound(userChosencolor);
    animatePress(userChosencolor);
    checkAns(userClickedPattern.length - 1);
});


function playSound(name) {
    var audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    var activeBtn = $('.' + currentColor);
    activeBtn.addClass('pressed');
    setTimeout(() => {
        activeBtn.removeClass('pressed');
    }, 100);
}


function checkAns(currentLvl) {

    if (gamePattern[currentLvl] === userClickedPattern[currentLvl]) {

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $('body').addClass('game-over');

        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);

        $('#level-title').html('Game Over, Press Play Button to Restart.');

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


let started = false;

// $(document).keypress(function () {
//     if (started === false) {
//         $('#level-title').html('Level ' + level);
//         started = true;
//         nextSequence();
//     }
// });

$('.playBtn').click(()=> {
    if (started === false) {
        $('#level-title').html('Level ' + level);
        started = true;
        nextSequence();
    }
});

$('span').click(()=> {
    $('.instructionDiv').toggleClass('instructionDivVisible');
});

$('.crossIcon').click(()=> {
    $('.instructionDiv').removeClass('instructionDivVisible');
});
