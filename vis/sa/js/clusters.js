window.onload = function () {

// Draw bar chart - monthly

width = 1300
height = 280

var x = d3.scale.ordinal()
          .rangeRoundBands([0, 1080], .1);

var y = d3.scale.linear().range([230, 0]);

var bars = d3.select("#bars").append("svg")
            .attr("width", width)
            .attr("height", height)
        .append("g")
            .attr("transform", "translate(50,20)");

d3.csv("data/clusters.csv",function(error, data) {
var baryAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10)
              .tickSize(5, 0, 0)
              .tickFormat(function(d) { return d + "%"; });

var barxAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .tickSize(0, 1000, 0)
              .tickFormat("");

	var headers = d3.keys(data[0]);
	var numberOfRows = data.length;
	var barPadding = numberOfRows;

	console.log(data.length)

    data.forEach(function(d) {
        d.title1 = d[headers[1]];
        d.title2 = d[headers[2]];
        d.title3 = d[headers[3]];
        d.title4 = d[headers[4]];
        d.title5 = d[headers[5]];
        d.title6 = d[headers[6]];
        d.title7 = d[headers[7]];
        d.title8 = d[headers[8]];
        d.title9 = d[headers[9]];
        d.title10 = d[headers[10]];
        d.title11 = d[headers[11]];
        d.title12 = d[headers[12]];
    });

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return Math.max(d.title1,d.title2,d.title3,d.title4,d.title5,d.title6,d.title7,d.title8,d.title9,d.title10,d.title11,d.title12); })]);

  bars.append("g")
      .attr("class", "axis")
      .call(barxAxis)
      .attr("transform", "translate(30,230)");


  bars.append("g")
      .attr("class", "axis")
      .call(baryAxis)
            .attr("transform", "translate(30,0)");

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+30
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title1); })
      .attr("height", function(d) { return 230 - y(d.title1); });

bars.append("text")
      .data(data)
        .attr("x", 70)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
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

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d){return d.color})
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+120;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title2); })
      .attr("height", function(d) { return 230 - y(d.title2); });

bars.append("text")
        .attr("x", 160)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[2]);

data.forEach(function(d) {
        d.title3 = d[headers[3]];
    });

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+210;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title3); })
      .attr("height", function(d) { return 230 - y(d.title3); });

bars.append("text")
        .attr("x", 250)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[3]);

  data.forEach(function(d) {
        d.title4 = d[headers[4]];
    });

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+300;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title4); })
      .attr("height", function(d) { return 230 - y(d.title4); });

bars.append("text")
        .attr("x", 340)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[4]);

  data.forEach(function(d) {
        d.title5 = d[headers[5]];
    });

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+390;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title5); })
      .attr("height", function(d) { return 230 - y(d.title5); });

bars.append("text")
        .attr("x", 430)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[5]);

  data.forEach(function(d) {
        d.title6 = d[headers[6]];
    });

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+480;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title6); })
      .attr("height", function(d) { return 230 - y(d.title6); });

bars.append("text")
        .attr("x", 520)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[6]);

