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

      var lastestDataName = ['stnName', 
      'stnID', 
      'dateTimes', 
      'isFresh',
      'temp2mF',
      'temp60cmF','temp10mF','soilTemp10cmF', 'rainFall2mInch','relHum2mPct','totalRad2mWm2','windSpeed10mMph','windDir10mDeg','dewPoint2mF','etInch','bp2m','xpos','ypos','elevation_feet','lng','lat','county','facility','wetBulbF','dailyMinTempF','dailyAvgTempF','dailyTotalRainInch','weeklyTotalRainInch','fcstMinTempF','weeklyStartDate','weeklyEndDate','fcstStartTime','fcstEndTime', 'nws_office','freeze_keyword', 'radar_keyword'];





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
          title : "<div class='title'><h1>StationName:  {StationName}</h1><br><h4>StationID: <span style='color:blue'>{stnID}</span> <span style='float:right; font:initial'>lng:{lng} ／ lat:{lat}</span></h4></div>",
          descriptionStart : "<ul class='tab'>" + 
            "<li><a class='tablinks' onclick='openTag(event,&#39;current&#39;)'>Current</a></li>" +
            "<li><a class='tablinks' onclick='addBarChart(event, &#39;graph&#39;)'>Graph</a></li></ul>" + 
            "<div id='current' class='tabcontent' style='background-color: white; display: block'>",

          descriptionEnd: "</div><div id='graph' class='tabcontent' style='overflow:hidden' value='graph'></div>",

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

      // var json = {
      //     title:"<div class='title'><h1>StationName:  {StationName}</h1><br><h4>StationID: <span style='color:blue'>{StationID}</span> <span style='float:right; font:initial'>lng:{Longitude} ／ lat:{Latitude}</span></h4></div>",
      //     description:  
      //     // two tags: current, graph
      //       "<ul class='tab'>" + 
      //       "<li><a class='tablinks' onclick='openTag(event,&#39;current&#39;)'>Current</a></li>" +
      //       // "<li><a class='tablinks' onclick='openTag(event, &#39;graph&#39;)' onclick='addChart()'>Graph</a></li></ul>" 
      //       "<li><a class='tablinks' onclick='addBarChart(event, &#39;graph&#39;)'>Graph</a></li></ul>" 
            
      //       // "<li><a id='graph1' class='tablinks'>Graph</a></li></ul>" 
      //       // + "<script type='text/javascript' src='./script/graph.js'></script>"
      //     + 
      //     // Current Div content start
      //     "<div id='current' class='tabcontent' style='background-color: white; display: block'>" +
      //     "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>County:</span><span style='float:right; color: #999'>{County}</span><br><br></div>" + 
      //     "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>windSpeed:</span><span style='float:right; color: #999'>{WindSpeed}</span><br><br></div>" + 
      //     "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Temperature:</span> <span style='float:right; color: #999'>{Temperature}</span><br><br></div>" + 
      //     "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Elevation:</span> <span style='float:right; color: #999'>{Elevation}</span><br><br></div>" + 
      //     "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Facility:</span> <span style='float:right; color: #999'>{Facility}</span><br><br></div>" + 
      //     "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Date:</span> <span style='float:right; color: #999'>{Date}</span><br><br></div>" + 
      //     // "<div style='border-bottom: 1px dotted #e9e9e9'><span> </span> <span style='float:right'> </span><br><br></div>" + 
      //     // "<div style='border-bottom: 1px dotted #e9e9e9'><span> </span> <span style='float:right'> </span><br><br></div>" + 
      //     // "<div style='border-bottom: 1px dotted #e9e9e9'><span> </span> <span style='float:right'> </span><br><br></div>" +  
      //     // "<div style='border-bottom: 1px dotted #e9e9e9'> <span> </span><br><br></div>" + 
      //     // Current Div end
      //     "</div>" +


      //     // Graph div conent start
      //       "<div id='graph' class='tabcontent' style='overflow:hidden' value='graph'></div>",
      //     fieldInfos:[],
      //     mediaInfos:[]
      // }

      // clearly will overlay the old one, so won't work
      // json.description = "<div style='border-bottom: 1px dotted #e9e9e9'><span> sadasd</span> <span style='float:right'> asdas</span><br><br></div>";

    // var json = popupTemplateGenerate.setContent("<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>County:</span><span style='float:right; color: #999'>{County}</span><br><br></div>" + 
    //       "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>windSpeed:</span><span style='float:right; color: #999'>{WindSpeed}</span><br><br></div>" + 
    //       "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Temperature:</span> <span style='float:right; color: #999'>{Temperature}</span><br><br></div>" + 
    //       "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Elevation:</span> <span style='float:right; color: #999'>{Elevation}</span><br><br></div>" + 
    //       "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Facility:</span> <span style='float:right; color: #999'>{Facility}</span><br><br></div>" + 
    //       "<div style='border-bottom: 1px dotted #e9e9e9'><span style='font-weight:700'>Date:</span> <span style='float:right; color: #999'>{Date}</span><br><br></div>");

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

    var attrName = {
        json: { },
        getJSON : function(data){
          this.json = data;
        }
    };
    
    nameArray = [];

    //get data from json
    $.getJSON("http://fawn.ifas.ufl.edu/controller.php/latestmapjson/", function(data){
          
          for(var i in data.stnsWxData[0]){
            nameArray.push(i);
          }

          for (var i = 0; i < data.stnsWxData.length ;i++){
            // for(var j in data.stnsWxData[i]){
            //   gl_attr.add(addAttr())
            // }
            // gl_attr.add(addAttr(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].stnName, data.stnsWxData[i].stnID, data.stnsWxData[i].temp2mF,data.stnsWxData[i].windSpeed10mMph,data.stnsWxData[i].county, data.stnsWxData[i].elevation_feet, data.stnsWxData[i].facility, data.stnsWxData[i].dateTimes));
            gl_attr.add(addAttr(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i]));

            gl_temp.add(GetTemp(
              data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].temp2mF, data.stnsWxData[i].stnName));

            gl_station.add(GetStation(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].stnName, data.stnsWxData[i].stnID, data.stnsWxData[i].temp2mF,data.stnsWxData[i].windSpeed10mMph,data.stnsWxData[i].county, data.stnsWxData[i].elevation_feet, data.stnsWxData[i].facility, data.stnsWxData[i].dateTimes));

            // gl_windspeed.add(GetWindSpeed(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i].windSpeed10mMph));
          }
        // console.log(nameArray); 
    })

    // console.log(nameArray); 


    // var json = popupTemplateGenerate.setContent(nameArray);

        popup.resize(450,350);

        // function addAttr(lng,lat,stnName,stnID,temp2mF,windSpeed10mMph,county,elevation_feet,facility,dateTimes)
        // {
        //   var p = new Point(lng,lat);
        //   //var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
        //   var t = new TextSymbol(" ").setColor("red").setHaloSize(20);
        //   var attr = {"Longitude":lng,"Latitude":lat,"StationName":stnName,
        //   "StationID":stnID, "Temperature":temp2mF, "WindSpeed":windSpeed10mMph, "County":county, "Elevation":elevation_feet,"Facility":facility,"Date":dateTimes};
        //   var g = new Graphic(p,t,attr);
        //   return g;
        // }

        function addAttr(lng,lat,json)
        {
          var p = new Point(lng,lat);
          //var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
          var t = new TextSymbol(" ").setColor("red").setHaloSize(20);
          // var attr = {"lng":lng,"lat":lat,"stnName":stnName,
          // "stnID":stnID, "temp2mF":temp2mF, "windSpeed10mMph":windSpeed10mMph, "county":county, "elevation_feet":elevation_feet,"facility":facility,"dateTimes":dateTimes};
          // var g = new Graphic(p,t,attr);
          var attr = json;
          var g = new Graphic(p,t,attr);
          return g;
        }

        function GetStation(lng,lat,stnName,stnID,temp2mF,windSpeed10mMph,county,elevation_feet,facility,dateTimes)
        {
          var p = new Point(lng,lat);
          var s = new SimpleMarkerSymbol().setSize(13).setColor("purple");
          var t = new TextSymbol(stnName).setColor("red");
          // var attr = {"Longitude":lng,"Latitude":lat,"StationName":stnName,
          // "StationID":stnID, "Temperature":temp2mF, "WindSpeed":windSpeed10mMph, "County":county, "Elevation":elevation_feet,"Facility":facility,"Date":dateTimes};
          var g = new Graphic(p,s);
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
          var t = new TextSymbol(n + " " + z + "\xB0").setColor("red");
          //var attr = {"XCoord":x,"YCoord":y,"Plant":n, "TEMP":z};
          var g = new Graphic(p,t);
          return g;
        };

        map.addLayer(gl_attr);
        //map.addLayer(gl_temp);
        //map.addLayer(gl_station);
        // map.addLayer(gl_windspeed);
        //popup.set("Date", "07/11/2016");

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
          //console.log(GetTempLyrToggle.checked);
          //console.log(gl_attr.graphics[0].attributes["Longitude"]);
          //console.log("yes");
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


          //   var chart = new Highcharts.Chart({
          //     chart: {
          //         renderTo: 'map',
          //         // width: 300,
          //         // height: 250
          //     },

          //     xAxis: {
          //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
          //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          //     },

          //     series: [{
          //         data: [gl_attr.graphics[0].attributes["Longitude"], 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          //     }]

          // });
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

  //   on(graphDiv, "click", function(){
  //     // var i, tablecontent, tablinks;

  //     // tablecontent = document.getElementsByClassName("tabcontent");
  //     // for ( i = 0; i < tablecontent.length; i++) {
  //     //       //console.log("asd");
  //     //   tablecontent[i].style.display = "none";
  //     // }
  //     // tablinks = document.getElementsByClassName("tablinks")
  //     // for ( i = 0; i < tablinks.length; i++) {
  //     //       //console.log("asd");
  //     //   tablinks[i].className = tablinks[i].className.replace(" active", "");
  //     // }

  //     // // document.getElementById(TagName).style.display = "block";
  //     // document.getElementById("graph").style.display = "block";
  //     // // e.currentTarget.className += "active";
      
  //     // var chart = new Highcharts.Chart({
  //     //     chart: {
  //     //         renderTo: 'graph'
  //     //     },

  //     //     xAxis: {
  //     //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  //     //             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //     //     },

  //     //     series: [{
  //     //         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  //     //     }]

  //     // });
  //     var x = document.getElementById("map");
  //     x.innerHTML = "hello world";

  // });

