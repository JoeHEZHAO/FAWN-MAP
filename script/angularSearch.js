

    var app = angular.module('myApp', ['kendo.directives']); //'kendo.directives'
    var GrowerName = [];

    //remove duplicate
    angular.forEach(FdacswxStdGrowerFinder, function(value, key){
        if (GrowerName.indexOf(value) == -1) {
            GrowerName.push(value);
        }
    });

    // $(document).ready(function() {
    //   $('#searchBar').autocomplete({
    //       source : GrowerName,
    //       change : function(event, ui){
    //           GrowerName = $("#searchBar").val();
    //           console.log(GrowerName);
    //     }
    //    });
    //  });

    app.controller('myCtrl', function($scope) {
      // $scope.selected = undefined;
      // $scope.states = GrowerName;

        // initialize
        $scope.growerNames = GrowerName;
        $scope.stationName = [];
        $scope.items = GrowerName;

        $scope.searchBarChange = function(value){
          console.log(value);
          $scope.growerNames.push(value);
        }

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
