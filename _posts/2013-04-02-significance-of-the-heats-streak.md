---
layout: post
title: "Significance of the Heat's 27 Game Win Streak"
---

While watching the Heat win 27 games in a row, I started to wonder
exactly how unlikely this streak was. Being a nerd, I put together
this plot:

![Streak Histogram](http://dl.dropbox.com/u/7474408/histlin.png)

For each number of games, this plot shows how many times an NBA team
has had a winning streak of that length. Since there are so many more
streaks with a low number of games, the differences between all the
long streaks don't show up so well. We can fix that:

![Streak Histogram](http://dl.dropbox.com/u/7474408/hist.png)

Now, the y-axis is on a logarithmic scale. This allows the streaks
with single occurances (22, 27, 33) to show up clearly along with the
single and double game winning streaks (with 13020 and 6080 occurances
respectively).

The 1971-72 Lakers and 2012-13 Heat are very noticable as
outliers. Even the 22 game winning streak by the 2007-8 Rockets, while
very impressive, fits in with the general trend. The Heat and Lakers
are just way out there. In order to quantify just how implausible
their streaks are, the data must be fit to a model.

![Streak Histogram](http://dl.dropbox.com/u/7474408/hist_expfit.png)

For events with a random outcome, the number of streaks that will
occur can be modeled by an exponential decay. Using the [method of
least squares](http://en.wikipedia.org/wiki/Least_squares), I found
the paramters for that exponential decay that best fits the data. The
result is shown in red and describes a model where each team has about
a 50% chance to win an individual game (48.8% to be exact). This makes
lot of intuitive sense, but that situation doesn't accuratly describe
the long tail of streaks with many games.

In order to model the tail, I subtracted the exponential model in red
from the data in the tail. I then did a linear least squares fit on
the logarithm of the remaining data. The result of that fit is shown
in blue in the next plot.

![Streak Histogram](http://dl.dropbox.com/u/7474408/hist_allfits.png)

Now, the sum of both these models is shown in green and seems to
describe the full data (with the exception of the 71-72 Lakers and
12-13 Heat) quite well. The paramters for the second fit describe a
model where teams have a 72.8% chance to win individual games. Teams
that have alaready won a couple games in a row are probably better
than the average team. So we would expect their chances of winning
subsequent games to be higher than 50%. This second model captures
that.




