---
layout: post
title: "Significance of the Heat's 27 Game Win Streak"
---

While watching the Heat win 27 games in a row, I started to wonder
exactly how unlikely this streak was. Being a nerd, I gathered the
data and put together this plot:

![Streak Histogram](http://dl.dropbox.com/u/7474408/histlin.png)

For each number of games, this plot shows how many times an NBA team
has had a winning streak of that length. Since there are so many more
streaks with a low number of games, the differences between all the
long streaks don't show up so well. That can be fixed:

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
the parameters for that exponential decay that best fits the data. The
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
12-13 Heat) quite well. The sum of the red and blue lines will look
weird on a log-scale plot. The two lines won't stack on top of each
other as in a normal plot. The parameters for the second fit describe a
model where teams have a 72.8% chance to win individual games. Teams
that have alaready won a couple games in a row are probably better
than the average team. So one would expect their chances of winning
subsequent games to be higher than 50%. This second model captures
that.

The combined model can now be treated as a [probability distribution
function](http://en.wikipedia.org/wiki/Probability_distribution). Once
normalized, it assigns a probability to each possible streak
length. Of course the results it produces will only be as good as the
little model I've fit to the data, but it's probably good enough to
provide a reasonable estimate.

So what are the results? The probability that a streak will be 27
games or longer is 0.019% (or 190 times per million attempts). 33
games or longer is 0.0028%. (or 28 times per million attempts). There
are on average 529 win streaks per season. That means there's a 9.6%
chance that any season will have a 27 game win streak or more. And
there's a 1.5% chance that any season will have a 33 game win streak
or longer.

In summary, the Heat's (and even more so the Laker's) streak was
pretty unlikely. Pretty unlikely indeed.

