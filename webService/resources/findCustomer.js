var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция возвращает клиента по указанному фильтру
   * @param {String} url - строка подключения к БД
   * @param {Object} filter - фильтр по клиентам
   * @param {Function} callback - в параметре объект клиента
   */
  findCustomer = function (url, filter, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      var collection = db.collection('customers');
      console.log('Find customer');
      collection.find(filter).toArray(function (err, data) {
        db.close();
        test.equal(null, err);
        console.log('Connection closed');
        callback(data);
      });
    });
  };

module.exports = findCustomer;