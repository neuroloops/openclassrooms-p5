const Sauce = require('../models/sauce');

exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const { userId } = sauceObject;
  delete sauceObject.id;

  const sauce = new Sauce({
    ...sauceObject,
    userId,
    dislikes: 0,
    usersliked: '',
    likes: 1,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res) => {
  Sauce.findOne({
    _id: req.params.id
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error
      });
    });
};

exports.modifySauce = (req, res) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Deleted!'
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.getAllSauce = (req, res) => {
  console.log(process.env.mongoLogin);

  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error
      });
    });
};

exports.like = (req, res) => {
  const sauceObject = req.body;
  console.log(sauceObject);
  Sauce.updateOne(
    { _id: req.params.id },
    {
      ...sauceObject,
      usersliked: sauceObject.usersliked.push(userId(req)),
      likes: +1
    }
  )
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};
