var sys    = require('sys'),
    tcp    = require('tcp'),
    log    = sys.puts,
    events = require('events')

exports.create = function(options, callback) {
  return new IrcatBot(options, callback)
}

function IrcatBot(options, callback) {
  this.callback   = callback
  this.username   = options.username
  this.connection = tcp.createConnection(options.port, options.ip)

  this.setupCallbacks()
  events.EventEmitter(this, arguments)
}

IrcatBot.prototype = new events.EventEmitter
IrcatBot.prototype.setupCallbacks = function() {
  var bot = this
  this.addListener('messageUser', function(data) {
    bot.message("PRIVMSG " + data.username + " : " + data.message + "\r\n")
  })
  this.addListener('messageChannel', function(data) {
    bot.message("PRIVMSG #" + data.channel + " : " + data.message + "\r\n")
  })
  this.addListener('joinChannel', function(data) {
    if(data.password) {
      bot.message("JOIN #" + data.channel + " " + data.password + "\r\n")
    } else {
      bot.message("JOIN #" + data.channel + "\r\n")
    }
  })
}

IrcatBot.prototype.message = function(data) {
  this.connection.write(data)
}

IrcatBot.prototype.run = function() {
  var bot = this

  this.connection.setTimeout(0)
  this.connection.addListener('close', function() {
    log("The irc client disconnected")
    process.exit(0)
  })
  this.connection.addListener('connect', function() {
    this.write("NICK " + bot.username + "\r\n")
    this.write("USER " + bot.username + " * 8 :node.js inspired IRCCAT\r\n")
    bot.callback()
  })

  this.connection.addListener('data', function(data) {
    if(matches = data.match(/:([^\s]+)!([^\s]+) PRIVMSG (\w+).*VERSION/)) {
      this.write("PRIVMSG " + matches[1] + " IRCCAT-Node.js,mbp,http://nodejs.org\r\n")
      log("VERSIONED from " + matches[1] + "!!!")
    } else if(matches = data.match(/:([^\s]+)!([^\s]+) PRIVMSG (\w+).*PING/)) {
      log("PINGED !!!" + data)
      this.write("PRIVMSG " + matches[1] + " PONG\r\n")
    } else if(matches = data.match(/:([^\s]+)!([^\s]+) PRIVMSG (#\w+) (.*)/)) {
      //client.write("PRIVMSG " + matches[3] + " " + matches[4] + "\r\n")
    } else if(data.match(/^:\w+\.freenode\.net 004/)) {
      log("Acquired username, logged in\n" + data)
    } else if(matches = data.match(/:([^\s]+)!([^\s]+) (PONG)\s(.*)/)) {
      //log("pong received from " + matches[0] + "\n")
      this.write(data)
    } else if(data.match(/PING\s(.*)/)) {
      this.write(data)
    } else if (matches = data.match(/(\d{3}) \w+/)) {
      bot.log_response_code(matches[1], data) // no op on spam from freenode's motd notice stuff
    } else {
      bot.log_response(data)
    }
  })
}

IrcatBot.prototype.log_response = function(data) {
  if(data.match(/NOTICE/)) { return }
  log(data)
}
IrcatBot.prototype.log_response_code = function(val, data) {
  var ignore_codes = [ '001', '002', '003', '004', '005', '353', '366', '372' ];
  for(i = 0; i < ignore_codes.size; i++) {
    if(ignore_codes[i] == val) { log(data) }
  }
  return false
}
