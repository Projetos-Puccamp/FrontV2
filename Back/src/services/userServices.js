const db = require('../db');

module.exports = {
    buscarTodos:  () =>{
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM users', (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },

    buscarUm: (codigo)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM users WHERE codigo =?', [codigo], (error, results)=>{
                if (error) {rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{ aceito(false);}
            });
        });
    },

    inserir: (email, senha)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO users (email, senha) VALUES (?,?)',  [email, senha], (error, results)=>{
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