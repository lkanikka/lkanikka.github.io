var margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = 1300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
var parseDate = d3.time.format("%I:%M:%S %p").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(15)
    .tickFormat(d3.time.format("%H:%M"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5);

var line = d3.svg.line()
    .interpolate("monotone")
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.tsv("data/multiline.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

var avg = []

  data.forEach(function(d) {
  d.date = parseDate(d.date)
  avg.push({"average":+d.Average,"date":d.date,"max":d.upper,"min":d.lower})
  });

  var cities = color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, value: +d[name]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));

  y.domain([
    d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
    d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
  ]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(10," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  var city = svg.selectAll(".city")
      .data(cities)
    .enter().append("g")
      .filter(function(d) {return d.name != "upper" && d.name != "lower"})
      .attr("class", "city");


  city.append("path")
      .attr("class", "path")
      .attr("d", function(d) {return line(d.values); })
      .attr("transform", "translate(10,0)")
      .style("stroke",function(d) {return d.name == "Average" ? "#00a9dc" : "#a5def9"})
      .style("stroke-width",function(d) {return d.name == "Average" ? 3 : 1})

  svg.selectAll("circle")    
        .data(avg)         
    .enter().append("circle")                               
        .attr("r", 9)       
        .attr("cx",function(d) { return x(d.date); })       
        .attr("cy",function(d) { return y(d.average);})
        .attr("transform", "translate(10,0)")
        .attr("class","circle")

    svg.selectAll("dotmin")    
        .data(avg)         
    .enter().append("circle")                               
      .filter(function(d) {return d.average+7 < d.min< d.average-7})
        .attr("r", 1.5)
        .attr("cx",function(d) { return x(d.date); })       
        .attr("cy",function(d) { return y(d.min);})
        .attr("transform", "translate(10,0)")

    svg.selectAll("dotmax")    
        .data(avg)         
    .enter().append("circle")
    .filter(function(d) {return d.average+7 <= d.max})                               
        .attr("r", 1.5)       
        .attr("cx",function(d) { return x(d.date); })       
        .attr("cy",function(d) { return y(d.max);})
        .attr("transform", "translate(10,0)")

    svg.selectAll("upperline")
        .data(avg)
      .enter().append("line")
       .attr("x1",function(d) { return x(d.date); })
       .attr("x2",function(d) { return x(d.date); })
       .attr("y1",function(d) { return y(d.average)-8;})
       .attr("y2",function(d) { return y(d.average) - y(d.max) <= 8 ? y(d.average)-8:y(d.max)})
       .attr("transform", "translate(10,0)")
       .style("stroke-width",1)
       .style("stroke","#000")

     svg.selectAll("lowerline")
        .data(avg)
      .enter().append("line")
       .attr("x1",function(d) { return x(d.date); })
       .attr("x2",function(d) { return x(d.date); })
       .attr("y1",function(d) {return y(d.min) - y(d.average) <= 8 ? y(d.average)+8:y(d.min)})
       .attr("y2", function(d) {return y(d.average)+8})
       .attr("transform", "translate(10,0)")
       .style("stroke-width",1)
       .style("stroke","#000")

svg.selectAll("avgval")    
        .data(avg)         
    .enter().append("text")
            .attr("text-anchor", "middle")
        .attr("x",function(d) { return x(d.date); })       
        .attr("y",function(d) { return y(d.average);})
        .attr("dy", ".3em")
         .attr("transform", "translate(10,0)")
        .attr("id","label")
        .text(function(d) {return d.average})

})