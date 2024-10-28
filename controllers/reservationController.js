const Reservation = require('../models/Reservation'); // Import du modèle Reservation
const Catway = require('../models/Catway'); // Import du modèle Catway

// Afficher toutes les réservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.render('reservations/index', { reservations }); // Rendre une vue pour afficher les réservations
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Afficher le formulaire de création d'une réservation avec les catways disponibles
exports.showCreateReservationForm = async (req, res) => {
    try {
        const catways = await Catway.find({ catwayState: 'disponible' });
        res.render('reservations/create', { catways }); // Rendre une vue pour créer une réservation avec catways disponibles
    } catch (error) {
        console.error('Erreur lors de la récupération des catways :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Créer une nouvelle réservation
exports.createReservation = async (req, res) => {
    const { clientName, boatName, catwayNumber, checkIn, checkOut } = req.body;
    try {
        const newReservation = new Reservation({ clientName, boatName, catwayNumber, checkIn, checkOut });
        await newReservation.save();

        // Mettre à jour l'état du catway en "réservé" après la création de la réservation
        await Catway.findOneAndUpdate({ catwayNumber }, { catwayState: 'réservé' });

        res.redirect('/reservations'); // Rediriger vers la liste des réservations
    } catch (error) {
        console.error('Erreur lors de la création de la réservation :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Afficher le formulaire de modification d'une réservation
exports.showEditReservationForm = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).send('Réservation introuvable');
        }
        res.render('reservations/edit', { reservation }); // Rendre une vue pour éditer la réservation
    } catch (error) {
        console.error('Erreur lors de la récupération de la réservation pour édition :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Modifier une réservation
exports.updateReservation = async (req, res) => {
    const { clientName, boatName, catwayNumber, checkIn, checkOut } = req.body;
    try {
        await Reservation.findByIdAndUpdate(req.params.id, { clientName, boatName, catwayNumber, checkIn, checkOut });
        res.redirect('/reservations'); // Rediriger vers la liste des réservations
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).send('Réservation introuvable');
        }

        // Mettre à jour l'état du catway en "disponible" après la suppression de la réservation
        await Catway.findOneAndUpdate({ catwayNumber: reservation.catwayNumber }, { catwayState: 'disponible' });

        await Reservation.findByIdAndDelete(req.params.id);
        res.redirect('/reservations'); // Rediriger vers la liste des réservations
    } catch (error) {
        console.error('Erreur lors de la suppression de la réservation :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Afficher les détails d'une réservation
exports.showReservationDetail = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).send('Réservation introuvable');
        }
        res.render('reservations/detail', { reservation }); // Rendre la vue pour les détails de la réservation
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la réservation :', error);
        res.status(500).send('Erreur interne du serveur');
    }
};
