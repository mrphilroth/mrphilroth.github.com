// Top SVG
var topMargin = {top: 20, right: 40, bottom: 30, left: 20},
topWidth = 800 - topMargin.left - topMargin.right,
topHeight = 250 - topMargin.top - topMargin.bottom,
topBarWidth = Math.floor(topWidth / 30) - 1,
titleHeight = 65 - topMargin.top - topMargin.bottom;

var titlesvg = d3.select("body").append("svg")
    .attr("width", topWidth + topMargin.left + topMargin.right)
    .attr("height", titleHeight + topMargin.top + topMargin.bottom)
    .attr("class", "titlesvg")
    .append("g")
    .attr("transform", "translate(" + topMargin.left + "," + topMargin.top + ")");

var titletext = titlesvg.append("text")
    .attr("dx", "3.9em")
    .attr("dy", ".4em")
    .attr("fill", "#000")
    .style("font-size", "36px")
    .style("font", "300 Helvetica Neue")
    .text("NBA Past and Future Payrolls");

var subtitletext = titlesvg.append("text")
    .attr("dx",  "7.0em")
    .attr("dy", "2.2em")
    .attr("fill", "#666")
    .style("font-size", "16px")
    .style("font", "300 Helvetica Neue")
    .text("Click on teams and players for details. Data courtesy of Basketball Reference.");

// The axes for the top plot
var topX = d3.scale.ordinal()
    .rangeBands([topBarWidth / 2, topWidth + topBarWidth / 2], 0, 0);

var topY = d3.scale.linear()
    .range([topHeight, 0]);

var topYAxis = d3.svg.axis()
    .scale(topY)
    .orient("right")
    .tickSize(-topWidth)
    .tickFormat(function(d) { return Math.round(d / 1e6) + "M"; });

// An SVG element with a bottom-right origin.
var topsvg = d3.select("body").append("svg")
    .attr("width", topWidth + topMargin.left + topMargin.right)
    .attr("height", topHeight + topMargin.top + topMargin.bottom)
    .append("g")
    .attr("transform", "translate(" + topMargin.left + "," + topMargin.top + ")");

// A sliding container to hold the bars by team
var teamCons = topsvg.append("g")
    .attr("class", "teamCons");

// A sliding container to hold the current payrolls
var currTeamCons = topsvg.append("g")
    .attr("class", "currTeamCons");

// Position colors
var posdict = {0:'NA', 1:'PG', 2:'SG', 3:'SF', 4:'PF', 5:'C'};
var poscolors = ["#bcbd22", "#17becf", "#1f77b4", "#c977a2", "#d62728", "#2ca02c"];
var poscolor = d3.scale.ordinal()
    .domain([0, 1, 2, 3, 4, 5])
    .range(poscolors);


var allteams = ["ATL", "BOS", "CHA", "CHI", "CLE", "DAL", "DEN", "DET", "GSW",
		"HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "BRK",
		"NOP", "NYK", "OKC", "ORL", "PHI", "PHO", "POR", "SAC", "SAS",
		"TOR", "UTA", "WAS"]

var teamcolors = {
    "ATL":"#D21033", "BOS":"#05854C", "CHA":"#29588B", "CHI":"#D4001F",
    "CLE":"#9F1425", "DAL":"#006AB5", "DEN":"#4393D1", "DET":"#006BB6",
    "GSW":"#FFC33C", "HOU":"#CC0000", "IND":"#FFC225", "LAC":"#EE2944",
    "LAL":"#F5AF1B", "MEM":"#001B41", "MIA":"#B62630", "MIL":"#00330A",
    "MIN":"#015287", "BRK":"#000000", "NOP":"#0095CA", "NYK":"#2E66B2",
    "OKC":"#0075C1", "ORL":"#077ABD", "PHI":"#0068B3", "PHO":"#FF7A31",
    "POR":"#E1393E", "SAS":"#000000", "SAC":"#743389", "TOR":"#CD1041",
    "UTA":"#001D4D", "WAS":"#004874" };

var teamnames = {
    "ATL":"Atlanta Hawks", "BOS":"Boston Celtics", "CHA":"Charolette Bobcats",
    "CHI":"Chicago Bulls", "CLE":"Cleveland Cavaliers", "DAL":"Dallas Mavericks",
    "DEN":"Denver Nuggets", "DET":"Detroit Pistons", "GSW":"Golden State Warriors",
    "HOU":"Houston Rockets", "IND":"Indiana Pacers", "LAC":"Los Angeles Clippers",
    "LAL":"Los Angeles Lakers", "MEM":"Memphis Grizzlies", "MIA":"Miami Heat",
    "MIL":"Milwaukee Bucks", "MIN":"Minnesota Timberwolves", "BRK":"Brooklyn Nets",
    "NOP":"New Orleans Pelicans", "NYK":"New York Knicks", "OKC":"Oklahoma City Thunder",
    "ORL":"Orlando Magic", "PHI":"Philadelphia 76ers", "PHO":"Phoenix Suns",
    "POR":"Portland Trailblazers", "SAS":"San Antonio Spurs", "SAC":"Sacramento Kings",
    "TOR":"Toronto Raptors", "UTA":"Utah Jazz", "WAS":"Washington Wizards" };

