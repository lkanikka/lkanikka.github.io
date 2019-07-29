var labels = true; // show the text labels beside individual boxplots?
var margin = {top: 30, right: 50, bottom: 70, left: 50};
var height = 280;

// parse in the data	
d3.json("data/whiskers.json", function(error, json) {

var header = ["All Mondays","All Tuesdays","All Wednesdays","All Thursdays","All Fridays","All Saturdays","All Sundays"]

console.log(json.whiskers)

 whiskerData = json.whiskers
 quartileData = json.quartiles
 max = json.maxmin[0]
 min = json.maxmin[1]

	var chart = d3.box(whiskerData)
		.height(280)	
		.domain([min, max])
		.showLabels(labels);

	var svg = d3.select("#whiskers").append("svg")
		.attr("width", 1000 + margin.left + margin.right)
		.attr("height", 420 + margin.top + margin.bottom)
		.attr("class", "box")    
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + 0 + ")");
	
	// the y-axis
	var y = d3.scale.linear()
		.domain([min, max])
		.range([280 + margin.top, 0 + margin.top]);
	
	var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

	// draw the boxplots	
	svg.selectAll(".box")	   
      .data(header)
	  .enter().append("g")
		.attr("transform", function(d,i) {return "translate(" +  (150*i+50)  + "," + margin.top + ")"; } )
		.call(chart.width(36)); 
 
	 // draw y axis
	svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

});