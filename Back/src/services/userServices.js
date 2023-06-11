const { inserirPergunta } = require('../controllers/userControllers');
const db = require('../db');

module.exports = {
    buscarTodos:  () =>{
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM Usuario', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    buscarTodosCursos:  () =>{
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM treinamento', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }, 
    buscarTodosVagas:  () =>{
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM vagaemprego', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (email, senha)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM Usuario WHERE email =? AND senha = ?', [email, senha], (error, results)=>{
                if (error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{ aceito(false);}
            });
        });
    },

    inserir: (nome,email,senha)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO usuario (nome,email, senha, Nivelpermissao) VALUES (?,?,?,1)',  [nome,email, senha], (error, results)=>{
                if(error) {rejeitado(error); return;}
                
                aceito(results);
            });
        });
    },
    inserirVaga: (idEmp, titulo, descricao, requisitos, fxsal) => {//fazer umm select q busca id da empresa, por qenquanto fazer manualmente
        return new Promise((resolve, reject) => {    
           console.log('retornou certo. idEmpresa 2:'+ idEmp);
          db.query('INSERT INTO vagaemprego ( Empresa_idEmpresa, Vaga, DescricaoAtv, Requisitos, Salario) VALUES (?, ?, ?, ?, ?)', [idEmp, titulo, descricao, requisitos, fxsal], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          });
        });
      },
      inserirPergunta: (idQuiz, tipoPergunta, pergunta, respostaA, respostaB, respostaC, respostaD, respostaE, respostaCorreta ) => {//fazer umm select q busca id da empresa, por qenquanto fazer manualmente
        return new Promise((resolve, reject) => {    
          db.query('INSERT INTO pergunta ( DescricaoPergunta, tipoPergunta, Quiz_idQuiz, Pergunta1, Pergunta2, Pergunta3, Pergunta4, Pergunta5, Resposta  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [pergunta, tipoPergunta, idQuiz, respostaA, respostaB, respostaC, respostaD, respostaE, respostaCorreta ], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
          });
        });
      },
      buscaIdEmp: (id)=>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT idEmpresa FROM empresa WHERE Usuario_idUsuario = ?', [id], (error, results)=>{
                if (error) {rejeitado(error); return; }
                if(results.length > 0){
                    console.log('safdas///////////////////'+results[0].idEmpresa);
                    aceito(results[0].idEmpresa);
                }else{ aceito(false);}
            });
        });
    },

        
    alterar: (codigo, email, senha)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE users SET email = ?, senha = ? where codigo = ?',  [email, senha, codigo], (error, results)=>{
                if(error) {rejeitado(error); return;}
                
                aceito(results);
            });
        });
    },

    excluir:  (codigo) =>{
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM users WHERE codigo = ?',[codigo],(error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};

  


