// var app = angular.module("instantSearch", []);
// // Create the instant search filter
// app.filter('searchFor', function(){
//
//    // All filters must return a function. The first parameter
//    // is the data that is to be filtered, and the second is an
//    // argument that may be passed with a colon (searchFor:searchString)
//
//    return function(arr, searchString){
//
//       if(!searchString){
//          return arr;
//       }
//
//       var result = [];
//
//       searchString = searchString.toLowerCase();
//
//       // Using the forEach helper method to loop through the array
//       angular.forEach(arr, function(item){
//
//          if(item.title.toLowerCase().indexOf(searchString) !== -1){
//             result.push(item);
//          }
//
//       });
//
//       return result;
//    };
//
// });
//
// // The controller
//
// InstantSearchController = function($scope){
//    $scope.items = item1;
// }

    var app = angular.module('myApp', []);
    var GrowerName = [];

    //remove duplicate
    angular.forEach(FdacswxStdGrowerFinder, function(value, key){
        if (GrowerName.indexOf(value) == -1) {
            GrowerName.push(value);
        }
    });

    $(document).ready(function() {
      $('#searchBar').autocomplete({
          source: GrowerName
      });
    });

    app.controller('myCtrl', function($scope) {
        // initialize
        $scope.growerNames = GrowerName;
        $scope.stationName = [];
        $scope.items = GrowerName;

        $scope.onChanged = function(grower) {
          $scope.stationName = null;
          var stationTemp = [];
          angular.forEach(FdacswxStdGrowerFinder, function(value, key){
              if (value == grower) {
                  stationTemp.push(key);
              }
          });
          $scope.stationName = stationTemp;
        }






















    });
