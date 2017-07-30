const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

let maxWidth = 800;
let barHeight = 10;

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData.data;
      console.log(data[0]);
      let maxX = d3.max(data);
      let max = maxX[1];
      console.log("maXx: ",d3.max(data), "max: ", maxX[1]);
      let x =  d3.scaleLinear().domain([0,max]).range([0,maxWidth]);

      let chart = d3.select(".chart")
            .attr("width",maxWidth)
            .attr("height", barHeight*data.length);

      let bar = chart.selectAll("g")
          .data(data)
          .enter().append("g")
          .attr("transform", function(d, i){ return "translate(0,"+i*barHeight+")"; });

      bar.append("rect")
          .attr("width",function(d){ return x(d[1]); })
          .attr("height", barHeight-1);

      bar.append("text")
          .attr("x", function(d){ return x(d[1])-3; })
          .attr("y", barHeight/2)
          .attr("dy", "0.35em")
          .text(function(d){ return d; });

  })
  .catch(function(error){
    console.log(error)
  });
