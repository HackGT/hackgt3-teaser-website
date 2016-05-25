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
});

// $('form').submit(function(){
//   var email = $("#emailInput").val();
//   var pattern = new RegExp("^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$");
//   if (pattern.test(email) === false) {
//     alert('Email not Valid!');
//   } else {
//       var url = "/getEmailID/" + email;
//       $.post(url, function(data){
//       });
//   }
// });

var app = angular.module('teaser', []);
app.controller("TeaserController", ['$scope', '$http', function($scope, $http) {
  $scope.email = '';
  $scope.emailValid = function() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test($scope.email);
  };
  $scope.submitEmail = function() {
    if ($scope.emailValid()) {
      $http.post("/getEmailID/" + $scope.email, {}).then(
        function(res) {
          console.log(res);
          if (res.data.emailAdded) {
            alert("Subscription Successful!");
            $scope.email = '';
          } else if (!res.data.emailAdded) {
            alert("Email alredy exists");
          }
        },
        function(err) {
          console.log(err);
        }
      );
    } else {
      alert("Email Not Valid");
    }
  };
}]);
