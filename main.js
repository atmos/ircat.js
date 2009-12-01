var sys    = require('sys');
var irccat = require('./lib/server');

process.addListener('SIGINT', function() {
  sys.puts("Got a SIGINT");
  process.exit();
});

new irccat.server(7000);
