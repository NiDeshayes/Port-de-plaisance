const express = require('express');
const router = express.Router();
const CatwayController = require('../controllers/catwayController'); // Assurez-vous d'avoir un contrôleur pour gérer les catways
const isAuthenticated = require('../middleware/auth'); // Importez le middleware

// Route pour afficher la liste des catways (protégée)
router.get('/', isAuthenticated, CatwayController.getAllCatways);

// Route pour afficher le formulaire de création d'un catway (protégée)
router.get('/create', isAuthenticated, CatwayController.showCreateCatwayForm);

// Route pour créer un nouveau catway (protégée)
router.post('/create', isAuthenticated, CatwayController.createCatway);

// Route pour afficher le formulaire de modification d'un catway (protégée)
router.get('/edit/:id', isAuthenticated, CatwayController.showEditCatwayForm);

// Route pour modifier un catway (protégée)
router.post('/edit/:id', isAuthenticated, CatwayController.updateCatway);

// Route pour supprimer un catway (protégée)
router.post('/delete/:id', isAuthenticated, CatwayController.deleteCatway);

// Route pour afficher les détails d'un catway (protégée)
router.get('/:id', isAuthenticated, CatwayController.getCatwayDetails);

module.exports = router;
