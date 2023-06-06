require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = express();
const routes = require('./routes');

server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));

server.use('./api', routes);

server.listen(process.env.POR, ()=>{
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
    //teste do git
});