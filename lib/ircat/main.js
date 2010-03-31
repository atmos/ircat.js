var sys   = require('sys');
var ircat = require('../ircat');

process.addListener('SIGINT', function() {
  sys.puts("Got a SIGINT");
  process.exit();
});

var port     = process.ARGV[2];
var username = process.ARGV[3];

if(port != null && username != null) {
  var options = { username: username, port: port }
  var server  = new ircat.create(options)
  server.run()

} else {
  var executable = [process.ARGV[0], process.ARGV[1]].join(' ')
  sys.puts(executable + " listen_port username");
}