// $(document).ready(function() {
  // $("#GetTemp").click(function() {
  //   // $("#map").text("hello world");
  //   $("#map").html("<b>Hello world!</b>");
  // })
   // })

  

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


   // solution number 1
// addBarChart = function(evt,TagName){

//     var i, tablecontent, tablinks;

//           tablecontent = document.getElementsByClassName("tabcontent");
//           for ( i = 0; i < tablecontent.length; i++) {
//             //console.log("asd");
//             tablecontent[i].style.display = "none";
//           }
//           tablinks = document.getElementsByClassName("tablinks")
//           for ( i = 0; i < tablinks.length; i++) {
//             //console.log("asd");
//             tablinks[i].className = tablinks[i].className.replace(" active", "");
//           }

//         $(document).ready(function() {
//             var x = document.getElementsByClassName("esriPopupWrapper")[0];
//             x.draggable({
//               containment: "parent"
//             });
//         })

//       document.getElementById(TagName).style.display = "block";
//       evt.currentTarget.className += "active";
      
//       var chart = new Highcharts.Chart({
//           chart: {
//               renderTo: 'graph'
//           },

//           xAxis: {
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//           },

//           series: [{
//               data: [gl_attr.graphics[0].attributes["Longitude"], 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//           }]

//       });
//   }

  // solution nubmer 2
