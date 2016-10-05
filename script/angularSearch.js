    var app = angular.module('myApp', ['kendo.directives']); //'kendo.directives'
    var GrowerName = [];

    //remove duplicate
    angular.forEach(FdacswxStdGrowerFinder, function(value, key){
        if (GrowerName.indexOf(value) == -1) {
            GrowerName.push(value);
        }
    });

    // need to sort the list

    app.controller('myCtrl', function($scope) {
      // $scope.selected = undefined;
      // $scope.states = GrowerName;
      $(document).ready(function() {
        $("#searchBar").kendoAutoComplete({
            dataSource : GrowerName,
            change: function(e) {
              console.log(this.value());
              // $scope.growerNames = this.value();
              // console.log($scope.growerNames);
            }
          });
       });
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

        //submit() starts
        $scope.submit = function(GrowerName, stationName){
          // alert("123"); it works
          // alert(GrowerName + stationName); it works
          var lat;
          var lng;
          $.getJSON(url2, function(data){
              for (var i = 0; i < data.length; i++) {
                if(data[i].grower_name == GrowerName && data[i].station_name == stationName){
                    lat = data[i].latitude;
                    lng = data[i].longitude;
                }
              }

              if (lat != null && lng != null) {
                 require([
                    "esri/map",
                    "esri/geometry/Point",
                    "esri/symbols/PictureMarkerSymbol",
                    "esri/graphic",
                    "esri/layers/GraphicsLayer",
                    "dojo/domReady!"
                  ], function(
                    Map, Point, PictureMarkerSymbol, Graphic, GraphicsLayer
                  ) {
                      //http://www.clker.com/cliparts/W/0/g/a/W/E/map-pin-red-th.png
                      var pictureMarkerSymbol = new PictureMarkerSymbol('http://www.clker.com/cliparts/W/0/g/a/W/E/map-pin-red-th.png', 31, 51);
                      var p = new Point(lng, lat);
                      var g = new Graphic(p, pictureMarkerSymbol); 
                      var pinpointLayer = new GraphicsLayer({
                            outFields:["*"],
                      });
                      map.centerAndZoom(p, 12);
                      pinpointLayer.add(g);
                      map.addLayer(pinpointLayer);
                      console.log(pinpointLayer);
                  })
              }
   
          })
        }
        // submit() ends

    });
