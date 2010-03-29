var client = require('./client'),
    tcp    = require('tcp'),
    sys    = require('sys'),
    log    = sys.puts;

exports.server = function(channel, password, username, port, callback) {
  this.port       = port;
  this.channel    = channel;
  this.password   = password;
  this.username   = username;

  var channel     = this.channel;
  var username    = this.username;

  this.connection = tcp.createServer(function (socket) {
    socket.setEncoding("utf8");

    socket.addListener("connect", function () {
      log("Client connected");
    });
    socket.addListener("data", function (data) {
      irc_client.message("PRIVMSG #" + channel + " :" + data + "\r\n");
      socket.close();
    });
    socket.addListener("end", function () {
      log("Client Disconnected ");
    });
  });
  this.client     = new client.client(channel, password, username, '130.239.18.172', 6667, function() {
    connection.listen(port, "localhost");
  });
  var irc_client  = this.client;
  var connection  = this.connection;
  var port        = this.port;
};
