# 💖 Delicinhas da Chica

## 🍫 Visão Geral do Projeto

Este é o site oficial da **Delicinhas da Chica**, uma confeitaria artesanal especializada em trufas e brigadeiros gourmet. O objetivo principal do site é servir como um **catálogo digital interativo** permitindo que os clientes visualizem os produtos e façam pedidos de forma simples e direta via **WhatsApp**.
> 💡 Não se trata de um e-commerce tradicional, mas de uma solução leve e acessível para pequenos negócios.

O projeto foi construído do zero, utilizando as tecnologias front-end padrão, com foco total em usabilidade (UX) e design responsivo.

---

## ✨ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura semântica da página. |
| **CSS3** | Estilização, layout responsivo (Flexbox e Grid), e animações. |
| **JavaScript (ES6+)** | Lógica de carregamento e filtragem dinâmica dos produtos (via JSON). |
| **JSON** | Armazenamento e gerenciamento dos dados do cardápio. |
| **Font Awesome** | Biblioteca de ícones (redes sociais, menu, etc.). |

---

## 🎨 Design e Paleta de Cores

A paleta de cores é inspirada nos tons de chocolate e morango, refletindo a doçura e o toque artesanal da marca.

| Variável | Código Hex | Descrição |
| :--- | :--- | :--- |
| **`--cor-primaria`** | `#fd0075` | Rosa Pink (Destaque, Botões de Ação) |
| **`--cor-secundaria`** | `#3c2115` | Marrom Escuro (Texto Principal) |
| **`--cor-fundo`** | `#fed7da` | Rosa Claro (Fundo Principal) |

---

## 🛠️ Principais Funcionalidades

* **Catálogo Dinâmico:** Carregamento de produtos a partir de um arquivo `products.json` usando JavaScript.
* **Filtragem de Produtos:** Permite filtrar o cardápio por categoria (Trufas, Brigadeiros, Especiais) com destaque visual no filtro ativo.
* **Carregamento Otimizado:** Exibe apenas os primeiros 8 produtos por padrão, com um botão "Ver Mais" para carregar o restante (funcionalidade de paginação).
* **Design Responsivo:** Layout fluido que se adapta perfeitamente a todos os dispositivos (celulares, tablets e desktops).
* **Chamadas para Ação Diretas:** Links de pedido direto para o WhatsApp em cada card de produto e na seção de Contato.
* **Arquitetura CSS Modular:** Estilos organizados por seções (`about.css`, `menu.css`, `contact.css`) com um arquivo global (`style.css`) para cores, tipografia e componentes reutilizáveis.

---

## 🚀 Como Visualizar o Projeto

Para ver o site localmente, siga estes passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Tamisboliveira/delicinhas_da_chica_site.git
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd delicinhas_da_chica_site
    ```
3.  **Abra o arquivo:**
    Abra o arquivo `index.html` diretamente no seu navegador.

***

## ⚙️ Estrutura de Arquivos
```
.
├── assets/
│   └── images/              # Imagens do logo e capa
│       └── products/        # Imagens dos produtos (recheios, caixas)
├── css/
│   ├── style.css            # Estilos globais, layout base e variáveis
│   ├── menu.css             # Estilos do cardápio e filtros
│   ├── about.css            # Seção "Sobre"
│   └── contact.css          # Formulário e informações de contato
├── data/                    # Dados do projeto
│   └── products.json        # Banco de dados dos produtos
├── js/
│   └── script.js            # Lógica para manipulação do DOM, carregamento e filtros
└── index.html               # Estrutura principal do site
```

## ✒️ Autor

Desenvolvido por: **Astrya Tech**

* **GitHub:** https://github.com/Tamisboliveira
* **LinkedIn:** https://www.linkedin.com/in/tamiresboliveira