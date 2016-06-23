var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция получает данные клиента по заказу
   * @param {String} url - строка подключения к БД
   * @param {Object} orderId - идентификатор заказа
   * @param {Function} callback - в параметре заказы с учётом фильтра
   */
  getClientByOrderId = function (url, orderId, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      if (orderId) {
        var orders = db.collection('orders'),
          filter = {order_id: orderId};
        console.log('Find client by order_id');
        orders.find(filter).toArray(function (err, data) {
          test.equal(null, err);
          if (data[0]) {
            var uid = {uid: data[0].uid},
              clients = db.collection('clients');
            clients.find(uid).toArray(function (error, res) {
              test.equal(null, error);
              db.close();
              console.log('Connection closed');
              callback(res[0]);
            });
          } else {
            callback({});
          }
        });
      } else {
        callback({});
      }
    });
  };

module.exports = getClientByOrderId;

