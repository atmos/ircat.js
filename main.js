var sys    = require('sys');
var irccat = require('./lib/server');

process.addListener('SIGINT', function() {
  sys.puts("Got a SIGINT");
  process.exit();
});
var listen_port = process.ARGV[2];
var username    = process.ARGV[3];
var channel     = process.ARGV[4];

new irccat.server(channel, username, listen_port);
