var margin = {top: 10, right: 70, bottom: 30, left: 70},
width = 960 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

var currstat = "recs";

var tickdata = {'tds':[0, 1, 2, 3],
		'recs':[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		'yards':[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220],
		'fanpts':[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]};

var histdata = {'tds':{'binwidth':1, 'fbc':0},
		'recs':{'binwidth':1, 'fbc':0},
		'yards':{'binwidth':20, 'fbc':10},
		'fanpts':{'binwidth':2, 'fbc':1}};

var statbuttondata = [{"name":"Receptions",
		       "variable":"recs"},
		      {"name":"Yards",
		       "variable":"yards"},
		      {"name":"Touchdowns",
		       "variable":"tds"},
		      {"name":"Fantasy Points",
		       "variable":"fanpts"}];

var qbbuttondata = [{"name":"Drew Brees",
		     "variable":"Brees"},
		    {"name":"Philip Rivers",
		     "variable":"Rivers"},
		    {"name":"Josh Freeman",
		     "variable":"Freeman"},
		    {"name":"Mike Glennon",
		     "variable":"Glennon"}];

var yearbuttondata = [{"name":"2005",
		       "variable":"2005"},
		      {"name":"2006",
		       "variable":"2006"},
		      {"name":"2007",
		       "variable":"2007"},
		      {"name":"2008",
		       "variable":"2008"},
		      {"name":"2009",
		       "variable":"2009"},
		      {"name":"2010",
		       "variable":"2010"},
		      {"name":"2011",
		       "variable":"2011"},
		      {"name":"2012",
		       "variable":"2012"},
		      {"name":"2013",
		       "variable":"2013"}];

var playoffbuttondata = [{"name":"Playoff Games",
			  "variable":"1"},
			 {"name":"Regular Season",
			  "variable":"0"}];

var legenddata = [{"name":"Oct. 13, 2013 Game",
		   "color":"#FF7A00",
		   "stroke":"#000000",
		   "stroke-width":2},
		  {"name":"Tampa Bay Buccaneers",
		   "color":"#A71930",
		   "stroke":"#000000",
		   "stroke-width":0},
		  {"name":"San Diego Chargers",
		   "color":"#0F83B8",
		   "stroke":"#000000",
		   "stroke-width":0}];

var tipdata = {"dal":{"city":"Dallas", "team":"Cowboys"},
	       "nyg":{"city":"New York", "team":"Giants"},
	       "phi":{"city":"Philadelphia", "team":"Eagles"},
	       "cle":{"city":"Cleveland", "team":"Browns"},
	       "nwe":{"city":"New England", "team":"Patriots"},
	       "oti":{"city":"Tennessee", "team":"Titans"},
	       "pit":{"city":"Pittsburgh", "team":"Steelers"},
	       "den":{"city":"Denver", "team":"Broncos"},
	       "sfo":{"city":"San Francisco", "team":"49ers"},
	       "gnb":{"city":"Green Bay", "team":"Packers"},
	       "sea":{"city":"Seattle", "team":"Seahawks"},
	       "crd":{"city":"Arizona", "team":"Cardinals"},
	       "was":{"city":"Washington", "team":"Redskins"},
	       "nor":{"city":"New Orleans", "team":"Saints"},
	       "clt":{"city":"Indianapolis", "team":"Colts"},
	       "chi":{"city":"Chicago", "team":"Bears"},
	       "atl":{"city":"Atlanta", "team":"Falcons"},
	       "kan":{"city":"Kansas City", "team":"Chiefs"},
	       "mia":{"city":"Miami", "team":"Dolphins"},
	       "htx":{"city":"Houston", "team":"Texans"},
	       "ram":{"city":"St. Louis", "team":"Rams"},
	       "det":{"city":"Detroit", "team":"Lions"},
	       "car":{"city":"Carolina", "team":"Panthers"},
	       "jax":{"city":"Jacksonville", "team":"Jaguars"},
	       "min":{"city":"Minnesota", "team":"Vikings"},
	       "buf":{"city":"Buffalo", "team":"Bills"},
	       "nyj":{"city":"New York", "team":"Jets"},
	       "cin":{"city":"Cincinnati", "team":"Bengals"},
	       "rav":{"city":"Baltimore", "team":"Ravens"},
	       "sdg":{"city":"San Diego", "team":"Chargers"},
	       "rai":{"city":"Oakland", "team":"Raiders"},
	       "tam":{"city":"Tampa Bay", "team":"Buccaneers"}};

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
    .attr("dx", "2.3em")
    .attr("dy", ".8em")
    .text("VINCENT JACKSON CAREER GAMES");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var statsvg = d3.select("body").append("svg")
    .attr("width", width + margin.left)
    .attr("height", 22)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("class", "statdiv");

statsvg.append("text")
    .attr("class", "stattext")
    .attr("dx", "20.5em")
    .attr("dy", "1.1em")
    .text("Click to Change Statistics:");

var statbuttondiv = d3.select("body")
    .append("div")
    .attr("class", "statbuttondiv");

var filtersvg = d3.select("body").append("svg")
    .attr("width", width + margin.left)
    .attr("height", 22)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("class", "filterdiv");

filtersvg.append("text")
    .attr("class", "filtertext")
    .attr("dx", "20em")
    .attr("dy", "1.1em")
    .text("Hover to Highlight Categories:");

var qbbuttondiv = d3.select("body")
    .append("div")
    .attr("class", "qbbuttondiv");

d3.select("body").append("br");
d3.select("body").append("br");

var yearbuttondiv = d3.select("body")
    .append("div")
    .attr("class", "yearbuttondiv");

d3.select("body").append("br");
d3.select("body").append("br");

var playoffbuttondiv = d3.select("body")
    .append("div")
    .attr("class", "playoffbuttondiv");

d3.csv("vis03_data.csv", accessor, function(error, data) {

    x.domain([histdata[currstat]['fbc'] - histdata[currstat]['binwidth'] / 2,
	      d3.max(data, function(d) { return d[currstat + 'bincenter']; }) + histdata[currstat]['binwidth'] / 2])
    y.domain([0, 33])

    var xbinwidth = (x(histdata[currstat]['fbc'] + histdata[currstat]['binwidth']) -
		     x(histdata[currstat]['fbc']));

    var xAxis = d3.svg.axis()
	.scale(x)
	.tickValues(tickdata[currstat])
	.tickFormat(d3.format("d"))
	.orient("bottom");

    var bar = svg.selectAll(".bar")
	.data(data)
	.enter()
	.append("g")
	.attr("class", "bar")
	.attr("transform", function(d) { return "translate(" +
					 (x(d[currstat + 'bincenter']) - xbinwidth / 2) + "," +
					 (y(d[currstat + 'binnum']) - y(1) + y(2) + 1) + ")"; });

    bar.append("rect")
	.attr("class", function(d) {  
	    if ( d["team"] == "tam" ) {
		if ( d["date"] == "201310130" ) { return "histrect gamerect"; }
	        else { return "histrect tamrect"; } }
	    else { return "histrect sdgrect"; } } )
	.attr("x", 1)
	.attr("width", xbinwidth - 1)
	.attr("height", y(1) - y(2) - 1);

    svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);

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

    qbbuttondiv.selectAll("input")
    	.data(qbbuttondata)
    	.enter().append("input")
    	.attr("type", "button")
    	.attr("class", "filterbutton qbbutton")
    	.attr("value", function(d) { return d["name"]; })
    	.on("mouseover", function(d) {
	    d3.select(d3.event.target).classed("filterbutton-highlight", true);
	    update_highlight("qb", d["variable"]); })
    	.on("mouseout", function(d) {
	    d3.select(d3.event.target).classed("filterbutton-highlight", false);
	    no_highlight();
	});

    yearbuttondiv.selectAll("input")
    	.data(yearbuttondata)
    	.enter().append("input")
    	.attr("type", "button")
    	.attr("class", "filterbutton yearbutton")
    	.attr("value", function(d) { return d["name"]; })
    	.on("mouseover", function(d) {
	    d3.select(d3.event.target).classed("filterbutton-highlight", true);
	    update_highlight("year", d["variable"]); })
    	.on("mouseout", function(d) {
	    d3.select(d3.event.target).classed("filterbutton-highlight", false);
	    no_highlight();
	});

    playoffbuttondiv.selectAll("input")
    	.data(playoffbuttondata)
    	.enter().append("input")
    	.attr("type", "button")
    	.attr("class", "filterbutton playoffbutton")
    	.attr("value", function(d) { return d["name"]; })
    	.on("mouseover", function(d) {
	    d3.select(d3.event.target).classed("filterbutton-highlight", true);
	    update_highlight("playoffs", d["variable"]); })
    	.on("mouseout", function(d) {
	    d3.select(d3.event.target).classed("filterbutton-highlight", false);
	    no_highlight();
	});

    var legend = svg.selectAll('.legend')
        .data(legenddata)
        .enter()
	.append('g')
        .attr('class', 'legend');

    legend.append('rect')
        .attr('x', 630)
        .attr('y', function(d, i){ return i *  22 + 20;})
        .attr('width', 14)
        .attr('height', 14)
	.attr('stroke', function(d) { return d['stroke']; })
	.attr('stroke-width', function(d) { return d['stroke-width']; })
        .style('fill', function(d) { return d["color"]; });
    
    legend.append('text')
	.attr("class", "legendtext")
        .attr('x', 650)
        .attr('y', function(d, i){ return (i *  22) + 32;})
        .text(function(d){ return d["name"]; });

    function update_stat(stat) {

	var currstat = stat;

	x.domain([histdata[currstat]['fbc'] - histdata[currstat]['binwidth'] / 2,
		  d3.max(data, function(d) { return d[currstat + 'bincenter']; }) + histdata[currstat]['binwidth'] / 2])

	var xbinwidth = (x(histdata[currstat]['fbc'] + histdata[currstat]['binwidth']) -
			 x(histdata[currstat]['fbc']));

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .tickValues(tickdata[currstat])
	    .tickFormat(d3.format("d"))
	    .orient("bottom");

	statbuttondiv.selectAll("input")
	    .transition()
	    .duration(0)
	    .attr("class", function(d) {
		if( d["variable"] == currstat ) { return "statbutton statbutton-selected"; }
		else { return "statbutton"; }})

	svg.select(".x.axis")
	    .transition()
	    .duration(250)
	    .call(xAxis);

	svg.selectAll(".histrect")
	    .transition()
	    .duration(250)
	    .attr("width", xbinwidth - 1);

	svg.selectAll(".bar")
	    .transition()
	    .duration(250)
	    .attr("transform", function(d) { return "translate(" +
					     (x(d[currstat + 'bincenter']) - xbinwidth / 2) + "," +
					     (y(d[currstat + 'binnum']) - y(1) + y(2) + 1) + ")"; });
	return;
    }

    function update_highlight(property, value) {
	svg.selectAll(".histrect")
	    .transition()
	    .duration(0)
	    .attr("opacity", function(d) {
		if ( d[property] == value ) { return 1.0; }
		else { return 0.3; } });
    }

    function no_highlight() {
	svg.selectAll(".histrect")
	    .transition()
	    .duration(0)
	    .attr("opacity", 1.0);
    }

    $(".bar").tipsy({
	html: true,
	gravity: "s",
	title: function() {
	    var tteam = tipdata[this.__data__["team"]]["team"];
	    var topp = tipdata[this.__data__["opp"]]["team"];
	    var tmonth = this.__data__["date"].slice(4, 6);
	    var tday = this.__data__["date"].slice(6, 8);
	    var tyear = this.__data__["date"].slice(0, 4);
	    var trecs = this.__data__["recs"];
	    var tyards = this.__data__["yards"];
	    var ttds = this.__data__["tds"];

	    return "<span style='font: 15px sans-serif'><strong>" + tteam + " vs. " + topp + "</strong><br>" +
		tmonth + "/" + tday + "/" + tyear + "<br>" +
		trecs + " rec " + tyards + " yards " + ttds + " TD</span>";
	}
    });
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
