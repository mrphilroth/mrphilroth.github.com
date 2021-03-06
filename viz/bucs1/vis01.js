var currselection = "sacks";
var currteamyear = "none";

var textboxdata = {"sacks":"Sacks: As seen in the comparison between the Buccaneers' 2012 and 2013 quarterback sack trend lines, the team is on pace for a much improved final total in this key statistic, and is also keeping pace with the league leaders.",
		   "ff":"Forced Fumbles: The Buccaneers have shown modest improvement in forcing fumbles in 2013 and are also well above league average in this category.",
		   "interc":"Interceptions: While this was already a strength of the Buccaneers' defense in 2012, a two-interception game in Week Four has the 2013 team on a similar pace.",
		   "rushyds":"Rushing Defense: The 2012 defense set the bar high by leading the league in run defense.  While the 2013 team hasn't quite matched that production, it remains one of the best in the league.",
		   "passyds":"Passing Defense: This is where the Bucs expected to make their greatest improvement in 2013 after some significant offseason additions, and indeed their pass defense performance this season has been steady from week to week and roughly in the middle of the NFL pack.",
		   "points":"Points Allowed: As would be expected given the improvements noted in the previous graphs, the Buccaneers have set a much better pace during the first quarter of the 2013 season in regard to points allowed per game."};

var legenddata = [{"name":"2013 Tampa Bay Buccaneers",
		   "color":"#FF7A00",
		   "stroke-width":6},
		  {"name":"2012 Tampa Bay Buccaneers",
		   "color":"#A71930",
		   "stroke-width":6},
		  {"name":"Other 2013 Teams",
		   "color":"#444",
		   "stroke-width":2},
		  {"name":"Other 2012 Teams",
		   "color":"#999",
		   "stroke-width":2}];

var buttondata = [{"name":"Sacks\n ",
		   "variable":"sacks"},
		  {"name":"Forced Fumbles\n ",
		   "variable":"ff"},
		  {"name":"Interceptions\n ",
		   "variable":"interc"},
		  {"name":"Rushing Yards\nAllowed",
		   "variable":"rushyds"},
		  {"name":"Passing Yards\nAllowed",
		   "variable":"passyds"},
		  {"name":"Points Allowed\n ",
		   "variable":"points"}];

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

var margin = {top: 20, right: 40, bottom: 40, left: 70},
width = 890 - margin.left - margin.right,
height = 580 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues(d3.range(17).slice(1))
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(-width);

var line = d3.svg.line()
    .x(function(d) { return x(d["game"]); })
    .y(function(d) { return y(d[currselection]); });

var headersvg = d3.select("body").append("svg")
    .attr("width", width + margin.left)
    .attr("height", 40)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("class", "headerdiv");

var buttondiv = d3.select("body")
    .append("div")
    .attr("class", "buttondiv");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var textareadiv = d3.select("body").append("div")
    .attr("class", "textareadiv");

