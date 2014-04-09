var csmr = require('./amqpTopicConsumer');

var conf = {host: "bx75", port: 5672};
csmr.configure(conf, function() {
  console.log("Ready.");
  csmr.registerFn("task_queue", function(msg, cb) {
    if(!!msg.count) {
      console.log("Msg: %d", msg.count);
      if(msg.count % 1000 === 1) {
        csmr.sendMsg("statusUpdate", "Thousand messages, Yay!");
      }
    } else {
      console.log("Msg: " + JSON.stringify(msg, null, 2));
    }
    cb();
  });
});
