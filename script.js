$(document).ready(function() {
  $(".white").click(function(){
    $(".choise, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    console.log("Choise white");
  });

  $(".black").click(function(){
    $(".choise, p").css("visibility", "hidden");
    $("td").css("visibility", "visible");
    console.log("Choise black");
  });
  $("td").click(function(){
    console.log("Td clicked");
  });

});





