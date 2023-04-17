const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const data = require("./data.json");
const host = data.server.host;
const port = data.server.port;
const secretKey = process.env.SECRET_KEY;

// Middleware pour parser les données de la requête
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour gérer la session
app.use(
    session({
    secret: secretKey,
    resave: false,
        saveUninitialized: false,
    })
);

// Middleware pour l'authentification
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        return res.status(401).send("Unauthorized");
    }
}

// Création de la base de données
const db = new sqlite3.Database("users.db");

// Création de la table "users"
db.serialize(function () {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)"
    );
});

//---------------GET ROUTE--------------//

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
    res.send(`Hello! You're connected with: ${req.session.user.username}`);
});



//---------------GET POST--------------//

// Route pour l'authentification
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.get(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        function (err, row) {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            if (row) {
                req.session.user = {
                    id: row.id,
                    username: row.username,
                };
                return res.send(`Logged in successfully with user: ${username}`);
            } else {
                return res.status(401).send("Invalid username or password");
            }
        }
    );
});

// Route pour s'enregistrer
app.post("/register", requireAuth, (req, res) => {
    const { username, password } = req.body;
    db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, password],
        function (err) {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            return res.send(`User ${username} registered successfully`);
        }
    );
});

//route pour requperer les users avec leurs mdp
app.post("/users", requireAuth, (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        return res.send(rows);
    });
});


//---------------GET DELETE--------------//

//Route pour effacer un user
app.delete("/user/:id", requireAuth, (req, res) => {
    const userId = req.params.id;
    db.run("DELETE FROM users WHERE id = ?", userId, function (err) {
        if (err) {
            return res.status(500).send("Internal Server Error");
        }
        db.get("SELECT COUNT(*) as count FROM users", function (err, row) {
            if (err) {
                return res.status(500).send("Internal Server Error");
            }
            const userCount = row.count;
            db.run(
                `UPDATE sqlite_sequence SET seq = ${userCount} WHERE name = 'users'`,
                function (err) {
                    if (err) {
                        return res.status(500).send("Internal Server Error");
                    }
                    return res.send(`User with ID ${userId} deleted successfully`);
                }
            );
        });
    }
    );
})


// Démarrage du serveur
app.listen(3000, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
