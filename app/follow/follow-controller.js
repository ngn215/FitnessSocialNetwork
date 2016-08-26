(function (arguments) {
  angular.module('FitnessNetwork')
    .controller('FollowController', ['$scope', '$http', function($scope, $http){

        //function defs
        function getDataFromLocalStorage()
        {
          console.log("getDataFromLocalStorage()");
          $scope.user = JSON.parse(localStorage['User-Data']);
          console.log($scope.user);
        }

        function updateLocalStorage(updatedData)
        {
          console.log("updateLocalStorage()");
          localStorage.clear();
          localStorage.setItem('User-Data', JSON.stringify(updatedData));
        }

        function getUsers()
        {
            console.log("getUsers()");
            $http.get('api/users/get').then(function(response){
              $scope.users = response.data;
              console.log($scope.users);
            });
        }

        getDataFromLocalStorage();
        getUsers($http);

        $scope.follow = function(userId, fitnetworkerId)
        {
          request = {userId: userId,
                  fitnetworkerId: fitnetworkerId};

          $http.post('api/users/follow', request)
              .then(function (response) {
                console.log(response.data);
                $scope.user = response.data;

                updateLocalStorage(response.data);
                getUsers();
              })
        };

        $scope.unfollow = function(userId, fitnetworkerId)
        {
          request = {userId: userId,
                  fitnetworkerId: fitnetworkerId};

          $http.post('api/users/unfollow', request)
                .then(function(response){
                  console.log(response.data);
                  $scope.user = response.data;

                  updateLocalStorage(response.data);
                  getUsers();
                })
        };

        $scope.checkIsFollowing = function(fitnetworkerId)
        {
            for(var i=0; i < $scope.user.following.length; i++)
            {
              if($scope.user.following[i].userId === fitnetworkerId){
                return true;
              }
            }
            return false;
        };

    }])
}())
