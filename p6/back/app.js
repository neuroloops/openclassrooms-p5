/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/sauce');

const app = express();

// password : AehvHYvQTrXgGjm0
// mongo "mongodb+srv://dbloops:<password>@cluster0-x4pis.mongodb.net/test?retryWrites=true&w=majority"
mongoose
  .connect(
    'mongodb+srv://dbloops:AehvHYvQTrXgGjm0@cluster0-x4pis.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
