window.onload = function () {

// Draw bar chart - monthly

width = 1200
height = 280

var x = d3.scale.ordinal()
          .rangeRoundBands([0, 250], .1);

var y = d3.scale.linear().range([230, 0]);

var bars = d3.select("#bars").append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(20,20)");

d3.csv("data/bars.csv",function(error, data) {

var baryAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10)
              .tickSize(-120, 0, 0)

	var headers = d3.keys(data[0]);
	var numberOfRows = data.length;
	var barPadding = numberOfRows;

    data.forEach(function(d) {
        d.title1 = d[headers[1]];
        d.title2 = d[headers[2]];
        d.title3 = d[headers[3]];
        d.title4 = d[headers[4]];
        d.title5 = d[headers[5]];
        d.title6 = d[headers[6]];
        d.title7 = d[headers[7]];
    });

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return Math.max(d.title1,d.title2,d.title3,d.title4,d.title5,d.title6,d.title7); })]);

  bars.append("g")
      .attr("class", "axis")
      .call(baryAxis)
            .attr("transform", "translate(30,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+30
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title1); })
      .attr("height", function(d) { return 230 - y(d.title1); });

bars.append("text")
      .data(data)
        .attr("x", 90)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(function(d) { return  headers[1]})

/* all subsequent bars*/

var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10)
              .tickSize(-120, 0, 0)
              .tickFormat("")

  data.forEach(function(d) {
        d.title2 = d[headers[2]];
    });

  bars.append("g")
      .attr("class", "axis")
      .attr("id","rest")
      .call(yAxis)
            .attr("transform", "translate(180,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+180;
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title2); })
      .attr("height", function(d) { return 230 - y(d.title2); });

bars.append("text")
        .attr("x", 240)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(headers[2]);

data.forEach(function(d) {
        d.title3 = d[headers[3]];
    });

  bars.append("g")
      .attr("class", "axis")
      .attr("id","rest")
      .call(yAxis)
            .attr("transform", "translate(330,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar3")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+330;
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title3); })
      .attr("height", function(d) { return 230 - y(d.title3); });

bars.append("text")
        .attr("x", 390)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(headers[3]);

  data.forEach(function(d) {
        d.title4 = d[headers[4]];
    });

    bars.append("g")
      .attr("class", "axis")
      .attr("id","rest")
      .call(yAxis)
            .attr("transform", "translate(480,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar4")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+480;
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title4); })
      .attr("height", function(d) { return 230 - y(d.title4); });

bars.append("text")
        .attr("x", 540)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(headers[4]);

  data.forEach(function(d) {
        d.title5 = d[headers[5]];
    });

    bars.append("g")
      .attr("class", "axis")
      .attr("id","rest")
      .call(yAxis)
            .attr("transform", "translate(630,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar5")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+630;
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title5); })
      .attr("height", function(d) { return 230 - y(d.title5); });

bars.append("text")
        .attr("x", 690)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(headers[5]);

  data.forEach(function(d) {
        d.title6 = d[headers[6]];
    });

    bars.append("g")
      .attr("class", "axis")
      .attr("id","rest")
      .call(yAxis)
            .attr("transform", "translate(780,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar6")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+780;
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title6); })
      .attr("height", function(d) { return 230 - y(d.title6); });

bars.append("text")
        .attr("x", 840)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(headers[6]);

data.forEach(function(d) {
        d.title7 = d[headers[7]];
    });
 
    bars.append("g")
      .attr("class", "axis")
      .attr("id","rest")
      .call(yAxis)
            .attr("transform", "translate(930,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar7")
      .attr("x", function(d, i) {
			   		return i * (121 / numberOfRows)+930;
			   })
      .attr("width", 100/numberOfRows)
      .attr("y", function(d) { return y(d.title7); })
      .attr("height", function(d) { return 230 - y(d.title7); });

      bars.append("text")
        .attr("x", 990)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(headers[7]);

});
}// End of function