//   ready(function() {
//         var click_graph = dojo.query(".tablinks")[1];
//         on(click_graph, "click", addBarChart);

//     function addBarChart(evt){
//           var i, tablecontent, tablinks;

//           tablecontent = document.getElementsByClassName("tabcontent");
//           for ( i = 0; i < tablecontent.length; i++) {
//             //console.log("asd");
//             tablecontent[i].style.display = "none";
//           }
//           tablinks = document.getElementsByClassName("tablinks")
//           for ( i = 0; i < tablinks.length; i++) {
//             //console.log("asd");
//             tablinks[i].className = tablinks[i].className.replace(" active", "");
//           }

//       document.getElementById("graph").style.display = "block";
//       evt.currentTarget.className += "active";
      
//       var chart = new Highcharts.Chart({
//           chart: {
//               renderTo: 'graph'
//           },

//           xAxis: {
//               categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
//                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//           },

//           series: [{
//               data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//           }]

//       });
//         }

//     });


})

  // function addBarChart(evt,TagName){

  //   var i, tablecontent, tablinks;

  //         tablecontent = document.getElementsByClassName("tabcontent");
  //         for ( i = 0; i < tablecontent.length; i++) {
  //           //console.log("asd");
  //           tablecontent[i].style.display = "none";
  //         }
  //         tablinks = document.getElementsByClassName("tablinks")
  //         for ( i = 0; i < tablinks.length; i++) {
  //           //console.log("asd");
  //           tablinks[i].className = tablinks[i].className.replace(" active", "");
  //         }

  //     document.getElementById(TagName).style.display = "block";
  //     evt.currentTarget.className += "active";
      
  //     var chart = new Highcharts.Chart({
  //         chart: {
  //             renderTo: 'graph'
  //         },

  //         xAxis: {
  //             categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
  //                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //         },

  //         series: [{
  //             data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  //         }]

  //     });
  // }