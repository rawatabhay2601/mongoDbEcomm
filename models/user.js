const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {

  constructor(name,email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('User').insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  }

  findById(userId) {
    const db = getDb();
    
    return db.collection('User').findOne({ _id : new mongodb.ObjectId(userId) })
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = User;
