// Top SVG
var topMargin = {top: 20, right: 40, bottom: 30, left: 20},
topWidth = 900 - topMargin.left - topMargin.right,
topHeight = 250 - topMargin.top - topMargin.bottom,
topBarWidth = Math.floor(topWidth / 30) - 1,
titleHeight = 65 - topMargin.top - topMargin.bottom;
captionHeight = 30 - topMargin.top - topMargin.bottom;

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
    .text("MLB Past and Future Payrolls");

var subtitletext = titlesvg.append("text")
    .attr("dx",  "4.8em")
    .attr("dy", "2.2em")
    .attr("fill", "#666")
    .style("font-size", "16px")
    .style("font", "300 Helvetica Neue")
    .text("Click on teams and players for details. Data courtesy of Baseball Reference and Cot's Contracts.");

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

topsvg.append("svg:marker")
    .attr("id", "triangle")
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 0)
    .attr("refY", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 4)
    .attr("markerHeight", 3)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z");

var teamcolors = {
    "ARI":"#C51230", "ATL":"#01487E", "BAL":"#DF4601", "BOS":"#BD3039",
    "CHC":"#0E3386", "CHW":"#000000", "CIN":"#EB184B", "CLE":"#C51230",
    "COL":"#333366", "DET":"#10293F", "HOU":"#95322c", "KCR":"#000572",
    "LAA":"#CE1141", "LAD":"#005596", "MIA":"#00A5B1", "MIL":"#012143",
    "MIN":"#042462", "NYM":"#004685", "NYY":"#132448", "OAK":"#00483A",
    "PHI":"#CA1F2C", "PIT":"#FFB40B", "SDP":"#1C3465", "SEA":"#003166",
    "SFG":"#FB5B1F", "STL":"#C41E3A", "TBR":"#00285D", "TEX":"#01317B",
    "TOR":"#0067A6", "WSN":"#BA122B" };

var teamname = {
    "ARI":"Arizona Diamondbacks", "ATL":"Atlanta Braves", "BAL":"Baltimore Orioles", 
    "BOS":"Boston Red Sox", "CHC":"Chicago Cubs", "CHW":"Chicago White Sox",
    "CIN":"Cincinati Reds", "CLE":"Cleveland Indians", "COL":"Colorado Rockies",
    "DET":"Detroit Tigers", "HOU":"Houston Astros", "KCR":"Kansas City Royals",
    "LAA":"Los Angeles Angels", "LAD":"Los Angeles Dodgers", "MIA":"Miami Marlins",
    "MIL":"Milwaukee Brewers", "MIN":"Minnesota Twins", "NYM":"New York Mets", 
    "NYY":"New York Yankees", "OAK":"Oakland Athletics", "PHI":"Philadelphia Phillies",
    "PIT":"Pittsburgh Pirates", "SDP":"San Diego Padres", "SEA":"Seattle Mariners",
    "SFG":"San Francisco Giants", "STL":"St. Louis Cardinals", "TBR":"Tampa Bay Rays",
    "TEX":"Texas Rangers", "TOR":"Toronto Blue Jays", "WSN":"Washington Nationals" };

// Position colors
var poscolor = d3.scale.category10()
    .domain([7, 8, 3, 1, 4, 5, 9, 0, 2, 6])

var botteam = "NYY"
var currplayer = ""
var currposition = ""
var curryear = ""
var currsalary = ""

