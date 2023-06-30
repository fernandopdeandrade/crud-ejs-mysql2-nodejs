const express = require("express");
const path = require("path");
const mysql2 = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "formulario",
});

db.connect((err) => {
  if (err) {
    console.log(`Não foi possível conectar ao banco de dados: ${err}`);
  }

  let sql = "SELECT * FROM usuarios";

  db.query(sql, (_err, results) => {
    console.log(
      `Conectado ao banco de dados!...Quantidade de usuários = ${results.length}`
    );
  });
});

app.get("/", (_req, res) => {
  res.render("index", {});
});

app.get("/cadastro", (_req, res) => {
  res.render("cadastro", {});
});

app.post("/cadastro", (req, res) => {
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let email = req.body.email;
  let senha = req.body.senha;
  let confirmaSenha = req.body.confirmaSenha;

  db.query(
    "INSERT INTO usuarios (nome, sobrenome, email, senha, confirmaSenha) VALUES (?, ?, ?, ?, ?)",
    [nome, sobrenome, email, senha, confirmaSenha],
    (_err, _result) => {}
  );

  console.log("cadastro realizado com sucesso");

  res.redirect("/");
});

app.get("/visualizar", (_req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    res.render("visualizar", { usuarios: results });
  });
});

app.get("/atualizar", (_req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    res.render("atualizar", { usuarios: results });
  });
});

app.post("/atualizar", (req, res) => {
  let id = req.body.id;
  let nome = req.body.nome;
  let sobrenome = req.body.sobrenome;
  let email = req.body.email;
  let senha = req.body.senha;
  let confirmaSenha = req.body.confirmaSenha;

  db.query(
    "UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, senha = ?, confirmaSenha = ? WHERE id = ?",
    [nome, sobrenome, email, senha, confirmaSenha, id],
    (_err, _result) => {}
  );

  console.log("Atualização realizada com sucesso");

  res.redirect("/");
});

app.get("/deletar", (_req, res) => {
  db.query("SELECT * FROM usuarios", (_err, results) => {
    res.render("deletar", { usuarios: results });
  });
});

app.post("/deletar", (req, res) => {
  let id = req.body.id;

  db.query("DELETE FROM usuarios WHERE id = ?", [id], (_err, _result) => { });
  
  console.log("Exclusão realizada com sucesso");

  res.redirect("/deletar");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
