
// Importa as configurações do arquivo .env
import 'dotenv/config';

// Importa o recurso de conexão do MySQL
import mysql from 'mysql2/promise';

// Cria um pool de conexões com o banco de dados
export const db = mysql.createPool({

    // Endereço do servidor MySQL
    host: process.env.DB_HOST,

    // Usuário do MySQL
    user: process.env.DB_USER,

    // Senha do MySQL
    password: process.env.DB_PASSWORD,

    // Nome do banco de dados
    database: process.env.DB_NAME,

    // Porta de conexão do MySQL
    port: Number(process.env.DB_PORT || 3306),

    // Permite aguardar uma conexão quando todas estiverem ocupadas
    waitForConnections: true,

    // Quantidade máxima de conexões simultâneas
    connectionLimit: 10,

    // Quantidade máxima de conexões aguardando
    queueLimit: 0

});
