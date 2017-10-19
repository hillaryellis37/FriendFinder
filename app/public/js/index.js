
var survey = []; 
var soulmateName;
var soulmateImg;

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

    // console.log(newFriend);


  $.post("/api/friends/", newFriend, function(data) {
  });

  $.get("/api/friends/", function(data) {
    soulmateName = data[0].name;
    soulmateImg = data[0].photo;

    $("#sm-name").html(soulmateName);
    $("#sm-img").attr("src", soulmateImg);

  });

});