data.forEach(function(d) {
        d.title7 = d[headers[7]];
    });
 
  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d,i) {
			   		return i * (80 / numberOfRows)+570;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7); })
      .attr("height", function(d) { return 230 - y(d.title7); });

      bars.append("text")
        .attr("x", 610)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[7]);

  data.forEach(function(d) {
        d.title8 = d[headers[8]];
    });

  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d,i) {
            return i * (80 / numberOfRows)+660;
         })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title8); })
      .attr("height", function(d) { return 230 - y(d.title8); });

      bars.append("text")
        .attr("x", 700)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[8]);

    data.forEach(function(d) {
        d.title9 = d[headers[9]];
    });
 
  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d,i) {
            return i * (80 / numberOfRows)+750;
         })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title9); })
      .attr("height", function(d) { return 230 - y(d.title9); });

      bars.append("text")
        .attr("x", 790)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[9]);

            data.forEach(function(d) {
        d.title9 = d[headers[10]];
    });
 
  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d,i) {
            return i * (80 / numberOfRows)+840;
         })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title10); })
      .attr("height", function(d) { return 230 - y(d.title10); });

      bars.append("text")
        .attr("x", 880)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[10]);

            data.forEach(function(d) {
        d.title9 = d[headers[11]];
    });
 
  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d,i) {
            return i * (80 / numberOfRows)+930;
         })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title11); })
      .attr("height", function(d) { return 230 - y(d.title11); });

      bars.append("text")
        .attr("x", 970)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[11]);

            data.forEach(function(d) {
        d.title9 = d[headers[12]];
    });
 
  bars.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("fill", function(d,i){return d.color})
      .attr("x", function(d,i) {
            return i * (80 / numberOfRows)+1020;
         })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title12); })
      .attr("height", function(d) { return 230 - y(d.title12); });

      bars.append("text")
        .attr("x", 1060)             
        .attr("y",height-25)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px") 
        .text(headers[12]);

// add labels

if(data.length<=4){

var adjst
if(data.length==2){adjst = 10}else if(data.length==3){adjst = 5}else{adjst = 3}

var yTextPadding = 5;
bars.selectAll(".bar1text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+35+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title1)-yTextPadding; })
.text(function(d){
     return d.title1+"%";
});

bars.selectAll(".bar2text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+125+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title2)-yTextPadding; })
.text(function(d){
     return d.title2+"%";
});

bars.selectAll(".bar3text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+215+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title3)-yTextPadding; })
.text(function(d){
     return d.title3+"%";
});

bars.selectAll(".bar4text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+305+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title4)-yTextPadding; })
.text(function(d){
     return d.title4+"%";
});

bars.selectAll(".bar5text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+395+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title5)-yTextPadding; })
.text(function(d){
     return d.title5+"%";
});

bars.selectAll(".bar6text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+485+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title6)-yTextPadding; })
.text(function(d){
     return d.title6+"%";
});

bars.selectAll(".bar7text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+575+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7)-yTextPadding; })
.text(function(d){
     return d.title7+"%";
});

bars.selectAll(".bar8text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+665+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7)-yTextPadding; })
.text(function(d){
     return d.title7+"%";
});

bars.selectAll(".bar9text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+755+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7)-yTextPadding; })
.text(function(d){
     return d.title7+"%";
});

bars.selectAll(".bar10text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+845+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7)-yTextPadding; })
.text(function(d){
     return d.title7+"%";
});

bars.selectAll(".bar11text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+935+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7)-yTextPadding; })
.text(function(d){
     return d.title7+"%";
});

bars.selectAll(".bar12text")
.data(data)
.enter()
.append("text")
.attr("class", "bartext")
.attr("text-anchor", "middle")
      .attr("x", function(d, i) {
			   		return i * (80 / numberOfRows)+1025+adjst;
			   })
      .attr("width", 60/numberOfRows)
      .attr("y", function(d) { return y(d.title7)-yTextPadding; })
.text(function(d){
     return d.title7+"%";
});

}


// add legend   
var legend = bars.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 100)
		.attr('transform', 'translate(-120,0)');

var legendRect = legend.selectAll('rect').data(data);

legendRect.enter()
    .append("rect")
    .attr("x", width - 65)
    .attr("width", 10)
    .attr("height", 10);

legendRect
    .attr("y", function(d, i) {
        return i * 20;
    })
    .style("fill", function(d,i) {
        return d.color;
    });

var legendText = legend.selectAll('text').data(data);

legendText.enter()
    .append("text")
    .attr("id","lgnd")
    .attr("x", width - 52);

legendText
    .attr("y", function(d, i) {
        return i * 20 + 9;
    })
    .text(function(d,i) {
        return d.letter;
    });

});
}// End of function