var http = require('http');

const PORT=8081;

function handleRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  var data = {
    requestUrl: request.url,
    requestMethod: request.method,
    requestHeaders: request.headers
  };
  response.end(JSON.stringify(data));
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});