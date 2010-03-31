ircat.js
================

I figured [irccat][irccat] would be easy to implement in [node.js][node] as a means of learning more about it.

It's not impressive but it should run just fine, it has a little json API sorta thing now..

Running the Bot
===============

    % bin/ircat 7000 mysuperbot

Sending Stuff to the Bot
========================

    % echo "{\"action\": \"messageUser\", \"username\": \"me\", \"message\": \"foo bar baz\"}" | nc localhost 4567
    % echo "{\"action\": \"joinChannel\", \"channel\": \"myteamroom\"}" | nc localhost 4567
    % echo "{\"action\": \"messageChannel\", \"channel\": \"myteamroom\", \"message\": \"Build Successful\"}" | nc localhost 4567
    % echo "{\"action\": \"joinChannel\", \"channel\": \"myteamroom2\"}" | nc localhost 4567
    % echo "{\"action\": \"messageChannel\", \"channel\": \"myteamroom2\", \"message\": \"Build Failed\"}" | nc localhost 4567

Running from kiwi
=================

    % kiwi install ircat

    var kiwi  = require('kiwi')
    var ircat = kiwi.require('ircat')

    var server  = new ircat.create({username: 'superatmos', port: 4567)
    ...
    server.run()

[node]: http://nodejs.org
[irccat]: http://github.com/webs/irccat
