var client = require('./ircat/bot')
    net    = require('net'),
    sys    = require('sys'),
    log    = sys.puts;

exports.create = function(options) {
  return new Ircat(options)
}

function Ircat(options) {
  this.port     = options.port
  this.channels = [ ]
  this.hostname = options.hostname
  this.username = options.username
  this.password = options.password
  this.setupBot()
  this.setupListener()
}

Ircat.prototype.setupListener = function() {
  var bot = this.ircatBot
  var connection = net.createServer(function (socket) {
    socket.setEncoding("utf8")

    socket.addListener("connect", function () {
    })
    socket.addListener("data", function (data) {
      var payload = JSON.parse(data)
      socket.write("Received: " + data)
      bot.emit(payload.action, payload)
      socket.end()
    })
    socket.addListener("end", function () {
    })
  })
  this.connection = connection
}

Ircat.prototype.setupBot = function() {
  var server  = this
      options = {username: this.username, ip: '130.239.18.172', port: 6667}

  var bot = client.create(options, function() {
    server.connection.listen(server.port, server.hostname)
  })
  this.ircatBot = bot
}

Ircat.prototype.run = function() {
  this.ircatBot.run()
}
