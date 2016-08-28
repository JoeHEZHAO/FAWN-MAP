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

          // var x = document.getElementsByClassName("esriPopupWrapper")[0];
          //     x.draggable({
          //       containment: "parent"
          //     });

          $(".esriPopupWrapper").draggable({
              // containment:"parent"
          })
            
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
