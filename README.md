# 🛒 TechStore - Loja de Informática (Next.js + BFF)

Sistema de gerenciamento de produtos para loja de informática, desenvolvido com **Next.js 15**, **TypeScript**, **Tailwind CSS** e **BFF (Backend for Frontend)**.

## 🚀 Tecnologias

- ⚛️ Next.js 15 (App Router)
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🏗️ BFF (Backend for Frontend) com API Routes
- 📦 JSON como banco de dados

## 🏗️ Arquitetura BFF

Este projeto implementa o padrão **BFF (Backend for Frontend)** usando as API Routes do Next.js:

### 📁 Estrutura da API

```
src/app/api/
├── products/
│   ├── route.ts          # GET (listar) e POST (criar)
│   └── [id]/
│       └── route.ts      # GET, PUT, DELETE por ID
└── brands/
    └── route.ts          # GET (listar marcas)
```

### 🔄 Endpoints Disponíveis

- `GET /api/products` - Listar todos os produtos
- `POST /api/products` - Criar novo produto
- `GET /api/products/[id]` - Buscar produto por ID
- `PUT /api/products/[id]` - Atualizar produto
- `DELETE /api/products/[id]` - Deletar produto
- `GET /api/brands` - Listar todas as marcas

## 📦 Funcionalidades

- ✅ **CRUD Completo** - Criar, ler, atualizar e deletar produtos
- ✅ **Filtros Avançados** - Por seção e status (usado/novo)
- ✅ **Busca em Tempo Real** - Por nome e descrição
- ✅ **Interface Responsiva** - Desktop, tablet e mobile
- ✅ **TypeScript** - Tipagem forte em todo o projeto
- ✅ **BFF Pattern** - Backend otimizado para o frontend
- ✅ **Validação de Dados** - Validação tanto no frontend quanto no backend

## ▶️ Como executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd techstore-next
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**
   - Frontend: http://localhost:3000
   - API: http://localhost:3000/api/products

## 📁 Estrutura do Projeto

```
techstore-next/
├── src/
│   ├── app/
│   │   ├── api/                    # API Routes (BFF)
│   │   │   ├── products/
│   │   │   └── brands/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx               # Página principal
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ProductForm.tsx
│   │   └── ProductList.tsx
│   ├── data/
│   │   └── products.json          # Banco de dados JSON
│   └── types/
│       └── product.ts             # Tipos TypeScript
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Seções de Produtos

- **computadores** - Hardware, componentes, etc.
- **acessorios** - Periféricos, monitores, áudio, etc.
- **impressoras** - Impressoras e equipamentos de impressão
- **games** - Produtos relacionados a jogos
- **gadgets** - Dispositivos eletrônicos diversos

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🔧 Vantagens do BFF

### ✅ **Benefícios Implementados:**

1. **API Otimizada para Frontend**
   - Endpoints específicos para as necessidades da UI
   - Redução de over-fetching e under-fetching

2. **Validação Centralizada**
   - Validação de dados no backend
   - Tipagem TypeScript compartilhada

3. **Performance**
   - Menos requisições HTTP
   - Dados agregados quando necessário

4. **Manutenibilidade**
   - Lógica de negócio centralizada
   - Fácil evolução da API

## 📊 Dados de Exemplo

O arquivo `src/data/products.json` contém produtos de exemplo nas seções:
- computadores
- acessorios

## 🔄 Fluxo de Dados

```
Frontend (React) → API Routes (BFF) → JSON Database
     ↓                    ↓                ↓
  Componentes         Validação        Persistência
  TypeScript         TypeScript        Local
```

## 📝 Licença

Este projeto é uma evolução do ProductStore original, implementando arquitetura moderna com Next.js e BFF.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.