var salarycaps = {
    1998:26900000, 1999:30000000, 2000:34000000, 2001:35500000, 2002:42500000,
    2003:40270000, 2004:43840000, 2005:43870000, 2006:49500000, 2007:53100000,
    2008:55600000, 2009:58680000, 2010:57700000, 2011:58044000, 2012:58000000,
    2013:58000000, 2014:58697000, 2015:58697000, 2016:58697000, 2017:58697000,
    2018:58697000 };

var botteam = "BRK"
var curryear = ""
var currplayer = ""
var currsalary = ""
var currposition = ""

d3.json("team_data.json", function(terror, tdata) { 

    d3.json("player_data.json", function(perror, pdata) {

	// Compute the extent of the data set in years.
	var year0 = d3.min(d3.keys(tdata));
	year1 = d3.max(d3.keys(tdata));
	year = 2014;

	// The highest yearly payroll
	var maxpay = d3.max(d3.values(tdata), function(year) {
    	    return d3.max(d3.values(year), function(teamnode) {
    		return teamnode['payroll'];
    	    });
	});

	// Update the payroll domains.
	topY.domain([0, maxpay]);

	// Update the sorted team domain
	var allteams = d3.keys(teamcolors);
	topX.domain(allteams.sort(function(a, b) { return tdata[year][a]['payroll'] - tdata[year][b]['payroll']; }));

	// Add an axis to show the payroll values.
	topsvg.append("g")
    	    .attr("class", "top y axis")
    	    .attr("transform", "translate(" + topWidth + ",0)")
	    .style("font-weight", "700")
	    .style("font-size", "12px")
	    .style("font", "sans-serif")
    	    .call(topYAxis)
    	    .selectAll("g")
    	    .filter(function(value) { return !value; })
    	    .classed("zero", true)

	// A label for the current year.
	var yeartext = topsvg.append("text")
	    .attr("class", "yeartext")
	    .attr("dx", "0.97em")
	    .attr("dy", ".6em")
	    .attr("fill", "#000")
	    .style("font-size", "42px")
	    .style("font", "300 Helvetica Neue")
    	    .text(format_year(year));

	// Add clickable arrows
	var leftarrow = topsvg.append("polygon")
	    .attr("points", "30,0 10,12 30,24")
	    .attr("fill", "#666")
	    .on("click", function() {
		year = Math.max(year0, year - 1);
		update(); });

	var rightarrow = topsvg.append("polygon")
	    .attr("points", "190,0 210,12 190,24")
	    .attr("fill", "#666")
	    .on("click", function() {
		year = Math.min(year1, year + 1);
		update(); });

	// Add the current payroll boxes
	var currTeamCon = teamCons.selectAll(".currteam")
    	    .data(allteams)
    	    .enter().append("g")
    	    .attr("class", "currteam")
    	    .attr("transform", function(team) { return "translate(" + topX(team) + ",0)"; });

	currTeamCon.selectAll("rect")
    	    .data(function(team) { return [tdata[2014][team]]; })
    	    .enter().append("rect")
    	    .attr("fill-opacity", 0)
    	    .attr("x", -topBarWidth / 2)
    	    .attr("width", topBarWidth)
    	    .attr("y", function(d) { return topY(d['payroll']); })
    	    .attr("height", function(d) { return topHeight - topY(d['payroll']); })
    	    .attr("fill", function(d) { return teamcolors[d['team']]; })
	    .on("click", function(d) { return display_team(d['team']); });

	// Add labeled rects for each team
	var teamCon = teamCons.selectAll(".team")
    	    .data(allteams)
    	    .enter().append("g")
    	    .attr("class", "team")
	    .attr("text-anchor", "middle")
	    .attr("fill", "#fff")
    	    .attr("transform", function(team) { return "translate(" + topX(team) + ",0)"; })

	teamCon.selectAll("rect")
    	    .data(function(team) { return [tdata[year][team]]; })
    	    .enter().append("rect")
    	    .attr("y", function(d) { return topY(d['payroll']); })
    	    .attr("x", -topBarWidth / 2)
    	    .attr("width", topBarWidth)
    	    .attr("height", function(d) { return topHeight - topY(d['payroll']); })
    	    .attr("fill", function(d) { return teamcolors[d['team']]; })
	    .on("click", function(d) { return display_team(d['team']); });

	// Add labels to show the team
	teamCon.append("text")
    	    .attr("y", topHeight - 4)
	    .style("font", "sans-serif")
	    .style("font-size", "10px")
    	    .text(function(team) { return team; })
	    .on("click", function(team) { return display_team(team); });

	// Draw the salary cap level
	var rightarrow = topsvg.append("polygon")
	    .attr("points", "190,0 210,12 190,24")
	    .attr("fill", "#666")
	    .on("click", function() {
		year = Math.min(year1, year + 1);
		update(); });

	function line_data(salarycap) {
	    var closex = topX.rangeExtent()[0];
	    var farx = topX.rangeExtent()[1] - topX.rangeBand();
	    return [[closex, salarycap], [farx, salarycap]];
	}

	// Salary cap line
	var cappath = topsvg.selectAll(".capline")
	    .data([line_data(salarycaps[year])])
	    .enter().append("svg:path")
	    .attr("class", "capline")
	    .attr("stroke", "black")
	    .attr("stroke-width", "3")
	    .attr("stroke-dasharray", "10,10")
    	    .attr("d", d3.svg.line()
		  .x(function(d) { return d[0]; })
		  .y(function(d) { return topY(d[1]); }));

	// Salary cap line
	var captext = topsvg.selectAll(".captext")
	    .data([line_data(salarycaps[year])[0]])
	    .enter().append("text")
	    .attr("x", function(d) { return d[0]; })
	    .attr("y", function(d) { return topY(d[1]) - 5; })
	    .attr("fill", "#000")
	    .style("font-size", "16px")
	    .style("font", "300 Helvetica Neue")
    	    .text("Salary Cap");

	// Allow the arrow keys to change the year.
	window.focus();
	d3.select(window).on("keydown", function() {
    	    switch (d3.event.keyCode) {
    	    case 37: year = Math.max(year0, year - 1); break;
    	    case 39: year = Math.min(year1, year + 1); break;
    	    }
    	    update();
	});

	// Transition when the year is changed
	function update() {
    	    if (!(year in tdata)) return;
    	    yeartext.text(format_year(year));

    	    if(year <= 2014) {
		topX.domain(allteams.sort(function(a, b) {
		    return tdata[year][a]['payroll'] - tdata[year][b]['payroll'];
		}));
    		var currfillop = 0;
    	    } else { 
		topX.domain(allteams.sort(function(a, b) {
		    return tdata[2014][a]['payroll'] - tdata[2014][b]['payroll'];
		}));
    		var currfillop = 0.4;
    	    }

	    teamCon.transition()
		.duration(750)
		.attr("transform", function(team) { return "translate(" + topX(team) + ", 0)"; });

	    teamCon.selectAll("rect")
		.data(function(team) { return [tdata[year][team]]; })
		.transition()
		.duration(750)
		.attr("y", function(d) { return topY(d['payroll']); })
		.attr("height", function(d) { return topHeight - topY(d['payroll']); });

	    currTeamCon.transition()
		.duration(750)
		.attr("transform", function(team) { return "translate(" + topX(team) + ", 0)"; });

	    currTeamCon.selectAll("rect")
		.data(function(team) { return [tdata[year][team]]; })
		.transition()
		.duration(750)
		.attr("fill-opacity", currfillop);

	    cappath.data([line_data(salarycaps[year])])
		.transition()
		.duration(750)
    		.attr("d", d3.svg.line()
		      .x(function(d) { return d[0]; })
		      .y(function(d) { return topY(d[1]); }));

	    captext.data([line_data(salarycaps[year])[0]])
		.transition()
		.duration(750)
		.attr("y", function(d) { return topY(d[1]) - 5; });
	}

	var botMargin = {top: 20, right: 40, bottom: 50, left: 20},
	botWidth = 800 - botMargin.left - botMargin.right,
	botHeight = 400 - botMargin.top - botMargin.bottom;


	var botX = d3.scale.ordinal()
    	    .rangeRoundBands([0, botWidth]);

	var botY = d3.scale.linear()
    	    .range([botHeight, 0]);

	var botXAxis = d3.svg.axis()
    	    .scale(botX)
    	    .tickSize(0)
    	    .tickPadding(6)
    	    .orient("bottom")
	    .tickFormat(format_year);

	var botYAxis = d3.svg.axis()
    	    .scale(botY)
    	    .orient("right")
    	    .tickSize(-botWidth)
    	    .tickFormat(function(d) { return Math.round(d / 1e6) + "M"; });

	// An SVG element with a bottom-right origin.
	var botsvg = d3.select("body").append("svg")
    	    .attr("width", botWidth + botMargin.left + botMargin.right)
    	    .attr("height", botHeight + botMargin.top + botMargin.bottom)
	    .attr("class", "botsvg")
    	    .append("g")
    	    .attr("transform", "translate(" + botMargin.left + "," + botMargin.top + ")");

	display_team(botteam);

	function display_team(team) {

	    var botteam = team;

	    // Highlight the newly selected team
	    teamCon.selectAll("rect")
		.data(function(team) { return [tdata[year][team]]; })
		.transition()
		.duration(0)
    		.attr("stroke", "black")
    		.attr("stroke-width", function(d) { return d['team'] == botteam ? 3 : 0; });

	    // Remove and regenerate the bottom graph
	    d3.select("body").selectAll(".botsvg").remove()
	    var botsvg = d3.select("body").append("svg")
    		.attr("width", botWidth + botMargin.left + botMargin.right)
    		.attr("height", botHeight + botMargin.top + botMargin.bottom)
		.attr("class", "botsvg")
    		.append("g")
    		.attr("transform", "translate(" + botMargin.left + "," + botMargin.top + ")");

	    var defs = botsvg.append("defs");

	    for ( var iopt = 0; iopt < 2; iopt++ ) {
		for ( var ipos = 0; ipos < 6; ipos++ ) {

		    var ipat = iopt * 6 + ipos;
		
		    var pat = defs.append("pattern")
			.attr("id", "stripe" + ipat)
			.attr("patternUnits", "userSpaceOnUse")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 10)
			.attr("height", 10);

		    pat.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 10)
			.attr("height", 10)
			.attr("fill", poscolor(ipos));

		    pat.append("path")
			.attr("d", "M0 0 L10 10 M0 10 M0 0")
			.attr("stroke", function(d) {
			    if (iopt == 0) { return "white"; }
			    else { return "black"; } } )
			.attr("stroke-width", 1);
		}
	    }

	    var legylevel = -10;

	    botsvg.append('rect')
		.attr('x', 475)
		.attr('y', legylevel)
		.attr('width', 17)
		.attr('height', 17)
		.style('fill', "url(#stripe2)" );

	    botsvg.append("text")
    		.attr("class", "legendheader")
		.attr("x", 500)
	    	.attr("y", legylevel + 15)
     		.text("Player Option");

	    botsvg.append('rect')
		.attr('x', 610)
		.attr('y', legylevel)
		.attr('width', 17)
		.attr('height', 17)
		.style('fill', "url(#stripe8)" );

	    botsvg.append("text")
    		.attr("class", "legendheader")
		.attr("x", 635)
	    	.attr("y", legylevel + 15)
     		.text("Team Option");

	    // The stack object with complicated player ordering
    	    var stack = d3.layout.stack()
    		.x(function(d) { return d.yr; })
    		.y(function(d) { return d.s; })
    		.order(function(data) {
		    // Sort by largest contract values on bottom
    		    var indices = d3.range(data.length),
    		    yearinds = d3.range(data[0].length),
		    totalsal = data.map(function(player) { return d3.sum(yearinds, function(yearind) { return player[yearind][1]; }); });
		    indices.sort(function(a, b) { return totalsal[b] - totalsal[a]; });

		    return indices;
    		});

	    // Create the layers
    	    var layers = stack(d3.values(pdata[team]));

    	    // The input to the two axes
	    var allyears = d3.keys(tdata).map(function(d) { return +d; });
	    var textyears = allyears.map(format_year);
    	    botX.domain(allyears);
    	    botY.domain([0, maxpay]);

    	    // Add an axis to show the payroll values.
    	    botsvg.append("g")
    		.attr("class", "bot y axis")
    		.attr("transform", "translate(" + botWidth + ",0)")
		.style("font-weight", "700")
		.style("font-size", "12px")
		.style("font", "sans-serif")
    		.call(botYAxis)
    		.selectAll("g")
    		.filter(function(value) { return !value; })
    		.classed("zero", true);

    	    // Add an axis to show the years.
    	    botsvg.append("g")
    		.attr("class", "bot x axis")
    		.attr("transform", "translate(-12," + (botHeight + 26) + ")")
		.style("font-weight", "700")
		.style("font-size", "12px")
		.style("font", "sans-serif")
    		.call(botXAxis)
		.selectAll("text")
		.attr("transform", function(d) { return "rotate(-80)"; });

	    // Grid lines to the bottom
	    botsvg.selectAll("line.horizontalGrid").data(botY.ticks()).enter()
		.append("line")
		.attr(
		    {
			"class" : "horizontalGrid",
			"x1" : 0,
			"x2" : botWidth,
			"y1" : function(d){ return botY(d); },
			"y2" : function(d){ return botY(d); },
			"fill" : "none",
			"shape-rendering" : "crispEdges",
			"stroke" : "#999",
			"stroke-width" : "1px"
		    });

	    // Add a box for player, team, and salary text information
    	    botsvg.append("rect")
    		.attr("class", "textbox")
    		.attr("x", -3)
    		.attr("y", -20)
    		.attr("width", 282)
    		.attr("height", 75)
		.attr("stroke", "#000")
		.attr("stroke-width", 2)
		.attr("fill", "#fff");

	    // Add text to contain the player information
	    teamtext = botsvg.append("text")
    		.attr("class", "teamtext")
    		.attr("dy", "0em")
		.style("font", "Helvetica Neue")
		.style("font-size", "24px")
		.attr("fill", "#000")
    		.text(teamnames[botteam]);


	    // A player's layer and its properties
    	    var layer = botsvg.selectAll(".layer")
    		.data(layers)
    		.enter().append("g")
    		.attr("class", "layer")
    		.style("fill", function(d) { return poscolor(d[0].pos); })
    		.on("mouseover", function(d) {
    		    curryear = d.yr;
    		    currsalary = d.s;
    		    currplayer = d[0].pn;
    		    currposition = posdict[d[0].pos];
    		    highlight_update(); });

	    // A player's rectangles and their properties
    	    var rect = layer.selectAll(".layer")
    		.data(function(d) { return d; })
    		.enter().append("rect")
    		.attr("x", function(d) { return botX(d.yr); })
    		.attr("width", botX.rangeBand())
    		.attr("y", function(d) { return botY(d.y0 + d.y); })
    		.attr("height", function(d) { return botY(d.y0) - botY(d.y0 + d.y); })
    		.attr("stroke", "black")
    		.attr("stroke-width", 1)
		.attr("fill", function(d, i) { 
		    if ( d.opt == 0 ) { return poscolor(d.pos); }
		    else {
			var ipat = d.pos;
			if ( d.opt > 2 ) ipat += 6;
			return "url(#stripe" + ipat + ")"; } } )
		.on("click", function(d) {
    		    currplayer = d.pn;
    		    currposition = posdict[d.pos];
    		    curryear = d.yr;
    		    currsalary = d.s;
    		    text_update();
    		    highlight_update(); });

    	    // Add text to contain the player information
    	    nametext = botsvg.append("text")
    		.attr("class", "playertext")
		.style("font", "Helvetica Neue")
		.style("font-size", "24px")
		.attr("fill", "#000")
    		.attr("dy", "1.0em") 
   		.text("");

    	    saltext = botsvg.append("text")
    		.attr("class", "playertext")
		.style("font", "Helvetica Neue")
		.style("font-size", "24px")
		.attr("fill", "#000")
    		.attr("dy", "2.0em")
    		.text("");

	    function text_update() {
		nametext.text(currplayer + "  (" + currposition + ")");
		if( currsalary != "" ) { saltext.text(format_year(curryear) + ": " + format_salary(currsalary)); }
		else { saltext.text(""); }
	    }

	    function highlight_update() {
		layer.selectAll("rect")
    		    .data(function(d) { return d; })
		    .transition()
		    .duration(0)
    		    .attr("stroke-width", function(d) { return d.pn == currplayer ? 3 : 1; } )
		    .attr("fill", function(d) { 
			if ( d.pn == currplayer ) { return "#333333"; };
			if ( d.opt == 0 ) { return poscolor(d.pos); }
			else {
			    var ipat = d.pos;
			    if ( d.opt > 2 ) ipat += 6;
			    return "url(#stripe" + ipat + ")"; } } );
	    };

	};

    });

});

function type(d) {
    d.year = +d.year;
    d.salary = +d.salary;
    d.position = +d.position;
    return d;
}

function format_year(year) {
    var prevyear = (year - 1).toString(),
    endofyear = (year % 100).toString();
    if ( endofyear.length == 1 ) { endofyear = "0" + endofyear; }
    return prevyear.toString() + "-" + endofyear.toString();
}

function format_salary(salary) {
    if ( salary > 1e6 ) { return "$" + Math.round(salary / 1.0e6) + "M"; }
    else if ( salary > 1e3 ) { return "$" + Math.round(salary / 1.0e3) + "k"; }
    return "$" + Math.round(salary);
}
