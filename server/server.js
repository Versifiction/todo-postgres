const express = require("express");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const app = express();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const pool = require("./db");

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
// });

// Middlewares
app.use(cors());
// app.use(limiter);
app.use(morgan("tiny"));
app.use(helmet());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Routes
app.get("/", function (req, res) {
  res.send("Bienvenue sur la route d'accueil");
});

// Avoir les todos

app.get("/todos", async function (req, res) {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Ajouter une todo

app.post("/todos", async (req, res) => {
  try {
    const { description, blurred, done, favorite } = req.body.newTask;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, blurred, done, favorite) VALUES($1, $2, $3, $4) RETURNING *",
      [description, blurred, done, favorite]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Mettre à jour une todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description, blurred, done, favorite } = req.body.task;
    console.log(id, description, blurred, done, favorite);
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $2, blurred = $3, done = $4, favorite = $5 WHERE id = $1",
      [id, description, blurred, done, favorite]
    );
  } catch (err) {
    console.error(err.message);
  }
});

// Supprimer une todo

app.delete("/todo/:id", async function (req, res) {
  let id = req.params.id;
  try {
    const allTodos = await pool.query(`DELETE FROM todo WHERE id = ${id}`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
