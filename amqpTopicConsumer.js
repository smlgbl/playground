/**
 * Created by samuel on 08.04.14.
 */
var amqp = require('amqp');

module.exports = (function() {
  var consumer = {
    configure: function(config, callback) {
      var connection = amqp.createConnection(config);
      var queues = [];
      connection.once('ready', function() {
        consumer.registerFn = function (queueName, fn) {
          connection.queue(queueName, {/*autoDelete: false,*/ passive:true}, function(q){
            q.bind('#');
            q.subscribe({ ack: true, prefetchCount: 0 }, function(message, headers, deliveryInfo, messageObject) {
              fn(message, function() {
                messageObject.acknowledge();
              });
            })
              .addCallback(function(ok) {
                consumerTag = ok.consumerTag;
                queues.push( {name: queueName, queue: q, consumerTag: ok.consumerTag } );
              });
          });
        };
        consumer.sendMsg = function (queueName, msg) {
          connection.publish(queueName, msg);
        };
        consumer.closeConnection = function(queueName) {
          queues.some(function(q, index) {
            if(q.name === queueName) {
              if(q.consumerTag) {
                q.queue.unsubscribe(q.consumerTag);
              }
              queues.splice(index, 1);
              return true;
            }
          });
          if(queues.length === 0) {
            connection.disconnect();
          }
        };
        callback(null);
      });
    },
    sendMsg: null,
    registerFn: null,
    closeConnection: null
  };
  return consumer;
})();
