var started = false;
var level = 0;

// storing btn colors of the game
var buttonColors = ["red", "blue", "green", "yellow"];
// empty array to store the game pattern
var gamePattern = [];
// empty array to store the user clicked pattern
var userClickedPattern = [];

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// using jQuery to detect which button is pressed by the user
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// function to create a new sequence
function nextSequence() {
  // generate a random number from 0 to 3 and then chose the color
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  // push the color to the game pattern
  gamePattern.push(randomChosenColor);

  // adding animation to the chosen color using jQuery
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

// function to play sounds
function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// function to animate pressed button
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
