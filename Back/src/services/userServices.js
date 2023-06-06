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

    inserir: (nome,email, senha)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO Usuario (nome,email, senha, Nivelpermissao) VALUES (?,?,?,1)',  [nome,email, senha], (error, results)=>{
                if(error) {rejeitado(error); return;}
                
                aceito(results.insertCodigo);
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