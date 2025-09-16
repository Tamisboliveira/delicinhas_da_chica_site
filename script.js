// Aguarda o carregamento completo do DOM para garantir que todos os elementos HTML existem.
document.addEventListener('DOMContentLoaded', () => {
    // URL do arquivo JSON.
    const url = 'products.json';
    
    // Seleciona a div onde os cards serão inseridos.
    const cardsContainer = document.querySelector('.cards');

    // Função para carregar e exibir os produtos.
    const loadProducts = async () => {
        try {
            // 1. Faz a requisição para o arquivo JSON.
            const response = await fetch(url);
            
            // 2. Converte a resposta para JSON.
            const products = await response.json();

            // 3. Itera sobre cada produto e cria o HTML.
            products.forEach(product => {
                // Cria um novo elemento div para o card.
                const card = document.createElement('div');
                card.classList.add('card');
                
                // Monta o conteúdo HTML do card usando os dados do JSON.
                card.innerHTML = `
                    <div class="card-top">
                        <img src="${product.image}" alt="${product.name}" class="card-img">    
                        <span class="tag">${product.type}</span>
                    </div>
                    <div class="card-content">
                        <h4 class="card-title">${product.name}</h4>
                        <p class="card-description">${product.description}</p>
                        <div class="card-footer">
                            <span class="card-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                            <a href="https://wa.me/5519971695600?text=Olá, quero pedir o produto: ${product.name}!" class="btn-card">Adicionar</a>
                        </div>
                    </div>
                `;

                // 4. Adiciona o card criado ao container de cards no HTML.
                cardsContainer.appendChild(card);
            });

        } catch (error) {
            // Captura e exibe qualquer erro que ocorra durante o processo.
            console.error('Erro ao carregar os produtos:', error);
            cardsContainer.innerHTML = '<p>Erro ao carregar o cardápio. Por favor, tente novamente mais tarde.</p>';
        }
    };

    // Chama a função para iniciar o carregamento dos produtos.
    loadProducts();
});