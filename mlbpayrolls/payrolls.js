var topMargin = {top: 20, right: 40, bottom: 30, left: 20},
topWidth = 768 - topMargin.left - topMargin.right,
topHeight = 250 - topMargin.top - topMargin.bottom,
topBarWidth = Math.floor(topWidth / 30) - 1;

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

var botteam = "LAD"
var currplayer = ""
var currposition = ""

d3.csv("salary_cleaned.csv", type, function(error, data) { 

    // Group by year and team
    var tnest = d3.nest()
	.key(function(d) { return d.year; })
	.key(function(d) { return d.team; })
	.rollup(function(d) { return [{ "payroll":d3.sum(d, function(d) { return d.salary; }),
					"team":d[0].team }]; })
	.map(data);

    // Compute the extent of the data set in years.
    var year0 = d3.min(d3.keys(tnest));
    year1 = d3.max(d3.keys(tnest));
    year = 2013;

    // The highest yearly payroll (Congrats 2013 Dodgers!)
    var maxpay = d3.max(d3.values(tnest), function(year) {
	return d3.max(d3.values(year), function(teamnode) {
	    return teamnode[0]['payroll'];
	});
    });

    // Update the payroll domains.
    topY.domain([0, maxpay]);

    // Update the sorted team domain
    var allteams = d3.keys(teamcolors);
    topX.domain(allteams.sort(function(a, b) { return tnest[year][a][0]['payroll'] - tnest[year][b][0]['payroll']; }));

    // Add an axis to show the payroll values.
    topsvg.append("g")
    	.attr("class", "top y axis")
    	.attr("transform", "translate(" + topWidth + ",0)")
    	.call(topYAxis)
    	.selectAll("g")
    	.filter(function(value) { return !value; })
    	.classed("zero", true)

    // A label for the current year.
    var yeartext = topsvg.append("text")
	.attr("class", "yeartext")
	.attr("dx", "1.0em")
	.attr("dy", ".71em")
	.text("2013");

    // Add clickable arrows
    var leftarrow = topsvg.append("line")
	.attr("x1", 30)
	.attr("y1", 20)
	.attr("x2", 10)
	.attr("y2", 20)
	.attr("stroke", "black")
	.attr("stroke-width", 7)
	.attr("marker-end", "url(#triangle)")
	.on("click", function() {
	    year = Math.max(year0, year - 1);
	    update(); });

    var rightarrow = topsvg.append("line")
	.attr("x1", 150)
	.attr("y1", 20)
	.attr("x2", 170)
	.attr("y2", 20)
	.attr("stroke", "black")
	.attr("stroke-width", 7)
	.attr("marker-end", "url(#triangle)")
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
    	.data(function(team) { return tnest[2013][team]; })
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
    	.attr("transform", function(team) { return "translate(" + topX(team) + ",0)"; })

    teamCon.selectAll("rect")
    	.data(function(team) { return tnest[year][team]; })
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
    	.text(function(team) { return team; });

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
    	if (!(year in data)) return;
    	yeartext.text(year);

    	if(year <= 2013) {
	    topX.domain(allteams.sort(function(a, b) {
		return tnest[year][a][0]['payroll'] - tnest[year][b][0]['payroll'];
	    }));
    	    var currfillop = 0;
    	} else { 
	    topX.domain(allteams.sort(function(a, b) {
		return tnest[2013][a][0]['payroll'] - tnest[2013][b][0]['payroll'];
	    }));
    	    var currfillop = 0.4;
    	}

	teamCon.transition()
            .duration(750)
            .attr("transform", function(team) { return "translate(" + topX(team) + ", 0)"; })

	teamCon.selectAll("rect")
	    .data(function(team) { return tnest[year][team]; })
	    .transition()
	    .duration(750)
	    .attr("y", function(d) { return topY(d['payroll']); })
	    .attr("height", function(d) { return topHeight - topY(d['payroll']); });

	currTeamCon.transition()
            .duration(750)
            .attr("transform", function(team) { return "translate(" + topX(team) + ", 0)"; })

	currTeamCon.selectAll("rect")
	    .data(function(team) { return tnest[year][team]; })
	    .transition()
	    .duration(750)
	    .attr("fill-opacity", currfillop)
    }

    var botMargin = {top: 20, right: 40, bottom: 30, left: 20},
    botWidth = 768 - botMargin.left - botMargin.right,
    botHeight = 400 - botMargin.top - botMargin.bottom;

    var posdict = {0:'NA', 1:'P ', 2:'C ', 3:'1B', 4:'2B',
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

    var pnest = d3.nest()
    	.key(function(d) { return d.team; })
    	.key(function(d) { return d.player; })
    	.map(data);

    display_team(botteam);

    function display_team(team) {

	var botteam = team;

	// Highlight the newly selected team
	teamCon.selectAll("rect")
	    .data(function(team) { return tnest[year][team]; })
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

	// Add text to contain the player information
	teamtext = botsvg.append("text")
    	    .attr("class", "teamtext")
    	    .attr("dy", ".5em")
    	    .text(teamname[botteam]);

	// The stack object with complicated player ordering
    	var stack = d3.layout.stack()
    	    .x(function(d) { return d.year; })
    	    .y(function(d) { return d.salary; })
    	    .order(function(data) {
    		var indices = d3.range(data.length),
    		lastyear = data.map(function(player) {
    		    var yinds = d3.range(player.length);
    		    return d3.max(yinds, function(yind) { return player[yind][1] > 0 ? yind : 0; }); }),
    		lastsal = data.map(function(player, i) { return player[lastyear[i]][1]; });

    		indices.sort(function (a, b) { 
    		    if( lastyear[a] == lastyear[b] ) { return lastsal[b] - lastsal[a]; }
    		    else { return lastyear[b] - lastyear[a]; }
    		})
    		return indices;
    	    });

	// Create the layers
    	var layers = stack(d3.values(pnest[team]));

	// The input to the two axes
    	botX.domain(d3.set(data.map(function(d) { return d.year; })).values().sort());
    	botY.domain([0, maxpay]);

    	// Add an axis to show the payroll values.
    	botsvg.append("g")
    	    .attr("class", "bot y axis")
    	    .attr("transform", "translate(" + botWidth + ",0)")
    	    .call(botYAxis)
    	    .selectAll("g")
    	    .filter(function(value) { return !value; })
    	    .classed("zero", true);

    	// Add an axis to show the years.
    	botsvg.append("g")
    	    .attr("class", "bot x axis")
    	    .attr("transform", "translate(0," + botHeight + ")")
    	    .call(botXAxis);

	// Position colors
    	var poscolor = d3.scale.category10()
    	    .domain([7, 8, 3, 1, 4, 5, 9, 0, 2, 6])

	// A player's layer and its properties
    	var layer = botsvg.selectAll(".layer")
    	    .data(layers)
    	    .enter().append("g")
    	    .attr("class", "layer")
    	    .style("fill", function(d) { return poscolor(d[0].position); })
    	    .on("mouseover", function(d) {
		currplayer = d[0].player;
		currposition = posdict[d[0].position];
		display_player(); })
	    .on("click", function(d) {
		currplayer = d[0].player;
		currposition = posdict[d[0].position];
		display_player(); });

	// A player's rectangles and their properties
    	var rect = layer.selectAll(".layer")
    	    .data(function(d) { return d; })
    	    .enter().append("rect")
    	    .attr("x", function(d) { return botX(d.year); })
    	    .attr("width", botX.rangeBand())
    	    .attr("y", function(d) { return botY(d.y0 + d.y); })
    	    .attr("height", function(d) { return botY(d.y0) - botY(d.y0 + d.y); })
    	    .attr("stroke", "black")
    	    .attr("stroke-width", 1)
	    .attr("fill-opacity", 1);

    	// Add text to contain the player information
    	nametext = botsvg.append("text")
    	    .attr("class", "playertext")
    	    .attr("dy", "1.5em")
    	    .text("");

	// Highlight the new player
	function display_player() {

	    nametext.text(currposition + " " + currplayer);
	    
	    layer.selectAll("rect")
    		.data(function(d) { return d; })
		.transition()
		.duration(0)
    		.attr("stroke-width", function(d) { return d.player == currplayer ? 3 : 1; } )
		.attr("fill-opacity", function(d) { return d.player == currplayer ? 0.6 : 1; });
	};

    };

});

// Convert the numerical input to numbers
function type(d) {
    d.year = +d.year;
    d.salary = +d.salary;
    d.position = +d.position;
    return d;
}

