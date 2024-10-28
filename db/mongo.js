// db/mongo.js
const mongoose = require('mongoose');

const clientOptions = {
    dbName: 'apinode' 
};

// Fonction pour initialiser la connexion à la base de données
exports.initClientDbConnection = async () => {
    try {
        // Afficher l'URL de connexion pour le débogage
        console.log('MongoDB URL:', process.env.URL_MONGO);

        // Connexion à MongoDB
        await mongoose.connect(process.env.URL_MONGO, clientOptions);
        console.log('Connected to MongoDB');

        // Définition des schémas Mongoose

        // Schéma pour l'utilisateur
        const UserSchema = new mongoose.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true }, // Unique pour éviter les doublons
            password: { type: String, required: true } // Ajout du mot de passe
        });

        // Schéma pour les catways
        const CatwaySchema = new mongoose.Schema({
            catwayNumber: { type: String, required: true, unique: true }, // Unique pour chaque catway
            type: { type: String, enum: ['long', 'short'], required: true },
            catwayState: { type: String, required: true }
        });

        // Schéma pour les réservations
        const ReservationSchema = new mongoose.Schema({
            catwayNumber: { type: String, required: true },
            clientName: { type: String, required: true },
            boatName: { type: String, required: true },
            checkIn: { type: Date, required: true },
            checkOut: { type: Date, required: true }
        });

        // Création des modèles Mongoose, évitant la redéfinition
        const User = mongoose.models.User || mongoose.model('User', UserSchema);
        const Catway = mongoose.models.Catway || mongoose.model('Catway', CatwaySchema);
        const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

        // Activer le mode debug de Mongoose
        mongoose.set('debug', true);

        // Retourner les modèles
        return { User, Catway, Reservation };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error); // Afficher l'erreur de connexion
        throw error; // Propagation de l'erreur pour traitement ultérieur
    }
};
