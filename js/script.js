// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // URL do arquivo JSON.
    const url = 'data/products.json';
    
    // Seleciona as divs e botões do HTML.
    const cardsContainer = document.querySelector('.cards');
    const btnLoadMore = document.getElementById('btn-load-more');
    const filterButtons = document.querySelectorAll('.btn-filter');

    // Variáveis para controlar os produtos e a exibição.
    let allProducts = [];
    let productsToShow = 6; // Quantidade de produtos para mostrar inicialmente.

    // Função para renderizar os cards na tela.
    const renderCards = (products) => {
        cardsContainer.innerHTML = ''; // Limpa os cards existentes.
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Adiciona a classe de tipo para o filtro.
            card.classList.add(product.type.toLowerCase().replace(' ', '-'));
            
            // Monta o conteúdo HTML do card.
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
            cardsContainer.appendChild(card);
        });
    };

    // Função para carregar os produtos do JSON.
    const loadProducts = async () => {
        try {
            // Faz a requisição para o arquivo JSON.
            const response = await fetch(url);
            allProducts = await response.json();
            
            // Exibe apenas os primeiros produtos.
            const initialProducts = allProducts.slice(0, productsToShow);
            renderCards(initialProducts);

            // Mostra o botão "Ver Mais" se houver mais produtos do que o limite inicial.
            if (allProducts.length > productsToShow) {
                btnLoadMore.style.display = 'block';
            } else {
                btnLoadMore.style.display = 'none';
            }

        } catch (error) {
            console.error('Erro ao carregar os produtos:', error);
            cardsContainer.innerHTML = '<p>Erro ao carregar o cardápio. Por favor, tente novamente mais tarde.</p>';
        }
    };

    // Função para filtrar os produtos.
    const filterMenu = (category) => {
        // Remove a classe 'active' de todos os botões e adiciona ao clicado.
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.btn-filter[onclick="filterMenu('${category}')"]`).classList.add('active');

        // Filtra os produtos com base na categoria.
        const filteredProducts = allProducts.filter(product => {
            return category === 'todos' || product.type.toLowerCase().replace(' ', '-') === category.toLowerCase();
        });

        renderCards(filteredProducts);
        // Esconde o botão "Ver Mais" quando um filtro é aplicado.
        btnLoadMore.style.display = 'none';
    };

    // Adiciona o evento de clique no botão "Ver Mais".
    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            // Aumenta o número de produtos a serem exibidos.
            productsToShow += 6;
            
            // Exibe mais produtos.
            const newProducts = allProducts.slice(0, productsToShow);
            renderCards(newProducts);

            // Esconde o botão se não houver mais produtos para mostrar.
            if (productsToShow >= allProducts.length) {
                btnLoadMore.style.display = 'none';
            }
        });
    }

    // Adiciona a função `filterMenu` ao escopo global para que o `onclick` do HTML funcione.
    window.filterMenu = filterMenu;

    // Carrega os produtos ao iniciar a página.
    loadProducts();
});