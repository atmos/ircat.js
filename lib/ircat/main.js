var sys    = require('sys');
var irccat = require('./server');

process.addListener('SIGINT', function() {
  sys.puts("Got a SIGINT");
  process.exit();
});

var listen_port = process.ARGV[2];
var username    = process.ARGV[3];
var channel     = process.ARGV[4];
var password    = process.ARGV[5];

if(listen_port != null && username != null && channel != null) {
  new irccat.server(channel, password, username, listen_port);
} else {
  var executable = [process.ARGV[0], process.ARGV[1]].join(' ')
  sys.puts(executable + " port username channel [password]");
}
