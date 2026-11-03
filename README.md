# 🗳️ HC CIPA Votação (2025)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

Sistema web seguro e auditável para gestão e realização de votações da **CIPA (Comissão Interna de Prevenção de Acidentes e Assédio)** do Hospital das Clínicas.

---

## 📐 Arquitetura da Solução

O sistema utiliza uma arquitetura Serverless moderna na Vercel com suporte a APIs Node.js/TypeScript e frontend reativo otimizado.

```mermaid
graph TD;
    User[🛈 Eleitor / Colaborador] -->|Acessa SPA| Frontend[React + Vite + Tailwind]
    Frontend -->|Requisição HTTPS| API[API Serverless Vercel /api]
    API -->|Queries SQL| DB[(PostgreSQL / MySQL)]
    API -->|Autenticação & Validação| Auth[Módulo de Validação de Voto]
```

---

## 🚀 Funcionalidades

- [x] **Autenticação de Eleitor:** Garantia de voto único por colaborador.
- [x] **Interface Intuitiva:** Exibição clara de candidatos com fotos e propostas.
- [x] **Registro Auditável:** Gravação de votos mantendo o sigilo e integridade do processo eleitoral.
- [x] **Apuração:** Endpoint/painel para computação segura de resultados.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React, TypeScript, Vite, TailwindCSS.
- **Backend:** Vercel Serverless Functions (`/api`).
- **Banco de Dados:** SQL Relacional.
- **Linter/Formatting:** ESLint 9.

---

## ⚡ Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js >= 18.x
- NPM ou Yarn
- Instância de Banco de Dados SQL

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/hc-cipa-votacao.git
   cd hc-cipa-votacao
   ```

2. **Instalar dependências:**
   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env` baseado no `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Preencha as credenciais da sua base de dados:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/cipa_db"
   ```

4. **Inicializar o Banco de Dados:**
   Execute os scripts disponíveis em `create_sqls.sql` no seu SGDB para estruturar as tabelas necessárias.

5. **Executar a aplicação em modo dev:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173` no seu navegador.

---

## 🧪 Testes e Qualidade de Código

```bash
# Executar Linter
npm run lint

# Executar Testes de API
node test-api.js
```

---

## 📚 Lições Aprendidas & Decisões de Engenharia

- **Segurança no Processo Eleitoral:** Garantir que o voto seja anônimo, porém único por matrícula/CPF, exigiu desacoplar a tabela de auditabilidade de presença da tabela de computação do voto.
- **Serverless em Vercel:** A adoção do diretório `/api` permitiu uma infraestrutura custo-zero para o pico de tráfego que ocorre tipicamente em dias únicos de eleição.