    // map is global for other js file to use
    var popup;
      require([
        "esri/map",
        "esri/dijit/Search",
      	"dojo/dom-construct",
        "esri/symbols/SimpleFillSymbol",
      	"esri/dijit/InfoWindow",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",
      	"esri/InfoTemplate",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/TextSymbol",
        "esri/graphic",
        "esri/layers/FeatureLayer",
        "esri/layers/GraphicsLayer",
        "dojo/dnd/Moveable",
        "dojo/dom",
        "dojo/ready",
        "dojo/query",
        "dojo/on",
        "dojo/dom-style",
        "dojo/dom-class",
        "dojo/_base/connect",
        "dojo/domReady!"
      ], function(
        Map, Search, domConstruct, SimpleFillSymbol, InfoWindow, Popup, PopupTemplate, InfoTemplate, Point, SimpleMarkerSymbol,TextSymbol, Graphic,FeatureLayer, GraphicsLayer, Moveable, dom,ready,query, on,domStyle, domClass, connect
      ) {

      var lastestDataNameFawn = ['stnName', 'stnID', 'dateTimes', 'isFresh','temp2mF','temp60cmF','temp10mF','soilTemp10cmF', 'rainFall2mInch','relHum2mPct','totalRad2mWm2','windSpeed10mMph','windDir10mDeg','dewPoint2mF','etInch','bp2m','xpos','ypos','elevation_feet','lng','lat','county','facility','wetBulbF','dailyMinTempF','dailyAvgTempF','dailyTotalRainInch','weeklyTotalRainInch','fcstMinTempF','weeklyStartDate','weeklyEndDate','fcstStartTime','fcstEndTime', 'nws_office','freeze_keyword', 'radar_keyword'];

      var lastestDataNameFdacswx = ['station_id', 'date_time', 'dry_bulb_air_temp', 'wet_bulb_temp', 'humidity', 'wind_speed', 'wind_direction', 'rainfall', 'latitude', 'longitude', 'total_rain_inche_since_installed', 'start_date_of_total_rain', 'station_name', 'vendor_name', 'time_zone', 'solar_radiation', 'et', 'solar_radiation_field_name', 'minutes_old', 'hasET', 'hasSolarRadiation', 'hasRemote', 'hasSoilMoisture', 'standard_date_time', 'fresh', 'grower_name'];

        popup = new Popup({
          titleInBody: true,
          anchor : "auto",
        }, domConstruct.create("div"));

        // create map and layers
        map = new Map("map", {
          basemap: "streets",
          center: [-81.379234,28.53833],
          zoom: 8,
          infoWindow: popup,
          sliderPosition: "top-right",
          // sliderStyle: "large"
        });

        // PopupTemplate generate function
      var popupTemplateGenerateFawn = {
          title : "<div class='title'><h1>StationName:  {stnName}</h1><h4 style='float:right; font:initial; width: 100%'>lng:{lng} ／ lat:{lat}</h4></div>",
          descriptionStart : "<ul class='tab'>" +
            "<li><a class='tablinks' onclick='openTag(event,&#39;current&#39;)'>Current</a></li>" +
            "<li><a class='tablinks' onclick='addBarChart(event, &#39;graph&#39;, {stnID})'>Graph</a></li>" +
            "<li><a class='tablinks' onclick='openForcast(event,&#39;forcast&#39;, {lng}, {lat})'>Prediction</a></li>" +
            "<li><a class='tablinks' onclick='openToolkit(event,&#39;Toolkit&#39;)'>Toolkit</a></li>" +
            "</ul>" +
            "<div id='current' class='tabcontent' style='background-color: white; display: block'>",

          descriptionEnd:
             "</div>"
             +  "<div id='graph' class='owl-carousel tabcontent'>"
             +    "<div id='temp2mF_FAWN' style='overflow:hidden' value='graph'></div>"
             +    "<div id='rainFall2mInch_FAWN' style='overflow:hidden'></div>"
             +    "<div id='wetBulbF_FAWN' style='overflow:hidden'></div>"
             +  "</div>"
             +  "<div id='forcast' class='tabcontent' style='background-color: white; display: none' ></div>"
             +  "<div id='Toolkit' class='tabcontent' style='background-color: white; display: none'>"
             +  "<button type='button' style='display: block' onclick='window.open(&#39;http://uffawn-datareport.appspot.com/&#39;)' value='Cold Protection'>Cold Protection Toolkit</button>"
             + "<button type='button' style='display: block' onclick='window.open(&#39;http://uffawn-datareport.appspot.com/&#39;))' value='Irrigation Scheduler Toolkit' >Irrigation Scheduler Toolkit</button>"
             + "<button type='button' style='display: block' onclick='window.open(&#39;http://uffawn-datareport.appspot.com/&#39;))' value='Freeze Alert Notification System'>Freeze Alert Notification System</button>"
             + "</div>",

          descriptionContent : '',
          json : { },
          setContent : function(descripContent){
            // this.descriptionContent = descripContent;
              // console.log(descripContent);
              for (var i = 0; i < descripContent.length; i++) {
                this.descriptionContent = this.descriptionContent.concat("<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>" +  descripContent[i] + ":</span><span style='float:right; color: #999'>{" + descripContent[i] + "}</span></div>");
              }
              // console.log(this.descriptionContent);

              return this.json = { title: this.title, description: this.descriptionStart + this.descriptionContent + this.descriptionEnd };
          }
      }

      var popupTemplateGenerateFadacswx = {
          title : "<div class='title'><h1>StationName:  {station_name}</h1><h4 style='float:right; font:initial; width: 100%'>lng:{longitude} ／ lat:{latitude}</h4></div>",
          descriptionStart : "<ul class='tab'>" +
            "<li><a class='tablinks' onclick='openTag(event,&#39;current&#39;)'>Current</a></li>" +
            "<li><a class='tablinks' onclick='addBarChartFdacswx(event, &#39;graph&#39;, {station_id})'>Graph</a></li>" +
            "<li><a class='tablinks' onclick='openForcast(event,&#39;forcast&#39;, {longitude}, {latitude})'>Prediction</a></li>" +
            "<li><a class='tablinks' onclick='openToolkit(event,&#39;Toolkit&#39;)'>Toolkit</a></li>" +
            "</ul>" +
            "<div id='current' class='tabcontent' style='background-color: white; display: block'>",

          descriptionEnd:
             "</div>"
             +  "<div id='graph' class='owl-carousel tabcontent'>"
             +  "<div id='dryTemp_Fdacswx' style='overflow:hidden' value='graph'></div>"
             +  "<div id='rainFall_Fdacswx' style='overflow:hidden'></div>"
             +  "<div id='wetTemp_Fdacswx' style='overflow:hidden'></div>"
             +  "</div>"
             +  "<div id='forcast' class='tabcontent' style='background-color: white; display: none' ></div>"
             +  "<div id='Toolkit' class='tabcontent' style='background-color: white; display: none'>"
             +  "<button type='button' style='display: block' onclick='coldp(&#39;{grower_name}&#39;, &#39;{station_name}&#39;)' value='Cold Protection'>Cold Protection Toolkit</button>"
             + "<button type='button' style='display: block' onclick='window.open(&#39;http://uffawn-datareport.appspot.com/&#39;))' value='Irrigation Scheduler Toolkit' >Irrigation Scheduler Toolkit</button>"
             + "<button type='button' style='display: block' onclick='window.open(&#39;http://uffawn-datareport.appspot.com/&#39;))' value='Freeze Alert Notification System'>Freeze Alert Notification System</button>"
             + "</div>",

          descriptionContent : '',
          json : { },
          setContent : function(descripContent){
            // this.descriptionContent = descripContent;
              // console.log(descripContent);
              for (var i = 0; i < descripContent.length; i++) {
                this.descriptionContent = this.descriptionContent.concat("<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>" +  descripContent[i] + ":</span><span style='float:right; color: #999'>{" + descripContent[i] + "}</span></div>");
              }
              // console.log(this.descriptionContent);
              return this.json = { title: this.title, description: this.descriptionStart + this.descriptionContent + this.descriptionEnd };
          }
      }

    var templateFdacswx = new PopupTemplate(popupTemplateGenerateFadacswx.setContent(lastestDataNameFdacswx));

    var templateFawn = new PopupTemplate(popupTemplateGenerateFawn.setContent(lastestDataNameFawn));

    gl_attr = new GraphicsLayer({
      infoTemplate: templateFawn,
      outFields:["*"],
    });

    glAttrFdacswx = new GraphicsLayer({
      infoTemplate: templateFdacswx,
      outFields:["*"],
    });

    pinpointLayer = new GraphicsLayer({
      outFields:["*"],
    });

    loadDataGenerateLayerFawn.getDataCreateLayer(url6, gl_attr);
    loadDataGenerateLayerFdacswx.getDataCreateLayer(url2, glAttrFdacswx);

    // console.log(glAttrFdacswx);
    popup.resize(600,400);
    // popup.maximize();
    map.addLayer(gl_attr);
    map.addLayer(glAttrFdacswx);

        // fawn checkbox
        var GetStationLyrToggle = dom.byId("GetStation");
        var GetTempLyrToggle = dom.byId("GetTemp");
        var GetWindSpeedLyrToggle = dom.byId("GetWindSpeed");

        //fadacswx checkbox
        var GetTempFdacswx = dom.byId("GetTempFdacswx");
        var GetStationFdacswx = dom.byId("GetStationFdacswx");
        var GetWindSpeedFdacswx = dom.byId("GetWindSpeedFdacswx");

        on(GetStationLyrToggle, "change", function(){
          map.removeLayer(pinpointLayer);
          if (GetTempLyrToggle.checked == true)
          {
            GetTempLyrToggle.checked = false;
            var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
          }
           
          if (GetWindSpeedLyrToggle.checked == true) {
            GetWindSpeedLyrToggle.checked = false;
            var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
          }       

          gl_attr.visible = GetStationLyrToggle.checked;
          if (gl_attr.visible == true) {
          var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("purple");
          var i = 0;;
            while(gl_attr.graphics[i] != null){
              gl_attr.graphics[i].setSymbol(tempSymbol);
              i++;
            }
            //document.getElementById('searchForFawn').style.display = 'block';
          }else{
            var b = 0;
            while(gl_attr.graphics[b] != null){
              gl_attr.graphics[b].setSymbol(null);
              b++;
            }
            //document.getElementById('searchForFawn').style.display = 'none';
          }
        })

        on(GetTempLyrToggle, "change", function(){
            map.removeLayer(pinpointLayer);

            // GetTempFdacswx.checked = false;
            // var b = 0;
            //   while(glAttrFdacswx.graphics[b] != null){
            //     glAttrFdacswx.graphics[b].setSymbol(null);
            //     b++;
            //   }
            //document.getElementById('searchForFadacs').style.display = 'none';
          if (GetStationLyrToggle.checked == true) {
              GetStationLyrToggle.checked = false;
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
          }
          
          if (GetWindSpeedLyrToggle.checked == true) {
              GetWindSpeedLyrToggle.checked = false;
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
          }

            gl_attr.visible = GetTempLyrToggle.checked;
            if (gl_attr.visible == true) {
            //var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("red");
            var i = 0;;
              while(gl_attr.graphics[i] != null){
                var t = new TextSymbol(gl_attr.graphics[i].attributes.temp10mF).setColor("purple").setHaloSize(20);
                gl_attr.graphics[i].setSymbol(t);
                i++;
              }
              //document.getElementById('searchForFawn').style.display = 'block';
            }else{
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
              //document.getElementById('searchForFawn').style.display = 'none';
            }
        });

        on(GetWindSpeedLyrToggle, "change", function(){
            map.removeLayer(pinpointLayer);

            // GetTempFdacswx.checked = false;
            // var b = 0;
            //   while(glAttrFdacswx.graphics[b] != null){
            //     glAttrFdacswx.graphics[b].setSymbol(null);
            //     b++;
            //   }
            //document.getElementById('searchForFadacs').style.display = 'none';
          if (GetStationLyrToggle.checked == true) {
              GetStationLyrToggle.checked = false;
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
          }
          
          if (GetTempLyrToggle.checked == true) {
              GetTempLyrToggle.checked = false;
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
          }

            gl_attr.visible = GetWindSpeedLyrToggle.checked;
            if (gl_attr.visible == true) {
            //var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("red");
            var i = 0;;
              while(gl_attr.graphics[i] != null){
                var t = new TextSymbol(gl_attr.graphics[i].attributes.windSpeed10mMph).setColor("purple").setHaloSize(20);
                gl_attr.graphics[i].setSymbol(t);
                i++;
              }
              //document.getElementById('searchForFawn').style.display = 'block';
            }else{
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
              //document.getElementById('searchForFawn').style.display = 'none';
            }
        });

        on(GetTempFdacswx, "change", function(){
            map.removeLayer(pinpointLayer);

            // GetTempLyrToggle.checked = false;
            // var b = 0;
            //   while(gl_attr.graphics[b] != null){
            //     gl_attr.graphics[b].setSymbol(null);
            //     b++;
            //   }
            //document.getElementById('searchForFawn').style.display = 'none';
            if (GetStationFdacswx.checked == true) {
                GetStationFdacswx.checked = false;
                var b = 0;
                while(glAttrFdacswx.graphics[b] != null){
                  glAttrFdacswx.graphics[b].setSymbol(null);
                  b++;
                }
            }
          
            if (GetWindSpeedFdacswx.checked == true) {
                GetWindSpeedFdacswx.checked = false;
                var b = 0;
                while(glAttrFdacswx.graphics[b] != null){
                  glAttrFdacswx.graphics[b].setSymbol(null);
                  b++;
                }
            }

            glAttrFdacswx.visible = GetTempFdacswx.checked;
            if (glAttrFdacswx.visible == true) {
            // var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("green");
            var i = 0;
              while(glAttrFdacswx.graphics[i] != null){
                var t = new TextSymbol(glAttrFdacswx.graphics[i].attributes.dry_bulb_air_temp).setColor("green").setHaloSize(20);
                glAttrFdacswx.graphics[i].setSymbol(t);
                i++;
              }
            }else{
              var b = 0;
              while(glAttrFdacswx.graphics[b] != null){
                glAttrFdacswx.graphics[b].setSymbol(null);
                b++;
              }
            } 
        });

        on(GetStationFdacswx, "change", function(){
            map.removeLayer(pinpointLayer);

            // GetTempLyrToggle.checked = false;
            // var b = 0;
            //   while(gl_attr.graphics[b] != null){
            //     gl_attr.graphics[b].setSymbol(null);
            //     b++;
            //   }
            //document.getElementById('searchForFawn').style.display = 'none';
            if (GetTempFdacswx.checked == true) {
                GetTempFdacswx.checked = false;
                var b = 0;
                while(glAttrFdacswx.graphics[b] != null){
                  glAttrFdacswx.graphics[b].setSymbol(null);
                  b++;
                }
            }
          
            if (GetWindSpeedFdacswx.checked == true) {
                GetWindSpeedFdacswx.checked = false;
                var b = 0;
                while(glAttrFdacswx.graphics[b] != null){
                  glAttrFdacswx.graphics[b].setSymbol(null);
                  b++;
                }
            }

            glAttrFdacswx.visible = GetStationFdacswx.checked;
            if (glAttrFdacswx.visible == true) {
            var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("green");
            var i = 0;
              while(glAttrFdacswx.graphics[i] != null){
                glAttrFdacswx.graphics[i].setSymbol(tempSymbol);
                i++;
              }
            }else{
              var b = 0;
              while(glAttrFdacswx.graphics[b] != null){
                glAttrFdacswx.graphics[b].setSymbol(null);
                b++;
              }
            } 
        });   

        on(GetWindSpeedFdacswx, "change", function(){
            map.removeLayer(pinpointLayer);

            // GetTempLyrToggle.checked = false;
            // var b = 0;
            //   while(gl_attr.graphics[b] != null){
            //     gl_attr.graphics[b].setSymbol(null);
            //     b++;
            //   }
            //document.getElementById('searchForFawn').style.display = 'none';
            if (GetTempFdacswx.checked == true) {
                GetTempFdacswx.checked = false;
                var b = 0;
                while(glAttrFdacswx.graphics[b] != null){
                  glAttrFdacswx.graphics[b].setSymbol(null);
                  b++;
                }
            }
          
            if (GetStationFdacswx.checked == true) {
                GetStationFdacswx.checked = false;
                var b = 0;
                while(glAttrFdacswx.graphics[b] != null){
                  glAttrFdacswx.graphics[b].setSymbol(null);
                  b++;
                }
            }

            glAttrFdacswx.visible = GetWindSpeedFdacswx.checked;
            if (glAttrFdacswx.visible == true) {
            // var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("green");
            var i = 0;
              while(glAttrFdacswx.graphics[i] != null){
                var t = new TextSymbol(glAttrFdacswx.graphics[i].attributes.wind_speed).setColor("green").setHaloSize(20);
                glAttrFdacswx.graphics[i].setSymbol(t);
                i++;
              }
            }else{
              var b = 0;
              while(glAttrFdacswx.graphics[b] != null){
                glAttrFdacswx.graphics[b].setSymbol(null);
                b++;
              }
            } 
        });   

        // function for drag and a little modify
        function draggable(){
          $(document).ready(function() {     
              $(".esriPopupWrapper").draggable({
                  handle: ".titlePane",
                  start: function() {
                  // 
                  }
              });
              // var width = $('#map').width();
              // var height = $('#map').height();
              

              // popup.resize(0.5 * width, 0.5 * height); // working
              // var point = new Point(-81.379234,28.53833); // location property is for map coordinates
              // popup.location = point;
              // console.log(popup);
              

              // popup.location
              $('.pointer').remove();  // also works !
              $('.outerPointer').remove();
              // var style = {
              //   'min-height': 0.5 * height
              // }
              // $('.contentPane').css(style); // sucessfully set up min-height style to popup
              // $(".esriPopupWrapper").css({"bottom": "null"});
          })
        }


        function draggableUsingDojo(){

            var handle = query(".titlePane", map.infoWindow.domNode)[0];
            var dnd = new Moveable(map.infoWindow.domNode, {
                handle: handle
            });
            on(dnd, 'FirstMove', function() {


            }.bind(this));
        }
        draggableUsingDojo();

        connect.connect(popup,"onShow",function(){
          var height;
          var width;
          $(document).ready(function() {
            width = $("#map").width();
            height = $('#map').height();
          })

          $(document).ready(function() {
            $(".esriPopupWrapper").resizable({
              start: function(e, ui) {
                // alert("123"); working
                document.getElementsByClassName("esriPopupWrapper")[0].style.minWidth = null;
              },
              resize: function(e,ui){
                height = $('.esriPopupWrapper').height();
                document.getElementsByClassName("sizer content")[0].style.height = height - 20 +"px";
                document.getElementsByClassName("contentPane")[0].style.height = height - 36 +"px";
              }
            });
          })

          popup.maximize();
          popup.resize(width * 0.6, height * 0.6);

          query(".restore").style("display","none");
          query('.zoomTo').style("display", "none");
          query('.sizer').style("width", "100%");
          
          query('.contentPane').style('max-height', 'none');
          query(".contentPane").style("height", "100%");
          
          query(".esriPopupWrapper").style({
            left : ( width - (width * 0.6) )/ 2 - 25 + "px",
            top : ( width - (width * 0.6) )/ 5 - 25 + "px",
          });
          document.getElementsByClassName("esriPopupWrapper")[0].style.minWidth = width * 0.6 + "px";
          document.getElementsByClassName("sizer")[2].style.display = "none"; // successfully delete the third sizer div
          // document.getElementsByClassName("sizer content")[0].style.height = "100%";


          
          
          // query('.sizer').style("height", "100%");

        });

        // connect.connect(popup,"onSelectionChange",function(){
        //   console.log("123");
        //   // var height;
        //   // var width;

        //   // $(document).ready(function() {
        //   //   width = $("#map").width();
        //   //   height = $('#map').height();
        //   // })
        //   // console.log("123");
        //   // width = width * 0.3;
        //   // height = height * 0.16;

        //   popup.maximize();
        //   // popup.resize(800,600);
        //   // query(".esriPopupWrapper").style({
        //   //   left : width + "px",
        //   //   top : height + "px"
        //   // });

        //   // query(".restore").style("display","none");
        // });


  });



















