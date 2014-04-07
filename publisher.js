var pub = require('./publisher2');

var data = {
  count: 0,
  raw: {xyz: 'mmmmmmmmmmmmmmmmmmmmmmmmmmm', bbb: 'lllllllllllllllllllllllllllllllllll'},
  abc: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
};

pub.configure({ host: "localhost", port: 5672 }, function() {
  var count = 0;
  setInterval(function() {
    data.count = count;
    pub.sendMsg("task_queue", data);
    count++;
    console.log(count);
  }, 1);
});
