# TechStore — Loja de Informática

Aplicação moderna para gerenciamento de produtos de uma loja de informática. O projeto utiliza Next.js 15 (App Router), TypeScript, Tailwind CSS e Framer Motion, adotando o padrão BFF (Backend for Frontend) por meio de API Routes para intermediar o acesso aos dados persistidos em arquivo JSON.

## Visão Geral da Arquitetura

### Frontend (Next.js App Router)
- Componentes React tipados em TypeScript
- Interface responsiva com Tailwind CSS
- Animações suaves com Framer Motion
- Ícones modernos com Lucide React

### BFF (API Routes)
Camada fina de backend dentro do Next.js, responsável por:
- Expor endpoints alinhados às necessidades da interface
- Validação básica de dados
- Orquestração de leitura/escrita no JSON local

**Endpoints principais:**
- `GET/POST /api/products`
- `GET/PUT/DELETE /api/products/[id]`
- `GET /api/brands`

### Persistência
Arquivo `products.json` como base de dados local para fins didáticos.

## Estrutura de Pastas

```
src/
├── app/
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts           # GET (listar) e POST (criar)
│   │   │   └── [id]/
│   │   │       └── route.ts       # GET, PUT, DELETE por ID
│   │   └── brands/
│   │       └── route.ts           # GET (listar marcas)
│   ├── page.tsx                   # Página principal
│   ├── layout.tsx                 # Layout global
│   └── globals.css                # Estilos globais
├── components/
│   ├── ProductCard.tsx            # Card de produto com animações
│   ├── ProductForm.tsx            # Formulário de produto
│   └── ProductList.tsx            # Lista de produtos com filtros
├── data/
│   └── products.json              # Base de dados JSON
└── types/
    └── product.ts                 # Tipos e interfaces TypeScript
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/products` | Lista todos os produtos |
| `POST` | `/api/products` | Cria novo produto |
| `GET` | `/api/products/[id]` | Obtém produto por ID |
| `PUT` | `/api/products/[id]` | Atualiza produto |
| `DELETE` | `/api/products/[id]` | Remove produto |
| `GET` | `/api/brands` | Lista marcas disponíveis |

## Fluxo de Dados

```
UI (React/Next.js) → BFF (API Routes/Validação) → JSON (persistência local)
```

A adoção do padrão BFF reduz over-fetching/under-fetching, centraliza regras simples e facilita evolução incremental.

## Funcionalidades Principais

### Gerenciamento de Produtos
- **CRUD completo** de produtos (criar, ler, atualizar, excluir)
- **Filtros avançados** por seção, status (novo/usado) e busca textual
- **Sistema de marcas** com imagens associadas
- **Validação** no frontend e nas rotas da API

### Interface e Experiência
- **Design responsivo** com Tailwind CSS
- **Animações suaves** com Framer Motion
- **Ícones modernos** com Lucide React
- **Paleta de cores** laranja e branco
- **Cards interativos** com botões de ação nos cantos

### Tecnologias
- **TypeScript** para tipagem estática
- **Next.js 15** com App Router
- **Tailwind CSS** para estilização
- **Framer Motion** para animações
- **Lucide React** para ícones

### Seções Disponíveis
- Computadores
- Acessórios
- Impressoras
- Games
- Gadgets

## Como Executar

### Pré-requisitos
- Node.js ≥ 18
- npm, pnpm ou yarn

### Instalação
```bash
# Instalar dependências
npm install
# ou
pnpm install

# Executar em modo desenvolvimento
npm run dev
# ou
pnpm dev
```

### Acesso
- **Aplicação**: http://localhost:3000
- **API**: http://localhost:3000/api/products

## Scripts Disponíveis

```bash
npm run dev      # Executa em modo desenvolvimento
npm run build    # Gera build de produção
npm run start    # Executa build de produção
npm run lint     # Executa linter ESLint
```

## Decisões de Projeto

### Arquitetura
- **Next.js + BFF**: Facilita prototipagem ao unir UI e API na mesma base, reduzindo complexidade de deploy
- **JSON local**: Suficiente para fins didáticos, simplifica persistência e versionamento dos dados
