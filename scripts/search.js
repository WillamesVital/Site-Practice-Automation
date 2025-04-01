document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const resultsContainer = document.getElementById('search-results');

    resultsContainer.innerHTML = '';

    if (!query) {
        resultsContainer.innerHTML = '<p>Por favor, insira um termo de pesquisa.</p>';
        return;
    }

    try {
        const BACKEND_URL = 'http://localhost:3000'; // URL do servidor backend
        const response = await fetch(`${BACKEND_URL}/search?q=${query}`);
        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            resultsContainer.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            return;
        }

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

const query = 'teste';
const BACKEND_URL = 'http://localhost:3000'; // URL do servidor backend
fetch(`${BACKEND_URL}/search?q=${query}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erro:', error));