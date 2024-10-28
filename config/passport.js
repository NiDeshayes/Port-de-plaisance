const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assurez-vous que le modèle User est correctement importé

module.exports = function(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'username' }, // Ce champ doit correspondre à ce que vous utilisez dans le formulaire
            async (username, password, done) => {
                try {
                    // Chercher l'utilisateur par email, car c'est ce que vous utilisez comme 'username'
                    const user = await User.findOne({ email: username }); // Utilisez 'email' au lieu de 'username'
                    if (!user) {
                        return done(null, false, { message: 'Utilisateur non trouvé.' });
                    }

                    // Comparer le mot de passe
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        return done(null, false, { message: 'Mot de passe incorrect.' });
                    }

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
};
