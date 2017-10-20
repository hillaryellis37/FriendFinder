
var survey = [];
var soulmateName;
var soulmateImg; 
var currentScore;
var smallestDif = 40;

function soulmateLogic(scores) {

  var dif = 0;

  for(var i = 0; i < scores.length; i++) {

    var difference = Math.abs(parseInt(scores[i]) - currentScore[i]);
    dif += difference;
  }
      
    if (dif < smallestDif) {
      smallestDif = dif;
      return true;      
      
      } 
}

$(".rb-tab").click(function(){
  $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
  $(this).addClass("rb-tab-active");
});


$(".trigger").on("click", function(event){

  userInputName = $("#new-user").val().trim();
  userInputURL = $("#url").val().trim();

  if ((userInputName != "") && (userInputURL != "")) {
    smallestDif = 40
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
        } 

       }

      $("#sm-name").html(soulmateName);
      $("#sm-img").attr("src", soulmateImg);
      $('#exampleModal').modal('show');


    });
  }

});