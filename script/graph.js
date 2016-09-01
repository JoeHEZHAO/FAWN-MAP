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
      console.log(stdID);
      var temp = [];
      var date = [];
      $.getJSON(url4 + stdID, function(data){
        // temp.push(data.temp2fts[0][1]);
        // console.log(temp);
        // console.log(Date.parse("1472149800000"));
        // var d = new Date(1472287500000);
        // console.log(d);

        for (var i = 0; i < data.temp2fts.length; i++){
          temp.push(data.temp2fts[i][1]);
          // var d = new Date(data.temp2fts[i][0]);
          date.push(new Date(data.temp2fts[i][0]));
          console.log(temp);
        }


        var chart = new Highcharts.Chart({
              chart: {
                  renderTo: 'graph',
                  reflow: true,
                  height: 200
              },

              rangeSelector : {
                  buttons : [ {
                    type : 'minute',
                    count : 240,
                    text : '4h'
                  }, {
                    type : 'day',
                    count : 0.5,
                    text : '12h'
                  }, {
                    type : 'day',
                    count : 1,
                    text : '24h'
                  }, {
                    type : 'day',
                    count : 3,
                    text : '3d'
                  }, {
                    type : 'day',
                    count : 7,
                    text : '7d'
                  } ],
              },

              // xAxis: {
              //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
              //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              // },
              xAxis: {
                  // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                  categories : date
              },

              // series: [{
              //     data: [gl_attr.graphics[0].attributes["lng"], 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6]
              // }]
              series: [{
                  data: temp
              }]
          });
      });
          // console.log(temp);

          
      }

})
