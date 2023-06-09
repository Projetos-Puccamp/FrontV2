const express = require('express');
const router = express.Router();

const UserControllers = require('./controllers/userControllers');


router.get('/users', UserControllers.buscarTodos);
router.post('/users/login', UserControllers.login);
router.post('/users/cads', UserControllers.inserir);
router.get('/users/curso', UserControllers.FillCursos);

///router.put('/users/:codigo', userControllers.alterar);
//router.delete('/users/:codigo', userControllers.excluir);

module.exports = router;