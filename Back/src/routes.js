const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');

//rotas de usuario
router.post('/users/cads', UserControllers.inserir);
router.post('/users/login', UserControllers.login);
router.get('/users/vagas', UserControllers.FillVagas);
router.get('/users/curso', UserControllers.FillCursos);
router.get('/users', UserControllers.buscarTodos);
router.post('/users/historico', UserControllers.buscarHistorico);
router.post('/users/case', UserControllers.FillCase);
router.post('/users/teste', UserControllers.FillPerguntas);
//rotas de empresa
router.post('/emps/cads', UserControllers.inserirVaga);

///router.put('/users/:codigo', userControllers.alterar);


//rotas ADM
router.post('/adm/CriarPergunta', UserControllers.inserirPergunta);
router.post('/adm/cadsM', UserControllers.inserirM);
router.post('/adm/cadsE', UserControllers.inserirE);
router.post('/adm/CriarTreinamento', UserControllers.inserirTreinamento);
router.post('/adm/Vaga_Treinamento', UserControllers.inserirVaga_Treinamento);
router.post('/adm/Aluno_Treinamento', UserControllers.inserirAluno_Treinamento);
module.exports = router;