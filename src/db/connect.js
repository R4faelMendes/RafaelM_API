const mysql = require("mysql2")

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost', // Mude para o seu host (IP)
    user:'aluno', // Mude para o seu User do Mysql
    password:'senai@604', // Mude para a senha do seu User
    database: 'vio_rafaelM' // Mude para o seu database JÁ criado
})

module.exports = pool;