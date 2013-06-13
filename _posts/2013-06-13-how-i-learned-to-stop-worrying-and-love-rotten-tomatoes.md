---
layout: post
title: "How I Learned to Stop Worrying and Love Rotten Tomatoes"
---

Maybe not love it... but use it.

It's a Friday night and my wife and I are searching for a movie we're
both interested in. I've loved using the
[Metacritic](http://www.metacritic.com) website for a long time, so
I'm tapping away on the [Movie Finder by
Metacritic](https://itunes.apple.com/us/app/movie-finder-by-metacritic/id422164713?mt=8)
app on my iPhone. My wife, who doesn't have brand loyalty when it
comes to movie review aggregators, is tapping away on the [Movies by
Flixster, with Rotten
Tomatoes](https://itunes.apple.com/us/app/movies-by-flixster-rotten/id284235722?mt=8)
app on her iPad. Every time without fail, she'd get a better result
quicker. It was pretty obvious that her app was better. But I refused
to switch. I couldn't support [Rotten
Tomatoes](http://www.rottentomatoes.com).

“Why not?”, you may ask. Well when you consider the algorithms that
the two sites use to find their final movie score it seems like
Metacritic is clearly superior. Rotten Tomatoes evaluates all the
reviews it can find and classifies them as either positive or
negative. Their final score is simply the percentage of the reviews
that are positive. Metacritic converts every review to a score on a
scale from 0-100. Their final score is an average of those scores that
favors the more influential reviewers.

To me, when Rotten Tomatoes reduces each review to either positive or
they are discarding a lot of information. Metacritic is taking a more
scientific approach that uses all the information that's available to
them.

So, how do the results of those two approaches compare? Well, I took a
look:

![Rotten Tomatoes versus Metacritic](https://dl.dropboxusercontent.com/u/7474408/movieratings_scatter.png)

In this plot, a dot shows each movie that has a corresponding Rotten
Tomatoes and Metacritic score. The dots turn red as more movies pile
up on a spot. There's also a least squares fit plotted that shows a
good relationship between the two scores. A couple things jump
out. First, the Rotten Tomatoes scores span the whole range from 0 to
100. Very few Metacritic scores drop below 10 or rise above 90. This
makes sense as a truly bad movie has a good chance of having
absolutely no positive reviews, but it will be almost impossible for
every critic to give it their absolutely lowest score.

The flatter slope of the fit around 50% also makes sense given the two
methods. Assume each movie has a hidden actual score that each review
is trying to measure with some error. If that score is middling but
ultimately disappointing (say around 45%) then the Metacritic average
of all the reviews will also be around that number. But if each review
is accurate in measuring the 45%, they could all be determined to be
negative and the Rotten Tomatoes score would drop to much lower than
that. As the “actual” score rises, the Rotten Tomatoes score would
quickly switch from negative to positive. This is explains why the
Rotten Tomatoes scores sweep through that middle territory quickly and
the fit is flatter.

Another interesting thing to look at are the outliers. Most of them
are obscure movies that have a low number of reviews but not
all. Here's a list the ten movies where the actual Metacritic score
is farthest away from the fit prediction (the absolute farthest is
listed first):

| Title | Year | Rotten Tomatoes | Metacritic |
| ----- | ---- | :-------------: | :--------: |
| Extreme Days | 2001 | [43](http://www.rottentomatoes.com/m/extreme_days/) | [17](http://www.metacritic.com/movie/extreme-days)
| Paa | 2009 | [60](http://www.rottentomatoes.com/m/1221483-paa/) | [30](http://www.metacritic.com/movie/paa)
| Half Baked | 1998 | [29](http://www.rottentomatoes.com/m/half_baked/) | [16](http://www.metacritic.com/movie/half-baked)
| I'm the One That I Want | 2000 | [59](http://www.rottentomatoes.com/search/?search=i'm+the+one+that+i+want) | [81](http://www.metacritic.com/movie/im-the-one-that-i-want)
| To Save a Life | 2010 | [33](http://www.rottentomatoes.com/m/to_save_a_life/) | [19](http://www.metacritic.com/movie/to-save-a-life)
| The Viral Factor | 2012 | [56](http://www.rottentomatoes.com/search/?search=the+viral+factor) | [32](http://www.metacritic.com/movie/the-viral-factor)
| Screwed | 2000 | [13](http://www.rottentomatoes.com/m/1097242-screwed/) | [7](http://www.metacritic.com/movie/screwed)
| One Man's Hero | 1999 | [38](http://www.rottentomatoes.com/search/?search=one+man's+hero) | [24](http://www.metacritic.com/movie/one-mans-hero)
| Drop Dead Gorgeous | 1999 | [45](http://www.rottentomatoes.com/m/drop_dead_gorgeous/) | [28](http://www.metacritic.com/movie/drop-dead-gorgeous)
| The Majestic | 2001 | [42](http://www.rottentomatoes.com/m/majestic/) | [27](http://www.metacritic.com/movie/the-majestic)

Ultimately, what stands out is how well related the two scores
are. Good movies are generally good and bad movies are generally bad
on each scale. Ninety percent of the Metacritic scores are within
+/-10 points from the fit prediction (that range is shown on the plot
with the thinner dashed lines). When you're measuring something as
fuzzy as the critical response to a movie with just one number, that
seems pretty good.

So I've finally been convinced to use the app with the better
interface, even if it displays the Rotten Tomatoes scores. All it took
to change my mind was a plot.

[(code)](https://github.com/mrphilroth/website-movieratings)
