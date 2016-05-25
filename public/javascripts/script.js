$(document).ready(function(){
  setTimeout(function(){
    $('#phone').addClass('shake');
    setTimeout(function(){
      $('#phone').attr('src', 'img/phoneB.png');
      setTimeout(function(){
        $('#phone').removeClass('shake');
      }, 750);
    }, 100);
  }, 5000);

  $('form').submit(function(){
    var email = $("#emailInput").val();
    var pattern = new RegExp("^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$");
    if (pattern.test(email) === false) {
      alert('Email not Valid!');
    } else {
        var url = "/getEmailID/" + email;
        $.post(url, function(data){
        });
    }
  });

})