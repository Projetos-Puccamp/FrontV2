# Aplicativo de Cursos Online

Este é o projeto "Aplicativo de Cursos Online", uma aplicação desenvolvida para fornecer cursos online aos usuários. O projeto é dividido em duas partes: uma parte back-end e uma parte front-end.

## Requisitos

Certifique-se de ter o Node.js instalado em seu sistema antes de prosseguir com a configuração e execução deste projeto.

## Instalação

Siga as etapas abaixo para configurar o projeto em seu ambiente local:

1. Baixe e instale o Node.js a partir do [site oficial](https://nodejs.org).

2. Crie uma pasta chamada `app` em um diretório de sua preferência.

3. Dentro da pasta `app`, crie duas subpastas chamadas `front` e `back`.

4. Baixe o conteúdo correspondente de cada diretório (front-end e back-end) e coloque-o em suas respectivas pastas (`app/front` e `app/back`).

5. Abra um terminal na pasta `app/back` e execute o seguinte comando para instalar as dependências do back-end:

npm install express-session 
npm install --save-dev jest 
npm install express mysql dotenv cors body-parser 
npm install nodemon --save-dev 
npm install --save-dev supertest 

6. Abra outro terminal na pasta `app/front` e execute o seguinte comando para instalar as dependências do front-end:

npm install electron


## Execução

Para iniciar o aplicativo, siga as etapas abaixo:

1. No terminal da pasta `app/back`, execute o seguinte comando para iniciar o servidor back-end:

npm start


Isso iniciará o servidor back-end na porta especificada (por padrão, a porta 3001).

2. No terminal da pasta `app/front`, execute o seguinte comando para iniciar o aplicativo front-end:

npm start


Isso iniciará o aplicativo front-end.

Certifique-se de que o servidor back-end esteja em execução antes de iniciar o aplicativo front-end.

## Teste Automatizado

Para executar os testes automatizados, siga as etapas abaixo:

1. Certifique-se de que o servidor back-end esteja desligado antes de executar os testes.

2. No terminal da pasta `app/back`, execute o seguinte comando para executar os testes:

npm test


Isso iniciará a execução dos testes automatizados.
