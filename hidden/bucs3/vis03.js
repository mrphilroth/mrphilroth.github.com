var margin = {top: 10, right: 30, bottom: 30, left: 30},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var currstat = "tds";

var histdata = {'tds':{'binwidth':1, 'fbc':0},
		'recs':{'binwidth':1, 'fbc':0},
		'yards':{'binwidth':20, 'fbc':10},
		'fanpts':{'binwidth':2, 'fbc':1}};

var buttondata = [{"name":"Touchdowns",
		   "variable":"tds"},
		  {"name":"Receptions",
		   "variable":"recs"},
		  {"name":"Yards",
		   "variable":"yards"},
		  {"name":"Fantasy Points",
		   "variable":"fanpts"}];

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var headersvg = d3.select("body").append("svg")
    .attr("width", width + margin.left)
    .attr("height", 40)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("class", "headerdiv");

headersvg.append("text")
    .attr("class", "headertext")
    .attr("dx", "3.8em")
    .attr("dy", ".8em")
    .text("VINCENT JACKSON CAREER STATS");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var buttondiv = d3.select("body")
    .append("div")
    .attr("class", "buttondiv");

d3.csv("vis03_data.csv", accessor, function(error, data) {

    x.domain([histdata[currstat]['fbc'] - histdata[currstat]['binwidth'] / 2,
	      d3.max(data, function(d) { return d[currstat + 'bincenter']; }) + histdata[currstat]['binwidth'] / 2])
    y.domain([0, 40])

    var xbinwidth = (x(histdata[currstat]['fbc'] + histdata[currstat]['binwidth']) -
		     x(histdata[currstat]['fbc']));

    var xAxis = d3.svg.axis()
	.scale(x)
	.tickValues(d3.set(data.map(function(d) { return d[currstat + 'bincenter'];} )).values())
	.tickFormat(d3.format("d"))
	.orient("bottom");

    var bar = svg.selectAll(".bar")
	.data(data)
	.enter().append("g")
	.attr("class", "bar")
	.attr("transform", function(d) { return "translate(" +
					 (x(d[currstat + 'bincenter']) - xbinwidth / 2) + "," +
					 (y(d[currstat + 'binnum']) - y(1) + y(2) + 1) + ")"; });

    bar.append("rect")
	.attr("class", "gamerect")
	.attr("x", 1)
	.attr("width", xbinwidth - 1)
	.attr("height", y(1) - y(2) - 1);

    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

    buttondiv.selectAll("input")
	.data(buttondata)
	.enter().append("input")
	.attr("type", "button")
	.attr("class", function(d) {
	    if( d["variable"] == currstat ) { return "statbutton-selected"; }
	    else { return "statbutton"; }})
	.attr("value", function(d) { return d["name"]; })
	.on("click", function(d) {
	    currselection = d["variable"];
	    update_stat(d["variable"]); })
	.on("mouseover", function() { d3.select(d3.event.target).classed("statbutton-highlight", true); })
	.on("mouseout", function() { d3.select(d3.event.target).classed("statbutton-highlight", false); });

    $(".gamerect").tipsy({
	html: true,
	gravity: "s",
	title: function() {
	    console.log(this.__data__);
	    var tteam = this.__data__["team"];
	    var topp = this.__data__["opp"];
	    var tmonth = this.__data__["date"].slice(4, 6);
	    var tday = this.__data__["date"].slice(6, 8);

	    var tyear = this.__data__["year"];
	    var tqb = this.__data__["qb"];
	    var trecs = this.__data__["recs"];
	    var tyards = this.__data__["yards"];
	    var ttds = this.__data__["tds"];

	    return "<span style='font: 15px sans-serif'><strong>" + tteam + " vs. " + topp + "</strong><br>" +
		tmonth + "/" + tday + "/" + tyear + "<br>" +
		tyear + "<br>" +
		trecs + " rec " + tyards + " yards " + ttds + " TDs</span>";
	}
    });


    function update_stat(stat) {

	var currstat = stat;

	x.domain([histdata[currstat]['fbc'] - histdata[currstat]['binwidth'] / 2,
		  d3.max(data, function(d) { return d[currstat + 'bincenter']; }) + histdata[currstat]['binwidth'] / 2])

	var xbinwidth = (x(histdata[currstat]['fbc'] + histdata[currstat]['binwidth']) -
			 x(histdata[currstat]['fbc']));

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickValues(d3.set(data.map(function(d) { return d[currstat + 'bincenter'];} )).values())
	    .tickFormat(d3.format("d"))
	    .orient("bottom");

	buttondiv.selectAll("input")
	    .data(buttondata)
	    .transition()
	    .duration(0)
	    .attr("class", function(d) {
		if( d["variable"] == currstat ) { return "statbutton-selected"; }
		else { return "statbutton"; }});

	svg.select(".x.axis")
	    .transition()
	    .duration(1000)
	    .call(xAxis);

	svg.selectAll("rect")
    	    .data(data)
	    .transition()
	    .duration(1000)
	    .attr("width", xbinwidth - 1);

	svg.selectAll(".bar")
    	    .data(data)
	    .transition()
	    .duration(1000)
	    .attr("transform", function(d) { return "translate(" +
					     (x(d[currstat + 'bincenter']) - xbinwidth / 2) + "," +
					     (y(d[currstat + 'binnum']) - y(1) + y(2) + 1) + ")"; });
	return;
    }

});

function accessor(d) {

    d.tds = +d.tds;
    d.year = +d.year;
    d.recs = +d.recs;
    d.yards = +d.yards;
    d.fanpts = +d.fanpts;

    d.tdsbincenter = +d.tdsbincenter;
    d.recsbincenter = +d.recsbincenter;
    d.yardsbincenter = +d.yardsbincenter;
    d.fanptsbincenter = +d.fanptsbincenter;

    d.tdsbinnum = +d.tdsbinnum;
    d.recsbinnum = +d.recsbinnum;
    d.yardsbinnum = +d.yardsbinnum;
    d.fanptsbinnum = +d.fanptsbinnum;

    return d;
}
