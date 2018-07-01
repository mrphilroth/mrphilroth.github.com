var margin = {top: 120, right: 70, bottom: 0, left: 50},
width = 900 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

var curryear = 2013;
var currstat = "wpa";

var statdict = {"wpa":{"name":"+WPA", "text":"Advanced NFL Stats ranks linebackers by +WPA, or total win probability added. Lavonte David is the second best linebacker in the league this year according to this statistic."},
		"epa":{"name":"+EPA", "text":"Advanced NFL Stats also compiles +EPA or the expected points added. Lavonte David is the fifth best linebacker in the league this year according to this statistic."},
		"sk":{"name":"Sacks", "text":"Lavonte David's five sacks ranks highly in the league this year."},
		"qbhit":{"name":"QB Hits", "text":"Of the top 10 linebackers in the NFL in QB hits, David is the only one who plays in a 4-3 defensive front. The others are all 3-4 pass-rushing linebackers."},
		"tkl":{"name":"Tackles", "text":"Lavonte David's 46 tackles is sixth best in the league this year among linebackers."},
		"int":{"name":"Interceptions", "text":"Each top linebacker on the Bucs has one interception this year so far."},
		"pd":{"name":"Pass Defense", "text":"Lavonte David and Mason Foster have 5 and 4 pass defenses respectively."}};

var legenddata = [{"name":"Top 100 Linebackers",
		   "color":"#89765f",
		   "stroke":"#000000",
		   "stroke-width":1.5},
		  {"name":"Pro Bowl Linebackers",
		   "color":"#FF7A00",
		   "stroke":"#000000",
		   "stroke-width":1.5},
		  {"name":"Tampa Bay Buccaneer",
		   "color":"#A71930",
		   "stroke":"#000000",
		   "stroke-width":1.5}];

var teamdata = {"DAL":{"city":"Dallas", "team":"Cowboys"},
		"NYG":{"city":"New York", "team":"Giants"},
		"PHI":{"city":"Philadelphia", "team":"Eagles"},
		"CLV":{"city":"Cleveland", "team":"Browns"},
		"NE":{"city":"New England", "team":"Patriots"},
		"TEN":{"city":"Tennessee", "team":"Titans"},
		"PIT":{"city":"Pittsburgh", "team":"Steelers"},
		"DEN":{"city":"Denver", "team":"Broncos"},
		"SF":{"city":"San Francisco", "team":"49ers"},
		"GB":{"city":"Green Bay", "team":"Packers"},
		"SEA":{"city":"Seattle", "team":"Seahawks"},
		"ARZ":{"city":"Arizona", "team":"Cardinals"},
		"WAS":{"city":"Washington", "team":"Redskins"},
		"NO":{"city":"New Orleans", "team":"Saints"},
		"IND":{"city":"Indianapolis", "team":"Colts"},
		"CHI":{"city":"Chicago", "team":"Bears"},
		"ATL":{"city":"Atlanta", "team":"Falcons"},
		"KC":{"city":"Kansas City", "team":"Chiefs"},
		"MIA":{"city":"Miami", "team":"Dolphins"},
		"HST":{"city":"Houston", "team":"Texans"},
		"SL":{"city":"St. Louis", "team":"Rams"},
		"DET":{"city":"Detroit", "team":"Lions"},
		"CAR":{"city":"Carolina", "team":"Panthers"},
		"JAX":{"city":"Jacksonville", "team":"Jaguars"},
		"MIN":{"city":"Minnesota", "team":"Vikings"},
		"BUF":{"city":"Buffalo", "team":"Bills"},
		"NYJ":{"city":"New York", "team":"Jets"},
		"CIN":{"city":"Cincinnati", "team":"Bengals"},
		"BLT":{"city":"Baltimore", "team":"Ravens"},
		"SD":{"city":"San Diego", "team":"Chargers"},
		"OAK":{"city":"Oakland", "team":"Raiders"},
		"TB":{"city":"Tampa Bay", "team":"Buccaneers"}};

var colors = {"default":"#89765f",
	      "probowl":"#FF7A00",
	      "buc":"#A71930"};

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var r = d3.scale.linear()
    .range([0, 40]);

var headersvg = d3.select("body").append("svg")
    .attr("width", width + margin.left)
    .attr("height", 40)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("class", "headerdiv");

headersvg.append("text")
    .attr("class", "headertext")
    .attr("x", "145")
    .attr("y", "40")
    .text("PRO BOWL LINEBACKERS");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var statbuttondiv = d3.select("body")
    .append("div")
    .attr("class", "statbuttondiv");

var yearsvg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", 110)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + 10 + ")");

var textareadiv = d3.select("body").append("div")
    .attr("class", "textareadiv");

