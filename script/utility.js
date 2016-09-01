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