// models/Catway.js
const mongoose = require('mongoose');

const CatwaySchema = new mongoose.Schema({
    catwayNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ['long', 'short'], required: true },
    catwayState: { type: String, required: true } // Par exemple, "disponible" ou "réservé"
});

module.exports = mongoose.model('Catway', CatwaySchema);
