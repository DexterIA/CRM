var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция меняет статус заказа
   * @param {String} url - строка подключения к БД
   * @param {Object} order - фильтр заказа { order_id, status }
   * @param {Function} callback - в параметре заказы с учётом фильтра
   */
  changeOrderStatus = function (url, order, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      if (order && order.order_id && order.status) {
        var collection = db.collection('orders'),
          filter = {order_id: order.order_id};
        console.log('Find orders');
        collection.find(filter).toArray(function (err, data) {
          test.equal(null, err);
          if (data[0]) {
            var newOrder = data[0];
            newOrder.status = order.status;
            collection.updateOne(filter, newOrder, function () {
              db.close();
              console.log('Connection closed');
              callback(newOrder);
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

module.exports = changeOrderStatus;
