var express = require("express");
var app = express();
var Usuario = require("./model/Usuario");
var path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/add", function (req, res) {
  res.render("index.ejs", {});
});

app.post("/add", function (req, res) {
  var usuario = new Usuario({
    atividade: req.body.atividade,
    status: req.body.status,
  });

  usuario.save("/", function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/", function (req, res) {
  //buscar todos os dados cadastrados no banco de dado mongoose
  Usuario.find({
    //quero todo mundo, entao criei o usuario vazio, se eu quiser só um nome, coloco "nome: "mayara""
  }).then(function (docs) {
    res.render("list.ejs", { Usuarios: docs });
  });
});

app.post("/", function (req, res) {
  Usuario.find({ atividade: new RegExp(req.body.pesquisar, "i") }).then(
    function (docs) {
      res.render("list.ejs", { Usuarios: docs });
    }
  );
});

app.get("/edt/:id", function (req, res) {
  Usuario.findById(req.params.id).then(function (docs) {
    console.log(docs);
    res.render("edit.ejs", { Usuario: docs });
  });
});

app.post("/edt/:id", function (req, res) {
  Usuario.findByIdAndUpdate(
    req.params.id,
    {
      atividade: req.body.atividade,
      status: req.body.status,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu o seguinte erro: " + err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/del/:atividade", function (req, res) {
  Usuario.findByIdAndDelete(req.params.atividade, function (err, doc) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen("3000", () => {
  //função calback retorna algo
  console.log("Servidor iniciado!");
});
