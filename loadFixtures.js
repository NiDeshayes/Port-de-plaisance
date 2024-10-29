const mongoose = require('mongoose');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');
const User = require('./models/User');

// URL de connexion à MongoDB
const mongoURI = "mongodb+srv://dnicolas120:Toscca91!@cluster0.e3svy.mongodb.net/?retryWrites=true&w=majority";

async function loadFixtures() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Données Catway
        const catways = [
            { catwayNumber: "C001", type: "long", catwayState: "disponible" },
            { catwayNumber: "C002", type: "short", catwayState: "réservé" },
            { catwayNumber: "C003", type: "long", catwayState: "disponible" },
        ];

        for (const catway of catways) {
            await Catway.findOneAndUpdate(
                { catwayNumber: catway.catwayNumber }, // Condition de recherche
                catway,                                // Données à mettre à jour
                { upsert: true, new: true }            // Création si non existant
            );
        }

        // Données Reservation
        const reservations = [
            { catwayNumber: "C001", clientName: "Jean Dupont", boatName: "Le Marlin", checkIn: new Date(), checkOut: new Date(Date.now() + 86400000) },
            { catwayNumber: "C002", clientName: "Marie Curie", boatName: "Le Soleil", checkIn: new Date(), checkOut: new Date(Date.now() + 172800000) },
        ];

        for (const reservation of reservations) {
            await Reservation.findOneAndUpdate(
                { catwayNumber: reservation.catwayNumber, clientName: reservation.clientName }, 
                reservation, 
                { upsert: true, new: true }
            );
        }

        // Données User
        const users = [
            { name: "Admin", email: "admin@example.com", password: "securepassword123" },
            { name: "User1", email: "user1@example.com", password: "password123" },
        ];

        for (const user of users) {
            await User.findOneAndUpdate(
                { email: user.email }, 
                user, 
                { upsert: true, new: true }
            );
        }
 
        console.log("Fixtures loaded successfully without overwriting existing data.");
    } catch (error) {
        console.error("Error loading fixtures:", error);
    } finally {
        mongoose.connection.close();
    }
}

loadFixtures();
