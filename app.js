const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

let widthChart = 1200;
let heightChart = 500;

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData.data;
      console.log(data[0]);
      let maxX = d3.max(data);
      let max = maxX[1];
      console.log("maXx: ",d3.max(data), "max: ", maxX[1]);

      let y =  d3.scaleLinear().domain([0,max]).range([heightChart, 0]);

      let chart = d3.select(".chart")
            .attr("width",widthChart)
            .attr("height",heightChart);

      let barWidth = widthChart/data.length;

      let bar = chart.selectAll("g")
          .data(data)
          .enter().append("g")
          .attr("transform", function(d, i){ return "translate(" + i * barWidth + ",0)"; });


      bar.append("rect")
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return heightChart - y(d[1]); })
          .attr("width", barWidth-1);
          
  })
  .catch(function(error){
    console.log(error);
  });
