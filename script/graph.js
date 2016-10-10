$(document).ready(function() {
    addBarChart = function(evt,TagName, stdID){
        // close other tag and open graph
        openTag(evt, TagName);

        $(".esriPopupWrapper").draggable({
            // containment:"parent",
            //once starting drag, the div disappear
              start: function() {
              // $(".esriPopup .outerPointer.left").remove();
              // $(".esriPopup .pointer.bottom").remove();
              // $(".esriPopup .pointer").remove();
              // $(".esriPopup .outerPointer").remove();
              // $(".esriPopupWrapper").css({"bottom": "null"});

              $('.maximize').remove(); // it works !
  
              }
        });

          //divs inside does not have effect, try to figure it out.
          // $(".esriPopupWrapper").resizable({

          // })

          // $(".esriPopupWrapper").resizables();


          // $(".esriPopup .outerPointer.left").remove();

          // $(".esriPopup .pointer.bottomLeft").css({"bottom": "9px", "position": "relative"});
          // works !!
          // $(".esriPopup .pointer.bottom").css({"bottom": "9px", "position": "relative"});
          // $(".esriPopup .outerPointer.left").css({"position": "relative"});

          // console.log(url5_1 + stdID + url5_2);

      function getChart(renderDiv, target, title){
         var chartData = [];

         $.getJSON(url4 + stdID, function(data){
            for (var i = 0; i < data[target].length - 4; i++){
              chartData.push([data[target][i][0], data[target][i][1]]);
            };
            // console.log(chartData);
          var chart = new Highcharts.StockChart({
              chart: {
                  renderTo: renderDiv,
                  zoomType: 'x'
              },
              // rangeSelector : {
              //   selected : 0
              // },
              title: {
                text: title
              },
              subtitle: {
                text: title
              },
              xAxis: {
                type: 'datetime',
                // categories : date
              },
              yAxis: {
                  title: {
                    text: 'Temperature (°F)'
                  }
              },
              series: [{
                  Name: 'FAWN',
                  data: chartData,
                  tooltip: {
                    valueDecimals: 2
                  }
              }]
            });

            if (title == 'temp2fts') {
              chart.yAxis[0].setExtremes(65,95);
            }else if(title == 'wetBulbTemp'){
              chart.yAxis[0].setExtremes(65,85);
            }else{
              chart.yAxis[0].setExtremes(-5,5);
            }
         });
    }
    getChart('temp2mF_FAWN', 'temp2fts', 'temp2fts');
    getChart('rainFall2mInch_FAWN', 'rainFall', 'rainFall');
    getChart('wetBulbF_FAWN', 'wetBulbTemp', 'wetBulbTemp');

    $(".owl-carousel").owlCarousel({
          //  navigation : true, // Show next and prev buttons
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            mouseDrag: false
    });

  }

  addBarChartFdacswx = function(evt,TagName, stdID){
        // close other tag and open graph
      openTag(evt, TagName);

      function getChart(renderDiv, target, title){
         var chartData = [];
         $.getJSON(url3 + stdID + url3_1, function(data){
          // console.log(data[0][target]);
            for (var i = 0; i < data.length; i++){
              var float = parseFloat(data[i][target]);
              chartData.push([data[i].date_time, float]);
            };
            // console.log(chartData);
          var chart = new Highcharts.StockChart({
              chart: {
                  // renderTo: 'graph',
                  renderTo: renderDiv,
                  zoomType: 'x'
              },
              rangeSelector : {
                selected : 1
              },
              title: {
                text: title
              },
              subtitle: {
                text: title
              },
              xAxis: {
                type: 'datetime',
                // categories : date
              },
              yAxis: {
                  title: {
                    text: 'Temperature (°F)'
                  }
              },
              series: [{
                  Name: 'Fdacswx',
                  data: chartData,
                  tooltip: {
                    valueDecimals: 2
                  }
              }]
            });
         });
    }
    getChart('dryTemp_Fdacswx', 'dry_bulb_air_temp', 'dry_bulb_air_temp');
    getChart('rainFall_Fdacswx', 'rainfall', 'rainfall');
    getChart('wetTemp_Fdacswx', 'wet_bulb_temp', 'wet_bulb_temp');

    $(".owl-carousel").owlCarousel({
          //  navigation : true, // Show next and prev buttons
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true,
            mouseDrag: false
    });
  }
})
