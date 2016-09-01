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

      $.getJSON(url4 + stdID, function(data){
        console.log(data);
      });
          
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

              xAxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              },

              series: [{
                  data: [gl_attr.graphics[0].attributes["lng"], 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
              }]

          });


          
      }

})
