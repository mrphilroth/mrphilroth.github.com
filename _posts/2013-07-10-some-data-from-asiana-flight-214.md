---
layout: post
title: "Some Data From Asiana Flight 214"
---

I was intrigued by the plot shown at Business Insider that displays
“Why Asiana Flight Crash Landed”. You can find it
[here](http://www.businessinsider.com/chart-why-asiana-flight-214-crashed-low-speed-2013-7). The
chart obviously doesn't really contain the full explanation for why
the crash occurred, but it does do a good job of showing the data
behind the loss of velocity near landing that has been described
throughout the media. I was inspired to take a deeper look into the
data. I used the same source at
[flightaware.com](http://flightaware.com/live/flight/AAR214/history/20130702/0730Z/RKSI/KSFO)
to get the data.

Specifically, I wanted to see if the ground speed profiles of flights
using the [Instrument Landing
System](http://en.wikipedia.org/wiki/Instrument_landing_system)
differed from those that didn't have that luxury. The ILS was out of
service on runway 28L at SFO on July 6th. I found reports that it had
been unavailable starting somewhere between June 1st and June 15th. To
be safe, I compared Asiana Flight 214 landings that occurred before
June 1st (with the ILS) to those that occurred after June 25th
(without the ILS).

![Speed Profiles](http://mrphilroth.com/images/sfoflight_speed.png)

As you can see, the landings occurring before June 1st varied greatly
in their velocity when approaching the runway. The flights leading up
to the July 6th crash actually had a very consistent profile. The
rapid loss of velocity shown in the July 6th flight is evident. The
May 5th flight stands out for landing without problems at the same
velocity as the July 6th flight. It does appear to have had a slower
velocity throughout its approach, whereas the July 6th flight
experienced rapid deceleration. Plotting the acceleration shows this
directly.

![Acceleration Profiles](http://mrphilroth.com/images/sfoflight_acceleration.png)

Here, the July 6th flight clearly stands out.

Based only on these charts, I might guess that the Asiana Flight 214s
that landed without assistance from the ILS were more consistent and
safer than those that used it. But I'd be hesitant to jump to that
conclusion without knowing a lot more about what goes in to landing a
Boeing 777. I look forward to the NTSB's final report about what
events lead to this incident. In the meantime, it sure was fun to play
with this little bit of data that's publicly available.

(Thanks to flightaware.com for the data and my brother for the idea
for this post.)