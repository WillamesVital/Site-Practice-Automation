require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Importe o pacote cors
const app = express();

const API_KEY = process.env.API_KEY; // Carrega a chave de API do arquivo .env
const CX = process.env.CX; // Carrega o CX do arquivo .env

app.use(cors()); // Permite todas as origens por padrão
app.use(express.json());

// Endpoint para realizar a pesquisa
app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'O parâmetro "q" é obrigatório.' });
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
        res.status(500).json({ error: 'Erro ao buscar resultados.' });
    }
});

// Inicia o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});