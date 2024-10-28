const Catway = require('../models/Catway'); // Assurez-vous que le modèle Catway est exporté correctement

// Afficher tous les catways
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.render('catways/index', { catways }); // Rendre une vue pour afficher les catways
    } catch (error) {
        console.error('Error fetching catways:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Afficher le formulaire de création d'un catway
exports.showCreateCatwayForm = (req, res) => {
    res.render('catways/create'); // Rendre une vue pour créer un nouveau catway
};

// Créer un nouveau catway
exports.createCatway = async (req, res) => {
    const { catwayNumber, type, catwayState } = req.body;
    try {
        const newCatway = new Catway({ catwayNumber, type, catwayState });
        await newCatway.save();
        res.redirect('/catways'); // Rediriger vers la liste des catways
    } catch (error) {
        console.error('Error creating catway:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Afficher le formulaire de modification d'un catway
exports.showEditCatwayForm = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).send('Catway not found');
        }
        res.render('catways/edit', { catway }); // Rendre une vue pour éditer le catway
    } catch (error) {
        console.error('Error fetching catway for edit:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Modifier un catway
exports.updateCatway = async (req, res) => {
    const { catwayNumber, type, catwayState } = req.body;
    try {
        await Catway.findByIdAndUpdate(req.params.id, { catwayNumber, type, catwayState });
        res.redirect('/catways'); // Rediriger vers la liste des catways
    } catch (error) {
        console.error('Error updating catway:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
    try {
        await Catway.findByIdAndDelete(req.params.id);
        res.redirect('/catways'); // Rediriger vers la liste des catways
    } catch (error) {
        console.error('Error deleting catway:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Afficher les détails d'un catway
exports.getCatwayDetails = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).send('Catway not found');
        }
        res.render('catways/detail', { catway }); // Rendre la vue pour afficher les détails du catway
    } catch (error) {
        console.error('Error fetching catway details:', error);
        res.status(500).send('Internal Server Error');
    }
};
