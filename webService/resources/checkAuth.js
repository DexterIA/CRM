var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  /**
   * Функция проверки логина и пароля
   * @param {String} url - строка подключения к БД
   * @param {Object} auth - проверяемый логин и пароль
   * @param {Function} callback - в параметре true или false
   */
  checkAuth = function (url, auth, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log('Connected succesfully to server');
      var collection = db.collection('clients');
      console.log('Get clients');
      collection.find({}).toArray(function (err, data) {
        db.close();
        test.equal(null, err);
        console.log('Connection closed');
        var id;
        data.forEach(function(item) {
          if (item.login === auth.login && item.pass == auth.pass) { //jshint ignore: line
            id = item.id;
          }
        });
        if (!id) {
          id = false;
        }
        callback(id);
      });
    });
  };

module.exports = checkAuth;
