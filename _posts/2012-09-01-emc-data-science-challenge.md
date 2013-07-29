---
layout: post
title: "EMC Source Code Classification Competition"
category: competition
competition: true
---

[code](https://github.com/mrphilroth/kaggle-emc) [leaderboard](http://www.kaggle.com/c/emc-data-science/leaderboard)

In this competition, EMC showed a Calibrated Naive Bayes benchmark on
the leaderboard but did not provide example code for how to generate
it. I started my research from that name and ended up learning
everything there is to know about the [Naive Bayes
Classifier](http://en.wikipedia.org/wiki/Naive_Bayes_classifier). I
then implemented it in scikit-learn. I spent some time trying to
optimize the results but only managed to slightly improve from the
benchmark. After the competition, I learned that the winners generated
extra features from the dataset before feeding that information to the
model. I stil wouldn't appreciate the importance of feature
engineering until much later.
