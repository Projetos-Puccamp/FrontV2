const express = require('express');
const router = express.Router();

const UserControllers = require('./controllers/userControllers');

router.get('/users', UserControllers.buscarTodos);

module.exports = router;