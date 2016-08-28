// require([], function(){

  function addBarChart(evt,TagName){

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
      
      var chart = new Highcharts.Chart({
          chart: {
              renderTo: 'graph'
          },

          xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },

          series: [{
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }]

      });
  }
  
// })

