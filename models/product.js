const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {

  constructor(title,price,description,imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {

    const db = getDb();
    let dpOp;

    if(this._id) {
      dpOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
    }
    else {
      dpOp = db.collection('products').insertOne(this);
    }
    return dbOp
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    })
  }

  static fetchAll() {

    const db = getDb();
    return db.collection('products').find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err));
  }

  static fetchOne(prodId) {

    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => console.log(err))
  }

  static delete(prodId) {

    const db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId)})
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err))
  }

};

module.exports = Product;