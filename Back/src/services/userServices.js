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
    inserirVaga: (id, titulo, descricao, requisitos, fxsal) => {//apos arruamar BD idVaga sera AutoIncr, por enqunto muidar manualmente + linkala a treinamentos
        return new Promise((resolve, reject) => {
          db.query('INSERT INTO vagaemprego ( idVagaEmprego, idEmpresa, Vaga, DescricaoAtv, Requisitos, Salario) VALUES (15,?, ?, ?, ?, ?)', [id, titulo, descricao, requisitos, fxsal], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results);
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