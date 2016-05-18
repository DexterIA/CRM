var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция возвращает заказы по указанному фильтру
   * если фильтр пустой - возвращает список всех заказов
   * @param {String} url - строка подключения к БД
   * @param {Object} filter - фильтр заказа (например clientId)
   * @param {Function} callback - в параметре заказы с учётом фильтра
   */
  findOrders = function (url, filter, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      var collection = db.collection('orders');
      console.log('Find orders');
      collection.find(filter).toArray(function (err, data) {
        db.close();
        test.equal(null, err);
        console.log('Connection closed');
        callback(data);
      });
    });
  };

module.exports = findOrders;