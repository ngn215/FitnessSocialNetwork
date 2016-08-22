(function (arguments) {
  angular.module('FitnessNetwork')
    .controller('MainController', ['$scope', '$http', '$interval',
                          function ($scope, $http, $interval) {

          if (localStorage['User-Data'] !== undefined)
          {
            $scope.user = JSON.parse(localStorage['User-Data']);
            console.log($scope.user);
          }

          $scope.sendFitbit = function(event){
                      if (event.which === 13) {
                        var request = {
                          user: $scope.user.username || $scope.user.email,
                          userId: $scope.user._id,
                          userImage: $scope.user.image,
                          content: $scope.newFitbit
                        }

                        $http.post('/api/fitbit/post', request)
                              .success(function (response) {
                                console.log(response);
                                $scope.fitbits = response;
                              }).error(function (error) {
                                console.error(error);
                              })
                      }
                    };

          function getFitbits (intial){
            $http.get('api/fitbit/get').success(function (response) {
              if (intial) {
                $scope.fitbits = response;
              } else {
                  if(response.length > $scope.fitbits.length){
                      $scope.incomingFitbits = response;
                  }
              }
            })
          };

          $interval(function (arguments) {
            getFitbits(false);
            if ($scope.incomingFitbits){
            $scope.difference = $scope.incomingFitbits.length - $scope.fitbits.length;
          }
            console.log("this is working");
          }, 5000)

          $scope.setNewFitbits = function(){
            $scope.fitbits = angular.copy($scope.incomingFitbits);
            $scope.incomingFitbits = undefined;
          }

          //Initial
          getFitbits(true);

                }])
}())
