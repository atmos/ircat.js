IRCCAT on NODEJS
================
I figured [irccat][irccat] would be easy to implement in [node.js][node] as a means of learning more about it.

It's not impressive but it should run just fine.

Running the Bot
===============

    % node main.js 7000 mysuperbot werd
    % node main.js 7001 mybetterbot e

Sending Stuff to the Bot
========================

    % echo "omgwtfbbq" | nc localhost 7000
    % echo "omgwerd" | nc localhost 7001

[node]: http://nodejs.org
[irccat]: http://github.com/webs/irccat
