var http = require('http'),
  addClient = require('./resources/addClient'),
  getClients = require('./resources/getClients'),
  checkAuth = require('./resources/checkAuth'),
  findClient = require('./resources/findClient'),
  addOrder = require('./resources/addOrder'),
  findOrders = require('./resources/findOrders'),
  changeOrderStatus = require('./resources/changeOrderStatus'),

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
 * Функция предобработки всех запросов - всё запросы попадают в неё
 * в зависимости от метода и url - выполняем тот или иной запрос к БД
 * @param {Object} request - объект запроса
 * @param {Object} response - объект ответа
 */
function handleRequest (request, response) {
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Headers': '*'
  });

  // Дальше велосипед, просьба слабонервным не смотреть
  if (request.method === 'GET') {
    switch (request.url) {
      case '/CRM/getClients':
        getClients(url, function (res) {
          response.end(JSON.stringify(res));
        });
        break;
    }
  }
  if (request.method === 'POST') {
    switch (request.url) {
      case '/CRM/addClient':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          addClient(url, customerData(JSON.parse(chunk.toString())), function (res) {
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
      case '/CRM/findClient':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          findClient(url, JSON.parse(chunk.toString()), function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/CRM/addOrder':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          addOrder(url, JSON.parse(chunk.toString()), function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/CRM/findOrders':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          var filter = JSON.parse(chunk.toString()) || {};
          findOrders(url, filter, function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/CRM/changeOrderStatus':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          changeOrderStatus(url, JSON.parse(chunk.toString()), function (res) {
            response.end(JSON.stringify(res));
          });
        });
        break;
    }
  }

  if (request.method === 'OPTIONS') {
    response.end();
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT);
});