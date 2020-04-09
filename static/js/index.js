var data = [
    ['in-py', 0],
    ['in-ld', 1],
    ['in-wb', 2],
    ['in-or', 3],
    ['in-br', 4],
    ['in-sk', 5],
    ['in-ct', 6],
    ['in-tn', 7],
    ['in-mp', 8],
    ['in-2984', 9],
    ['in-ga', 10],
    ['in-nl', 11],
    ['in-mn', 12],
    ['in-ar', 13],
    ['in-mz', 14],
    ['in-tr', 15],
    ['in-3464', 16],
    ['in-dl', 17],
    ['in-hr', 18],
    ['in-ch', 19],
    ['in-hp', 20],
    ['in-jk', 21],
    ['in-kl', 22],
    ['in-ka', 23],
    ['in-dn', 24],
    ['in-mh', 25],
    ['in-as', 26],
    ['in-ap', 27],
    ['in-ml', 28],
    ['in-pb', 29],
    ['in-rj', 30],
    ['in-up', 31],
    ['in-ut', 32],
    ['in-jh', 33]
];


var statecode = {"Andhra Pradesh":"IN-AP",
"Arunachal Pradesh":	"IN-AR",
"Assam":	"IN-AS",
"Bihar":	"IN-BR",
"Chhattisgarh" :	"IN-CT",
"Goa"	:"IN-GA",
"Gujarat"	:"IN-2984",
"Haryana":	"IN-HR",
"Himachal Pradesh":"IN-HP",
"Jharkhand":	"IN-JH",
"Karnataka":	"IN-KA",
"Kerala":	"IN-KL",
"Madhya Pradesh":	"IN-MP",
"Maharashtra"	:"IN-MH",
"Manipur"	:"IN-MN",
"Meghalaya"	:"IN-ML",
"Mizoram":	"IN-MZ",
"Nagaland":	"IN-NL",
"Odisha":	"IN-OR",
"Punjab":	"IN-PB",
"Rajasthan":	"IN-RJ",
"Sikkim":	"IN-SK",
"Tamil Nadu":	"IN-TN",
"Telangana" :"IN-TG",
"Tripura":	"IN-TR",
"Uttarakhand":	"IN-UT",
"Uttar Pradesh":	"IN-UP",
"West Bengal":	"IN-WB",
"Andaman and Nicobar Islands":	"IN-AN",
"Chandigarh":	"IN-CH",
"Dadra and Nagar Haveli":	"IN-DN",
"Daman and Diu":	"IN-DD",
"Delhi":	"IN-DL",
"Jammu and Kashmir":	"IN-JK",
"Ladakh":	"IN-LA",
"Lakshadweep":	"IN-LD",
"Puducherry":	"IN-PY"};
var arr =[];
statewiseinfo = {}
 datastring = "";
 var tc,tr,td,ta;
    var response = $.ajax({
  url: "https://api.covid19india.org/data.json",
  method: "get",
  dataType:'json',
  success:function(response){

    console.log("inside");
    $("#tc").text(response.cases_time_series[response.cases_time_series.length -1].totalconfirmed);
    $("#tr").text(response.cases_time_series[response.cases_time_series.length -1].totalrecovered);
    $("#td").text(response.cases_time_series[response.cases_time_series.length -1].totaldeceased);
    $("#ta").text(parseInt($("#tc").text()) - (parseInt($("#tr").text())+parseInt($("#td").text())));
    console.log(tc);
   
    for (var state in response.statewise){
       
        if(response.statewise[state].state!= "Total"){
            maparraydata = []
      stateinfo = {}
            datastring += "<tr><td>"+response.statewise[state].state+"</td>";
               maparraydata.push(statecode[response.statewise[state].state].toLowerCase());
         maparraydata.push(parseInt(response.statewise[state].active));
              arr.push(maparraydata);
        
        stateinfo["active"] = response.statewise[state].active;
        stateinfo["confirmed"] = response.statewise[state].confirmed;
        stateinfo["recovered"] = response.statewise[state].recovered;
        stateinfo["deaths"] = response.statewise[state].deaths;
        
        statewiseinfo[response.statewise[state].state] = stateinfo;
        
          
                // if(response.statewise[state].delta.active > 0 ){
                //    datastring += "<td>"+response.statewise[state].active+"<div class='deltainc'>["+response.statewise[state].delta.active+"]</div></td>";
                   
                // }
                // else if(response.statewise[state].delta.active < 0 ){
                //    datastring += "<td>"+response.statewise[state].active+"<div class='deltadec'>["+response.statewise[state].delta.active+"]</div></td>";
                   
                // }
                // else{



                
                    if(response.statewise[state].deltaconfirmed > 0 ){
                        datastring += "<td>"+response.statewise[state].confirmed+"<div class='deltainc'>["+response.statewise[state].deltaconfirmed+"]</div></td>";
                       
                     }
                     else if(response.statewise[state].deltaconfirmed < 0 ){
                        datastring += "<td>"+response.statewise[state].confirmed+"<div class='deltadec'>["+response.statewise[state].deltaconfirmed+"]</div></td>";
                        
                     }
                     else{
                         datastring +="<td>"+response.statewise[state].confirmed+"</td>";
                        
                     }
       
                    datastring +="<td>"+response.statewise[state].active+"</td>";
                    
                // }
            
  
         
         
          
            
           
  
                if(response.statewise[state].deltarecovered > 0 ){
                   datastring += "<td>"+response.statewise[state].recovered+"<div class='deltadec'>["+response.statewise[state].deltarecovered+"]</div></td>";
                }
                
                else{
                    datastring +="<td>"+response.statewise[state].recovered+"</td>";
                    
                }
              
           
             
  
                if(response.statewise[state].deltadeaths > 0 ){
                   datastring += "<td>"+response.statewise[state].deaths+"<div class='deltainc'>["+response.statewise[state].deltadeaths+"]</div></td>";
                   
                }
                
                else{
                    datastring +="<td>"+response.statewise[state].deaths+"</td>";
                   
  
                }
  
             
  
              
                
             
  
        }
        
  
        
    }

    // console.log(arr[0]);
	// console.log(datastring);
    $("#tablecontent").html(datastring);
    console.log(statewiseinfo);
    
// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data = [
    ['in-py', 0],
    ['in-ld', 1],
    ['in-wb', 2],
    ['in-or', 3],
    ['in-br', 4],
    ['in-sk', 5],
    ['in-ct', 6],
    ['in-tn', 7],
    ['in-mp', 8],
    ['in-2984', 9],
    ['in-ga', 10],
    ['in-nl', 11],
    ['in-mn', 12],
    ['in-ar', 13],
    ['in-mz', 14],
    ['in-tr', 15],
    ['in-3464', 16],
    ['in-dl', 17],
    ['in-hr', 18],
    ['in-ch', 19],
    ['in-hp', 20],
    ['in-jk', 21],
    ['in-kl', 22],
    ['in-ka', 23],
    ['in-dn', 24],
    ['in-mh', 25],
    ['in-as', 26],
    ['in-ap', 27],
    ['in-ml', 28],
    ['in-pb', 29],
    ['in-rj', 30],
    ['in-up', 31],
    ['in-ut', 32],
    ['in-jh', 33]
];

// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'countries/in/in-all'
    },

    title: {
        text: 'Active Cases in India'
    },


   
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: arr,
        name: 'Cases',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }],plotOptions:{
        series:{
            point:{
                events:{
                    mouseOver: function(){
          
            
            $(".statename").text(this.name);
             $("#active").text(statewiseinfo[this.name].active);
            $("#confirmed").text(statewiseinfo[this.name].confirmed );
              $("#recovered").text(statewiseinfo[this.name].recovered );
              $("#deaths").text(statewiseinfo[this.name].deaths);
              getdistrictdata(this.name);
             },
          
          
                  }
              }
          }
      },




});




  },
   error: function(XMLHttpRequest, textStatus, errorThrown) { 
       alert("Status: " + textStatus); alert("Error: " + errorThrown); 
   }
});


function getdistrictdata(statename){

// console.log("in");
var res = $.ajax({
url: "https://api.covid19india.org/state_district_wise.json",
method: "get",
dataType:'json',
success:function(res){



if(res[statename].districtData !== null)
{   var datastring="";
  for (var district in res[statename].districtData){
  datastring+="<tr><td scope='row' class='info'>"+district+"</td><td id='active' class='danger'> "+res[statename].districtData[district].confirmed+"</td></tr>";
     /*for (var key in response[statename].DistrictData[stat) {
    if (response[statename].DistrictData[state].hasOwnProperty(key)) {
        var val = response[statename].DistrictData[state].key.confirmed);
        console.log(val);
      }*/
}
         
}

$("#districtfill").html(datastring);
},
 error: function(XMLHttpRequest, textStatus, errorThrown) { 
     alert("Status: " + textStatus); alert("Error: " + errorThrown); 
 }
});


}