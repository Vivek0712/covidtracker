
var forecast = {"confirmed": [7345, 7698, 8034, 8351, 8648, 8923, 9174, 9402], "recovered": [694, 759, 827, 898, 973, 1051, 1132, 1215]}
function convertdate(olddate) {
    monthmap = {"January" :1, "February" :2, "March":3,"April" : 4, "May" : 5, "June":6, "July":7,"August":8,"September":9,"October":10,"November":11,"December":12};
        dates = olddate.split(" ");
        return Date.UTC("2020",parseInt(dates[0]-1),monthmap[dates[1]]);
    }
    
    // var res = $.ajax({
    //     url: "https://github.com/Vivek0712/apis/blob/master/forecast.json",
    //     method: "get",
    //     dataType:'json',
    //     success:function(res){
    //         console.log(res['confirmed']);
    //     },
    //     error: function(XMLHttpRequest, textStatus, errorThrown) { 
    //         alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    //     }
    //    });

var res = $.ajax({
url: "https://api.covid19india.org/data.json",
method: "get",
dataType:'json',
success:function(res){

var listDate = [];
var totalconfirmed = [];
var totaldeceased = [];
var totalrecovered = [];
var dailyconfirmed = [];
var dailydeceased = [];
var dailyrecovered = [];
var forcastconfirmed = [];
var tomorrow = new Date();
var today =  new Date();
today.setDate(today.getDate());
var colors = Highcharts.getOptions().colors;
tomorrow.setDate(tomorrow.getDate() + 1);
    // console.log(res.cases_time_series);
    
    var days = res.cases_time_series.length;
   
    for (i = 0; i < days; i++) {
        totalconfirmed.push(parseInt(res.cases_time_series[i].totalconfirmed));
        totaldeceased.push(parseInt(res.cases_time_series[i].totaldeceased));
        totalrecovered.push(parseInt(res.cases_time_series[i].totalrecovered));
        dailyconfirmed.push(parseInt(res.cases_time_series[i].dailyconfirmed));
        dailydeceased.push(parseInt(res.cases_time_series[i].dailydeceased));
        dailyrecovered.push(parseInt(res.cases_time_series[i].dailyrecovered));
        listDate.push(convertdate(res.cases_time_series[i].date));
        forcastconfirmed.push('null');
  
    }
   totalconfirmed.push.apply(totalconfirmed, forecast['confirmed']);
   totalrecovered.push.apply(totalrecovered, forecast['recovered']);
    //listDate = listDate + ['06 April ','07 April ','08 April ','09 April ' ,'10 April ','11 April ','12 April ','13 April ','14 April',]
console.log(listDate);




////
Highcharts.chart('chartconfirmed', {

    title: {
        text: 'Total Confirmed Cases (31 Jan to '+today.toUTCString().split(',').slice(1,3)+') + Forecast'
    },

   
    yAxis: {
        title: {
            text: 'Cases'
        }
    },

    xAxis: {
        type: 'datetime'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        
            pointStart: Date.UTC(2020,00,31),

            dataLabels: {
                enabled: false
            },
            showInLegend: true
        
    },

    series: [{
        name : 'Total Confirmed Cases',
        type: 'areaspline',
        data: totalconfirmed,
        pointStart: Date.UTC(2020,00,31),
        pointIntervalUnit: 'day',
        zoneAxis: 'x',
        zones: [{
            className: 'Total Confirmed Cases',
            value:  today,
            color: '#FA8072'
        }, {
            className: 'Forecast',            
            color: '#CD5C5C'
        }]
    }],
    legend: {
        enabled: true,
        useHTML : true,
        labelFormatter: function() {
            return  "Forecast(1 week) from "+today+"" ;
        },
        borderWidth: 1
}, 
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});


/////

Highcharts.chart('chartrecovered', {

    title: {
        text: 'Total Recovered Cases (31 Jan to '+today.toUTCString().split(',').slice(1,3)+') + Forecast'
    },

   
    yAxis: {
        title: {
            text: 'Cases'
        }
    },

    xAxis: {
        type: 'datetime'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        
            pointStart: Date.UTC(2020,00,31),

            dataLabels: {
                enabled: false
            },
            showInLegend: true
        
    },

    series: [{
        name : 'Total Recovered Cases',
        type: 'areaspline',
        data: totalrecovered,
        pointStart: Date.UTC(2020,00,31),
        pointIntervalUnit: 'day',
        zoneAxis: 'x',
        zones: [{
            className: 'Total recovered Cases',
            value:  today,
            color: 'turquoise'
        }, {
            className: 'Forecast',            
            color: 'royalblue'
        }]
    }],
    legend: {
        enabled: true,
        useHTML : true,
        labelFormatter: function() {
            return  "Forecast(1 week) from "+today+"" ;
        },
        borderWidth: 1
}, 
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});


/////

},
 error: function(XMLHttpRequest, textStatus, errorThrown) { 
     alert("Status: " + textStatus); alert("Error: " + errorThrown); 
 }
});
    

