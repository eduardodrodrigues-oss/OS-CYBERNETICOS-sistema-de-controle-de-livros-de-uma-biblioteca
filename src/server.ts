
// Importa as configurações do ambiente
import 'dotenv/config';

// Importa o Express
import express from 'express';

// Importa o CORS
import cors from 'cors';

// Importa a conexão com o banco
import { db } from './config/database';

// Inicializa a aplicação Express
const app = express();

// Permite receber requisições JSON
app.use(express.json());

// Habilita comunicação entre origens
app.use(cors());

// Define a porta do servidor
const PORT = Number(process.env.PORT || 3000);

// Rota para testar o funcionamento do backend
app.get('/', (req, res) => {
    res.json({
        mensagem: 'Backend da biblioteca funcionando!'
    });
});

// Rota para testar a conexão com o MySQL
app.get('/teste-banco', async (req, res) => {

    try {

        // Executa uma consulta simples no banco
        await db.query('SELECT 1');

        res.json({
            sucesso: true,
            mensagem: 'Conexão com MySQL realizada!'
        });

    } catch (erro) {

        console.error('Erro ao conectar:', erro);

        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro na conexão com o banco de dados.'
        });

    }

});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
