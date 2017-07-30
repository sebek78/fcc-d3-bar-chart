const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData.data;
      console.log(data[0]);
      let maxX = d3.max(data);
      let max = maxX[1];
      console.log("max: ",d3.max(data), "maxX: ", maxX[1]);
      let x =  d3.scaleLinear().domain([0,max]).range([0,800]);
      const chart = d3.select(".chart");
      const bar = chart.selectAll("div");
      let barUpdate = bar.data(data);
      let barEnter = barUpdate.enter().append("div");
      barEnter.style("width", function(d) {return x(d[1])+"px"});
      barEnter.text(function(d) { return d; });
  })
  .catch(function(error){
    console.log(error)
  });
