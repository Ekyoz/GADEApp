const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const data = require("./SSL/users.json");
const users = data.server.users;
const host = data.server.host;
const port = data.server.port;
const secretKey = process.env.SECRET_KEY;

// Middleware pour parser les données de la requête
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour gérer la session
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false
}));

// Middleware pour l'authentification
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).send("Unauthorized");
    }
}

// Route pour l'authentification
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.user === username && u.password === password);
    if (user) {
        req.session.user = user;
        res.send(`Logged in successfully with user: ${req.session.user.user}`);
    } else {
        res.status(401).send("Invalid username or password");
    }
});

// Route pour récupérer les informations de l'utilisateur courant
app.get("/user", requireAuth, (req, res) => {
    res.send(req.session.user);
});

// Route pour se déconnecter
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Logged out successfully");
});

// Route de test
app.get("/", requireAuth, (req, res) => {
    res.send(`Hello! You're connected with: ${req.session.user.user}`);
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log(`Server is running on http://${host}:${port}`)
});
