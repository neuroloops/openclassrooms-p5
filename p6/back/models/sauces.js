// id: ObjectID — identifiant unique créé par MongoDB ;
// userID: string — identifiant unique MongoDB pour l'utilisateur qui a créé la sauce ;
// name: string — nom de la sauce ;
// manufacturer: string — fabricant de la sauce ;
// description: string — description de la sauce ;
// mainingredient: string — principal ingrédient dans la sauce ;
// imageUrl: string — string de l'image de la sauce téléchargée par l'utilisateur ;
// heat: number — nombre entre 1 et 10 décrivant la sauce ;
// likes: number — nombre d'utilisateurs qui aiment la sauce ;
// dislikes: number — nombre d'utilisateurs qui n'aiment pas la sauce ;
// usersliked: [string] — tableau d'identifiants d'utilisateurs ayant aimé la sauce ;
// usersdisliked: [string] — tableau d'identifiants d'utilisateurs n'ayant pas aimé

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
