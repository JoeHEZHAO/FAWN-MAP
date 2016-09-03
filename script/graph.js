$(document).ready(function() {
    addBarChart = function(evt,TagName, stdID){

        // close other tag and open graph
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


          // $(".esriPopupWrapper").draggable({
          //     // containment:"parent"

          //     //once starting drag, the div disappear
          //       start: function() {
          //       // $(".esriPopup .outerPointer.left").remove();
          //       // $(".esriPopup .pointer.bottom").remove();
          //       $(".esriPopup .pointer").remove();
          //       $(".esriPopup .outerPointer").remove();
          //       // $(".esriPopupWrapper").css({"bottom": "null"});
          //       },
          // });

          // divs inside does not have effect, try to figure it out.
          // $(".esriPopupWrapper").resizable({

          // })

          // $(".esriPopupWrapper").resizable();


          // $(".esriPopup .outerPointer.left").remove();

          // $(".esriPopup .pointer.bottomLeft").css({"bottom": "9px", "position": "relative"});
          // // works !!
          // $(".esriPopup .pointer.bottom").css({"bottom": "9px", "position": "relative"});
          // $(".esriPopup .outerPointer.left").css({"position": "relative"});
          // console.log(url5_1 + stdID + url5_2);


      // this url is not json, see url6 can work, so the problem lies on url5;
      // console.log(stdID);
      var temp = [];
      var date = [];

      $.getJSON(url4 + stdID, function(data){
        for (var i = 0; i < data.temp2fts.length; i++){
          // temp.push(data.temp2fts[i][1]);
          // var d = new Date(data.temp2fts[i][0]);
          // d = d.getUTCDate() + d.getUTCMonth() + d.getFullYeay() + d.getUTCHours()+ d.getUTCMinutes() + d.getUTCSeconds();
          // date.push(d);
          // // date.push(new Date(data.temp2fts[i][0]).toUTCString());
          // // console.log(d.getUTCMonth() + 1);
          // console.log(d.getUTCDate());
          temp.push([data.temp2fts[i][0], data.temp2fts[i][1]]);
        }


        var chart = new Highcharts.Chart({
              chart: {
                  // renderTo: 'graph',
                  renderTo: 'graph2',
                  zoomType: 'x'
              },
              title: {
                text: 'Temperature 2 feets'
              },
              subtitle: {
                text: 'temp2fts'
              },

              // rangeSelector : {
              //     buttons : [ {
              //       type : 'minute',
              //       count : 240,
              //       text : '4h'
              //     }, {
              //       type : 'day',
              //       count : 0.5,
              //       text : '12h'
              //     }, {
              //       type : 'day',
              //       count : 1,
              //       text : '24h'
              //     }, {
              //       type : 'day',
              //       count : 3,
              //       text : '3d'
              //     }, {
              //       type : 'day',
              //       count : 7,
              //       text : '7d'
              //     } ],
              // },

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
                  data: temp
              }]
          });

          chart.yAxis[0].setExtremes(65,95);
      });

    $(".owl-carousel").owlCarousel({
            navigation : true, // Show next and prev buttons
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true
    });
    
          // console.log(temp);   
      }

})
