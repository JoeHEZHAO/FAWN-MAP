$(document).ready(function() {
    addBarChart = function(evt,TagName){
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

              // $(".esriPopupWrapper").css({"resize":"both"});

          $(".esriPopupWrapper").draggable({
              // containment:"parent"

              //once starting drag, the div disappear
                start: function() {
                // $(".esriPopup .outerPointer.left").remove();
                // $(".esriPopup .pointer.bottom").remove();
                $(".esriPopup .pointer").remove();
                $(".esriPopup .outerPointer").remove();
                // $(".esriPopupWrapper").css({"bottom": "null"});
                },
          });

          // divs inside does not have effect, try to figure it out.
          // $(".esriPopupWrapper").resizable({

          // })

          // $(".esriPopupWrapper").resizable();


          // $(".esriPopup .outerPointer.left").remove();

          // $(".esriPopup .pointer.bottomLeft").css({"bottom": "9px", "position": "relative"});
          // // works !!
          // $(".esriPopup .pointer.bottom").css({"bottom": "9px", "position": "relative"});
          // $(".esriPopup .outerPointer.left").css({"position": "relative"});



          document.getElementById(TagName).style.display = "block";
          evt.currentTarget.className += "active";
          
          var chart = new Highcharts.Chart({
              chart: {
                  renderTo: 'graph',
                  reflow: true,
                  // width: 300,
                  height: 200
              },

              xAxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              },

              series: [{
                  data: [gl_attr.graphics[0].attributes["Longitude"], 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
              }]

          });
      }

})
