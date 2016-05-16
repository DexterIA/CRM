var http = require('http'),
  addCustomer = require('./resources/addCustomer'),
  getCustomers = require('./resources/getCustomers'),
  checkAuth = require('./resources/checkAuth'),

  /**
   * Функция для преобразования входных данных
   * о клиенте, к данным, которые хранятся в CRM
   * @param {Object} data - данные, которые необходимо преобразовать
   * @returns {Object} - преобразованный объект клиента
   */
  customerData = function (data) {
    // TODO реализовать, при необходимости
    return data;
  };

const PORT = 8081,
  url = 'mongodb://localhost:27017/CRM';

/**
 * Функция предобработки всех запросов - всё попадает в неё
 * в зависимости от метода и url - выполняем тот или иной запрос к БД
 * @param {Object} request - объект запроса
 * @param {Object} response - объект ответа
 */
function handleRequest(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  /*var meta = {
   requestUrl: request.url,
   requestMethod: request.method,
   requestHeaders: request.headers,
   requestData: request.data
   };*/

  // Дальше велосипед, просьба слабонервным не смотреть
  if (request.method === 'GET') {
    switch (request.url) {
      case '/CRM/getCustomers':
        getCustomers(url, function (res) {
          response.end(JSON.stringify(res));
        });
        break;
    }
  }
  if (request.method === 'POST') {
    switch (request.url) {
      case '/CRM/addCustomer':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          addCustomer(url, customerData(JSON.parse(chunk.toString())), function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/CRM/checkAuth':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          checkAuth(url, JSON.parse(chunk.toString()), function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
    }
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT);
});