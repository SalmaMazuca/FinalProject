const User = require('../models/User.js');

const passportJWT = require('passport-jwt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;

const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions= {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

module.exports.controller = (app) => {
    // estrategia local
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, (email, password, done) => {
        User.getUserByEmail(email, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            User.comparePasswords(password, user.password, (error, isMatch) => {
                if (isMatch) {
                    return done(null, user);
                }
                return done(null, false);
            });
            return true;
        })
    }));
    // registrar un usuario
    app.post('/users/register', (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = new User({
            name,
            email,
            password
        });
        User.createUser(newUser, (error, user) => {
            if (error) {
              res.status(422).json({
                  message: 'Algo salió mal. Por favor, intente de nuevo'
              });
            }
            res.send({ user });
        });
    });

    // Login usuario
    app.post('/users/login',
    passport.authenticate('local', { failureRedirect: 'users/login'}),
    function(req, res) {
        res.redirect('/');
    });
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
