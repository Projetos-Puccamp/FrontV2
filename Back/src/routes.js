const express = require('express');
const router = express.Router();
const UserControllers = require('./controllers/userControllers');

//rotas de usuario
router.post('/users/cads', UserControllers.inserir);
router.post('/users/login', UserControllers.login);
router.get('/users/vagas', UserControllers.FillVagas);
router.get('/users/curso', UserControllers.FillCursos);
router.get('/users/curso/men', UserControllers.FillCursosPAluno);
router.get('/users', UserControllers.buscarTodos);
router.post('/users/historico', UserControllers.buscarHistorico);
router.post('/users/case', UserControllers.FillCase);
router.post('/users/teste', UserControllers.FillPerguntas);
router.post('/users/verificaResp', UserControllers.VerificarRespostas);
router.post('/users/inscvaga', UserControllers.VerificarTreinamento);
//rotas de empresa
router.post('/emps/cads', UserControllers.inserirVaga);
router.put('/emps/cads/att', UserControllers.atualizarDescricao);
router.put('/emps/cads/attNome', UserControllers.atualizarNome);
router.put('/emps/cads/attReq', UserControllers.atualizarRequisito);


//router.put('/users/:codigo', userControllers.alterar);
//rotas mentor
router.get('/mentor/historico', UserControllers.FillConteudo);

//rotas ADM
router.post('/adm/CriarPergunta', UserControllers.inserirPergunta);
router.post('/adm/cadsM', UserControllers.inserirM);
router.post('/adm/cadsE', UserControllers.inserirE);
router.post('/adm/CriarTreinamento', UserControllers.inserirTreinamento);
router.post('/adm/CriarConteudo', UserControllers.inserirConteudo);
router.post('/adm/CriarQuiz', UserControllers.inserirQuiz);
router.get('/adm/buscaconteudo', UserControllers.FillConteudo);
router.post('/adm/Vaga_Treinamento', UserControllers.inserirVaga_Treinamento);
router.post('/adm/Aluno_Treinamento', UserControllers.inserirAluno_Treinamento);
router.put('/adm/cads/attNome', UserControllers.atualizarNomeT);
router.put('/adm/cads/attDesc', UserControllers.atualizarDescricaoT);
router.put('/adm/cads/attCarga', UserControllers.atualizarCarga);
module.exports = router;
