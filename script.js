$(document).ready(function() {

  setTimeout(function(){
    $('#phone').addClass('shake');
    setTimeout(function(){
      $('#phone').attr('src', 'img/phoneB.png');
      setTimeout(function(){
        $('#phone').removeClass('shake');
      }, 750);
    }, 100);
  }, 5000);


});