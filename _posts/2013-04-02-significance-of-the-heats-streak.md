---
layout: post
title: "Significance of the Heat's 27 Game Win Streak"
---

While watching the Heat win 27 games in a row, I started to wonder
exactly how unlikely this streak was. Being a nerd, I put together
this plot:

![Streak Histogram](http://dl.dropbox.com/u/7474408/hist.png)

The 1971-72 Lakers and 2012-13 Heat are clearly visible as
outliers. Even the 22 game winning streak by the 2007-8 Rockets seems
to fit the trend. This If I was truly going to quantify how
implausible the Heat and Lakers streaks were, I needed to fit the data
to a model.

![Streak Histogram](http://dl.dropbox.com/u/7474408/hist_expfit.png)

Using a [least squares](http://en.wikipedia.org/wiki/Least_squares)
fit, I matched most of the data to the exponential decay shown in
red. The best fit parameters describe model a distribution of streaks
where each team has about a 50% chance to win an individual game
(48.8% to be exact). This makes lot of intuitive sense, but that
situation doesn't accuratly describe the long tail.

In order to model the tail, I subtracted the first model from the data
and did a linear least squares fit on the logarithm of the remaining
data. The result of that fit is shown in blue in the next plot.

![Streak Histogram](http://dl.dropbox.com/u/7474408/hist_allfits.png)

Now, the combination of both these models shown in green seems to
describe the full data (with the exception of the 71-72 Lakers and
12-13 Heat) quite well. The paramters for the second model describe a
situation where teams have a 72.8% chance to win. Teams that have
alaready won a couple games in a row are probably better than the
average team. So we would expect their chances of winning subsequent
games to be higher than 50%. This second model captures that.



