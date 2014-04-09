var pub = require('./amqpTopicConsumer');

var data = {
  count: 0,
  raw: {xyz: 'mmmmmmmmmmmmmmmmmmmmmmmmmmm', bbb: 'lllllllllllllllllllllllllllllllllll'},
  abc: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
};

pub.configure({ host: "bx75", port: 5672 }, function() {
  setInterval(function() {
    data.count++;
    pub.sendMsg("task_queue", data);
    console.log(JSON.stringify(data, null, 2));
  }, 1);
});
