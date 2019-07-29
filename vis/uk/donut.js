window.onload = function () {

//Draw donut chart
var w = 200;
var h = 200;

var outerRadius = w / 2;
var innerRadius = w / 4;

var color = d3.scale.category10();

//Create SVG element
var details = d3.select("#donut")
      			    .append("svg")
			          .attr("width", w)
			          .attr("height", h);

var pie = d3.layout.pie()
            .value(function(d) {return d.apples; })
            .sort(null);

var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

var ring = d3.select("#ring").append("svg")
             .attr("width", 400)
             .attr("height", h)
            .append("g")
             .attr("transform", "translate(100,100)");

d3.tsv("data.tsv", function(error, data) {

   var g = ring.selectAll(".arc")
               .data(pie(data))
           .enter()
               .append("g")
               .attr("class", "arc");

  var path = g.datum(data).selectAll("path")
              .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) {return color(i); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }) // store the initial angles
      .style("opacity",0.2)

  var label = 	g.selectAll('.arc-label').data(pie(data)).enter().append('g').attr('class', 'arc-label');

      label.append("text")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
					   return "translate(" + arc.centroid(d) + ")";
					})
	  	  .text(function(d) {
				return d.value;
	   	})

      path.append("title")
          .attr("text-anchor", "middle")
	  .text(function(d) {
		return d.value;
	   })


	});


//Draw bar chart

  //Width and height
  var barw = 600;
  var barh = 250;
      
  var dataset = [ 12, 10, 13, 19, 22,15, 20, 18, 17, 16,23, 25 ];
        
  var xScale = d3.scale.ordinal()
                 .domain(d3.range(dataset.length))
                 .rangeRoundBands([0, barw], 0.05);

  var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset)])
               .range([0, barh]);
      
  //Create SVG element
  var vbar = d3.select("#vbar")
              .append("svg")
              .attr("width", barw)
              .attr("height", barh);

  //Create vertical bars
      vbar.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
      .attr("x", function(d, i) {
          return 29*i;
       })
      .attr("y", function(d) {
          return barh - yScale(d);
       })
       .attr("width", 28)
       .attr("height", function(d) {
            return yScale(d);
       })
       .attr("fill", "blue")
       .on("mouseover",function(){d3.select(this).attr("fill", "orange");})
       .on("mouseout",function(d){
           d3.select(this)
             .transition()
             .duration(250)
           .attr("fill", "blue");
         })
              .style("opacity",0.6)

}// End of function