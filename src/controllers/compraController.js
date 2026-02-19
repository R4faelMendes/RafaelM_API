const connect = require("../db/connect");

module.exports = class compraController{
    static async createCompra(req, res){
        const {cpf, id_ingresso, quantidade} = req.body;

        if (!cpf || !id_ingresso || !quantidade){
            return res
            .status(400)
            .json({ error: "Todos os campos devem ser preenchidos" });
        }
        
        if (isNaN(cpf) || cpf.length !== 11) {
            return res
              .status(400)
              .json({ error: "CPF inválido. Deve conter 11 dígitos numéricos" });
        }
        
        const query = `call registrar_compra(?, ?, ?);`;
        const values = [cpf, id_ingresso, quantidade];

        try {
            connect.query(query, values, (err, results) => {
                if(err){
                    return res.status(500).json({ error:"Erro interno na API"});
                }
                console.log(results);
                return res.status(200).json({ message:"Compra Realizada com sucesso!"});
            });
        } catch (error) {
            console.error("Erro ao executar a consulta:", error);
            return res.status(500).json({ error: "Erro interno do servidor!"});
        }
    }
}
