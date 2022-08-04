//alert("hello")
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var flag = false;
var level = 0;

  $(document).on("keydown", function(){
    if(!flag)
    {
      $("#level-title").html("Level "+ level);
      flag = true;
      nextSequence();
    }
  });

$(".btn").on("click", function(event) {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  // checkAnswer(userClickedPattern.length - 1);
  playSound("sounds/" + userChosenColour + ".mp3");
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});




function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("h1").text("Level "+ level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  //console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // var name = "sounds/" + randomChosenColour + ".mp3";
  // playSound(name);

}

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function animatePress(currentColour) {
  //console.log(currentColour);
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
        {
          console.log("success");
          if(gamePattern.length === userClickedPattern.length)
          {
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        }
        else
        {
          playSound("sounds/wrong.mp3");
          $("body").addClass("game-over");
          setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
          $("h1").text("Game Over, Press Any Key to Restart");
          startOver();
        }


}

function startOver()
{
  level = 0;
  gamePattern = [];
  flag = false;
}
