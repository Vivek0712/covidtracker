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
    var response = $.ajax({
  url: "https://api.covid19india.org/data.json",
  method: "get",
  dataType:'json',
  success:function(response){

    console.log("inside");
   
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
        
          if( response.statewise[state].delta.active !=  null) {
                if(response.statewise[state].delta.active > 0 ){
                   datastring += "<td>"+response.statewise[state].active+"<div class='deltainc'>["+response.statewise[state].delta.active+"]</div></td>";
                   
                }
                else if(response.statewise[state].delta.active < 0 ){
                   datastring += "<td>"+response.statewise[state].active+"<div class='deltadec'>["+response.statewise[state].delta.active+"]</div></td>";
                   
                }
                else{
                    datastring +="<td>"+response.statewise[state].active+"</td>";
                    
                }
              } 
                else {
                  datastring +="<td>-</td>"
                }

         
         
          if( response.statewise[state].delta.confirmed !=  null) {
                if(response.statewise[state].delta.confirmed > 0 ){
                   datastring += "<td>"+response.statewise[state].confirmed+"<div class='deltainc'>["+response.statewise[state].delta.confirmed+"]</div></td>";
                  
                }
                else if(response.statewise[state].delta.confirmed < 0 ){
                   datastring += "<td>"+response.statewise[state].confirmed+"<div class='deltadec'>["+response.statewise[state].delta.confirmed+"]</div></td>";
                   
                }
                else{
                    datastring +="<td>"+response.statewise[state].confirmed+"</td>";
                   
                }

              }
              else {
                datastring +="<td>-</td>"
              }
              if(response.statewise[state].delta.recovered !=null ) {

                if(response.statewise[state].delta.recovered > 0 ){
                   datastring += "<td>"+response.statewise[state].recovered+"<div class='deltadec'>["+response.statewise[state].delta.recovered+"]</div></td>";
                }
                
                else{
                    datastring +="<td>"+response.statewise[state].recovered+"</td>";
                    
                }
              }
              else {
                datastring +="<td>-</td>"
              }
              if(response.statewise[state].delta.deaths !=null ) {

                if(response.statewise[state].delta.deaths > 0 ){
                   datastring += "<td>"+response.statewise[state].deaths+"<div class='deltainc'>["+response.statewise[state].delta.deaths+"]</div></td>";
                   
                }
                
                else{
                    datastring +="<td>"+response.statewise[state].deaths+"</td>";
                   

                }

              }
               
              else {
                datastring +="<td>-</td>"
              }

              if(response.statewise[state].delta.lastupdatedtime !=null ) {
                datastring +="<td>"+response.statewise[state].lastupdatedtime+"</td></tr>";
              }
              else {
                datastring +="<td>-</td>"
              }


        }
        

        
    }

    // console.log(arr[0]);
	// console.log(datastring);
    $("#tablecontent").html(datastring);

    Highcharts.mapChart('container', {
    chart: {
        map: 'countries/in/custom/in-all-disputed'
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
    }],

    plotOptions:{
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