var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция получения списка всех клиентов
   * @param {String} url - строка подключения к БД
   * @param {function} callback - в параметре возвращаем данные о клиентах
   */
  getClients = function (url, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      var collection = db.collection('clients');
      console.log('Get clients');
      collection.find({}).toArray(function (err, data) {
        db.close();
        test.equal(null, err);
        console.log('Connection closed');
        callback(data);
      });
    });
  };

module.exports = getClients;
