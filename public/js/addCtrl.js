/*var app =angular.module("myApp")
app.controller('addCtrl', function($scope, $http){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};

    // Functions
    // ----------------------------------------------------------------------------
    // Creates a new user based on the form fields
    $scope.createUser = function() {

        // Grabs all of the text box fields
        var userData = {
            school: $scope.formData.school,
            principal: $scope.formData.principal,
            contact: $scope.formData.contact,
            latitude: $scope.formData.latitude,
            longitude:$scope.formData.longitude
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favlang = "";
                
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});*/