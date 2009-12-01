var sys = require('sys');
var tcp = require('tcp');
var log = sys.puts;
var client = require('./client');

exports.server = function(port, callback) {
  this.port       = port;
  this.connection = tcp.createServer(function (socket) {
    socket.setEncoding("utf8");

    socket.addListener("connect", function () {
      log("Client connected");
    });
    socket.addListener("receive", function (data) {
      matches = data.split(/:/, 2);
      if(matches[0] == null || matches[1] == null || matches[1].match(/^\s+$/)) {
        socket.send("Supply input with the channel name followed by the output\n");
        socket.send("#myircbot: do you like toast too?\n\n");
      } else {
        socket.send("Received: " + matches[0] + " " + matches[1] + "\n");
        irc_client.message("PRIVMSG " + matches[0] + " :" + matches[1] + "\r\n");
        socket.close();
      }
    });
    socket.addListener("eof", function () {
      log("Client Disconnected ");
    });
  });
  this.client     = new client.client(6667, '130.239.18.172', function() {
    connection.listen(port, "localhost");
  });
  var irc_client  = this.client;
  var connection  = this.connection;
  var port        = this.port;
};
