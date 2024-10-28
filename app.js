var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash'); // Importer connect-flash
var logger = require('morgan');
var session = require('express-session'); // Importer express-session
var passport = require('passport'); // Importer passport

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catwaysRouter = require('./routes/catways');
var reservationsRouter = require('./routes/reservations');
const { initClientDbConnection } = require('./db/mongo');
require('./config/passport')(passport); // Charger la configuration de Passport

var app = express();

// Initialiser la connexion à la base de données
initClientDbConnection()
    .catch(err => console.error('Failed to connect to the database:', err));

// Configuration du moteur de vue
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configurer les sessions
app.use(session({
    secret: 'yourSecretKey', // Changer cette clé
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Ajouter connect-flash ici

// Middleware pour passer les messages flash au template
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // messages d'erreur
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catways', catwaysRouter);
app.use('/reservations', reservationsRouter);

// Gestion des erreurs 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Gestion des erreurs
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
