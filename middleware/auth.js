// middleware/auth.js
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // L'utilisateur est authentifié, passe à la prochaine fonction middleware
    }
    res.redirect('/users/login'); // Redirige vers la page de connexion si non authentifié
}

module.exports = isAuthenticated;
