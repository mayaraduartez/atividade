const conexao = require("../config/database");

var UsuarioSchema = conexao.Schema({
  atividade: { type: "String" },
  status: { type: "String" },
  pesquisar: { type: "String" },
});

module.exports = conexao.model("Usuario", UsuarioSchema);
