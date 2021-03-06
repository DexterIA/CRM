var http = require('http'),
  addClient = require('./resources/addClient'),
  getClients = require('./resources/getClients'),
  checkAuth = require('./resources/checkAuth'),
  findClient = require('./resources/findClient'),
  addOrder = require('./resources/addOrder'),
  findOrders = require('./resources/findOrders'),
  changeOrderStatus = require('./resources/changeOrderStatus'),
  getClientByOrderId = require('./resources/getClientByOrderId'),

  /**
   * Функция для преобразования входных данных
   * о клиенте, к данным, которые хранятся в CRM
   * @param {Object} data - данные, которые необходимо преобразовать
   * @returns {Object} - преобразованный объект клиента
   */
  customerData = function (data) {
    // TODO реализовать, при необходимости
    return data;
  },

  /**
   * Возвращает объект с хедэрами для Allow Cross Origin
   * @param {Object} req - объект запроса
   * @returns {Object} - хедэры
   */
  getCommonHeaders = function (req) {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': req.headers['access-control-request-headers'] ? req.headers['access-control-request-headers'] : 'x-requested-with',
      'Access-Control-Allow-Methods': req.headers['access-control-request-method'] ? req.headers['access-control-request-method'] : 'POST, GET, PUT, DELETE, OPTIONS'
    };
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

  // Дальше велосипед, просьба слабонервным не смотреть
  if (request.method === 'GET') {
    if (request.url === '/CRM/getClients') {
      getClients(url, function (res) {
        response.writeHead(200, getCommonHeaders(request));
        response.end(JSON.stringify(res));
      });
    } else if (request.url.indexOf('/CRM/getClient?orderId=') !== -1) {
      var orderId = request.url.substring('/CRM/getClient?orderId='.length, request.url.length);
      getClientByOrderId(url, orderId, function (res) {
        response.writeHead(200, getCommonHeaders(request));
        response.end(JSON.stringify(res));
      });
    } else {
      response.writeHead(404, {'content-type': 'text/html'});
      response.end();
    }
  }
  if (request.method === 'POST') {
    switch (request.url) {
      case '/CRM/addClient':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          var json = parseJSON(chunk);
          if (json) {
            addClient(url, customerData(JSON.parse(chunk.toString())), function (res) {
              response.writeHead(200, getCommonHeaders(request));
              response.end(JSON.stringify(res));
            });
          }
        });
        break;
      case '/CRM/checkAuth':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          var json = parseJSON(chunk);
          if (json) {
            checkAuth(url, JSON.parse(chunk.toString()), function (res) {
              response.writeHead(200, getCommonHeaders(request));
              response.end(JSON.stringify(res));
            });
          }
        });
        break;
      case '/CRM/findClient':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          findClient(url, JSON.parse(chunk.toString()), function (res) {
            response.writeHead(200, getCommonHeaders(request));
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/CRM/addOrder':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          addOrder(url, JSON.parse(chunk.toString()), function (res) {
            response.writeHead(200, getCommonHeaders(request));
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
            response.writeHead(200, getCommonHeaders(request));
            response.end(JSON.stringify(res));
          });
        });
        break;
      case '/CRM/changeOrderStatus':
        request.on('data', function (chunk) {
          console.log('Received body data:');
          console.log(chunk.toString());
          changeOrderStatus(url, JSON.parse(chunk.toString()), function (res) {
            response.writeHead(200, getCommonHeaders(request));
            response.end(JSON.stringify(res));
          });
        });
        break;
      default:
        response.writeHead(404, {'content-type': 'text/html'});
        response.end();
    }
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(200, getCommonHeaders(request));
    response.end();
  }

  if (['PUT', 'DELETE', 'HEAD', 'TRACE'].indexOf(request.method) !== -1) {
    response.writeHead(405, {'content-type': 'text/html'});
    response.end();
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
  console.log('Server listening on: http://localhost:%s', PORT);
});


function parseJSON (data) {
  var file = data.toString(),
    json;
  try {
    json = JSON.parse(file);
  } catch (e) {
    console.log('Not valid JSON! ' + e.message);
  }
  return json;
}