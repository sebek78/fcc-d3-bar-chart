const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

let margin = {top: 20, right: 30, bottom: 60, left:60}
let widthChart = 1200 - margin.left - margin.right;
let heightChart = 400 - margin.top - margin.bottom;

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData.data;
      let max = d3.max(data);
      let maxY = max[1];
      //console.log("maXx: ",d3.max(data), "max: ", maxX[1]);
      let y =  d3.scaleLinear().domain([0,maxY]).range([heightChart, 0]);
      let minDate = new Date(data[0][0]);
      let maxDate = new Date(data[data.length-1][0]);

      let chart = d3.select(".chart")
            .attr("width",widthChart+margin.left+margin.right)
            .attr("height",heightChart+margin.top+margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      let barWidth = widthChart/data.length;

      let x = d3.scaleTime()
        .domain([minDate,maxDate])
        .range([0, widthChart]);
      let xAxis = d3.axisBottom(x);
      let yAxis = d3.axisLeft(y);

      let bar = chart.selectAll("g")
          .data(data)
          .enter().append("g")
          .attr("transform", function(d, i){ return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return heightChart - y(d[1]); })
          .attr("width", barWidth-1);

      chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightChart + ")")
        .call(xAxis);

      chart.append("g").attr("class", "y axis").call(yAxis);

      chart.append('text').text('Text Y')
                .attr('x', 25)
                .attr('y', 50)
                .attr('fill', 'black')
                .attr("transform", "rotate(-90 25 50)");

})
  .catch(function(error){
    console.log(error);
  });
