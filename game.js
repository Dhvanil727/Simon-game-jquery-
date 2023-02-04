var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];

var userClickedPattern = [];
var level=0;
var started =false;
$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
  });
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

 
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
animatePress(userChosenColour);
checkanswer(userClickedPattern.length-1);
});

function checkanswer(currentlevel)
{
  if(gamePattern[currentlevel]=== userClickedPattern[currentlevel]){
      // console.log("success");
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function()
        {
            nextSequence();
        },1000);
      }
  }
  else{
    // console.log("failed");

    playSound("wrong");

    
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

  
    
startover();

  }
}

function nextSequence()
{    
  level++;
  userClickedPattern=[];
  $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*3)+1;
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
  
   
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  function startover()
{
  level=0;
  gamePattern=[];
  started=false;
}
