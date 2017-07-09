var word;
function getRandomWord(){
  var url = "https://gist.githubusercontent.com/anonymous/ce33155706b285651abacd16d17824f0/raw/30eda7905bf51b9a3879d1e64e38d2ae928de96d/nounList.txt";
  var list;
  var xmlhttp;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
    xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      list = xmlhttp.responseText.split("\n");
    }
  }
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  return list[Math.floor(Math.random()*list.length)];
}


function singularOrPlural(text){
  var booleanList = [true, false];
  var isSingular = booleanList[Math.floor(Math.random() * 2)];
  return text.plural(isSingular);
}

function speakText(text){
  responsiveVoice.speak(text);
}

$(".resultBtn").click(function(){
  var currentButton = $(this).text();
  var isButtonSingular = currentButton == "Singular";
  var isWordSingular = word.plural(true) == word;
  console.log(isButtonSingular, isWordSingular);
  if(isButtonSingular == isWordSingular){
    swal({
      title: "Good job!",
      text: "It's the correct answer !",
      type: "success"},
      function(){
        startNewGame();
        increaseScore();
      }
    );
  }
  else{
    swal({
      title: "You dumb !",
      text: "It's the wrong answer !",
      type: "error"},
      function(){
        startNewGame();
        decreaseScore();
      }
    );
  }
});

function increaseScore(){
  var score = parseInt($("#score").text());
  score++;
  $("#score").text(score);
}

function decreaseScore(){
  var score = parseInt($("#score").text());
  score--;
  $("#score").text(score);
}

function resetScore(){
  $("#score").text("0");
}

$("#btn_start").click(function() {
  $(".start").css("display", "none");
  $(".mainGame").css("display", "block");
  startNewGame();
});

function startNewGame(){
  word = getRandomWord();
  $("#text").text(word);
  word = singularOrPlural(word);
  speakText(word);
}

$("#reload").click(function(){
  resetScore();
  startNewGame();
});
