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
    let productsToShow = 8; // Quantidade de produtos para mostrar inicialmente.

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
                    <!-- <div class="card-footer">
                        <span class="card-price">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
                        <a href="https://wa.me/5519971695600?text=Olá, quero pedir o produto: ${product.name}!" <class="btn-card">Adicionar<>/a>
                    </div> -->
                </div>
            `;
            cardsContainer.appendChild(card);
        });
    };

    // Mapeamento das categorias com textos detalhados
    const categoryDescriptions = {
        'trufa': `
            <p><strong>Trufas artesanais que vão te surpreender:</strong>
            Nosso carro-chefe! São mais de 15 sabores que variam diariamente. Perfeitas para um mimo individual ou como um presente sofisticado em nossas caixas presenteáveis. Sempre temos sabores variados a pronta-entrega para saciar a sua vontade de chocolate imediatamente!</p>
        `,
        'especial': `
            <p><strong>O Presente perfeito para encantar!</strong>
            Surpreender alguém especial ficou ainda mais delicioso!<br><br>
            Nossas trufas têm aquele sabor inconfundível de afeto e conforto, de doce feito em casa. Com as Delicinhas da Chica, você monta a caixa perfeita, a escolha é sua: personalize a seleção de trufas que mais combina com a pessoa especial (ou com o seu desejo do dia), e transforme qualquer ocasião em um momento doce, inesquecível e totalmente pensado com o carinho que só um presente artesanal pode oferecer.</p>
        `,
        'brigadeiro': `
            <p><strong>Docinhos gourmet para festa:</strong> Para festas inesquecíveis, o segredo está no detalhe! Escolha entre 8 opções de sabores especiais de docinhos, todos feitos sob encomenda (a partir de 25 unidades) para assegurar que cada mordida tenha o máximo de sabor e qualidade gourmet.<br><br>
            <strong>Informações Importantes:</strong><br><br>
            <ul>
                <li>Nossos docinhos têm aproximadamente 21g e são produzidos artesanalmente, utilizando chocolates nobres e ingredientes premium. Cada mordida é uma experiência inesquecível!</li>
                <li>A durabilidade dos brigadeiros é de até 3 dias fora da geladeira e até 5 dias refrigerados. Porém, recomendamos consumir o quanto antes para melhor sabor e textura.</li>
                <li>Sempre que possível, mantenha os docinhos em temperatura ambiente, em um local fresco e protegido da luz solar. A refrigeração pode alterar a textura e a aparência.</li>
                <li>Para encomendas, você pode escolher 1 sabor a cada 25 unidades. Portanto, em um cento é possível selecionar até 4 sabores.</li>
                <li>Docinhos personalizados com forminhas coloridas e/ou marcações com carimbos possuem taxa adicional de 10% sobre o valor total.</li>
                <li>Não trabalhamos com brigadeiros coloridos, pois preservamos a originalidade artesanal e a qualidade dos nossos doces.</li>
                <li>Por gentileza, realize sua encomenda com mínimo de 5 dias de antecedência.</li>
                <li>Seu pedido será confirmado mediante o pagamento de 50% do valor total.</li>
                <li>Em caso de cancelamento, o valor do sinal (50%) não é reembolsável, pois garante a reserva da produção e a compra dos ingredientes para a sua data.</li>
                <li>Para caixas corporativas presenteáveis (2, 4, 6 ou 12 unidades), o pedido mínimo é de 10 caixas. Por gentileza, entre em contato para mais informações.</li>
            </ul></p>
        `,
        'colher': `
            <p><strong>Brigadeiro no pote - Felicidade para comer de colher!</strong> Os docinhos clássicos mais amados do Brasil, agora em uma versão individual, cremosa, generosa e impossível de resistir!<br><br>
            Feitos com chocolates premium e ingredientes de alta qualidade, nossos brigadeiros no pote derretem na boca e trazem aquele sabor de festa que abraça por dentro.<br><br>
            Perfeitos para adoçar o seu dia, levar para onde você for ou presentear e mimar alguém especial. É a dose ideal de felicidade em um pote!</p> 
        `,
        'bolo': `
            <p><strong>Bolos caseirinhos:</strong> A pedida perfeita para qualquer momento! Nossos bolos são feitos de forma artesanal, em seis opções de sabores. Simplesmente deliciosos e feitos com aquele toque caseiro que a gente ama!</p>`
        ,
        'pote': `
            <p><strong>Bolos no pote:</strong> Um potinho recheado de sabor e cremosidade, perfeito para levar para onde você for, ou para presentear e mimar alguém especial!<br><br>
            Nossos bolos no pote estão disponíveis em três sabores clássicos e irresistíveis, preparados com todo cuidado para entregar aquela combinação única de bolo macio com brigadeiro cremoso.<br><br>
            É impossível escolher um só, cada colherada é uma dose perfeita de felicidade para a sua sobremesa, lanche ou para surpreender quem você ama!</p>
        `
    };

    // Função para carregar os produtos do JSON.
    const loadProducts = async () => {
        try {
            // Faz a requisição para o arquivo JSON.
            const response = await fetch(url);
            allProducts = await response.json();
            
            // 1. ATIVA O BOTÃO 'TODOS' VISUALMENTE e ajusta o texto
            filterButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector(`.btn-filter[onclick="filterMenu('todos')"]`).classList.add('active');
            
            // 2. Garante que o texto 'Todos' e a introdução geral apareçam na carga
            // Você precisará replicar aqui a lógica do texto para 'todos' ou chamar uma função separada.
            categoryDescriptionDiv.innerHTML = categoryDescriptions['todos'] || '';
            generalIntroDiv.style.display = 'block';
            
            // 3. RENDERIZA APENAS OS PRIMEIROS 8 CARDS (PARA O "VER MAIS" FUNCIONAR)
            const initialProducts = allProducts.slice(0, productsToShow);
            renderCards(initialProducts);

            // 4. MOSTRA/ESCONDE O BOTÃO "VER MAIS"
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

    // Seleciona a div para a descrição da categoria
    const categoryDescriptionDiv = document.getElementById('category-description');
    const generalIntroDiv = document.getElementById('general-intro'); // Para esconder/mostrar

    // Função para filtrar os produtos.
    const filterMenu = (category) => {
        // Remove a classe 'active' de todos os botões e adiciona ao clicado.
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.btn-filter[onclick="filterMenu('${category}')"]`).classList.add('active');

        // Atualiza o texto de descrição da categoria
        const descriptionHTML = categoryDescriptions[category];
        categoryDescriptionDiv.innerHTML = descriptionHTML || ''; // Atualiza o texto

        // OCULTA/MOSTRA A INTRO GERAL
        if (category === 'todos') {
            generalIntroDiv.style.display = 'block';
        } else {
            generalIntroDiv.style.display = 'none'; 
        }

        // Filtra os produtos com base na categoria.
        const filteredProducts = allProducts.filter(product => {
            return category === 'todos' || product.type.toLowerCase().replace(' ', '-') === category.toLowerCase();
        });

        renderCards(filteredProducts);
        // Se for 'todos', deixamos a lógica de mostrar/esconder para o loadProducts inicial.
        if (category !== 'todos' || allProducts.length <= productsToShow) {
             btnLoadMore.style.display = 'none';
        }
    };

    // Adiciona o evento de clique no botão "Ver Mais".
    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            // Aumenta o número de produtos a serem exibidos.
            productsToShow += 8;
            
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