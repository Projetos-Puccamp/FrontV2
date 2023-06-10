const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');

router.get('/users', UserControllers.buscarTodos);

router.post('/users/cads', UserControllers.inserir);

router.post('/users/login', UserControllers.login);


router.get('/users/curso', UserControllers.FillCursos);

///router.put('/users/:codigo', userControllers.alterar);

module.exports = router;

