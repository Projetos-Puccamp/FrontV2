const express = require('express');
const router = express.Router();

const UserControllers = require('./controllers/userControllers');

router.get('/users', UserControllers.buscarTodos);
router.get('/users/:codigo', UserControllers.buscarUm);

module.exports = router;