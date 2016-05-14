var http = require('http'),
  dispatcher = require('httpdispatcher');

const PORT=8081;

function handleRequest(request, response) {
  response.end('It Works!! Path Hit: ' + request.url);
  try {
    dispatcher.dispatch(request, response);
  } catch(err) {
    console.log(err);
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});

dispatcher.setStatic('resources');

dispatcher.onGet('CRM/sampleGET', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('CRM sample get');
});