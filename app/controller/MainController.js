(function () {
    angular.module("githubViewer")
        .controller("mainController",mainController)
         mainController.inject = ["$scope","$http"];

    

         function mainController($scope, $http) {
             $scope.user = null;
             $scope.checkForEmpty = function () {
                 if ($scope.newUser == '')
                     $scope.user = null;
             }
             
        var onRepo = function (response) {
            $scope.repos = response.data;
            $scope.error = null;
        };
   
        var onUserComplete = function (response) {
            $scope.user = response.data;
            $http.get($scope.user.repos_url)
                    .then(onRepo, onError);
           
            $scope.error = null;
        };

        var onError = function (response) {
            $scope.error = response.data;
        };

        $scope.searchUserName = function (newUser) {
            $http.get("https://api.github.com/users/"+newUser)
               .then(onUserComplete, onError);
        };

        $scope.repoSortOrder = "+name";
        
    };

    
})();