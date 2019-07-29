window.onload = function () {

//Draw donut chart
var w = 200;
var h = 250;

var outerRadius = w / 2;
var innerRadius = w / 4;

var color = d3.scale.category10();

//Create SVG element
var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

var arcOver = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius+5)

var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) {return d.population; });

d3.csv("donut.csv", function(error, data) {

  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "sites"; }));

  data.forEach(function(d) {
    d.sites = color.domain().map(function(name) {
      return {name: name, population: +d[name]};
    });
  });

  var svg = d3.select("#ring").selectAll(".pie")
      .data(data)
    .enter().append("svg")
      .attr("class", "pie")
      .attr("width", 400)
      .attr("height", 260)
    .append("g")
      .attr("transform", "translate(260,150)");

  svg.selectAll(".arc")
      .data(function(d) { return pie(d.sites); })
    .enter().append("g").attr("class", "arc")
      .on("mouseover", function(d) {
            d3.select(this).select("path").transition()
               .duration(400)
               .attr("d", arcOver);
        })
        .on("mouseout", function(d) {
            d3.select(this).select("path").transition()
               .duration(400)
               .attr("d", arc);
        }).append("path")      
      .attr("d", arc)
        .style("fill", function(d) { return color(d.data.name); })


  var label =   svg.selectAll('.arc-label').data(function(d) { return pie(d.sites); }).enter().append('g').attr('class', 'arc-label');

      label.append("text")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
             return "translate(" + arc.centroid(d) + ")";
          })
          .text(function(d) {
                return d.data.population;
            })
          .style("fill","#FFF")

  var legend = d3.select("#ring").append("svg")
      .attr("class", "legend")
      .attr("width", 130)
      .attr("height", 260)
    .selectAll("g")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + (i+3) * 20 + ")"; });

  legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(function(d) { return d; });
	});


// Draw bar chart - day of week

bww = 400
bwh = 270

var bwx = d3.scale.ordinal()
          .rangeRoundBands([0, 200], .1);

var bwy = d3.scale.linear().range([230, 0]);

var barwxAxis = d3.svg.axis()
              .scale(bwx)
              .orient("bottom");

var barwyAxis = d3.svg.axis()
              .scale(bwy)
              .orient("left")
              .ticks(10);

var vbarw = d3.select("#vbarw").append("svg")
            .attr("width", bww)
            .attr("height", bwh)
        .append("g")
            .attr("transform", "translate(100,20)");

d3.csv("vbarw.csv", type, function(error, data) {
  bwx.domain(data.map(function(d) { return d.letter; }));
  bwy.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  vbarw.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,230)")
      .call(barwxAxis);

  vbarw.append("g")
      .attr("class", "y axis")
      .call(barwyAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Hours");

  vbarw.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return bwx(d.letter); })
      .attr("width", bwx.rangeBand())
      .attr("y", function(d) { return bwy(d.frequency); })
      .attr("height", function(d) { return 230 - bwy(d.frequency); });
});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}


// Draw bar chart - monthly

width = 400
height = 270

var x = d3.scale.ordinal()
          .rangeRoundBands([0, 300], .1);

var y = d3.scale.linear().range([230, 0]);

var barxAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

var baryAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10);

var vbarm = d3.select("#vbarm").append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(100,20)");

d3.csv("vbarm.csv", type, function(error, data) {
  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  vbarm.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0,230)")
      .call(barxAxis);

  vbarm.append("g")
      .attr("class", "y axis")
      .call(baryAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Hours");

  vbarm.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return 230 - y(d.frequency); });
});

// Horizontal bar chart
var names = ['Early Morning', 'Morning', 'Late Morning', 'Afternoon', 'Late Afternoon','Evening','Night','Late Night'],
      hotdogs = [8, 4, 9, 12, 11,3,4,5],
      chart,
      width = 420,
      bar_height = 20,
      gap = 2,
      height = bar_height * names.length;
var left_width = 100;
var gap = 2, yRangeBand;
  // redefine y for adjusting the gap
  yRangeBand = bar_height + 2 * gap;
  hby = function(i) { return yRangeBand * i; };
 
var hbx, hby;
 
  hbar = d3.select("#hbar")
    		.append('svg')
    .attr('class', 'chart')
    .attr('width', left_width + width + 40)
    .attr('height', (bar_height + gap * 2) * names.length + 60)
    .append("g")
    .attr("transform", "translate(10, 20)");

d3.json("hbar.json", function(error, data) {
 
  hbx = d3.scale.linear()
     .domain([0, d3.max(data)])
     .range([0, width]);

  hbar.selectAll("line")
    .data(hbx.ticks(d3.max(data)))
    .enter().append("line")
    .attr("x1", function(d) { return hbx(d) + left_width; })
    .attr("x2", function(d) { return hbx(d) + left_width; })
    .attr("y1", 0)
    .attr("y2", (bar_height + gap * 2) * names.length+10);

  hbar.selectAll(".rule")
    .data(hbx.ticks(d3.max(data)))
    .enter().append("text")
    .attr("class", "rule")
    .attr("x", function(d) { return hbx(d) + left_width; })
    .attr("y", names.length*27)
    .attr("dy", -6)
    .attr("text-anchor", "middle")
    .attr("font-size", 10)
    .text(String);

  hbar.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", left_width)
    .attr("y", function(d, i) { return hby(i)+gap;})
    .attr("width", hbx)
    .attr("height", bar_height);
  
  hbar.selectAll("text.name")
    .data(names)
    .enter().append("text")
    .attr("x", left_width / 2)
    .attr("y", function(d, i){ return hby(i) + yRangeBand/2; } )
    .attr("dy", ".36em")
    .attr("text-anchor", "middle")
    .attr('class', 'name')
    .text(String);

 })