d3.csv("vis01_data.csv", accessor, function(error, data) {

    headersvg.append("text")
    	.attr("class", "headertext")
	.attr("dx", "3.7em")
	.attr("dy", ".9em")
	.text("CUMULATIVE DEFENSIVE STATS");

    buttondiv.selectAll("input")
	.data(buttondata)
	.enter().append("input")
	.attr("type", "button")
	.attr("class", function(d) {
	    if( d["variable"] == currselection ) { return "statbutton-selected"; }
	    else { return "statbutton"; }})
	.attr("value", function(d) { return d["name"]; })
	.on("click", function(d) {
	    currselection = d["variable"];
	    update_stat(d["variable"]); })
	.on("mouseover", function() { d3.select(d3.event.target).classed("statbutton-highlight", true); })
	.on("mouseout", function() { d3.select(d3.event.target).classed("statbutton-highlight", false); });

    x.domain(d3.extent(data, function(d) { return d.game; }));
    y.domain(d3.extent(data, function(d) { return d[currselection]; }));

    var dnest = d3.nest()
    	.key(function(d) { return d.teamyear; })
    	.map(data);

    svg.append("rect")
     	.attr("width", width)
     	.attr("height", height)
     	.attr("fill", "#ddd");

    svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis)

    svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis);

    svg.append("text")
	.attr("class", "xlabel")
	.attr("x", width - 10)
	.attr("y", height - 6)
	.text("Game");

    svg.selectAll(".teampath")
    	.data(d3.values(dnest))
	.enter()
	.append("path")
    	.attr("class", "teampath")
    	.attr("d", line)
    	.attr("fill", "none")
    	.attr("stroke", function(d) {
	    if( d[0]["team"] == "tam") {
		if ( d[0]['year'] == "2012" ) { return "#A71930"; }
		else { return "#FF7A00"; } }
	    else if ( d[0]['year'] == "2013" ) { return "#444"; }
	    else { return "#999"; } } )
    	.attr("stroke-width", function(d) {
	    if( d[0]["team"] == "tam") { return 6; }
	    else { return 2; } } )
        .on("mouseover", function(d) {
	    update_highlight(d[0]["teamyear"]);
	});

    svg.append("rect")
	.attr("width", 270)
	.attr("height", 100)
	.attr("fill", "#ddd");

    var legend = svg.selectAll('.legend')
        .data(legenddata)
        .enter()
	.append('g')
        .attr('class', 'legend');

    legend.append('rect')
        .attr('x', 20)
        .attr('y', function(d, i){ return i *  22 + 10;})
        .attr('width', 10)
        .attr('height', 10)
        .style('fill', function(d) { 
            return d["color"];
        });
    
    legend.append('text')
	.attr("class", "legendtext")
        .attr('x', 38)
        .attr('y', function(d, i){ return (i *  22) + 21;})
        .text(function(d){ return d["name"]; });

    textareadiv.append("p")
    	.attr("class", "textareap")
	.text(function() { return textboxdata[currselection]; });

    function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    $(".teampath").tipsy({
	html: true,
	gravity: "w",
	title: function() {
	    var d = tipdata[this.__data__[0]['team']];
	    var year = this.__data__[0]['year'];
	    var value = this.__data__[this.__data__.length - 1][currselection];
	    return "<span style='font: 15px sans-serif'><strong>" + d["city"] + "<br>" + 
		d["team"] + "</strong><br>" +
		year + "<br>" +
		"Total: " + numberWithCommas(value) + "</span>";
	}
    });

    function update_stat(stat) {

	var currselection = stat;

	buttondiv.selectAll("input")
	    .data(buttondata)
	    .transition()
	    .duration(0)
	    .attr("class", function(d) {
		if( d["variable"] == currselection ) { return "statbutton-selected"; }
		else { return "statbutton"; }});

	textareadiv.selectAll("p")
	    .transition()
	    .duration(0)
	    .text(function() { return textboxdata[currselection]; });

	y.domain(d3.extent(data, function(d) { return d[currselection]; }));

	svg.select(".y.axis")
	    .transition()
	    .duration(1000)
	    .call(yAxis);

	svg.selectAll(".teampath")
    	    .data(d3.values(dnest))
	    .transition()
	    .duration(1000)
    	    .attr("d", line);

	return;
    }

    function update_highlight(teamyear) {

	var currteamyear = teamyear;

	svg.selectAll(".teampath")
    	    .data(d3.values(dnest))
	    .transition()
	    .duration(0)
    	    .attr("stroke", function(d) {
		if( d[0]["team"] == "tam") { 
		    if ( d[0]['year'] == "2012" ) { return "#A71930" }
		    else { return "#FF7A00"; } }
		else if ( d[0]["teamyear"] == currteamyear ) { return "#000"; }
		else if ( d[0]['year'] == "2013" ) { return "#444"; }
		else { return "#999"; } } )
    	    .attr("stroke-width", function(d) {
		if( d[0]["team"] == "tam") {
		    if ( d[0]["teamyear"] == currteamyear ) { return 8; }
		    else { return 6; } }
		else if ( d[0]["teamyear"] == currteamyear ) { return 4; }
		else { return 2; } });

	return;
    }

});

function accessor(d) {

    d.ff = +d.ff;
    d.game = +d.game;
    d.year = +d.year;
    d.sacks = +d.sacks;
    d.interc = +d.interc;
    d.points = +d.points;
    d.rushyds = +d.rushyds;
    d.passyds = +d.passyds;
    return d;

}
