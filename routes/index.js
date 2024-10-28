var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Bienvenue sur notre application',
    message: 'Bienvenue sur notre plateforme de gestion des catways et des réservations !',
    description: 'Connectez-vous pour gérer les catways et réserver votre place.',
    navigationLinks: [
      { name: 'Voir les Catways', url: '/catways' },
      { name: 'Réservations', url: '/reservations' },
      { name: 'Inscription', url: '/users/create' }
    ]
  });
});

module.exports = router;
