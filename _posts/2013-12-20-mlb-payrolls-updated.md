---
layout: post
title: "Updated MLB Payrolls"
category: data
---

Now that the winter meetings are complete and a lot of free agents
have signed, I thought now was as good a time as any to update my
visualization. All the latest contract information from [Baseball
Reference](http://www.baseball-reference.com/) is now reflected in
the charts. Click the image below for the goods:

<a href="/mlbpayrolls">
<img src="/images/mlbpayrolls_thumbnail.png"
     alt="MLB Payrolls Thumbnail"
     border="1" width="600">
</a>

I've made a couple updates.

Option years are now included in the team totals and are shown on each
team graph. The option year will be slightly transparent on that
bottom graph. There's many different types of options but they are all
treated the same here. In the future, I hope to make distinctions
between team, player, and vesting options as well as doing something
to reflect buyout amounts. I'll have to do a bunch of experimenting to
see how I can communicate that information clearly in the
visualization.

Most of the other changes are behind the scenes. The contract
information is now coming from the individual player's Baseball
Reference pages. I feel like this will make it a lot easier to update
the visualization with recent transactions. I've done a lot of the
data transformations behind the scenes in an effort to speed the page
load time. The data is now in some ugly json files, but they're
formatted exactly how [D3.js](http://d3js.org/) wants them.

I wanted to further beautify the whole thing, but the perfect is the
enemy of the good. I thought updating the contract data before the new
year was more important. Numbers and data are my specialty. Clearly
and cleanly communicating those numbers and data is more of an
interest and hobby of mine. If you've got great ideas about how to
make this prettier, easier to use, or better in any other way, contact
me on Twitter at [@mrphilroth](https://twitter.com/mrphilroth).

Next up, the [NBA version](http://mrphilroth.com/nbapayrolls/).

Enjoy!
