const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userID: { type: String },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String, require: true },
  mainingredient: { type: String, require: true },
  imageUrl: { type: String, require: true },
  heat: { type: Number, require: true },
  likes: { type: Number, require: true },
  dislikes: { type: Number, require: true },
  usersliked: { type: String, require: true },
  usersdisliked: { type: String, require: true }
});

module.exports = mongoose.model('Sauce', sauceSchema);
