const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

let margin = {top: 30, right: 80, bottom: 80, left:80}
let widthChart = 1300 - margin.left - margin.right;
let heightChart = 570 - margin.top - margin.bottom;
const chartHandler = document.getElementById("chart");
let wrapperBox = document.getElementById("wrapper");

fetch(url)
  .then((resp)=> resp.json())
  .then(function(receivedData) {
      data = receivedData.data;
      let max = d3.max(data);
      let maxY = max[1];
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

      let tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("id","tooltip")
        .style("opacity", "0");

      bar.append("rect")
          .attr("class", "bar")
          .attr("data-date", (d) => d[0] )
          .attr("x", (d,i) => x(new Date(d[0])) )
          .attr("data-gdp", (d) => d[1])
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return heightChart - y(d[1]); })
          .attr("width", barWidth)
          .attr("id",function(d) { return data.indexOf(d)})
          .on("mouseover", function(d) {
            tooltip.style("opacity", "1")
              .style("top", (y(d[1])-50)>60 ? y(d[1])-50 + "px" : "0px" )
              .style("left",x(new Date(d[0])) + 60 + "px" )
              .html(d[0] + "<br />" + d[1] + " B$")
              .attr("data-date", d[0]);
          })
          .on("mouseout", function(d) {
              tooltip.style("opacity", "0" );
          });

      chart.append("g")
        .attr("class", "axis")
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + heightChart + ")")
        .call(xAxis);

      chart.append("g")
        .attr("class", "axis")
        .attr("id", "y-axis")
        .call(yAxis);

      chart.append('text').text('Units: Billions of Dollars')
                .attr("class","axis-description")
                .attr('x', 30)
                .attr('y', 210)
                .attr("transform", "rotate(-90 30 210)");

      chart.append('text').text('Gross Domestic Product, USA')
                .attr("id","title")
                .attr("class","title")
                .attr('x', 300)
                .attr('y', 20)
                .attr('fill', 'black');

      chart.append('text')
                .attr("class", "axis-description")
                .attr('x', 0)
                .attr('y', heightChart+50)
                .attr('fill', 'black')
                .append('tspan')
                .attr('x',30)
                .attr('dy',0)
                .text("Seasonally Adjusted Annual Rate. Notes: A Guide to the National Income and Product Accounts of the United States (NIPA)")
                .append('tspan')
                .attr('x',350)
                .attr('dy',25)
                .text("(http://www.bea.gov/national/pdf/nipaguid.pdf)");

      chart.append('defs').append('path').attr('id','signature')
                        .attr('d','M150 250 C 250 200 300 250 400 200')
                        .attr('fill','transparent');

      chart.append('use').attr('xlink:href', '#signature');

      chart.append('text')
                    .append('textPath').attr('xlink:href','#signature')
                        .text('created by Sebastian Sporek')
                  .attr('x', 150)
                  .attr('y', 150)
                  .attr("class", "sign");
  })
  .catch(function(error){
    console.log(error);
  });
