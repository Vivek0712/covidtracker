/*=========================================================================================
    File Name: column.js
    Description: Chartjs column chart
    ----------------------------------------------------------------------------------------
    Item Name: Chameleon Admin - Modern Bootstrap 4 WebApp & Dashboard HTML Template + UI Kit
    Version: 1.0
    Author: ThemeSelection
    Author URL: https://themeselection.com/
==========================================================================================*/

// Column chart
// ------------------------------
$(window).on("load", function(){

    function convertdateformat(oldDate){
        var old = oldDate.split(" ");
        var monthmap = {
            "January" : "01",
            "February" : "02",
            "March" : "03",
            "April" : "04",
            "May" : "05",
            "June" :  "06",
            "July" : "07",
            "August" : "08",
            "September" : "09",
            "October" : "10",
            "November" : "11",
            "December" : "12"
        };
       
        return "2020-"+monthmap[old[1]]+"-"+old[0]+"";
    }
    
    var listDate = [];
    var totalconfirmed = [];
    var totaldeceased = [];
    var totalrecovered = [];
    var dailyconfirmed = [];
    var dailydeceased = [];
    var dailyrecovered = [];
    function gendates(strDate,endDate){
        var dateMove = new Date(strDate);
    while (strDate < endDate){
      var strDate = dateMove.toISOString().slice(0,10);
       listDate.push(strDate);
      dateMove.setDate(dateMove.getDate()+1);
    };
    }


    var res = $.ajax({
        url: "https://api.covid19india.org/data.json",
        method: "get",
        dataType:'json',
        success:function(res){
        
            // console.log(res.cases_time_series);
            
            var days = res.cases_time_series.length;
            // var startDate = convertdateformat(res.cases_time_series[0].date);
            // var endDate = convertdateformat(res.cases_time_series[days-1].date);
            gendates('2020-03-25','2020-04-04');
            
            for (i = 0; i < days; i++) {
                totalconfirmed.push(res.cases_time_series[i].totalconfirmed);
                totaldeceased.push(res.cases_time_series[i].totaldeceased);
                totalrecovered.push(res.cases_time_series[i].totalrecovered);
                dailyconfirmed.push(res.cases_time_series[i].dailyconfirmed);
                dailydeceased.push(res.cases_time_series[i].dailydeceased);
                dailyrecovered.push(res.cases_time_series[i].dailyrecovered);
          
            }
        
        
            var chart_labels = listDate;
            var forecast_chart;
            console.log(chart_labels);

    //Get the context of the Chart canvas element we want to select
    var ctx = $("#column-chart");

    // Chart Options
    var chartOptions = {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each bar to be 2px wide and green
        elements: {
            rectangle: {
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                borderSkipped: 'bottom'
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        responsiveAnimationDuration:500,
        legend: {
            position: 'top',
        },
        scales: {
            xAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }],
            yAxes: [{
                display: true,
                gridLines: {
                    color: "#f3f3f3",
                    drawTicks: false,
                },
                scaleLabel: {
                    display: true,
                }
            }]
        },
        title: {
            display: true,
            text: 'India - Daily Cases'
        }
    };

    // Chart Data
    var chartData = {
        labels: listDate,
        data: {
            labels: chart_labels,
            datasets: [{
                
                label: "Confirmed Cases",
                fill: false,
              borderColor: "red",
              backgroundColor :'red',
                data:  dailyconfirmed,
            }, {
               
                label: "Recovered Cases",
                borderColor: "green",
                fillColor: "green",
                fill: false,
                backgroundColor :'green',
                data: dailyrecovered,
            },
            {
                
                label: "Deceased Cases",
                borderColor: "darkgrey",
                fill: false,
                backgroundColor :'grey',
                data: dailydeceased,
            }]
        },
    };

    var config = {
        type: 'bar',

        // Chart Options
        options : chartOptions,

        data : chartData
    };

    // Create the chart
    var lineChart = new Chart(ctx, config);

},
error: function(XMLHttpRequest, textStatus, errorThrown) { 
    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
}
});
});