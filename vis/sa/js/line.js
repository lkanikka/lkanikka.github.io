window.onload = function () {

//Line chart

var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    lw = 1250 - margin.left - margin.right,
    	lh = 300 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d %b '%y").parse;

var lx = d3.time.scale()
    	   .range([0, 1100]);

var ly = d3.scale.linear()
    	   .range([lh, 0]);

var linexAxis = d3.svg.axis()
		      .scale(lx)
  			  .orient("bottom").ticks(5).tickFormat(d3.time.format("%d %b '%y"))
          .ticks(25);

var lineyAxis = d3.svg.axis()
 		      .scale(ly)
  			  .orient("left");

var line = d3.svg.line()
    .x(function(d) { return lx(d.date); })
    .y(function(d) { return ly(d.count); });

var svg = d3.select("#line").append("svg")
    .attr("width", lw + margin.left + margin.right)
    .attr("height", 320 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 50 + "," + 50 + ")");

d3.csv("data/line.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.count = +d.count;
  });

  lx.domain(d3.extent(data, function(d) { return d.date; }));
  ly.domain(d3.extent(data, function(d) { return d.count; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(20," + lh + ")")
      .call(linexAxis)
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "-.6em")
        .attr("transform", function (d) {
              return "rotate(-90)";
        })

  svg.append("g")
      .attr("class", "y axis")
      .call(lineyAxis)

  svg.append("path")
      .datum(data)
      .attr("class", "linechart")
      .attr("d", line)
      .attr("transform", "translate(20,0)");

svg.selectAll("dot")    
        .data(data)         
    .enter().append("circle")                               
        .attr("r", 12)       
        .attr("cx",function(d) { return lx(d.date); })       
        .attr("cy",function(d) { return ly(d.count);})
         .attr("transform", "translate(20,0)")
        .attr("id","circle")
        .style("fill","#006784")

svg.selectAll("label")    
        .data(data)         
    .enter().append("text")
            .attr("text-anchor", "middle")
        .attr("x",function(d) { return lx(d.date); })       
        .attr("y",function(d) { return ly(d.count);})
        .attr("dy", ".2em")
         .attr("transform", "translate(20,0)")
        .attr("id","label")
        .text(function(d) {return d.count})
        .style("fill","#FFFFFF")

});

}// End of function