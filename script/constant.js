//Fdacs:
url1 = "http://fdacswx.fawn.ifas.ufl.edu/index.php/read/station/format/json";
url2 = "http://fdacswx.fawn.ifas.ufl.edu/index.php/read/latestobz/format/json";
url3 = "http://fdacswx.fawn.ifas.ufl.edu/index.php/read/sevendaytimestamp/station_id/1371069452397/format/json";

//FAWN:
url4 = "http://fawn.ifas.ufl.edu/controller.php/graphjson/data/150";
url5 = "http://fawn.ifas.ufl.edu/controller.php/week/obs/260;json?asText=1";
url6 = "http://fawn.ifas.ufl.edu/controller.php/latestmapjson/";

loadDataGenerateLayer = {

	addAttr : function addAttr(lng,lat,json)
        {
          var p = new Point(lng,lat);
          //var s = new SimpleMarkerSymbol().setSize(10).setColor("purple");
          var t = new TextSymbol(" ").setColor("red").setHaloSize(20);
          var attr = json;
          var g = new Graphic(p,t,attr);
          return g;
        };
        
	getDataCreateLayer : function(url, graphLayer){
		  $.getJSON(url, function(data){
          for (var i = 0; i < data.stnsWxData.length ;i++){
            graphLayer.add(addAttr(data.stnsWxData[i].lng, data.stnsWxData[i].lat, data.stnsWxData[i]));
          }
    })	
	}
}