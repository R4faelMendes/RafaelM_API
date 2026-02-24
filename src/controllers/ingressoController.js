const connect = require("../db/connect");

module.exports = class ingressoController {

  // Criação de um ingresso
  static async createIngresso(req, res) {
    const { preco, tipo, fk_id_evento } = req.body;

    if (!preco || !tipo || !fk_id_evento) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `
      INSERT INTO ingresso (preco, tipo, fk_id_evento)
      VALUES (?, ?, ?)
    `;

    const values = [preco, tipo, fk_id_evento];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Erro ao criar o ingresso"
          });
        }

        res.status(201).json({
          message: "Ingresso criado com sucesso"
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erro interno do servidor"
      });
    }
  }

  // Buscar ingressos por evento
  static async getByIdEvento(req, res) {
    const eventoId = req.params.id;
    const query = `SELECT 
      i.id_ingresso,
      e.nome
    FROM ingresso i
    JOIN evento e 
      ON i.id_ingresso = e.id_evento
    WHERE e.id_evento = ${eventoId}`
    const values = [eventoId];

try {
    connect.query(query,values,function(err,results){
        if (err) {
            console.error(err);
            return res.status(500).json({error: "Erro interno do servidor"});
        }
        if (results.length === 0) {
            return res.status(404).json ({ error: "Ingresso não encontrado"})
        }
        return res.status(200).json({message: "Ingresso encontrado", organizador: results[0] });

    });
} catch (error) {
    console.error("Erro ao executar a consulta:",error);
    return res.status(500).json({ error: "Erro interno do servidor"});
}
}

  // Buscar todos os ingressos
  static async getAllIngressos(req, res) {
    const query = `
      SELECT
        ingresso.id_ingresso,
        ingresso.preco,
        ingresso.tipo,
        ingresso.fk_id_evento,
        evento.nome AS nome_evento
      FROM ingresso
      JOIN evento
        ON ingresso.fk_id_evento = evento.id_evento;
    `;

    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Erro ao buscar ingressos"
          });
        }

        res.status(200).json({
          message: "Ingressos obtidos com sucesso",
          ingressos: results,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erro interno do servidor"
      });
    }
  }

  // Atualização de ingresso
  static async updateIngresso(req, res) {
    const { id_ingresso, preco, tipo, fk_id_evento } = req.body;

    if (!id_ingresso || !preco || !tipo || !fk_id_evento) {
      return res.status(400).json({
        error: "Todos os campos devem ser preenchidos"
      });
    }

    const query = `
      UPDATE ingresso
      SET preco = ?, tipo = ?, fk_id_evento = ?
      WHERE id_ingresso = ?
    `;

    const values = [preco, tipo, fk_id_evento, id_ingresso];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Erro ao atualizar ingresso"
          });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Ingresso não encontrado"
          });
        }

        res.status(200).json({
          message: "Ingresso atualizado com sucesso"
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erro interno do servidor"
      });
    }
  }

  // Exclusão de ingresso
  static async deleteIngresso(req, res) {
    const ingressoId = req.params.id;

    const query = `
      DELETE FROM ingresso
      WHERE id_ingresso = ?
    `;

    try {
      connect.query(query, [ingressoId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            error: "Erro ao excluir ingresso"
          });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({
            error: "Ingresso não encontrado"
          });
        }

        res.status(200).json({
          message: "Ingresso excluído com sucesso"
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erro interno do servidor"
      });
    }
  }
};