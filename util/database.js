const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
  
  MongoClient.connect("mongodb+srv://rawatabhay2601:rawatabhay2601@testmongo.78uqocw.mongodb.net/?retryWrites=true&w=majority")
  .then(client => {
    console.log('Connected!');
    callback();
    _db = client.db();
  })
  .catch(err => console.log(err));
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found !!'
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;