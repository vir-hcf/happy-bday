$(document).ready(function(){

});

$("#begin").click(function(){
  $(this).hide();
  startCountDown();
});
function startCountDown() {
  var countDown = 9;
  let timeout = setInterval(function() {
    if(countDown == 9){
    //   var audio = new Audio('./content/audio/timer.wav');
    //   audio.play();
    }
    if(countDown == -1){
      $("body").addClass("confetti");
      clearInterval(timeout);
      $("#main .birthday-message").fadeIn(5000);
      setTimeout(function(){
        $("#main .adventure").fadeIn(5000);
      },5000);
      
      $("#main .countdown").hide();
    }else{
      $("#main .countdown").html(countDown);
      countDown--;
    }
  },1000);
}

$("#begin-adventure").click(function(){
  window.location.href = "./first-adventure.html";
});