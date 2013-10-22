var margin = {top: 70, right: 50, bottom: 30, left: 40},
width = 900 - margin.left - margin.right,
height = 480 - margin.top - margin.bottom;

var currstat = "RushAtt";

var gamedict = {'201209090tam':{'year':2012, 'game':1, 'id':1},
		'201209160nyg':{'year':2012, 'game':2, 'id':2},
		'201209230dal':{'year':2012, 'game':3, 'id':3},
		'201209300tam':{'year':2012, 'game':4, 'id':4},
		'201210140tam':{'year':2012, 'game':5, 'id':5},
		'201210210tam':{'year':2012, 'game':6, 'id':6},
		'201210250min':{'year':2012, 'game':7, 'id':7},
		'201211040rai':{'year':2012, 'game':8, 'id':8},
		'201211110tam':{'year':2012, 'game':9, 'id':9},
		'201211180car':{'year':2012, 'game':10, 'id':10},
		'201211250tam':{'year':2012, 'game':11, 'id':11},
		'201212020den':{'year':2012, 'game':12, 'id':12},
		'201212090tam':{'year':2012, 'game':13, 'id':13},
		'201212160nor':{'year':2012, 'game':14, 'id':14},
		'201212230tam':{'year':2012, 'game':15, 'id':15},
		'201212300atl':{'year':2012, 'game':16, 'id':16},
		'201309080nyj':{'year':2013, 'game':1, 'id':17},
		'201309150tam':{'year':2013, 'game':2, 'id':18},
		'201309220nwe':{'year':2013, 'game':3, 'id':19},
		'201309290tam':{'year':2013, 'game':4, 'id':20},
		'201310130tam':{'year':2013, 'game':5, 'id':21},
		'201310200atl':{'year':2013, 'game':6, 'id':22}}

var legenddata = [{"name":"1st Down",
		   "color":"blue"},
		  {"name":"2nd Down",
		   "color":"red"},
		  {"name":"3rd Down",
		   "color":"yellow"},
		  {"name":"4th Down",
		   "color":"green"}]
    
var statbuttondata = [{"name":"Rushing Attempts",
		       "variable":"RushAtt"},
		      {"name":"Rusing Yards",
		       "variable":"RushYds"},
		      {"name":"Receptions",
		       "variable":"PassCmp"},
		      {"name":"Receiving Yards",
		       "variable":"PassYds"}];

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var z = d3.scale.ordinal().range(["blue", "red", "yellow", "green"]);

var headersvg = d3.select("body").append("svg")
    .attr("width", width + margin.left)
    .attr("height", 40)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("class", "headerdiv");

headersvg.append("text")
    .attr("class", "headertext")
    .attr("dx", "4.3em")
    .attr("dy", ".8em")
    .text("DOUG MARTIN CAREER STATS");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var statbuttondiv = d3.select("body")
    .append("div")
    .attr("class", "statbuttondiv");

d3.csv("vis02_data.csv", accessor, function(error, data) {

    var dnest = d3.nest()
    	.key(function(d) { return d.layerkey; })
    	.map(data);

    var stack = d3.layout.stack()
    	.x( function(d) { return gamedict[d['gameid']]['id']; })
    	.y( function(d) { return d[currstat]; })
    	.order(function(data) {
    	    return [0, 4, 1, 5, 2, 6, 3, 7];
    	});

    var layers = stack(d3.values(dnest));

    x.domain(layers[0].map(function(d) { return gamedict[d['gameid']]['id']; }));
    y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickFormat(function(d) { return ((d - 1) % 16) + 1; });

    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis)

    // Add a group for each layer.
    var glayer = svg.selectAll("g.down")
	.data(layers)
	.enter().append("svg:g")
	.attr("class", "down")
	.style("fill", function(d, i) { return z(i); })
	.style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });

    // Add a rect for each date.
    var rect = glayer.selectAll("rect")
	.data(Object)
	.enter().append("svg:rect")
	.attr("x", function(d) { return x(gamedict[d['gameid']]['id']) + 5; })
	.attr("y", function(d) { return y(d.y0 + d.y); })
	.attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
	.attr("width", x.rangeBand() - x.rangeBand() / 3)
	.attr("opacity", function(d) { if ( d.back == 'dm' ) { return 1.0; }
				       else return 0.5; } );

    var legend = svg.selectAll('.legend')
        .data(legenddata)
        .enter()
	.append('g')
        .attr('class', 'legend');

    legend.append('rect')
        .attr('x', 30)
        .attr('y', function(d, i){ return (i *  22) - 57;})
        .attr('width', 12)
        .attr('height', 12)
        .style('fill', function(d) { return d["color"]; });
    
    legend.append('text')
	.attr("class", "legendtext")
        .attr('x', 52)
        .attr('y', function(d, i){ return (i *  22) - 45;})
        .text(function(d){ return d["name"]; });

    statbuttondiv.selectAll("input")
	.data(statbuttondata)
	.enter().append("input")
	.attr("type", "button")
	.attr("class", function(d) {
	    if( d["variable"] == currstat ) { return "statbutton statbutton-selected"; }
	    else { return "statbutton"; }})
	.attr("value", function(d) { return d["name"]; })
	.on("click", function(d) {
	    currselection = d["variable"];
	    update_stat(d["variable"]); })
	.on("mouseover", function() { d3.select(d3.event.target).classed("statbutton-highlight", true); })
	.on("mouseout", function() { d3.select(d3.event.target).classed("statbutton-highlight", false); });

    function update_stat(stat) {

	var currstat = stat;

	var stack = d3.layout.stack()
    	    .x( function(d) { return gamedict[d['gameid']]['id']; })
    	    .y( function(d) { return d[currstat]; })
    	    .order(function(data) {
    		return [0, 4, 1, 5, 2, 6, 3, 7];
    	    });

	var layers = stack(d3.values(dnest));

	y.domain([0, d3.max(layers[layers.length - 1], function(d) { return d.y0 + d.y; })]);


	svg.select(".y.axis")
	    .transition()
	    .duration(600)
	    .call(yAxis);

	statbuttondiv.selectAll("input")
	    .transition()
	    .duration(0)
	    .attr("class", function(d) {
		if( d["variable"] == currstat ) { return "statbutton statbutton-selected"; }
		else { return "statbutton"; }})

	glayer.selectAll("rect")
	    .transition()
	    .duration(600)
	    .attr("y", function(d) { return y(d.y0 + d.y); })
	    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

	return;
    }

});

function accessor(d) {
    d.Down = +d.Down;
    d.RushAtt = +d.RushAtt;
    d.RushYds = +d.RushYds;
    d.PassCmp = +d.PassCmp;
    d.PassYds = +d.PassYds;

    return d;
}
