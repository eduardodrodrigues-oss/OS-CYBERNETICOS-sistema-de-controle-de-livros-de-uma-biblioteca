import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { db } from './config/database';

// Inicializa o Express
const app = express();

// Permite receber JSON
app.use(express.json());

// Permite comunicação com o frontend
app.use(cors());

// Define a porta
const PORT = Number(process.env.PORT || 3000);

// Rota inicial
app.get('/', (req, res) =>{
    res.json({mensagem: "siste ma funcionando"})
})

app.get('/livros', async (req, res) => {
    try {
        const [procura] = await db.query('SELECT titulo, autor, isbn, quantidade, limite_por_usuario, data_cadastro FROM livros')
        res.status(200).json(procura)
    } catch (error) {
        console.error('Erro no get / livros', error)
        res.status(500).json({erro: "erro ao consultar jogadores no banco de dados. Favor tentar novamente"})
    }
  
});

// Rota para testar o MySQL
app.get('/livros/:id_livro', async (req, res) => {
  try {
    const idBusca = Number(req.params.id_livro)

     const [procura] = await db.query('SELECT titulo, autor, isbn, quantidade, limite_por_usuario, data_cadastro FROM livros WHERE id_livro = ?', [idBusca])

     const resultado = procura as any[]

     if (resultado.length === 0 ){
        return res.status(400).json({erro: 'Jogador nao encontrado no banco de dados'})
     }

      res.status(200).json(resultado[0])
  } catch (error) {
    console.error('erro n GET /livros/:id_livro:', error)
        res.status(500).json({erro: 'erro interno no servidor.'})
  }
});



// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
