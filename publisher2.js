/**
 * Created by samuel on 4/3/14.
 */
var amqp = require('amqp');

module.exports = (function() {
  var pub = {
    configure: function(config, callback) {
      var connection = amqp.createConnection(config);
      connection.once('ready', function() {
        pub.sendMsg = function (queueName, msg) {
          connection.publish(queueName, JSON.stringify(msg));
        };
        pub.closeConnection = function() {
          connection.disconnect();
        };
        callback(null);
      });
    },
    sendMsg: null,
    closeConnection: null
  };
  return pub;
})();