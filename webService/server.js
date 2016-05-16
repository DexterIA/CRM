var http = require('http'),
  addCustomer = require('./resources/addCustomer'),
  getCustomers = require('./resources/getCustomers');

const PORT=8081;
const url = 'mongodb://localhost:27017/CRM';

function handleRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  var meta = {
    requestUrl: request.url,
    requestMethod: request.method,
    requestHeaders: request.headers,
    requestData: request.data
  };

  // Дальше велосипед, просьба слабонервным не смотреть
  if (request.method === 'GET') {
    switch (request.url) {
      case '/CRM/getCustomers':
        getCustomers(url, function (res) {
          response.end(JSON.stringify(res));
        });
        break
    }
  }
  if (request.method === 'POST') {
    switch (request.url) {
      case '/CRM/addCustomer':
        request.on('data', function(chunk) {
          console.log("Received body data:");
          console.log(chunk.toString());
          addCustomer(url, customerData(JSON.parse(chunk.toString())), function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
    }
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log("Server listening on: http://localhost:%s", PORT);
});

/**
 * Функция для преобразования входных данных
 * о клиенте, к данным, которые хранятся в CRM
 * @param data - данные, которые необходимо преобразовать
 * @returns {Object} - преобразованный объект клиента
 */
var customerData = function (data) {
  // TODO реализовать, при необходимости
  return data;
};