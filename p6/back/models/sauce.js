const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userID: { type: String, required: true },
  name: { type: String, require: true },
  manufacturer: { type: String, require: true },
  description: { type: String },
  mainingredient: { type: String },
  imageUrl: { type: String },
  heat: { type: Number },
  likes: { type: Number },
  dislikes: { type: Number },
  usersliked: { type: String },
  usersdisliked: { type: String }
});

module.exports = mongoose.model('Sauce', sauceSchema);
