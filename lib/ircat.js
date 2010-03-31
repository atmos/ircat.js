var client = require('./ircat/bot')
    tcp    = require('tcp'),
    sys    = require('sys'),
    log    = sys.puts;

exports.create = function(options) {
  return new Ircat(options)
}

function Ircat(options) {
  this.port     = options.port
  this.channels = [ ]
  this.username = options.username
  this.password = options.password
  this.setupBot()
  this.setupListener()
}

Ircat.prototype.setupListener = function() {
  var bot = this.ircatBot
  var connection = tcp.createServer(function (socket) {
    socket.setEncoding("utf8");

    socket.addListener("connect", function () {
      log("Client connected");
    });
    socket.addListener("data", function (data) {
      var payload = JSON.parse(data)
      socket.write("Received: " + data)
      bot.emit(payload.action, payload)
      socket.close()
    });
    socket.addListener("end", function () {
      log("Client Disconnected ");
    });
  });
  this.connection = connection
}

Ircat.prototype.setupBot = function() {
  var server  = this
      options = {username: this.username, ip: '130.239.18.172', port: 6667}

  var bot = client.create(options, function() {
    server.connection.listen(server.port, "localhost")
  })
  this.ircatBot = bot
}

Ircat.prototype.run = function() {
  this.ircatBot.run()
}
