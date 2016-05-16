var MongoClient = require('mongodb').MongoClient,
  test = require('assert'),

  addCustomer = function (url, data, callback) {
    MongoClient.connect(url, function (err, db) {
      console.log("Connected succesfully to server");
      var collection = db.collection('customers');
      console.log('Add customer');
      collection.insertOne(data, function (err, res) {
        db.close();
        test.equal(null, err);
        console.log("Connection closed");
        callback(res);
      });
    });
  };

module.exports = addCustomer;
