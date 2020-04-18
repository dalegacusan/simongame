const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// Game Pattern
const nextSequence = () => {
  const randNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randNumber];

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);
};

// User Pattern
$(".btn").on("click", function () {
  const userChosenColour = $(this).attr("id");
  const currButton = $(this);

  currButton.addClass("pressed");
  setTimeout(function () {
    currButton.removeClass("pressed");
  }, 100);

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

const checkAnswer = (index) => {
  console.log(`Game Pattern: ${gamePattern}`);
  console.log(`User Pattern:  ${userClickedPattern}`);

  if (gamePattern[index] === userClickedPattern[index]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
};

const startOver = () => {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;

  $("#level-title").text(`Game Over, Press Any Key to Restart`);

  let wrong = new Audio("sounds/wrong.mp3");
  wrong.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
};

const playSound = (color) => {
  switch (color) {
    case "red":
      let red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      let blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      let green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      let yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
  }
};
