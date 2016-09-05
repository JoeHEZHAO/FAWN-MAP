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
      for( var i = 0; i < 3; i++){
          dateTime.push(data.time.startPeriodName[i]);
          tempLabel.push(data.time.tempLabel[i]);
          temperature.push(data.data.temperature[i]);
          weather.push(data.data.weather[i]);
          iconLink.push(data.data.iconLink[i]);
      }

      document.getElementById("forcast").innerHTML = 
      "<ul style='display:table; width: 100%; padding-left: 0px;'>"

        + "<li style='display:table-cell; width: 33%; padding: 20px 0px 20px 0px'>" 
        + "<span style='display:block; text-align:center'>" + dateTime[0] + "</span>"
        + "<span style='display:block; text-align:center'>" + tempLabel[0] + "</span>"
        + "<span style='display:block; text-align:center'>" + temperature[0] + "</span>"
        + "<span style='display:block; text-align:center'>" + weather[0] + "</span>"
        // + "<span style='display:block'>" + iconLink[0] + "</span>"
        + "<img style='display: block;margin-left: auto;margin-right: auto;' src=" + "'" + iconLink[0] + "'" + ">"
        + "</li>"

        + "<li style='display:table-cell; width: 33%; padding: 20px 0px 20px 0px'>" 
        + "<span style='display:block; text-align:center'>" + dateTime[1] + "</span>"
        + "<span style='display:block; text-align:center'>" + tempLabel[1] + "</span>"
        + "<span style='display:block; text-align:center'>" + temperature[1] + "</span>"
        + "<span style='display:block; text-align:center'>" + weather[1] + "</span>"
        // + "<span style='display:block'>" + iconLink[1] + "</span>"
        + "<img style='display: block;margin-left: auto;margin-right: auto;' src=" + "'" + iconLink[0] + "'" + ">"
        + "</li>"

        + "<li style='display:table-cell; width: 33%; padding: 20px 0px 20px 0px'>" 
        + "<span style='display:block; text-align:center'>" + dateTime[2] + "</span>"
        + "<span style='display:block; text-align:center'>" + tempLabel[2] + "</span>"
        + "<span style='display:block; text-align:center'>" + temperature[2] + "</span>"
        + "<span style='display:block; text-align:center'>" + weather[2] + "</span>"
        // + "<span style='display:block'>" + iconLink[2] + "</span>"
        + "<img style='display: block;margin-left: auto;margin-right: auto;' src=" + "'" + iconLink[0] + "'" + ">"
        + "</li>"

      + "</ul>";
        // window.open(url_forcast1 + lat + url_forcast2 + lng + url_forcast3);
    });

  }


  function openToolkit(evt, TagName){
     openTag(evt, TagName);
     // need grower and station from fdacs data


  }

  function coldp(grower, station){
    
  var COLD_PROTECTION_URL = 'http://fawn.ifas.ufl.edu/tools/coldp/cold_protection_2015.php';
  $.cookie('grower', grower,{expires : 7, path : "/"});
  $.cookie('station', station, {expires : 7, path : "/"});
  $.cookie('source', 'fdacs', {expires : 7, path : "/"});
  window.open("http://fawn.ifas.ufl.edu/tools/coldp/cold_protection_2015.php");

  }

    function myFunction(x){
          x.classList.toggle("change");
          document.getElementById("myDropdown").classList.toggle("show")
          //document.getElementById("map").classList.toggle("map_change");
          //document.getElementById("map_panel").classList.toggle("panel_change");
          document.getElementById("map_and_panel").classList.toggle("map_change");
    }

        // window.onclick = function(event){
        //   if(!event.target.matches('.menu_btn')){
        //   var dropdowns = document.getElementsByClassName('dropdown-content');
        //   var i;
        //   for(i=0;i<dropdowns.length;i++){
        //     var openDropDown = dropdowns[i];
        //   if(openDropDown.classList.contains("show")){
        //     openDropDown.classList.remove("show");
        //     }
        //   }
        // }
        // }


    function openMenu(evt, cityName){
      var i, tabcontent, tablinks;

      tabcontent = document.getElementsByClassName("side_menu_tabcontent");
      for(i=0; i < tabcontent.length;i++){
        tabcontent[i].style.display="none";
      }
      tablinks = document.getElementsByClassName("tablinks");
     for(i=0;i<tablinks.length;i++){
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      document.getElementById(cityName).style.display= "block";
      evt.currentTarget.className += " active";
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
  "esri/layers/GraphicsLayer",
  ], function(Point, SimpleMarkerSymbol, TextSymbol, Graphic, GraphicsLayer) {

  // loadData object  
    loadDataGenerateLayer = {
      getDataCreateLayer : function(url, graphLayer){
      $.getJSON(url, function(data){
          for (var i = 0; i < data.stnsWxData.length ;i++){
            graphLayer.add(addAttr(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i]));
          };

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
    }

  })