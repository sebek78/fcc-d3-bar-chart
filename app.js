const url ='https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
let data = [];

let margin = {top: 30, right: 80, bottom: 80, left:80}
let widthChart = 1300 - margin.left - margin.right;
let heightChart = 620 - margin.top - margin.bottom;
const chartHandler = document.getElementById("chart");
const wrapper = document.getElementById("wrapper");

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
          .attr("transform", function(d, i){ return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return heightChart - y(d[1]); })
          .attr("width", barWidth)
          .attr("id",function(d) { return data.indexOf(d)});

      chart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + heightChart + ")")
        .call(xAxis);

      chart.append("g").attr("class", "axis").call(yAxis);

      chart.append('text').text('Units: Billions of Dollars')
                .attr("class","axis-description")
                .attr('x', 30)
                .attr('y', 210)
                .attr("transform", "rotate(-90 30 210)");

      chart.append('text').text('Gross Domestic Product, USA')
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

      chart.append('text').text('created by Sebastian Sporek')
                  .attr('x', 150)
                  .attr('y', 150)
                  .attr("class", "sign");


      let tooltip = document.createElement("div");
      tooltip.classList.add('tooltip');
      tooltip.setAttribute("id", "tooltip");
      wrapper.appendChild(tooltip);

      chartHandler.addEventListener("mouseover", function(event){
        let ev = parseInt(event.target.id);
        if (!isNaN(ev)) {
          let top = event.layerY-90;
          let left = event.layerX-60;
          tooltip.innerHTML =(data[ev][0] +"<br />"+ data[ev][1]+" B$");
          tooltip.style.top = top.toString()+"px";
          tooltip.style.left = left.toString()+"px";
          tooltip.style.zIndex= "2";
        } else {
          tooltip.style.zIndex= "-2";
        }
      }, false);
})
  .catch(function(error){
    console.log(error);
  });
