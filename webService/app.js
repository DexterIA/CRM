var MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  fs = require('fs'),

  url = 'mongodb://localhost:27017/CRM';

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected succesfully to server");
  /*insertDocuments(db, function() {
    db.close();
  });*/

  /*findDocuments(db, function () {
    db.close();
  });*/
});

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('customers'),
    customers = JSON.parse(fs.readFileSync('./fixtures/customers.json', 'utf8'));

  collection.insertMany(customers,
    function(err, result) {
      console.log("Inserted 2 customers");
      callback(result);
    });
};

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('customers');
  // Find some documents
  collection.find({'id': 4}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};