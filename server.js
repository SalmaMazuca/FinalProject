const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'focusfriendapplicationsecretkey';

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const config = require('./config/Config');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false }
}))
app.use(passport.initialize());
app.use(passport.session());

// Conexión a mongodb
mongoose.connect(config.DB, function() {
    console.log('Conexión realizada');
})
.catch(err => {
    console.error('Error iniciando App: ', err.stack);
    process.exit(1);
});

// Incluir controladores
fs.readdirSync("controllers").forEach(function (file) {
    if(file.substr(-3) == ".js") {
        const route = require("./controllers/" + file)
        route.controller(app)
    }
})
app.use(history());
app.use(serveStatic(__dirname + '/dist'));

router.get('/api/current_user', isLoggedIn, function (req, res) {
    if (req.user) {
        res.send({ current_user: req.user })
    } else {
        res.status(403).send({ success: false, msg: 'No autorizado '});
    }
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticate()) return next();
    res.redirect('/');
    console.log('Error! Autenticación fallida')
}

router.get('/api/logout', function (req, res) {
    req.logout();
    res.send();
});

router.get('/', function(req, res) {
    res.json({message: 'API Inicializada'});
});

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
    console.log('api corriendo en el puerto $(port)');
});