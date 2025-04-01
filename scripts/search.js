require('dotenv').config();
const API_KEY = process.env.API_KEY;

const CX = 'd3040a7b20d424a36'; // Substitua pelo ID do mecanismo de pesquisa personalizado
const GOOGLE_SEARCH_API_URL = 'https://www.googleapis.com/customsearch/v1';


document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('search-results');

    // Limpa os resultados anteriores
    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.innerHTML = '<p>Por favor, insira um termo de pesquisa.</p>';
        return;
    }

    try {
        // Faz a requisição para a API de Pesquisa do Google
        const response = await fetch(`${GOOGLE_SEARCH_API_URL}?key=${API_KEY}&cx=${CX}&q=${query}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }

        // Exibe os resultados
        data.items.forEach(item => {
            const title = item.title;
            const link = item.link;
            const snippet = item.snippet;

            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <p>${snippet}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } catch (error) {
        resultsContainer.innerHTML = '<p>Ocorreu um erro ao buscar os resultados. Tente novamente mais tarde.</p>';
        console.error('Erro na pesquisa:', error);
    }
});

document.getElementById('clear-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

    // Limpa o campo de entrada e os resultados
    searchInput.value = '';
    resultsContainer.innerHTML = '';
});