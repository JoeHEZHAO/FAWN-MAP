    var map;
      require([
        "esri/map", 
      	"dojo/dom-construct",
        "esri/symbols/SimpleFillSymbol",
      	"esri/dijit/InfoWindow",
        "esri/dijit/Popup", 
        "esri/dijit/PopupTemplate",
      	"esri/InfoTemplate",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/TextSymbol",
        "esri/graphic", 
        "esri/layers/GraphicsLayer",
        "dojo/dom",
        "dojo/on",
        "dojo/ready",
        "dojo/query",
        "dojo/domReady!"
      ], function(
        Map, domConstruct, SimpleFillSymbol, InfoWindow, Popup, PopupTemplate, InfoTemplate, FeatureLayer, Point, SimpleMarkerSymbol,TextSymbol, Graphic, GraphicsLayer,dom,on,ready,query
      ) {

      var lastestDataNameFawn = ['stnName', 'stnID', 'dateTimes', 'isFresh','temp2mF','temp60cmF','temp10mF','soilTemp10cmF', 'rainFall2mInch','relHum2mPct','totalRad2mWm2','windSpeed10mMph','windDir10mDeg','dewPoint2mF','etInch','bp2m','xpos','ypos','elevation_feet','lng','lat','county','facility','wetBulbF','dailyMinTempF','dailyAvgTempF','dailyTotalRainInch','weeklyTotalRainInch','fcstMinTempF','weeklyStartDate','weeklyEndDate','fcstStartTime','fcstEndTime', 'nws_office','freeze_keyword', 'radar_keyword'];

      var lastestDataNameFdacswx = ['station_id', 'date_time', 'dry_bulb_air_temp', 'wet_bulb_temp', 'humidity', 'wind_speed', 'wind_direction', 'rainfall', 'latitude', 'longitude', 'total_rain_inche_since_installed', 'start_date_of_total_rain', 'station_name', 'vendor_name', 'time_zone', 'solar_radiation', 'et', 'solar_radiation_field_name', 'minutes_old', 'hasET', 'hasSolarRadiation', 'hasRemote', 'hasSoilMoisture', 'standard_date_time', 'fresh'];

        //var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
        var popup = new Popup({
            titleInBody: true,
            anchor: "auto",
            //popupWindow : false  // －－－determine if a window shoule be displayed
         }, domConstruct.create("div"));

        // create map and layers
        var map = new Map("map", {
          basemap: "streets",
          center: [-81.379234,28.53833],
          zoom: 8,
          infoWindow: popup
        });

        // PopupTemplate generate function
      var popupTemplateGenerate = {
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
             +  "<div id='temp2mF' style='overflow:hidden' value='graph'></div>" 
             +  "<div id='rainFall2mInch' style='overflow:hidden'></div>" 
             +  "<div id='wetBulbF' style='overflow:hidden'></div>" 
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

    var templateFawn = new PopupTemplate(popupTemplateGenerate.setContent(lastestDataNameFawn));

    var templateFdacswx = new PopupTemplate(popupTemplateGenerate.setContent(lastestDataNameFdacswx));

    gl_attr = new GraphicsLayer({
      infoTemplate: templateFawn,
       outFields:["*"],
    });

    glAttrFdacswx = new GraphicsLayer({
      infoTemplate: templateFdacswx,
       outFields:["*"],
    });

    loadDataGenerateLayerFawn.getDataCreateLayer(url6, gl_attr);
    loadDataGenerateLayerFdacswx.getDataCreateLayer(url2, glAttrFdacswx);
   
    popup.resize(600,400);
    map.addLayer(gl_attr);
    map.addLayer(glAttrFdacswx);

    // map.addLayer(glAttrFdacswx);
        // checkbox changing
        var GetStationLyrToggle = dom.byId("GetStation");
        var GetTempLyrToggle = dom.byId("GetTemp");
        var GetWindSpeedLyrToggle = dom.byId("GetWindSpeed");

        var GetTempFdacswx = dom.byId("GetTempFdacswx");

        // on(GetTempLyrToggle, "change", function(){
        //   // console.log(GetTempLyrToggle.checked);
        //   gl_temp.visible = GetTempLyrToggle.checked;
        //   if(gl_temp.visible == false){
        //     map.removeLayer(gl_temp);
        //   }
        //   else{
        //     map.addLayer(gl_temp);
        //   }
        // });

        on(GetTempLyrToggle, "change", function(){
            gl_attr.visible = GetTempLyrToggle.checked;
            if (gl_attr.visible == true) {
            var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("purple");
            var i = 0;
              while(gl_attr.graphics[i] != null){
                gl_attr.graphics[i].setSymbol(tempSymbol);
                i++;
              }
            }else{
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
            }
        });
        
        on(GetTempFdacswx, "change", function(){
            console.log(glAttrFdacswx.graphics[0].attributes);
            glAttrFdacswx.visible = GetTempFdacswx.checked;
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


        on(GetStationLyrToggle, "change", function(){
            gl_attr.visible = GetStationLyrToggle.checked;
            if (gl_attr.visible == true) {
            var tempSymbol = new SimpleMarkerSymbol().setSize(10).setColor("purple");
            var i = 0;
              while(gl_attr.graphics[i] != null){
                gl_attr.graphics[i].setSymbol(tempSymbol);
                i++;
              }
            }else{
              var b = 0;
              while(gl_attr.graphics[b] != null){
                gl_attr.graphics[b].setSymbol(null);
                b++;
              }
            }
        });


    // openMenu = function(evt, dataSource, glLayer, removeLayer){
    //     var i, tabcontent, tablinks;

    //     tabcontent = document.getElementsByClassName("side_menu_tabcontent");
    //     for(i=0; i < tabcontent.length;i++){
    //       tabcontent[i].style.display="none";
    //     }
    //     tablinks = document.getElementsByClassName("tablinks");
    //    for(i=0;i<tablinks.length;i++){
    //     tablinks[i].className = tablinks[i].className.replace(" active", "");
    //     }

    //     document.getElementById(dataSource).style.display= "block";
    //     evt.currentTarget.className += " active";

    //     map.removeLayer(removeLayer);
    //     map.addLayer(glLayer);
    // }

  });