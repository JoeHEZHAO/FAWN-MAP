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

      var lastestDataName = ['stnName', 'stnID', 'dateTimes', 'isFresh','temp2mF','temp60cmF','temp10mF','soilTemp10cmF', 'rainFall2mInch','relHum2mPct','totalRad2mWm2','windSpeed10mMph','windDir10mDeg','dewPoint2mF','etInch','bp2m','xpos','ypos','elevation_feet','lng','lat','county','facility','wetBulbF','dailyMinTempF','dailyAvgTempF','dailyTotalRainInch','weeklyTotalRainInch','fcstMinTempF','weeklyStartDate','weeklyEndDate','fcstStartTime','fcstEndTime', 'nws_office','freeze_keyword', 'radar_keyword'];

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
          title : "<div class='title'><h1>StationName:  {stnName}</h1><br><h4 style='float:right; font:initial; width: 100%'>lng:{lng} ／ lat:{lat}</h4></div>",
          descriptionStart : "<ul class='tab'>" + 
            "<li><a class='tablinks' onclick='openTag(event,&#39;current&#39;)'>Current</a></li>" +
            "<li><a class='tablinks' onclick='addBarChart(event, &#39;graph&#39;, {stnID})'>Graph</a></li>" + 
            "<li><a class='tablinks' onclick='openForcast(event,&#39;forcast&#39;, {lng}, {lat})'>Prediction</a></li>" +
            "<li><a class='tablinks' onclick='openToolkit(event,&#39;Toolkit&#39;)'>Toolkit</a></li>" +
            "</ul>" + 
            "<div id='current' class='tabcontent' style='background-color: white; display: block'>",

          descriptionEnd: 
             "</div>" + 
             "<div id='graph' class='owl-carousel tabcontent'>"+
                "<div id='temp2mF' style='overflow:hidden' value='graph'></div>" +
                "<div id='rainFall2mInch' style='overflow:hidden'></div>" + 
                "<div id='wetBulbF' style='overflow:hidden'></div>" +
             "</div>" +
             "<div id='forcast' class='tabcontent' style='background-color: white; display: block' ></div>" +
             "<div id='Toolkit' class='tabcontent' style='background-color: white; display: block'>"

              + "<button type='button' style='display: block' onclick='window.open(&#39;http://uffawn-datareport.appspot.com/&#39;)' value='Cold Protection'>Cold Protection Toolkit</button>"
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

    var template = new PopupTemplate(popupTemplateGenerate.setContent(lastestDataName));


    var template_temp = new PopupTemplate({
        title: "Fawn Weather Temperature Info",
        description: "Latitude: {YCoord} <br/>" + "Longitude: {XCoord} <br/> Plant Name:{Plant}</br>"
        + "Temperature : {TEMP}",
        fieldInfos:[],
        mediaInfos:[]});

    var template_windspeed = new PopupTemplate({
        title: "Fawn Weather windSpeed info",
        description: "Latitude: {YCoord} <br/>" + "Longitude: {XCoord} <br/> WindSpeed:{windSpeed}" + 
        "<div><p>hellow world</p></div>",
        fieldInfos:[],
        mediaInfos:[]});

    gl_attr = new GraphicsLayer({
      infoTemplate: template,
       outFields:["*"],
    });

  	var gl_temp = new GraphicsLayer({
  		// infoTemplate: template_temp,
        outFields: ["*"]
  			  		});

  	var gl_station = new GraphicsLayer({
  		// infoTemplate: template,
        outFields: ["*"]
  	});

  	var gl_windspeed = new GraphicsLayer({
  		// infoTemplate: template_windspeed,
        outFields: ["*"]
  	});

    loadDataGenerateLayer.getDataCreateLayer(url6, gl_attr);
        
    popup.resize(600,400);
        
    map.addLayer(gl_attr);

        // checkbox changing
        var GetStationLyrToggle = dom.byId("GetStation");
        var GetTempLyrToggle = dom.byId("GetTemp");
        var GetWindSpeedLyrToggle = dom.byId("GetWindSpeed");
        var graphDiv = dom.byId("graph1");

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
      });