require('dotenv').config();
const fetch = require('node-fetch');

const API_KEY = process.env.API_KEY; // Carrega a chave de API do ambiente
const CX = process.env.CX; // Carrega o CX do ambiente

module.exports = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'O parâmetro "q" é obrigatório.' });
    }

    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${query}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao buscar resultados:', error);
        res.status(500).json({ error: 'Erro ao buscar resultados.' });
    }
};