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
        "dojo/domReady!"
      ], function(
        Map, domConstruct, SimpleFillSymbol, InfoWindow, Popup, PopupTemplate, InfoTemplate, FeatureLayer, Point, SimpleMarkerSymbol,TextSymbol, Graphic, GraphicsLayer,dom,on
      ) {
        //var fill = new SimpleFillSymbol("solid", null, new Color("#A4CE67"));
        var popup = new Popup({
            titleInBody: true,
            anchor: "auto",
            //popupWindow : false  // －－－determine if a window shoule be displayed
         }, domConstruct.create("div"));

        // create map and layers
        map = new Map("map", {
          basemap: "streets",
          center: [-81.379234,28.53833],
          zoom: 8,
          infoWindow: popup
        });

      var template = new PopupTemplate({
          title:"<div class='title'><h1>StationName:  {StationName}</h1><br><h4>StationID: <span style='color:blue'>{StationID}</span> <span style='float:right; font:initial'>lng:{Longitude} ／ lat:{Latitude}</span></h4></div>",
          description:  
          // two tags: current, graph
            "<ul class='tab'> <li><a class='tablinks' onclick='openTag(event,&#39;current&#39;)'>Current</a></li>" +
            // "<li><a class='tablinks' onclick='openTag(event, &#39;graph&#39;)' onclick='addChart()'>Graph</a></li></ul>" 
             "<li><a class='tablinks' onclick='addChart(event, &#39;graph&#39;)'>Graph</a></li></ul>" 
          + 
          // Current Div content
          "<div id='current' class='tabcontent'> <span>County: {County}</span> <span style='float:right'>windSpeed: {WindSpeed}</span><br><br><span>Temperature: {Temperature}</span> <span style='float:right'>Elevation: {Elevation}</span><br><br>" + "<span>Facility: {Facility}</span><br><br><span>Date: {Date}</span></div>" +

          // Graph div conent
            "<div id='graph' class='tabcontent' style='overflow:hidden'></div>",
            // "<div id='graph' class='tabcontent' onclick='addChart()'>" + "<script type='text/javascript'>google.charts.load('current', {'packages':['corechart']});google.charts.setOnLoadCallback(drawChart);function drawChart() {var data = new google.visualization.DataTable();data.addColumn('string', 'Topping');data.addColumn('number', 'Slices');data.addRows([['Mushrooms', 3],['Onions', 1],['Olives', 1],['Zucchini', 1],['Pepperoni', 2]]);var options = {'title':'How Much Pizza I Ate Last Night','width':400,'height':300};var chart = new google.visualization.PieChart(document.getElementById('graph'));chart.draw(data, options);}</script>"+ "</div>",
          fieldInfos:[],
          mediaInfos:[]
      });

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

  	var gl_temp = new GraphicsLayer({
  		infoTemplate: template_temp,
        outFields: ["*"]
  			  		});

  	var gl_station = new GraphicsLayer({
  		infoTemplate: template,
        outFields: ["*"]
  	});

  	var gl_windspeed = new GraphicsLayer({
  		infoTemplate: template_windspeed,
        outFields: ["*"]
  	});

        //get data from json
      $.getJSON("http://fawn.ifas.ufl.edu/controller.php/latestmapjson/", function(data){
          for (var i = 0; i < data.stnsWxData.length ;i++){
            // gl_temp.add(GetTemp(
              // data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].temp2mF, data.stnsWxData[i].stnName));
            gl_station.add(GetStation(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].stnName, data.stnsWxData[i].stnID, data.stnsWxData[i].temp2mF,data.stnsWxData[i].windSpeed10mMph,data.stnsWxData[i].county, data.stnsWxData[i].elevation_feet, data.stnsWxData[i].facility, data.stnsWxData[i].dateTimes));
            // gl_windspeed.add(GetWindSpeed(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].windSpeed10mMph));
            }
      })

        popup.resize(400,300);

        function GetStation(lng,lat,stnName,stnID,temp2mF,windSpeed10mMph,county,elevation_feet,facility,dateTimes)
        {
          var p = new Point(lng,lat);
          var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
          var attr = {"Longitude":lng,"Latitude":lat,"StationName":stnName,
          "StationID":stnID, "Temperature":temp2mF, "WindSpeed":windSpeed10mMph, "County":county, "Elevation":elevation_feet,"Facility":facility,"Date":dateTimes};
          var g = new Graphic(p,s,attr);
          return g;
        }

        function GetWindSpeed(x,y,z){
          var p = new Point(x,y);
          var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
          //var t = new TextSymbol("windSpeed: " + z + "10mMph").setColor("red");
          var attr = {"XCoord":x,"YCoord":y, "windSpeed": z};
          var g = new Graphic(p,s,attr);
          return g;
        }

        function GetTemp(x,y,z,n){
          var attr = {'longtitude': x, 'latitude': y};
          //var infoTemplate = new InfoTemplate("Locations","Latitude: ${latitude} <br/>Longitude: ${longtitude} <br/>");
          var p = new Point(x,y);
          var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
          //var t = new TextSymbol(n + " " + z + "\xB0").setColor("red");
          var attr = {"XCoord":x,"YCoord":y,"Plant":n, "TEMP":z};
          var g = new Graphic(p,s,attr);
          return g;
        };

        //map.addLayer(gl_temp);
        //map.addLayer(gl_station);
        // map.addLayer(gl_windspeed);
        //popup.set("Date", "07/11/2016");

        // checkbox changing
        var GetStationLyrToggle = dom.byId("GetStation");
        var GetTempLyrToggle = dom.byId("GetTemp");
        var GetWindSpeedLyrToggle = dom.byId("GetWindSpeed");

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

        on(GetStationLyrToggle, "change", function(){
            gl_station.visible = GetStationLyrToggle.checked;
            if (gl_station.visible == false) {
              map.removeLayer(gl_station);
            }else{
              map.addLayer(gl_station);
            }
        });

        // on(GetWindSpeedLyrToggle, "change", function(){
        // 	gl_windspeed.visible = GetWindSpeedLyrToggle.checked;
        // 	if (gl_windspeed.visible == false) 
        // 	{
        // 		map.removeLayer(gl_windspeed);
        // 	}
        // 	else
        // 	{
        // 		map.addLayer(gl_windspeed);
        // 	}
        // });

   //      function openTag(evt, TagName){
   //      	var i, tablecontent, tablinks;
   //      	tablecontent = document.getElementByClassName("tablecontent");
			// for ( i = 0; i < tablecontent.length; i++) {
   //      		tablecontent[i].style.display = "none";
   //      	}

   //      	tablinks = document.getElementByClassName("tablinks")
   //      	for ( i = 0; i < tablinks.length; i++) {
   //      		tablinks[i].className = tablinks[i].className.replace(" active", "");
   //      	}
   //      	console.log("sad");
   //      	document.getElementById(TagName).style.display = "block";
   //      	evt.currentTarget.className += "active";
   //      }


      });