const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const passport = require('passport');
const isAuthenticated = require('../middleware/auth');

// Route pour afficher la liste des utilisateurs (protégée)
router.get('/', isAuthenticated, UserController.getAllUsers);

// Route pour afficher le formulaire de création d'utilisateur (accessible sans connexion)
router.get('/create', UserController.showCreateUserForm);

// Route pour créer un nouvel utilisateur
router.post('/create', UserController.createUser);

// Route pour afficher le formulaire de connexion (accessible sans connexion)
router.get('/login', UserController.showLoginForm);

// Route pour traiter la connexion
router.post('/login', UserController.loginUser);

// Route pour afficher le formulaire de modification d'utilisateur (protégée)
router.get('/edit/:id', isAuthenticated, UserController.showEditUserForm);

// Route pour modifier un utilisateur (protégée)
router.post('/edit/:id', isAuthenticated, UserController.updateUser);

// Route pour déconnexion (protégée)
router.get('/logout', isAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.redirect('/users'); // Redirige vers la page des utilisateurs en cas d'erreur
        }
        res.redirect('/users/login'); // Redirige vers la page de connexion après déconnexion
    });
});

module.exports = router;    
