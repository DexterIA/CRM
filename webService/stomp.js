var Stomp = require('stomp-client'),
  destination = '/queue/TestQueue',
  ip = '192.168.43.217',
  client = new Stomp(ip, 61613, 'admin', 'admin');

client.connect(function() {
  console.log('Server listen ' + ip + destination);
  client.subscribe(destination, function(body) {
    console.log('Message:', body);
  });
});