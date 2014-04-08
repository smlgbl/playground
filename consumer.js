var csmr = require('./consumer2');

//amqp.connect('amqp://bx75').then(function(conn) {
//  conn.once('SIGINT', function() { conn.close(); });
//  return conn.createChannel().then(function(ch) {
//    var ok = ch.assertQueue('task_queue', {durable: true});
//    ok = ok.then(function() { ch.prefetch(1); });
//    ok = ok.then(function() {
//      ch.consume('task_queue', doWork, {noAck: false});
//      console.log(" [*] Waiting for messages. To exit press CTRL+C");
//    });
//    return ok;
//
//    function doWork(msg) {
//      var body = msg.content.toString();
//      console.log(" [x] Received '%s'", body);
//      var secs = body.split('.').length - 1;
//      //console.log(" [x] Task takes %d seconds", secs);
//      setTimeout(function() {
//        console.log(" [x] Done");
//        ch.ack(msg);
//      }, secs * 1000);
//    }
//  });
//}).then(null, console.warn);

csmr.configure({host: "bx75", port: 5672}, function() {
  console.log("Ready.");
  csmr.registerFn("task_queue", function(msg, cb) {
    if(!!msg.count) {
      console.log("Msg: %d", msg.count);
    } else {
      console.log("Msg: " + JSON.stringify(msg, null, 2));
    }
    cb();
  });
});
