
(function() {
 
// Inspired by http://informationandvisualization.de/blog/box-plot
d3.box = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = boxWhiskers,
      quartiles = boxQuartiles,
	  numBars = 4,
	  curBar = 1,
      tickFormat = null;
      var bfill = ["#a5def9","#8daebf","#f6acc4","#acdcd2","#fed6a0","#b7b9bb","#b8cca3"];
      var bstrk = ["#00b9f1","#006784","#ec0080","#00b49c","#f9a31a","#58585b","#65953b"]

  // For each small multiple…
  function box(g,d) {
    g.each(function(data, i) {

      var g = d3.select(this)

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, [], i))
          .range([height, 0]);
 
      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());
 
      // Stash the new scale.
      this.__chart__ = x1;
 
      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.
//var whiskerData = [[5070, 10546],[5354, 10899],[3294, 18712],[5116, 8905],[5116, 8905],[5354, 10899],[3294, 18712]]
      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData[i] ? [whiskerData[i]] : []);
 
	 //vertical line
      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x1(d[1]); })

//quartileData = [[7493,8902.5,9755.5],[7644,8999,9387.5],[6940.25, 12898.5, 17141],[5659.75, 5911.5, 7171.25],[5659.75, 5911.5, 7171.25],[7644, 8999, 9387.5],[6940.25, 12898.5, 17141]]

      // Update innerquartile box.
      var box = g.selectAll("rect.box")
          .data([quartileData[i]]);

      box.enter().append("rect")
          .attr("class", "box")
          .attr('fill',function(){return bfill[i]})
          .style('stroke',function(){return bstrk[i]})
          .attr("x", 0)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("width", width)
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[i][1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", x1)
          .attr("x2", width)
          .attr("y2", x1)
          .style('stroke',function(){return bstrk[i]})

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData[i] || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", x1)
          .attr("x2", 0 + width)
          .attr("y2", x1)
          .style("opacity", 1)

      // Update box ticks.
      var boxTick = g.selectAll("text.box")
          .data(quartileData[i]);
      boxTick.enter().append("text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) {return i & 1 ? 6 : -6 })
          .attr("x", function(d, i) { return i & 1 ?  + width : 0 })
          .attr("y", x1)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
          .text( function(d,i){if(i==1){return d}})

       g.append("text")
        .attr("x", 20)             
        .attr("y",300)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text(function(d,i){return data});

 var desc1 = g.append("text")
             .attr("x", 20)             
             .attr("y",320)
             .attr("text-anchor", "middle")  
             .style("font-size", "10px")

  var desc2 = g.append("text")
             .attr("x", 20)             
             .attr("y",332)
             .attr("text-anchor", "middle")  
             .style("font-size", "10px") 

   var desc3 = g.append("text")
             .attr("x", 20)             
             .attr("y",344)
             .attr("text-anchor", "middle")  
             .style("font-size", "10px")

   var desc4 = g.append("text")
             .attr("x", 20)             
             .attr("y",356)
             .attr("text-anchor", "middle")  
             .style("font-size", "10px") 

     desc1.append("tspan")
  		 .text("95% of "+data+" have a");
     desc2.append("tspan")
  		 .text("visitor entrance count between");
     desc3.append("tspan")
  		 .text(quartileData[i][0]+" and "+quartileData[i][2]+", with a");
  	 desc4.append("tspan")
  		 .text(" mean of " +quartileData[i][1]);

    });
  }
 
  box.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return box;
  };
 
  box.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return box;
  };
 
  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };
 
  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };
 
  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };
 
  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };
 
  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };
  
  box.showLabels = function(x) {
    if (!arguments.length) return showLabels;
    showLabels = x;
    return box;
  };
 
  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };
 
  return box;
};
 
function boxWhiskers(d) {
  return [0, d.length - 1];
}
 
function boxQuartiles(d) {
  return [
    d3.quantile(d, .25),
    d3.quantile(d, .5),
    d3.quantile(d, .75)
  ];
}


})();