//Line chart

var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    lw = 450 - margin.left - margin.right,
    	lh = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var lx = d3.time.scale()
    	   .range([0, lw]);

var ly = d3.scale.linear()
    	   .range([lh, 0]);

var linexAxis = d3.svg.axis()
		      .scale(lx)
  			  .orient("bottom").ticks(5).tickFormat(d3.time.format("%d-%b-%y"));

var lineyAxis = d3.svg.axis()
 		      .scale(ly)
  			  .orient("left");

var line = d3.svg.line()
    .x(function(d) { return lx(d.date); })
    .y(function(d) { return ly(d.hours); });

var svg = d3.select("#broline").append("svg")
    .attr("width", lw + margin.left + margin.right)
    .attr("height", lh + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("line.csv", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.hours = +d.hours;
  });

  lx.domain(d3.extent(data, function(d) { return d.date; }));
  ly.domain(d3.extent(data, function(d) { return d.hours; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + lh + ")")
      .call(linexAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(lineyAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("hours");

  svg.append("path")
      .datum(data)
      .attr("class", "linechart")
      .attr("d", line);
});

//Multi area

var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    aw = 450 - margin.left - margin.right,
    	ah = 270 - margin.top - margin.bottom;

var acolor =  d3.scale.ordinal().range(["#e41a1c","#4daf4a","#984ea3"])
var parseDate = d3.time.format("%d-%b-%y").parse;

var ax = d3.time.scale()
    	   .range([0, aw]);

var ay = d3.scale.linear()
    	   .range([ah, 0]);

var axAxis = d3.svg.axis()
		      .scale(ax)
  			  .orient("bottom").ticks(5).tickFormat(d3.time.format("%d-%b-%y"));

var ayAxis = d3.svg.axis()
 		      .scale(ay)
  			  .orient("left");

var marea = d3.select("#area").append("svg")
    .attr("width", aw + margin.left + margin.right)
    .attr("height", ah + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var mareatemplate = d3.svg.area()
	.interpolate("basis")
    .x(function(d) { return ax(d.date); })
    .y0(ah)
    .y1(function(d) { return ay(d.hours); })

d3.csv("area.csv", function(error, adata) {

 acolor.domain(d3.keys(adata[0]).filter(function(key) { return key !== "date"; }));

  adata.forEach(function(d) {
    d.date = parseDate(d.date);
    d.x = +d.x;
    d.y = +d.y;
    d.z = +d.z;
  });

 var xyz = acolor.domain().map(function(name) {
    return {
      name: name,
      values: adata.map(function(d) {
        return {date: d.date, hours: +d[name]};
      })
    };
  });

  ax.domain(d3.extent(adata, function(d) { return d.date; }));
  ay.domain([
    d3.min(xyz, function(c) { return d3.min(c.values, function(v) { return v.hours; }); }),
    d3.max(xyz, function(c) { return d3.max(c.values, function(v) { return v.hours; }); })
  ]);

  marea.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + ah + ")")
      .call(axAxis);

  marea.append("g")
      .attr("class", "y axis")
      .call(ayAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("hours");

 var city = marea.selectAll(".city")
      			 .data(xyz)
    			 .enter().append("g")

  city.append("path")
      .attr("d", function(d) { return mareatemplate(d.values); })
      .style("fill",function(d,i){return acolor(i)})
      .style("fill-opacity", 0.3);
});

//Tree map
    tmw = 400 - margin.left - margin.right,
    tmh = 300 - margin.top - margin.bottom;

var color = d3.scale.category10();

var treemap = d3.layout.treemap()
    .size([tmw, tmh])
    .sticky(true)
    .value(function(d) { return d.size; });

var div = d3.select("#tree").append("div")
    .style("position", "relative")
    .style("width", (tmw + margin.left + margin.right) + "px")
    .style("height", (tmh + margin.top + margin.bottom) + "px")
    .style("left", margin.left + "px")
    .style("top", margin.top + "px");

d3.json("treemap.json", function(error, root) {
  var node = div.datum(root).selectAll(".node")
      .data(treemap.nodes)
    .enter().append("div")
      .attr("class", "node")
      .call(position)
      .style("background", function(d) { return d.children ? color(d.name) : null; })
      .text(function(d) { return d.children ? null : d.name; })
      .style("font-size","10px")
      .style("color","#FFF");

  d3.selectAll("input").on("change", function change() {
    var value = this.value === "count"
        ? function() { return 1; }
        : function(d) { return d.size; };

    node
        .data(treemap.value(value).nodes)
      .transition()
        .duration(1500)
        .call(position);
  });
});

function position() {
  this.style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
}

//Bubble

var bdiameter = 300,
    format = d3.format(",d"),
    bcolor = d3.scale.category10();

var bubble = d3.layout.pack()
    .sort(null)
    .size([bdiameter, bdiameter])
    .padding(1.5);

var bble = d3.select("#bubble").append("svg")
    .attr("width", bdiameter)
    .attr("height", bdiameter);

d3.json("treemap.json", function(error, root) {
  var bnode = bble.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  bnode.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  bnode.append("circle")
      .attr("r", function(d) { return d.r; })
      .style("fill", function(d) { return color(d.packageName); });

  bnode.append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); })
      .style("font-size","9px")
});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", bdiameter + "px");


}// End of function