var isValidEmail = function(emailAddress) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailAddress);
};

var messageClass = "popup-message";
var errorClass = "popup-error";
var $popups = [];

var dismissPopupMessage = function() {
  if ($popups.length !== 0) {
    $popups.shift().remove();
  }
};

var showPopupMessage = function(message, errorObj) {
  var popupClass = [messageClass];
  var content = "<div>" + message;
  if (errorObj) {
    if (typeof errorObj === "object") {
      content += "<pre>"+ JSON.stringify(errorObj) + "</pre>";
    } else {
      content += "\n" + errorObj;
    }
    popupClass.push(errorClass);
  }
  content += "</div>";

  var $popup = $("<div>" + content + "</div>").addClass(popupClass.join(" "));
  $("body").prepend($popup);
  $popups.push($popup);
};

var submitEmail = function(email) {
  if (isValidEmail(email)) {
      $.post('/getEmailId/' + email, {}, function (res) {
        if (res.emailAdded === false) {
          console.log('Email already exists', email);
          showPopupMessage('Email already exists', email);
          $('#emailInput').val('');
        } else {
          console.log('Email successfully added, see you soon!', res);
          showPopupMessage('Email successfully added, see you soon!');
          $('#emailInput').val('');
        }
      }).fail(function(error) {
        var res = error.responseObject;
        console.error('An unknown error occured, we\'ll be right on it!', res.responseObject);
        showPopupMessage('An unknown error occured, we\'ll be right on it!', res.responseObject);
      });
  } else {
    console.log('Invalid email', email);
    showPopupMessage('Invalid email', email);
  }
};

$(document).ready(function(){
  $('.background').parallax();
  setTimeout(function(){
    $('#phone').addClass('shake');
    setTimeout(function(){
      $('#phone').attr('src', 'img/phoneB.png');
      setTimeout(function(){
        $('#phone').removeClass('shake');
      }, 750);
    }, 100);
  }, 5000);

  $("body").click(function (event) {
    dismissPopupMessage();
  });

  $('#emailForm').submit(function(event) {
    event.preventDefault();
    submitEmail($('#emailInput').val());
  });
});
