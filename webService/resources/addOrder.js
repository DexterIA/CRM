var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция добавляет заказ в историю заказов у клиента
   * @param {String} url - строка подключения к БД
   * @param {Object} order - новый заказ
   * @param {Function} callback - с результатом
   */
  addOrder = function (url, order, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      var collection = db.collection('orders');
      console.log('Add order');
      collection.insertOne(order, function (err, res) {
        db.close();
        test.equal(null, err);
        console.log('Connection closed');
        callback(res);
      });
    });
  };

module.exports = addOrder;