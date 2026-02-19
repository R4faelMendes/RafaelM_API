const express = require("express"); // Importa o módulo Express
const cors = require("cors");
const testConnect = require("./db/testConnect");

class AppController {
  constructor() {
    this.express = express(); // Cria uma instância do Express dentro da classe
    this.middlewares(); // Chamando o método middlewares
    this.routes(); // Chamando o método routes
    testConnect();
  }

  middlewares() {
    // Permite que a applicação receba dados em formato JSON nas requisições
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: true })); // Necessário para receber dados de formulários HTML
  }

  // Nós definimos as nossas ROTAS
  routes() {
    const apiRoutes = require('./routes/apiRoutes')
    this.express.use('/api/v1/',apiRoutes)
  }
}
// Exporta a instância do Express já configurada acima, tornando-a acessível em outros arquivos
module.exports = new AppController().express;