d3.json("team_data.json", function(terror, tdata) { 

    d3.json("player_data.json", function(perror, pdata) {

	// Compute the extent of the data set in years.
	var year0 = d3.min(d3.keys(tdata));
	year1 = d3.max(d3.keys(tdata));
	year = 2016;

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
    	    .style("font-size", "46px")
    	    .style("font", "300 Helvetica Neue")
    	    .text(year);

	// Add clickable arrows
	var leftarrow = topsvg.append("polygon")
    	    .attr("points", "30,0 10,12 30,24")
    	    .attr("fill", "#666")
    	    .on("click", function() {
    		year = Math.max(year0, year - 1);
    		update(); });

	var rightarrow = topsvg.append("polygon")
    	    .attr("points", "150,0 170,12 150,24")
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
    	    .data(function(team) { return [tdata[year][team]]; })
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

	// Allow the arrow keys to change the displayed year.
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
    	    yeartext.text(year);

    	    if(year <= 2016) {
    		topX.domain(allteams.sort(function(a, b) {
    		    return tdata[year][a]['payroll'] - tdata[year][b]['payroll'];
    		}));
    		var currfillop = 0;
    	    } else { 
    		topX.domain(allteams.sort(function(a, b) {
    		    return tdata[2016][a]['payroll'] - tdata[2016][b]['payroll'];
    		}));
    		var currfillop = 0.4;
    	    }

    	    teamCon.transition()
		.duration(750)
		.attr("transform", function(team) { return "translate(" + topX(team) + ", 0)"; })

    	    teamCon.selectAll("rect")
    		.data(function(team) { return [tdata[year][team]]; })
    		.transition()
    		.duration(750)
    		.attr("y", function(d) { return topY(d['payroll']); })
    		.attr("height", function(d) { return topHeight - topY(d['payroll']); });

    	    currTeamCon.transition()
		.duration(750)
		.attr("transform", function(team) { return "translate(" + topX(team) + ", 0)"; })

    	    currTeamCon.selectAll("rect")
    		.data(function(team) { return [tdata[year][team]]; })
    		.transition()
    		.duration(750)
    		.attr("fill-opacity", currfillop)
	}

	var botMargin = {top: 40, right: 40, bottom: 50, left: 20},
	botWidth = 900 - botMargin.left - botMargin.right,
	botHeight = 420 - botMargin.top - botMargin.bottom;

	var posdict = {0:'NA', 1:'P', 2:'C', 3:'1B', 4:'2B',
    		       5:'3B', 6:'SS', 7:'OF', 8:'DH'};

	var botX = d3.scale.ordinal()
    	    .rangeRoundBands([0, botWidth]);

	var botY = d3.scale.linear()
    	    .range([botHeight, 0]);

	var botXAxis = d3.svg.axis()
    	    .scale(botX)
    	    .tickSize(0)
    	    .tickPadding(6)
    	    .orient("bottom");

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

    	    // The stack object with complicated player ordering
    	    var stack = d3.layout.stack()
    		.x(function(d) { return d.yr; })
    		.y(function(d) { return d.s; })
    		.order(function(data) {

    		    var indices = d3.range(data.length),
    		    lastyear = data.map(function(player) {
    			var yinds = d3.range(player.length);
    			return d3.max(yinds, function(yind) { return player[yind][1] > 0 ? yind : 0; }); }),
    		    totalsal = data.map(function(player) { return d3.sum(player, function(pyear) { return pyear[1]; }); })

    		    indices.sort(function (a, b) { 
    			if( lastyear[a] == lastyear[b] ) { return totalsal[b] - totalsal[a]; }
    			else { return lastyear[b] - lastyear[a]; }
    		    })

    		    return indices;
    		});

    	    // Create the layers
    	    var layers = stack(d3.values(pdata[team]));

    	    // The input to the two axes
	    botX.domain(d3.keys(tdata).map(function(d) { return +d; }));
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
    		.attr("transform", "translate(0," + botHeight + ")")
    		.style("font-weight", "700")
    		.style("font-size", "12px")
    		.style("font", "sans-serif")
    		.call(botXAxis);

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
    		.attr("fill-opacity", function(d) {
    		    if( d.o > 0 ) { return 0.5; }
		    else { return 1.0; } })
    		.on("click", function(d) {
    		    currplayer = d.pn;
    		    currposition = posdict[d.pos];
    		    curryear = d.yr;
    		    currsalary = d.s;
    		    text_update();
    		    highlight_update(); });

    	    // Add a box for player, team, and salary text information
    	    botsvg.append("rect")
    		.attr("class", "textbox")
    		.attr("x", -3)
    		.attr("y", -40)
    		.attr("width", 282)
    		.attr("height", 75)
    		.attr("stroke", "#000")
    		.attr("stroke-width", 2)
    		.attr("fill", "#fff");

    	    // Add text to contain the team information
    	    teamtext = botsvg.append("text")
    		.attr("class", "teamtext")
    		.attr("dy", "-0.8em")
    		.style("font", "Helvetica Neue")
    		.style("font-size", "24px")
    		.attr("fill", "#000")
    		.text(teamname[botteam]);

    	    // Add text to contain the player information
    	    nametext = botsvg.append("text")
    		.attr("class", "playertext")
    		.style("font", "Helvetica Neue")
    		.style("font-size", "24px")
    		.attr("fill", "#000")
    		.attr("dy", "0.2em")
    		.text("");

    	    // Add text to contain the salary information
    	    saltext = botsvg.append("text")
    		.attr("class", "playertext")
    		.style("font", "Helvetica Neue")
    		.style("font-size", "24px")
    		.attr("fill", "#000")
    		.attr("dy", "1.2em")
    		.text("");

	    // Add explanation text
	    var captiontext = botsvg.append("text")
		.attr("dx", "24.3em")
		.attr("dy", "22.9em")
		.attr("fill", "#666")
		.style("font-size", "16px")
		.style("font", "300 Helvetica Neue")
		.text("Option years are shaded and included in team totals.");

    	    function text_update() {
    		nametext.text(currplayer + "  (" + currposition + ")");

    		if( currsalary != "" ) { saltext.text(curryear + ": " + format_salary(currsalary)); }
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
    			return poscolor(d.pos); })
    	    };

	};

    });

});

function format_salary(salary) {
    if ( salary >= 1e6 ) { return "$" + Math.round(salary / 1.0e6) + "M"; }
    else if ( salary > 1e3 ) { return "$" + Math.round(salary / 1.0e3) + "k"; }
    return "$" + Math.round(salary);
}
