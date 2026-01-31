/**
 * ==============================
 * Cardápio Dinâmico – Delicinhas da Chica
 * ==============================
 * Responsável por:
 * - Carregar produtos a partir de um arquivo JSON
 * - Filtrar itens por categoria
 * - Renderizar cards interativos
 * - Controlar expansão de conteúdo e botão "Ver mais"
 * - Gerenciar navegação mobile (menu hamburguer)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==============================
     * CONFIGURAÇÕES GERAIS
     * ============================== */
    const DATA_URL = 'data/products.json';
    const INITIAL_PRODUCTS_LIMIT = 8;
    const TEXT_LIMIT = 120;

    /* ==============================
    * ELEMENTOS DO DOM
    * Referências aos elementos da interface
    * ============================== */

    const cardsContainer = document.querySelector('.cards');
    const btnLoadMore = document.getElementById('btn-load-more');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const categoryDescriptionDiv = document.getElementById('category-description');
    const generalIntroDiv = document.getElementById('general-intro');
    
    const menuBtn = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    /* ==============================
    * ESTADO DA APLICAÇÃO
    * Variáveis que controlam o comportamento da interface
    * ============================== */
    let allProducts = [];
    let productsToShow = INITIAL_PRODUCTS_LIMIT;

    /* ==============================
     * FUNÇÕES UTILITÁRIAS
     * ============================== */

    // Gera uma versão resumida do texto para exibição nos cards
    const getShortText = (text, limit = TEXT_LIMIT) => {
        if (!text) return '';
        return text.length <= limit
            ? text
            : text.substring(0, limit).trim() + '...';
    };

    // Normaliza strings para facilitar comparação de categorias
    const normalize = (text) =>
        text.toLowerCase().trim().replace(/\s+/g, '-');

    /* ==============================
    * TAGS / BADGES
    * Configuração visual das tags exibidas nos cards
    * ============================== */
    const tagConfig = {
        classico: { label: "🍫 Clássico", class: "badge-classico" },
        fruta: { label: "🍓 Fruta", class: "badge-fruta" },
        especiais: { label: "✨ Especial", class: "badge-especial" },
        premium: { label: "👑 Premium", class: "badge-premium" },
        presente: { label: "🎁 Presente", class: "badge-presente" },
        diversos: { label: "🍬 Diversos", class: "badge-diversos" }
    };

    const renderTags = (tags = []) =>
        tags.map(tag => {
            const key = tag.toLowerCase();
            const config = tagConfig[key];

            return config
                ? `<span class="badge ${config.class}">${config.label}</span>`
                : `<span class="badge">${tag}</span>`;
        }).join('');

    /* ==============================
    * RENDERIZAÇÃO DOS CARDS
    * Cria dinamicamente os cards de produto no DOM
    * ============================== */
    const renderCards = (products) => {
        cardsContainer.innerHTML = '';

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card', normalize(product.type));

            card.innerHTML = `
                <div class="card-top">
                    <img src="${product.image}" alt="${product.name}" class="card-img">
                    <span class="badges">
                        ${renderTags(Array.isArray(product.tags) ? product.tags : [product.tags])}
                    </span>
                </div>

                <div class="card-content">
                    <h4 class="card-title">${product.name}</h4>

                    <p class="card-description short">
                        ${getShortText(product.description)}
                    </p>

                    <p class="card-description full">
                        ${product.description}
                    </p>
                </div>
            `;

            // Expansão do card
            card.addEventListener('click', () => {
                document
                    .querySelectorAll('.card.expanded')
                    .forEach(c => c !== card && c.classList.remove('expanded'));

                card.classList.toggle('expanded');
            });

            cardsContainer.appendChild(card);
        });
    };

    /* ==============================
     * DESCRIÇÕES DAS CATEGORIAS
     * ============================== */
    const categoryDescriptions = {
        trufa: `
            <p><strong>Trufas artesanais:</strong>
            Mais de 15 sabores que variam diariamente. Perfeitas para um mimo ou presente especial.</p>
        `,
        especial: `
            <p><strong>Presentes que encantam:</strong>
            Caixas personalizadas com carinho e sabor artesanal.</p>
        `,
        brigadeiro: `
            <p><strong>Docinhos gourmet:</strong>
            Produção sob encomenda para festas inesquecíveis.</p>
        `,
        colher: `
            <p><strong>Brigadeiro no pote:</strong>
            Cremoso, intenso e impossível de resistir.</p>
        `,
        bolo: `
            <p><strong>Bolos caseiros:</strong>
            Simples, artesanais e cheios de afeto.</p>
        `,
        pote: `
            <p><strong>Bolos no pote:</strong>
            Praticidade e sabor em cada colherada.</p>
        `
    };

    /* ==============================
    * FILTRO DE PRODUTOS
    * Aplica filtros por categoria e controla exibição dos cards
    * ============================== */
    const filterMenu = (category) => {

        categoryDescriptionDiv.innerHTML =
            categoryDescriptions[category] || '';

        generalIntroDiv.style.display =
            category === 'todos' ? 'block' : 'none';

        const filtered = allProducts.filter(product => {
            const matchesCategory =
                category === 'todos' ||
                normalize(product.type) === category;

            return matchesCategory && product.in_stock === true;
        });

        renderCards(filtered.slice(0, productsToShow));

        btnLoadMore.style.display =
            category === 'todos' && filtered.length > productsToShow
                ? 'block'
                : 'none';
    };

    /* ==============================
     * CARREGAMENTO DOS DADOS
     * ============================== */
    const loadProducts = async () => {
        try {
            const response = await fetch(DATA_URL);
            allProducts = await response.json();

            generalIntroDiv.style.display = 'block';
            productsToShow = INITIAL_PRODUCTS_LIMIT;

            filterMenu('todos');

        } catch (error) {
            console.error(error);
            cardsContainer.innerHTML =
                '<p>Erro ao carregar o cardápio.</p>';
        }
    };

    /* ==============================
     * EVENTOS DE INTERAÇÃO
     * ============================== */
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            productsToShow = INITIAL_PRODUCTS_LIMIT;
            filterMenu(btn.dataset.category);
        });
    });

    btnLoadMore?.addEventListener('click', () => {
        productsToShow += INITIAL_PRODUCTS_LIMIT;
        filterMenu('todos');
    });

    /* ==============================
     * INICIALIZAÇÃO
     * ============================== */
    loadProducts();

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
        menuOverlay.classList.toggle('active');
    });

    menuOverlay.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuOverlay.classList.remove('active');
        menuBtn.classList.remove('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuOverlay.classList.remove('active');
            menuBtn.classList.remove('open');
        });
    });

});