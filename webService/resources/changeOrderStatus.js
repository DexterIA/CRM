var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция меняет статус заказа
   * @param {String} url - строка подключения к БД
   * @param {Object} order - фильтр заказа { orderId, newStatus }
   * @param {Function} callback - в параметре заказы с учётом фильтра
   */
  changeOrderStatus = function (url, order, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      if (order && order.orderId && order.status) {
        var collection = db.collection('orders'),
          filter = {id: order.orderId};
        console.log('Find orders');
        collection.find(filter).toArray(function (err, data) {
          test.equal(null, err);
          var newOrder = data[0];
          newOrder.status = order.status;
          collection.updateOne(filter, newOrder, function (error, res) {
            test.equal(null, error);
            db.close();
            console.log('Connection closed');
            callback(res);
          });
        });
      }
    });
  };

module.exports = changeOrderStatus;
