var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1150 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%y-%b-%d").parse,
    formatPercent = d3.format(".0%");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

var col = ["#a3ce4b","#00b9f0","#4a88a1"]

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%b'%y"))
    .tickSize(-height, 0, 0)


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

var svg = d3.select("body").append("svg")
    .attr("width", 1250 + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data/stacked.tsv", function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var browsers = stack(color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, y: d[name] / 100};
      })
    };
  }));

  x.domain(d3.extent(data, function(d) { return d.date; }));

  var browser = svg.selectAll(".browser")
      .data(browsers)
    .enter().append("g")
      .attr("class", "browser");

  browser.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d,i) { return col[i]; });

d3.csv("data/stackedav.csv", function(error, data) {

 data.forEach(function (d,i) {
 	var period =[]
 	period.push(d.aveie,d.avech,d.avemo)

var pval

svg.selectAll(".txt").data(period).enter().append("text")
    .attr("x",function(d){return 35+i*90})
    .attr("y", function(d,s){return ypos(+d,s)})
    .attr("class","avg")
    .text(function(d){return d+"%"})

function ypos(d,s){

var ly = d3.scale.linear()
           .range([20,24]);

if(s==0){
	pval = ly(d);
	var top = ly(d)/2
	return top
}
if(s==1){
	var second = pval+ly(d)/2
	pval=pval+ly(d);
	return second
}
if(s==2){
	var bottom = pval+ly(d)/2
	pval = 0;
	return bottom
}

}

 })

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
       .selectAll("text")
       .attr("x", 40)
       .attr("y", 10)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  svg.selectAll(".label")
      .data(col)
    .enter().append("rect")
      .attr("fill", function(d,i){return col[i]})
      .attr("x",1090)
      .attr("y",function(d,i){return 100+i*25} )
      .attr("width", 10)
      .attr("height", 10);

      svg.selectAll(".text")
      .data(browsers)
    .enter().append("text")
        .attr("x", 1105)             
        .attr("y",function(d,i){return 110+i*25} )
        .attr("text-anchor", "right")  
        .style("font-size", "12px") 
        .text(function(d){return d.name});

});

})