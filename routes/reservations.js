const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');
const isAuthenticated = require('../middleware/auth'); // Importez le middleware

// Route pour afficher la liste des réservations (protégée)
router.get('/', isAuthenticated, ReservationController.getAllReservations);

// Route pour afficher le formulaire de création d'une réservation (protégée)
router.get('/create', isAuthenticated, ReservationController.showCreateReservationForm);

// Route pour créer une nouvelle réservation (protégée)
router.post('/create', isAuthenticated, ReservationController.createReservation);

// Route pour afficher le formulaire de modification d'une réservation (protégée)
router.get('/edit/:id', isAuthenticated, ReservationController.showEditReservationForm);

// Route pour modifier une réservation (protégée)
router.post('/edit/:id', isAuthenticated, ReservationController.updateReservation);

// Route pour supprimer une réservation (protégée)
router.post('/delete/:id', isAuthenticated, ReservationController.deleteReservation);

module.exports = router;
