<<<<<<< HEAD
const admin = require("firebase-admin");

// Importa a biblioteca dotenv, que carrega variáveis de ambiente do arquivo .env
const dotenv = require("dotenv");

// Configura o dotenv para carregar as variáveis de ambiente para process.env
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const auth = admin.auth();
module.exports = auth;
=======
const express = require("express");
const session = require("express-session");
const admin = require("firebase-admin");
const serviceAccount = require("./keys.json"); // Replace with your key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: "super-secret-key",
    resave: true,
    saveUninitialized: true,
  }),
);

// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("Usuário Não Autorizado! Cai fora!");
  }
};

app.get("/", (req, res) => {
  res.send("Seja bem-vindo ao Firebase Authentication!!!");
});

// Register new user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  admin
    .auth()
    .createUser({
      email,
      password,
    })
    .then((userRecord) => {
      console.log("Successfully created user:", userRecord.uid);
      res.send("User registered successfully");
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).send("User registration failed");
    });
});

// Log in a user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  admin
    .auth()
    .getUserByEmail(email)
    .then((userRecord) => {
      // Check the provided password against the user's stored password hash
      // This part may vary depending on your application
      if (password === "admin123") {
        req.session.user = userRecord.uid;
        res.send("Login successful");
      } else {
        res.status(401).send("Login failed");
      }
    })
    .catch((error) => {
      console.error("Error getting user:", error);
      res.status(401).send("Login failed");
    });
});

// Log out a user
app.get("/logout", (req, res) => {
  req.session.user = null;
  res.send("Logged out");
});

// Create a post (requires authentication)
app.post("/posts", checkAuth, (req, res) => {
  const { title, content } = req.body;
  // Add logic to save the post, e.g., in a database
  res.send("Post created");
});

// Get all posts (requires authentication)
app.get("/posts", checkAuth, (req, res) => {
  // Add logic to retrieve all posts, e.g., from a database
  const posts = [
    { title: "Post 1", content: "Content of Post 1" },
    { title: "Post 2", content: "Content of Post 2" },
  ];
  res.json(posts);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}.`);
});
>>>>>>> c134d2c58e9584653bfaeb1b3bbbea32e3b50408
