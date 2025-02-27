# 🎧 Radio Browser App

Aplicação web para buscar, salvar e gerenciar rádios online.

## 🚀 Tecnologias Utilizadas

* Linguagem: TypeScript

* Framework: Next.js

* Bibliotecas: React, Eslint, Axios, TailwindCSS

## 📦 Instalação e Uso

 ### 🔧 Requisitos

* Node.js 16+

* NPM ou Yarn

## 📥 Instalando Dependências
```bash
npm install
# ou
yarn install
```
## 🔄 Configuração das Variáveis de Ambiente

* Crie um arquivo .env.local na raiz do projeto e adicione:
```bash
NEXT_PUBLIC_RADIO_API_URL=https://de1.api.radio-browser.info/json/stations/search
```
## ▶️ Rodando o Projeto
```bash
npm run dev
# ou
yarn dev
```
* O projeto estará disponível em http://localhost:3000.

## 📌 Funcionalidades

### ✅ Funcionalidades Obrigatórias

- Gerenciamento de Rádios

    * Adicionar rádios à lista pessoal.

    * Ver a lista de rádios adicionadas.

    * Remover rádios da lista.

    * Editar informações de uma rádio.

- Player de Rádio

    * Ouvir a rádio ao clicar no play.

    * Parar a rádio ao clicar no stop.

-  Pesquisa e Filtros

    * Pesquisar rádios pelo nome.

    * Filtrar por nome, país ou idioma.

    * Paginação exibindo 10 rádios por vez.

- Persistência de Dados

    * As rádios adicionadas devem ser salvas para quando o usuário retornar.

- Seguir a base do wireframe fornecido, com estilização livre.
    * [Wireframe](https://www.figma.com/design/TDuhDdbwdzIVQjNV3GF9Qi/Radio?node-id=0-1&p=f&t=t7NZQ8EsSVnOsxkx-0)

## 📂 .gitignore

* O projeto inclui um .gitignore com exclusões essenciais, como:
```Bash
# Node.js
node_modules/

# Next.js
.next/
out/
.vercel/

# Configuração
.env*

# Outros
.DS_Store
*.log
```
Este projeto é um challenge by [Coodesh](https://coodesh.com/). 🚀