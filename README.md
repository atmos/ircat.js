ircat.js
================

I figured [irccat][irccat] would be easy to implement in [node.js][node] as a means of learning more about it.

It's not impressive but it should run just fine, it has a little json API sorta thing now..

You need the latest version of [node.js][node], 0.1.90.

Running the Bot
===============

    % bin/ircat -u mysuperbot

Sending Stuff to the Bot
========================

    % bin/client --help
    Usage: /Users/atmos/p/ircat.js/bin/client [option]

    Available options:
      -h, --help                  Shows help sections
      -m, --message MESSAGE       The message to send
      -c, --channel channel       The channel to message
      -j, --join CHANNEL          The channel to join
      -p, --password [PASSWORD]   The channel password
          --port [PORT]           The bot's listener port
    % bin/client -j ircat.js
    'Sent {"action":"joinChannel","message":"","port":"4568","hostname":"127.0.0.1","channel":"ircat.js"}'
    % bin/client -c ircat.js -m "dudeududu"
    'Sent {"action":"messageChannel","message":"dudeududu","port":"4568","hostname":"127.0.0.1","channel":"ircat.js"}'
    % bin/client -j atmos2                 
    'Sent {"action":"joinChannel","message":"","port":"4568","hostname":"127.0.0.1","channel":"atmos2"}'
    % bin/client -c atmos2 -m "dudude"
    'Sent {"action":"messageChannel","message":"dudude","port":"4568","hostname":"127.0.0.1","channel":"atmos2"}'

Running from kiwi
=================

    % kiwi install ircat

    var kiwi  = require('kiwi')
    var ircat = kiwi.require('ircat')

    var server  = new ircat.create({username: 'superatmos', port: 4567})
    ...
    server.run()

[node]: http://nodejs.org
[irccat]: http://github.com/webs/irccat