d3.csv("vis04_data.csv", accessor, function(error, data) {

    var ynest = d3.nest()
    	.key(function(d) { return d.year; })
    	.key(function(d) { return d.rank; })
    	.map(data);

    var year0 = d3.min(d3.keys(ynest));
    year1 = d3.max(d3.keys(ynest));

    var order = d3.range(100)
	.sort(function(a, b) { return ynest[curryear][b][0][currstat] - ynest[curryear][a][0][currstat]; });

    x.domain([0, 20]);
    y.domain([0, 5]);
    r.domain([0, d3.max(d3.values(ynest[curryear]), function(d) { return d[0][currstat]; })]);

    var circ = svg.selectAll(".dot")
	.data(d3.range(100))
	.enter()
	.append("g")
	.attr("class", "circlegroup");
    
    circ.append("circle")
	.attr("class", function(d) {
	    if( ynest[curryear][d][0]["team"] == "TB" ) { return "circleclass circleclass-highlight"; }
	    else { return "circleclass"; }})
	.attr("cx", function(d) { return x(order.indexOf(d) % 20); })
	.attr("cy", function(d) { return y(Math.floor(order.indexOf(d) / 20)); })
	.attr("r", function(d) { return r(ynest[curryear][d][0][currstat]); })
	.attr("fill", function(d) { 
	    if( ynest[curryear][d][0]["probowl"] == 1 ) { return colors["probowl"]; }
	    else if ( ynest[curryear][d][0]["team"] == "TB" ) { return colors["buc"]; }
	    else { return colors["default"] }})
    	.on("click", function(d) {
	    if( d3.event.target.classList.contains("circleclass-highlight") ) {
		d3.select(d3.event.target).classed("circleclass-highlight", false); 
	    } else {
		d3.select(d3.event.target).classed("circleclass-highlight", true); }});

    var explaintext = svg.append("text")
	.attr("class", "legendtext")
	.attr("x", -10)
	.attr("y", -79)
    	.text("Click circles to add/remove highlight:");

    var legend = svg.selectAll('.legend')
        .data(legenddata)
        .enter()
	.append('g')
        .attr('class', 'legend');

    legend.append('rect')
        .attr('x', function(d, i){ return i *  170 + 270;})
        .attr('y', -90)
        .attr('width', 14)
        .attr('height', 14)
	.attr('stroke', function(d) { return d['stroke']; })
	.attr('stroke-width', function(d) { return d['stroke-width']; })
        .style('fill', function(d) { return d["color"]; });
    
    legend.append('text')
	.attr("class", "legendtext")
        .attr('x', function(d, i){ return i *  170 + 290;})
        .attr('y', -77)
        .text(function(d){ return d["name"]; });

    statbuttondiv.selectAll("input")
    	.data(d3.keys(statdict))
    	.enter().append("input")
    	.attr("type", "button")
    	.attr("class", function(d) {
    	    if( d == currstat ) { return "statbutton selbutton statbutton-selected"; }
    	    else { return "statbutton selbutton"; }})
    	.attr("value", function(d) { return statdict[d]["name"]; })
    	.on("click", function(d) {
    	    currstat = d;
    	    update_stat(d); })
    	.on("mouseover", function() { d3.select(d3.event.target).classed("statbutton-highlight", true); })
    	.on("mouseout", function() { d3.select(d3.event.target).classed("statbutton-highlight", false); });

    var yearylevel = 65;
    var yearxlevel = 355;
    var xdiff = 60;

    var yearexplaintext = yearsvg.append("text")
	.attr("class", "legendtext")
	.attr("x", -10)
	.attr("y", 23)
    	.text("Click arrows or use arrow keys to scroll through years:");

    var yeartext = yearsvg.append("text")
	.attr("class", "yeartext")
	.attr("x", yearxlevel - 45)
	.attr("y", yearylevel + 12)
	.attr("fill", "#000")
	.style("font-size", "46px")
	.style("font", "300 Helvetica Neue")
    	.text(curryear);

    var leftarrow = yearsvg.append("polygon")
	.attr("points", (yearxlevel - xdiff) + "," + (yearylevel - 12) + " " + (yearxlevel - xdiff - 20) + "," + (yearylevel) + " " + (yearxlevel - xdiff) + "," + (yearylevel + 12))
	.attr("fill", "#000")
	.on("click", function() {
	    curryear = Math.max(year0, curryear - 1);
	    update_year(curryear); });

    var rightarrow = yearsvg.append("polygon")
	.attr("points", (yearxlevel + xdiff) + "," + (yearylevel - 12) + " " + (yearxlevel + xdiff + 20) + "," + (yearylevel) + " " + (yearxlevel + xdiff) + "," + (yearylevel + 12))
	.attr("fill", "#000")
	.on("click", function() {
	    curryear = Math.min(year1, curryear + 1);
	    update_year(curryear); });

    textareadiv.append("p")
    	.attr("class", "textareap")
	.text(function() { return statdict[currstat]["text"]; });

    // Allow the arrow keys to change the displayed year.
    window.focus();
    d3.select(window).on("keydown", function() {
    	switch (d3.event.keyCode) {
    	case 37: curryear = Math.max(year0, curryear - 1); break;
    	case 39: curryear = Math.min(year1, curryear + 1); break;
    	}
    	update_year(curryear);
    });

    function update_stat(stat) {

	var currstat = stat;

	order = d3.range(100).sort(function(a, b) { return ynest[curryear][b][0][currstat] - ynest[curryear][a][0][currstat]; });

	r.domain([d3.min(d3.values(ynest[curryear]), function(d) { return d[0][currstat]; }), 
     		  d3.max(d3.values(ynest[curryear]), function(d) { return d[0][currstat]; })]);

	textareadiv.selectAll("p")
	    .transition()
	    .duration(0)
	    .text(function() { return statdict[currstat]["text"]; });

	statbuttondiv.selectAll("input")
	    .transition()
	    .duration(0)
	    .attr("class", function(d) {
		if( d == currstat ) { return "selbutton statbutton statbutton-selected"; }
		else { return "selbutton statbutton"; }});

	circ.selectAll("circle")
	    .transition()
	    .duration(1000)
	    .attr("cx", function(d) { return x(order.indexOf(d) % 20); })
	    .attr("cy", function(d) { return y(Math.floor(order.indexOf(d) / 20)); })
	    .attr("r", function(d) { return r(ynest[curryear][d][0][currstat]); });

	return;
    }

    function update_year(year) {

	var curryear = year;

	order = d3.range(100).sort(function(a, b) { return ynest[curryear][b][0][currstat] - ynest[curryear][a][0][currstat]; });

	r.domain([d3.min(d3.values(ynest[curryear]), function(d) { return d[0][currstat]; }), 
     		  d3.max(d3.values(ynest[curryear]), function(d) { return d[0][currstat]; })]);

	circ.selectAll("circle")
	    .transition()
	    .duration(1000)
	    .attr("class", function(d) {
		if( ynest[curryear][d][0]["team"] == "TB" ) { return "circleclass circleclass-highlight"; }
		else { return "circleclass"; }})
	    .attr("cx", function(d) { return x(order.indexOf(d) % 20); })
	    .attr("cy", function(d) { return y(Math.floor(order.indexOf(d) / 20)); })
	    .attr("r", function(d) { return r(ynest[curryear][d][0][currstat]); })
	    .attr("fill", function(d) { 
		if( ynest[curryear][d][0]["probowl"] == 1 ) { return colors["probowl"]; }
		else if ( ynest[curryear][d][0]["team"] == "TB" ) { return colors["buc"]; }
		else { return colors["default"] }});

	yeartext.transition()
	    .duration(0)
	    .text(curryear);

	return;
    }

    $(".circleclass").tipsy({
	html: true,
	gravity: "s",
	title: function() {
	    var ind = this.__data__;
	    var pstat = ynest[curryear][ind][0][currstat];
	    var pname = ynest[curryear][ind][0]["pname"];
	    var pteam = ynest[curryear][ind][0]["team"];
	    var pcity = teamdata[pteam]["city"];
	    var pnick = teamdata[pteam]["team"];

	    return "<span style='font: 16px sans-serif'><strong>" + pname + "</strong></span><br>" +
		"<span style='font: 14px sans-serif'>" + pcity + "</span><br>" +
		"<span style='font: 14px sans-serif'>" + pnick + "</span><br>" +
		"<span style='font: 14px sans-serif'>" + statdict[currstat]["name"] + ": " +  pstat + "</span>";;
	}
    });
});

function accessor(d) {
    d.year = +d.year;
    d.epa = +d.epa;
    d.wpa = +d.wpa;
    d.asst = +d.asst;
    d.ff = +d.ff
    d.g = +d.g;
    d.int = +d.int;
    d.pd = +d.pd;
    d.qbhit = +d.qbhit;
    d.sc = +d.sc;
    d.sk = +d.sk;
    d.skyd = +d.skyd;
    d.tf = +d.tf;
    d.tkl = +d.tkl;
    d.tklloss = +d.tklloss;
    d.probowl = +d.probowl;
    d.firstteam = +d.firstteam;
    d.secondteam = +d.secondteam;

    return d;
}
