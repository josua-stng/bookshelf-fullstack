const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = 3001;

const pool = new Pool({
  // connectionString:process.env.DATABASE_URL
  user: "postgres",
  host: "localhost",
  database: "bookshelf_page",
  password: "postgres",
  port: 5432,
});

app.use(bodyParser.json());

// Handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// make new account
app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = `INSERT INTO users (username,password) VALUES ($1, $2) RETURNING * `;
    const values = [username, password];
    const result = await pool.query(query, values);
    res.status(201).json({
      message: "Success Create Account",
      result: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// make data account
app.post("/bookshelf", async (req, res) => {
  try {
    const { title_book, year_book, author_book, summary_book, user_id } =
      req.body;
    const query = `INSERT INTO bookshelf_data (title_book,year_book,author_book,summary_book,user_id) VALUES ($1 ,$2 ,$3,$4,$5) RETURNING *`;
    const values = [title_book, year_book, author_book, summary_book, user_id];
    const result = await pool.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});



// get all user
app.get("/users", async (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    const result = await pool.query(query, []);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// edit books;
app.put("/bookshelf/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title_book, year_book, author_book, summary_book, user_id } =
      req.body;
    const query = `UPDATE bookshelf_data SET title_book=$1,year_book=$2,author_book=$3,summary_book=$4,user_id=$5 WHERE id=${id}`;
    const values = [title_book, year_book, author_book, summary_book, user_id];
    const selectQuery = `SELECT * FROM bookshelf_data WHERE id=${id}`;
    const selectResult = await pool.query(selectQuery);
    const result = await pool.query(query, values);
    res.status(201).json({
      message: "Success Update Book",
      result: selectResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Internal Server Error",
    });
  }
});

// get all book with data;
app.get("/bookshelf/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM bookshelf_data WHERE user_id =${id}`;
    const result = await pool.query(query);
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// delete books;
app.delete("/bookshelf/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM bookshelf_data WHERE id = ${id}`;
    const result = await pool.query(query);
    res.status(201).json({
      message: "Success Delete Books",
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Internal Server Error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Testing</h1>");
});

app.listen(PORT, () => {
  console.log(`Your server running at http://localhost:3001`);
});
