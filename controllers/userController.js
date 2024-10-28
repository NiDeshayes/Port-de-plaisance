const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Afficher tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Afficher le formulaire de création d'utilisateur
exports.showCreateUserForm = (req, res) => {
    res.render('users/create');
};

// Créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Tous les champs sont requis');
    }

    try {
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.redirect('/users');
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).send('L\'email existe déjà');
        }
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Afficher le formulaire de connexion
exports.showLoginForm = (req, res) => {
    res.render('users/login');
};

// Traiter la connexion
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/', // Redirige vers la page d'accueil après connexion
        failureRedirect: '/users/login', // Redirige vers la page de connexion en cas d'échec
        failureFlash: true // Utilise flash pour les messages d'erreur
    })(req, res, next);
};

// Afficher le formulaire de modification d'utilisateur
exports.showEditUserForm = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        res.render('users/edit', { user });
    } catch (error) {
        console.error('Error fetching user for edit:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const updatedUser = { name, email };

        // Hachage du mot de passe seulement si il a été modifié
        if (password) {
            updatedUser.password = await bcrypt.hash(password, 10);
        }

        await User.findByIdAndUpdate(req.params.id, updatedUser);
        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
};
