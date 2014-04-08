/**
 * Created by samuel on 08.04.14.
 */
var amqp = require('amqp');

module.exports = (function() {
  var consumer = {
    configure: function(config, callback) {
      var connection = amqp.createConnection(config);
      var consumerTag;
      var queue;
      connection.once('ready', function() {
        consumer.registerFn = function (queueName, fn) {
          connection.queue(queueName, {/*autoDelete: false,*/ passive:true}, function(q){
            queue = q;
            q.bind('#');
            q.subscribe({ ack: true, prefetchCount: 0 }, function(message, headers, deliveryInfo, messageObject) {
              fn(message, function() {
                messageObject.acknowledge();
              });
            })
              .addCallback(function(ok) {
                consumerTag = ok.consumerTag;
              });
          });
        };
        consumer.closeConnection = function() {
          queue.unsubscribe(consumerTag);
          connection.disconnect();
        };
        callback(null);
      });
    },
    registerFn: null,
    closeConnection: null
  };
  return consumer;
})();
