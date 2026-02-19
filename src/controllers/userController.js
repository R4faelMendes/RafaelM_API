const connect = require("../db/connect");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10; // Número de rounds para gerar o hash

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, nome, email, senha, telefone, data_nascimento } = req.body;

    console.log("Valores recebidos: ", req.body);

    // Validação de campos obrigatórios
    if (!cpf || !nome || !email || !senha || !telefone || !data_nascimento) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Validações específicas
    if (isNaN(cpf) || cpf.length !== 11) {
      return res
        .status(400)
        .json({ error: "CPF inválido. Deve conter 11 dígitos numéricos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res
        .status(400)
        .json({ error: "Telefone inválido. Deve conter 11 dígitos numéricos" });
    }

    // Criptografar a senha antes de salvar
      const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    // Query de inserção
    const query = `
    INSERT INTO usuario (cpf, nome, email, senha, telefone, data_nascimento)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
    const values = [cpf, nome, email, hashedPassword, telefone, data_nascimento];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log("Erro: ", err);
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "CPF ou email já cadastrado" });
          }
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.status(201).json({ message: "Usuário criado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async readUsers(req, res) {
    const query = `SELECT * FROM usuario`;
    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        return res
          .status(200)
          .json({ message: "Obtendo todos os usuários", users: results });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async updateUser(req, res) {
    const cpf = req.params.cpf;
    const { nome, email, senha, telefone, data_nascimento } = req.body;

    if (!nome || !email || !senha || !telefone || !data_nascimento) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Criptografar a senha antes de salvar
      const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    const query = `
    UPDATE usuario 
    SET nome = ?, email = ?, senha = ?, telefone = ?, data_nascimento = ?
    WHERE cpf = ?
  `;
    const values = [nome, email, hashedPassword, telefone, data_nascimento, cpf];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res
          .status(200)
          .json({ message: `Usuário com CPF ${cpf} atualizado com sucesso` });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async deleteUser(req, res) {
    const cpf = req.params.cpf;

    const query = `DELETE FROM usuario WHERE cpf = ?`;
    const values = [cpf];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res
          .status(200)
          .json({ message: `Usuário com CPF ${cpf} excluído com sucesso` });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async loginUser(req, res) {
    const { cpf, senha } = req.body;
    if (!cpf || !senha) {
      return res.status(400).json({ error: "CPF e senha são obrigatórios" });
    }

    const query = `SELECT * FROM usuario WHERE cpf = ?`;

    try {
      connect.query(query, [cpf], async (err, results) => {
        if (err) {
          console.error("Erro ao executar a consulta", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
        if (results.length === 0) {
          return res.status(401).json({ error: "Usuário não cadastrado" });
        }
        const user = results[0];



        if (!senhaCorreta) {
          return res.status(401).json({ error: "Senha incorreta" });
        }

        return res.status(200).json({ message: "Login bem-sucedido", user });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: " Erro interno do servidor " });
    }
  }
};
