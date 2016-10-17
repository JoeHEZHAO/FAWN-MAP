$(document).ready(function() {
    addBarChart = function(evt,TagName, stdID){
        // close other tag and open graph
        openTag(evt, TagName);
        getChart('temp2mF_FAWN', 'temp2fts', 'temp2fts');
        getChart('rainFall2mInch_FAWN', 'rainFall', 'rainFall');
        getChart('wetBulbF_FAWN', 'wetBulbTemp', 'wetBulbTemp');

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
              rangeSelector : {
                // enabled : false
                buttons: [{
                    type: 'hour',
                    count: 4,
                    text: '1h'
                  }, {
                    type: 'hour',
                    count: 12,
                    text: '12h'
                  }, {
                    type: 'hour',
                    count: 24,
                    text: '24h'
                  }, {
                    type: 'day',
                    count: 1,
                    text: '1d'
                  }, {
                    type: 'day',
                    count: 3,
                    text: '3d'
                  }, {
                    type: 'day',
                    count : 7,
                    text: '7d'
                }]
              },
              title: {
                text: title
              },
              subtitle: {
                text: title
              },
              xAxis: {
                type: 'datetime',
              },
              yAxis: {
                  title: {
                    text: 'Graphic Weather Data (Temperature °F)'
                  }
              },
              series: [{
                  Name: 'FAWN',
                  data: chartData,
                  tooltip: {
                    valueDecimals: 2
                  }
              }],
            });

            if (title == 'temp2fts') {
              chart.yAxis[0].setExtremes(50,95);
            }else if(title == 'wetBulbTemp'){
              chart.yAxis[0].setExtremes(50,85);
            }else{
              chart.yAxis[0].setExtremes(-5,5);
            }
         });
    }

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
                // enabled : false
                buttons: [{
                    type: 'hour',
                    count: 4,
                    text: '1h'
                  }, {
                    type: 'hour',
                    count: 12,
                    text: '12h'
                  }, {
                    type: 'hour',
                    count: 24,
                    text: '24h'
                  }, {
                    type: 'day',
                    count: 3,
                    text: '3d'
                  }, {
                    type: 'day',
                    count : 7,
                    text: '7d'
                }]
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
