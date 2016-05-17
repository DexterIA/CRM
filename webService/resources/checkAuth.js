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
      var collection = db.collection('customers');
      console.log('Get customers');
      collection.find({}).toArray(function (err, data) {
        db.close();
        test.equal(null, err);
        console.log('Connection closed');
        var equal = false;
        data.forEach(function(item) {
          if (item.login === auth.login && item.pass == auth.pass) { //jshint ignore: line
            equal = true;
          }
        });
        callback(equal);
      });
    });
  };

module.exports = checkAuth;
