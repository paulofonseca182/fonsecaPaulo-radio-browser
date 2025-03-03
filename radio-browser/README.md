# 🎧 Radio Browser App

Aplicação web para buscar, salvar e gerenciar rádios online.

## 🚀 Tecnologias Utilizadas

* Linguagem: TypeScript

* Framework: Next.js

* Bibliotecas: React, Eslint, Axios, TailwindCSS

* API [Radio Browser API](https://api.radio-browser.info/)
    - https://de1.api.radio-browser.info/json/stations/search?limit=10

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
NEXT_PUBLIC_RADIO_API_URL=https://de1.api.radio-browser.info
```
## ▶️ Rodando o Projeto
```bash
npm run dev
# ou
yarn dev
```
* O projeto estará disponível em http://localhost:3000.

## 📌 Funcionalidades

- Gerenciamento de Rádios

    * Adicionar rádios à lista pessoal.

    * Ver a lista de rádios adicionadas.

    * Remover rádios da lista.

    * Editar informações de uma rádio.

- Player de Rádio

    * Ouvir a rádio ao clicar no play.

    * Parar a rádio ao clicar no stop.

-  Pesquisa e Filtros

    * Pesquisar por radios favoritas.

    * Pequisar todas as radios e filtrar por nome ou país ou idioma.

    * Paginação exibindo 10 rádios por vez.

- Persistência de Dados

    * As rádios adicionadas devem ser salvas para quando o usuário retornar.

    * As descricoes sao armazenadas e exibidas de acordo com id da radio.

    * O volume e armazenado, sempre inicia a aplicacao com ultimo volume utilizado   

## 🎨 Seguir a base do wireframe fornecido, com estilização livre.
[Wireframe](https://www.figma.com/design/TDuhDdbwdzIVQjNV3GF9Qi/Radio?node-id=0-1&p=f&t=t7NZQ8EsSVnOsxkx-0)

## 📷 Screenshots

    🖥️Desktop
![App Screenshot](/assets/Macbook-Air.png)

    🖥️Mobile
![App Screenshot](/assets/iPhone-12-search.png)
![App Screenshot](/assets/iPhone-12-PRO-favorites.png)


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