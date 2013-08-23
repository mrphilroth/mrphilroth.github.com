---
layout: post
title: "MLB Past and Future Payrolls"
category: data
---

I'm a big fan of Bill Simmons' [BS
Report](http://espn.go.com/espnradio/podcast/archive?id=2864045)
podcast. Some of my favorite parts are when Bill talks about trade
possibilities between teams. It's always fun to try and step into a
general manager's shoes and imagine what they can and can't do to
improve their teams. During one of these shows, Jonah Keri was on, and
he and Bill were doing a pretty good job of breaking down the options
that some MLB teams had in the coming years. It seemed like Jonah had
a great command of the restrictions on some of these teams and even
what the free agent market is going to look like at various points in
the future. I found myself trying to picture and organize all this
information in my head. I was inspired to map all this out in a big
visualization.

Also, I just wanted to find out how screwed my beloved Phillies are in
the coming years.

The image below is a link to the visualization:

<a href="/mlbpayrolls">
<img src="/images/mlbpayrolls_thumbnail.png"
     alt="MLB Payrolls Thumbnail"
     border="1" width="600" height="413">
</a>

The first thing you can do is to click the arrows or use the left and
right arrow keys to scroll through past and future years. I collected
data back to 1998, when the Baltimore Orioles led the league in
payroll with players like Mike Mussina and Rafael Palmeiro. Scrolling
back to the present day shows a lot of story lines: how the Yankees
expanded their payroll way faster than the rest of the league in the
early 2000s, fire sales of the Marlins in 2006 and to a lesser extent
in 2013, and the Dodgers' rapid leapfrog to post the absolute largest
payroll this year.

When you scroll to future years, the 2013 payroll hangs around as a
ghost image to provide a rough benchmark of what you might expect the
team to eventually pay. The solid bars drop down to show the contracts
that the teams are currently obligated to pay in that particular
year. Here, you can clearly see the Dodgers and Angels leading the
league in earmarked money over the next few seasons. Going all the way
to 2023 shows that the Reds have actually signed the longest contract
so far.

Clicking on a team in that upper chart will show a time series of that
team's payrolls over the years broken out by player. For example,
clicking on the Reds shows large green boxes way out into the
future. Clicking on any of those boxes will show you that first
baseman Joey Votto can expect to be paid $25M to play baseball in the
year 2023. Each color in these bottom charts corresponds to a
position.

There are some caveats here. I grabbed the data from [Baseball
Reference](http://www.baseball-reference.com/) who gets their data
from [Cot's Baseball
Contracts](http://www.baseballprospectus.com/compensation/cots/). As
far as I can tell, the data is not updated very regularly because I
know of a couple contract extensions that have not made it onto their
pages yet. Those contracts won't be displayed here.

Also, when a player misses a whole season to injury, that player's
salary doesn't show up on the Baseball Reference page. I took care to
add the biggest instances of these missed seasons back into the data
by hand, but I'm sure I didn't get them all. There's also the question
of whether those salaries really should be here. I believe most teams
take out insurance policies on players and thus they aren't
responsible for paying injured players. Since I have no details about
that sort of thing, I just tried to include all the missed seasons I
could find.

Lastly, teams sometimes agree to pay part of a player's salary when
they trade them away to another team. A good recent example of that is
the Cubs paying most of Alfonso Soriano's salary while he plays for
the Yankees. The Baseball Reference site has good information about
these arrangements in the current and future years. But the site does
not have information about past arrangements. Again, I took care of a
couple of the biggest discrepancies by hand (hello Mike Hampton!), but
I'm sure there are lots still in there.

Despite those couple issues, I believe this chart does a great job of
showing a snapshot of the MLB economy. I learned a lot just clicking
around the whole thing while building it. I think it's a great
indication that you're building something interesting if you
constantly get distracted playing with the thing instead of working on
it.

UPDATE: After getting picked up by
[Fangraphs](http://www.fangraphs.com/blogs/link-visualizing-the-changes-in-mlb-payrolls/)
and
[Deadspin](http://deadspin.com/this-interactive-graphic-on-mlb-payrolls-is-amazing-1184880875),
I got a lot of feedback. Most of it involved the words 'Bobby
Bonilla'. [His
payments](http://www.celebritynetworth.com/articles/entertainment-articles/bobby-bonilla-baseball-contract/)
now show up in the charts. Also, the full salaries of some players
that were traded this year were being counted against both teams. This
happened when there wasn't good information about what the teams
agreed on in the trade, so I ended up just splitting the salaries
evenly between the two. That whole process made the Dodgers drop from
the top spot! I guess they'll have to content themselves with making
the jump next year.

