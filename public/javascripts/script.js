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
