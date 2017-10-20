
var survey = [];
var soulmateName;
var soulmateImg; 
// var quotient = 40;
// var smallestSum = 0;
var currentScore;
var quotient = 40;

function soulmateLogic(scores) {

  var smallestSum = 0;


      for(var i = 0; i < scores.length; i++) {

        console.log("check");

        var difference = Math.abs(parseInt(scores[i]) - currentScore[i]);
        smallestSum += difference;
        // console.log("difference:", difference);
        // console.log("smallestSum:", smallestSum);

      }

      console.log("quotient:", quotient);
      console.log("smallestSum:", smallestSum);
      console.log(smallestSum < quotient);

        
      if (smallestSum < quotient) {
        quotient = smallestSum;
        return true;

      //     soulmateName = data[i].name;
      //     soulmateImg = data[i].photo;
      //     console.log(soulmateName);
      //     console.log(soulmateImg);
      //     console.log("quotient:", quotient);
      //     console.log("smallest sun", smallestSum);
      } 
}


//Switcher function:
$(".rb-tab").click(function(){
  //Spot switcher:
  $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
  $(this).addClass("rb-tab-active");
});


$(".trigger").on("click", function(event){
  event.preventDefault(); 

  survey = [];

  for (i=1; i<=$(".rb").length; i++) {
    var rb = "rb" + i;
    var rbValue = parseInt($("#rb-"+i).find(".rb-tab-active").attr("data-value"));
    survey.push(rbValue); 
  };


  var newFriend = {
    name: $("#new-user").val().trim(),
    photo: $("#url").val().trim(),
    scores: survey
  };

 
  $.post("/api/friends/", newFriend, function(data) {
  });

  $.get("/api/friends/", function(data) {


    currentScore = newFriend.scores;   
    
    console.log("current score", currentScore);
    console.log("data length:", data.length);
    
    
    for (var i = 0; i < data.length - 1; i++) {

    var scores = data[i].scores; 


    console.log("score:", scores);

      if (soulmateLogic(scores)) {

          
          
          soulmateName = data[i].name;
          soulmateImg = data[i].photo;
          console.log(soulmateName);
          console.log(soulmateImg);
          // console.log("quotient:", quotient);
          // console.log("smallest sun", smallestSum);
      } 

     }

    // soulmateName = data[0].name;
    // soulmateImg = data[0].photo;

    $("#sm-name").html(soulmateName);
    $("#sm-img").attr("src", soulmateImg);

  });

});