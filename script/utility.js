  function openTag(evt, TagName){
          var i, tablecontent, tablinks;

          tablecontent = document.getElementsByClassName("tabcontent");
          for ( i = 0; i < tablecontent.length; i++) {
            //console.log("asd");
            tablecontent[i].style.display = "none";
          }
          tablinks = document.getElementsByClassName("tablinks")
          for ( i = 0; i < tablinks.length; i++) {
            //console.log("asd");
            tablinks[i].className = tablinks[i].className.replace(" active", "");
          }
          document.getElementById(TagName).style.display = "block";
          evt.currentTarget.className += "active";
  }

  function openForcast(evt, TagName, lng, lat){
    openTag(evt, TagName);

    $.getJSON(url_forcast1 + lat + url_forcast2 + lng + url_forcast3, function(data) {
      var dateTime = [];
      var tempLabel = [];
      var temperature = [];
      var weather = [];
      var iconLink = [];
      var pop = [];
      var icon = [];
      var dir = ['/img/cloud_day/', '/img/cloud_night/', '/img/cloud_day/'];
      if(data.time.startPeriodName[0] == "Tonight" || data.time.startPeriodName[0] == "Overnight"){
        dir[0] = '/img/cloud_night/';
        dir[1] = '/img/cloud_day/';
        dir[2] = '/img/cloud_night/'
      }

      for( var i = 0; i < 3; i++){
          dateTime.push(data.time.startPeriodName[i]);
          tempLabel.push(data.time.tempLabel[i]);
          temperature.push(data.data.temperature[i]);
          weather.push(data.data.weather[i]);
          iconLink.push(data.data.iconLink[i]);
          pop.push(data.data.pop[i]);

          var index;
          if (weather[i].indexOf('then') != -1){
              index = weather[i].indexOf('then') - 1;
          }else if (weather[i].indexOf('and') != -1){
              index = weather[i].indexOf('and') - 1;
          }else{
              index = weather[i].length;
          }
          weather[i] = weather[i].substring(0,index);
          // console.log(weather[i].substring(0,index));

          if(pop[i]){
              icon[i] = weather[i].toLowerCase();
              if(icon.indexOf('thunderstorms') != -1){
                  icon[i] = dir[i] + "thunderstorm_" +pop[i] + ".png";
              }else{
              icon[i] = dir[i] + "rain_" + pop[i] + ".png";
              }
          }else{
              icon[i] = weather[i].toLowerCase();
              if(icon[i].indexOf('sprinkles') != -1 || icon[i].indexOf('drizzle') != -1){
                  icon[i] = dir[i] + "sprinkles.png";
              }else{
                  icon[i] = dir[i] + icon[i].replace(/ /g,"_") + ".png";
              }
        }
      }
      // console.log(icon);

      document.getElementById("forcast").innerHTML =
      "<ul style='display:table; width: 100%; padding-left: 0px;'>"

        + "<li style='display:table-cell; width: 33%; padding: 20px 0px 20px 0px'>"
        + "<span style='display:block; text-align:center'>" + dateTime[0] + "</span>"
        + "<span style='display:block; text-align:center'>" + tempLabel[0] + "</span>"
        + "<span style='display:block; text-align:center'>" + temperature[0] + "</span>"
        + "<span style='display:block; text-align:center'>" + weather[0] + "</span><br>"
        // + "<span style='display:block'>" + iconLink[0] + "</span>"
        + "<img style='display: block;margin-left: auto;margin-right: auto; width:60px; height:60px' src=" + "'." + icon[0] + "'" + ">"
        + "</li>"

        + "<li style='display:table-cell; width: 33%; padding: 20px 0px 20px 0px'>"
        + "<span style='display:block; text-align:center'>" + dateTime[1] + "</span>"
        + "<span style='display:block; text-align:center'>" + tempLabel[1] + "</span>"
        + "<span style='display:block; text-align:center'>" + temperature[1] + "</span>"
        + "<span style='display:block; text-align:center'>" + weather[1] + "</span><br>"
        // + "<span style='display:block'>" + iconLink[1] + "</span>"
        + "<img style='display: block;margin-left: auto;margin-right: auto; width:60px; height:60px' src=" + "'." + icon[0] + "'" + ">"
        + "</li>"

        + "<li style='display:table-cell; width: 33%; padding: 20px 0px 20px 0px'>"
        + "<span style='display:block; text-align:center'>" + dateTime[2] + "</span>"
        + "<span style='display:block; text-align:center'>" + tempLabel[2] + "</span>"
        + "<span style='display:block; text-align:center'>" + temperature[2] + "</span>"
        + "<span style='display:block; text-align:center'>" + weather[2] + "</span><br>"
        // + "<span style='display:block'>" + iconLink[2] + "</span>"
        + "<img style='display: block;margin-left: auto;margin-right: auto; width:60px;height:60px' src=" + "'." + icon[0] + "'" + ">"
        + "</li>"

      + "</ul>";
        // window.open(url_forcast1 + lat + url_forcast2 + lng + url_forcast3);
    });
  }

  function openToolkit(evt, TagName){
     openTag(evt, TagName);
     // need grower and station from fdacs data
  }
    
  function myFunction(x){
          x.classList.toggle("change");
          document.getElementById("myDropdown").classList.toggle("show")
          //document.getElementById("map").classList.toggle("map_change");
          //document.getElementById("map_panel").classList.toggle("panel_change");
          document.getElementById("map_and_panel").classList.toggle("map_change");
  }


    openMenu = function(evt, dataSource){
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("side_menu_tabcontent");
        for(i=0; i < tabcontent.length;i++){
          tabcontent[i].style.display="none";
        }
        tablinks = document.getElementsByClassName("tablinks");
       for(i=0;i<tablinks.length;i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(dataSource).style.display= "block";
        evt.currentTarget.className += " active";
        // map.removeLayer(removeLayer);
        // map.addLayer(glLayer);
    }

    $(document).ready(function() {
        $("#draggable").draggable({
          containment: "parent"
        });
    });

require([
  "esri/geometry/Point",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/TextSymbol",
  "esri/graphic",
  "esri/layers/FeatureLayer",
  "esri/layers/GraphicsLayer",
  ], function(Point, SimpleMarkerSymbol, TextSymbol, Graphic, FeatureLayer, GraphicsLayer) {

  // loadData object
   loadDataGenerateLayerFdacswx = {
      getDataCreateLayer : function(url, graphLayer){
        $.getJSON(url, function(data){
            for (var i = 0; i < data.length ;i++){
              var json = data[i];
              json["grower_name"]  = FdacswxStdGrowerFinder[data[i].station_name];
              graphLayer.add(addAttr(data[i].longitude, data[i].latitude, json));
            };
        function addAttr(lng,lat,json)
        {
          var p = new Point(lng,lat);
          var t = new TextSymbol(" ").setColor("green").setHaloSize(20);
          var attr = json;
          var g = new Graphic(p,t,attr);
          return g;
        }
          })
      }
    }

  loadDataGenerateLayerFawn = {
      getDataCreateLayer : function(url, graphLayer){
        $.getJSON(url, function(data){

            for (var i = 0; i < data.stnsWxData.length ;i++)
            {
              graphLayer.add(addAttr(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i]));
              // console.log("'" + data.stnsWxData[i].stnName + "'");
            };
            // console.log(stnName);
            function addAttr(lng,lat,json)
            {
              var p = new Point(lng,lat);
                //var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
              var t = new TextSymbol(" ").setColor("red").setHaloSize(20);
              var attr = json;
              var g = new Graphic(p,t,attr);
              return g;
            }
        })
      }
  };
  })
