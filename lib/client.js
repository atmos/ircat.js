var sys = require('sys');
var tcp = require('tcp');
var log = sys.puts;

exports.client = function(channel, username, ipaddress, port, callback) {
  this.port       = port;
  this.ipaddress  = ipaddress;
  this.connection = tcp.createConnection(port, ipaddress);
  this.callback   = callback;
  this.channel    = channel;
  this.username   = username;
  this.run();
};

exports.client.prototype.message = function(data) {
  this.connection.write(data);
};

exports.client.prototype.run = function() {
  var username = this.username;
  var channel  = this.channel;
  var callback = this.callback;

  this.connection.setTimeout(0);
  this.connection.addListener('close', function() {
    log("The irc client disconnected");
    process.exit(0);
  });
  this.connection.addListener('connect', function() {
    log("Connected to freenode");
    this.write("NICK " + username + "\r\n");
    this.write("USER " + username + " * 8 :node.js inspired IRCCAT\r\n");
    this.write("JOIN #" + channel + "\r\n");
    callback();
  });

  this.connection.addListener('receive', function(data) {
    function log_response(data) {
      sys.puts(data);
      if(data.match(/NOTICE/)) { return; }
      log(data);
    }
    function log_response_code(val, data) {
      var ignore_codes = [ '001', '002', '003', '004', '005', '353', '366', '372' ];
      for(i = 0; i < ignore_codes.size; i++) {
        if(ignore_codes[i] == val) { log(data); }
      }
      return false;
    }
    if(matches = data.match(/:([^\s]+)!([^\s]+) PRIVMSG (\w+).*VERSION/)) {
      this.write("PRIVMSG " + matches[1] + " IRCCAT-Node.js,mbp,http://nodejs.org\r\n");
      log("VERSIONED from " + matches[1] + "!!!");
    } else if(matches = data.match(/:([^\s]+)!([^\s]+) PRIVMSG (\w+).*PING/)) {
      log("PINGED !!!" + data);
      this.write("PRIVMSG " + matches[1] + " PONG\r\n");
    } else if(matches = data.match(/:([^\s]+)!([^\s]+) PRIVMSG (#\w+) (.*)/)) {
      //client.write("PRIVMSG " + matches[3] + " " + matches[4] + "\r\n");
    } else if(data.match(/^:\w+\.freenode\.net 004/)) {
      log("Acquired username, logged in\n" + data);
    } else if(matches = data.match(/:([^\s]+)!([^\s]+) (PONG)\s(.*)/)) {
      log("pong received from " + matches[0] + "\n");
      this.write(data);
    } else if(data.match(/PING\s(.*)/)) {
      this.write(data);
    } else if (matches = data.match(/(\d{3}) \w+/)) {
      log_response_code(matches[1], data); // no op on spam from freenode's motd notice stuff
    } else {
      log_response(data);
    }
  });
};
