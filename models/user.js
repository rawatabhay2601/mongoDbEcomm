const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {

    let updatedCart;
    let updatedCartItems;
    let productExists;
    let index = -1;
    let productIndex;

    if(this.cart) {
      
      this.cart.items.forEach(cp => {
        index++;
        if(cp._id.toString() === product._id.toString()) {
          productExists = true;
          productIndex = index;
        }
      });

      if(productExists) {
        this.cart.items[productIndex].quantity += 1;
      }
      else {
        this.cart.items.push({
          productId: new ObjectId(product._id),
          quantity: 1
        });
      }

      // updating cart items
      updatedCartItems = [...this.cart.items];
      updatedCart = {
        items: updatedCartItems
      };
    }

    else {
      updatedCart = {items: [{ _id : product._id, quantity:1 }]};
    }

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
