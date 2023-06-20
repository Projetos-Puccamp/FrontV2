
const db = require('../db');

module.exports = {
  buscarTodos: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM Usuario', (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },

  buscarTodosCursos: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM treinamento', (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  buscarNomeCurso: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT NomeComercial FROM treinamento', (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },

  buscarTodosPerguntas: (tipoPergunta, idQuiz) => {
    return new Promise((aceito, rejeitado) => {
      db.query('select * from pergunta  where tipoPergunta = ? and Quiz_idQuiz=?;', [tipoPergunta, idQuiz], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  buscarTodosVagas: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM vagaemprego', (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },

  buscarUm: (email, senha) => {
    return new Promise((aceito, rejeitado) => {

      db.query('SELECT * FROM Usuario WHERE email =? AND senha = ?', [email, senha], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          aceito(results[0]);
        } else { aceito(false); }
      });
    });
  },
  buscaIdAluno: (id) => {
    return new Promise((aceito, rejeitado) => {

      db.query('SELECT idAluno FROM Aluno WHERE Usuario_idUsuario =? ', [id], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          console.log('Id do aluno é ' + results[0].idAluno);
          aceito(results[0].idAluno);
        } else { aceito(false); }
      });
    });
  },
  buscarStatus: (IdAluno, IdTreinamento) => {
    return new Promise((aceito, rejeitado) => {
      console.log('O starus no service es: Na real teste da service' + IdAluno + IdTreinamento)
      db.query('select status from alunotreinamento  where Aluno_idAluno =? and Treinamento_idTreinamento =?; ', [IdAluno, IdTreinamento], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          console.log('status do aluno no curso é  ' + results[0].status);
          aceito(results[0].status);

        } else { aceito(false); }
      });
    });
  },
  buscarQuiz: (IdTreinamento) => {
    return new Promise((aceito, rejeitado) => {
      console.log('IdQuiz é teste da Servide QuizBusca');
      db.query('select Quiz_idQuiz from treinamentosparavaga_has_quiz where TreinamentosParavaga_idTreinamentosParavaga =?; ', [IdTreinamento], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          console.log('IdQuiz é do aluno no curso é  ' + results[0].Quiz_idQuiz);
          aceito(results[0].Quiz_idQuiz);
        } else { aceito(false); }
      });
    });
  },

  buscarTodosConteudos: (IdTreinamento) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM conteudotreinamento WHERE idConteudoTreinamento IN (SELECT ConteudoTreinamento_idConteudoTreinamento FROM treinamento_has_conteudotreinamento  WHERE Treinamento_idTreinamento = ?)', [IdTreinamento], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  buscarTodosConteudos2: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM conteudotreinamento', (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  buscarHistorico: (idAluno) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM alunotreinamento where Aluno_idAluno = ?', [idAluno], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });

  },
  BuscaIdTreinamento: (nome) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT idTreinamento FROM treinamento WHERE NomeComercial = ? ', [nome], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          aceito(results[0].idTreinamento);
        } else { aceito(false); }
      });
    });
  },
  BuscaNomeTreinamento: (Id) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT NomeComercial FROM treinamento WHERE idTreinamento = ? ', [Id], (error, results) => {
        if (error) { rejeitado(error); return; }
        console.log(results); // Verificar o objeto results retornado
        aceito(results);
      });
    });
  },
  
  inserir: (nome, email, senha) => {
    return new Promise((aceito, rejeitado) => {
      db.query('INSERT INTO usuario (nome,email, senha, Nivelpermissao) VALUES (?,?,?,1)', [nome, email, senha], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  inserirQuiz: (idquiz, Nomequiz) => {
    return new Promise((aceito, rejeitado) => {
      db.query('INSERT INTO quiz (idQuiz,Titulo) VALUES (?,?)', [idquiz, Nomequiz], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  inserirM: (nome, email, senha) => {
    return new Promise((aceito, rejeitado) => {
      db.query('INSERT INTO usuario (nome,email, senha, Nivelpermissao) VALUES (?,?,?,4)', [nome, email, senha], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  inserirE: (nome, email, senha) => {
    return new Promise((aceito, rejeitado) => {
      db.query('INSERT INTO usuario (nome,email, senha, Nivelpermissao) VALUES (?,?,?,3)', [nome, email, senha], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  inserirVaga: (idEmp, titulo, descricao, requisitos, fxsal) => {//fazer umm select q busca id da empresa, por qenquanto fazer manualmente
    return new Promise((resolve, reject) => {
      console.log('retornou certo. idEmpresa 2:' + idEmp);
      db.query('INSERT INTO vagaemprego ( Empresa_idEmpresa, Vaga, DescricaoAtv, Requisitos, Salario) VALUES (?, ?, ?, ?, ?)', [idEmp, titulo, descricao, requisitos, fxsal], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  inserirPergunta: (idQuiz, tipoPergunta, pergunta, respostaA, respostaB, respostaC, respostaD, respostaE, respostaCorreta) => {//fazer umm select q busca id da empresa, por qenquanto fazer manualmente
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO pergunta ( DescricaoPergunta, tipoPergunta, Quiz_idQuiz, Pergunta1, Pergunta2, Pergunta3, Pergunta4, Pergunta5, Resposta  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [pergunta, tipoPergunta, idQuiz, respostaA, respostaB, respostaC, respostaD, respostaE, respostaCorreta], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  inserirTreinamento: (nome, codigoQuiz, codigoConteudo, descricao, cargaHoraria, dataInicio, dataFim) => {
    return new Promise((resolve, reject) => {

      db.query('INSERT INTO treinamento (Nomecomercial, Descricao, CargaHoraria, DataInicio, DataFim) VALUES ( ?, ?, ?, ?, ?)', [nome, descricao, cargaHoraria, dataInicio, dataFim], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  inserirQuizTreinamento: (Idtreinamento, codigoQuiz) => {
    return new Promise((resolve, reject) => {

      db.query('INSERT INTO treinamentosparavaga_has_quiz (TreinamentosParavaga_idTreinamentosParavaga,Quiz_idQuiz) VALUES ( ?,?)', [Idtreinamento, codigoQuiz], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  InserirTreinamentoVaga: (Idtreinamento, idVagaEmprego) => {
    return new Promise((resolve, reject) => {
      console.log('tetes da conexao vagaemp');
      db.query('INSERT INTO treinamentosparavaga (Treinamento_idTreinamento,VagaEmprego_idVagaEmprego) VALUES ( ?,?)', [Idtreinamento, idVagaEmprego], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('tetes da conexao vagaemp');
        resolve(results);
      });
    });
  },
  InserirTreinamentoAluno: (Idtreinamento, IdAluno, nome) => {
    return new Promise((resolve, reject) => {
      console.log('tetes da conexao vagaemp');
      db.query('INSERT INTO alunotreinamento (Aluno_idAluno,Treinamento_idTreinamento,DataInsc,status,NomeTreinamento) VALUES ( ?, ?,NOW(),?,?)', [IdAluno, Idtreinamento, 'N', nome], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        console.log('tetes da conexao vagaemp');
        resolve(results);
      });
    });
  },

  inserirConteudoTreinamento: (Idtreinamento, codigoConteudo) => {
    return new Promise((resolve, reject) => {
      // Aqui você pode implementar a lógica de inserção do treinamento no banco de dados
      // Substitua o código abaixo pelo seu código de inserção no banco de dados
      db.query('INSERT INTO treinamento_has_conteudotreinamento (Treinamento_idTreinamento,ConteudoTreinamento_idConteudoTreinamento) VALUES ( ?, ?)', [Idtreinamento, codigoConteudo], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  inserirConteudo: (Titulo1,Titulo2,codigoConteudo,descricao1,descricao2,link1,link2) => {
    return new Promise((resolve, reject) => {
      // Aqui você pode implementar a lógica de inserção do treinamento no banco de dados
      // Substitua o código abaixo pelo seu código de inserção no banco de dados
      db.query('insert into conteudotreinamento(idConteudoTreinamento,Titulo1,Descricao1,linkVideo1,Titulo2,Descricao2,linkVideo2) values (?,?,?,?,?,?,?)', [codigoConteudo, Titulo1,descricao1,link1,Titulo2,descricao2,link2], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },

  buscaIdEmp: (id) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT idEmpresa FROM empresa WHERE Usuario_idUsuario = ?', [id], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          aceito(results[0].idEmpresa);
        } else { aceito(false); }
      });
    });
  },
  atualizarDescricao: (idVagaEmprego, DescricaoAtv) => {
    return new Promise((aceito, rejeitado) => {
      db.query('UPDATE vagaemprego SET DescricaoAtv = ? where idVagaEmprego = ?', [DescricaoAtv, idVagaEmprego], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  atualizarDescricaoT: (idTreinamento, Descricao) => {
    return new Promise((aceito, rejeitado) => {
      db.query('UPDATE treinamento SET Descricao = ? where idTreinamento = ?', [Descricao, idTreinamento], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  atualizarNome: (idVagaEmprego, Vaga) => {
    return new Promise((aceito, rejeitado) => {
      db.query('UPDATE vagaemprego SET Vaga = ? where idVagaEmprego = ?', [Vaga, idVagaEmprego], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  atualizarNomeT: (idTreinamento, NomeComercial) => {
    return new Promise((aceito, rejeitado) => {
      db.query('UPDATE treinamento SET NomeComercial = ? where idTreinamento = ?', [NomeComercial, idTreinamento], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  atualizarRequisito: (idVagaEmprego, Requisitos) => {
    return new Promise((aceito, rejeitado) => {
      db.query('UPDATE vagaemprego SET Requisitos = ? where idVagaEmprego = ?', [Requisitos, idVagaEmprego], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  atualizarCarga: (idTreinamento, carga) => {
    return new Promise((aceito, rejeitado) => {
      db.query('UPDATE treinamento SET CargaHoraria = ? where idTreinamento = ?', [carga, idTreinamento], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  atualizaNotaStatus: ( IdTreinamento,IdAluno, nota, Status) => {
    return new Promise((aceito, rejeitado) => {
      console.log('entrou em atualizaNotaStatus', IdTreinamento,IdAluno, nota, Status);
      switch (Status) {
        case 'N':
          if(nota>=7){
            db.query('Update alunotreinamento set status = "C1" , NotaN = ? where Aluno_idAluno = ? AND Treinamento_idTreinamento = ?;', [nota,IdAluno,IdTreinamento ], (error, results) => {
              if (error) { rejeitado(error); return; }
              aceito(results);
            });
          }else{
            db.query('Update alunotreinamento set status = "R" , NotaN = ? where Aluno_idAluno = ? AND Treinamento_idTreinamento = ?;', [nota,IdAluno,IdTreinamento], (error, results) => {
              if (error) { rejeitado(error); return; }
              aceito(results);
            });

          }
          break;
        case 'C1':
          db.query('Update alunotreinamento set status = "C2" , NotaCase1 = ? where Aluno_idAluno = ? AND Treinamento_idTreinamento = ?;', [nota,IdAluno,IdTreinamento], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });

          break;
        case 'C2':
          db.query('Update alunotreinamento set status = "F" , NotaCase2 = ? where Aluno_idAluno = ? AND Treinamento_idTreinamento = ?;', [nota,IdAluno,IdTreinamento], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
          break;
        case 'F':
          db.query('Update alunotreinamento set status = "T" , NotaFinal = ? where Aluno_idAluno = ?  AND Treinamento_idTreinamento = ?;', [nota,IdAluno,IdTreinamento], (error, results) => {
            if (error) { rejeitado(error); return; }
            aceito(results);
          });
          break;
      }
     
    });
  },
  calculaNota: (IdPerguntas, Resposta) => {
    return new Promise((aceito, rejeitado) => {
      let Nota = 0;
      let cont = 0;

      const promessas = IdPerguntas.map((IdPergunta) => {
        return new Promise((resolve, reject) => {
          db.query('SELECT Resposta FROM pergunta WHERE idPergunta = ?', [IdPergunta], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results[0].Resposta);
          });
        });
      });

      Promise.all(promessas)
        .then((respostasEncontradas) => {
          respostasEncontradas.forEach((respostaEncontrada, index) => {
            //console.log('Resposta encontrada:', respostaEncontrada);
            //console.log('Resposta esperada:', Resposta[index]);
            if (respostaEncontrada.trim() === Resposta[index].trim()) {
              console.log('Está certo');
              Nota = Nota + 1;
            } else {
              console.log('Está errado');
              console.log('Resposta encontrada ', respostaEncontrada);
              console.log('Resposta esperada e index:', Resposta[index]);
            }

          });
          console.log(Nota+'essa é a nota'+ IdPerguntas.length);
          Nota = (Nota / IdPerguntas.length) * 10;
          console.log('Nota:', Nota);
          aceito(Nota);
        })
        .catch((error) => {
          rejeitado(error);
        });
    });
  },

  buscaReqVaga: (codigo) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT Treinamento_idTreinamento FROM treinamentosparavaga WHERE VagaEmprego_idVagaEmprego = ?', [codigo], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          aceito(results[0].Treinamento_idTreinamento);
        } else { aceito(false); }
      });
    });
  },
  fnotreinamento: (requisito,IdAluno) => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT status FROM alunotreinamento WHERE Treinamento_idTreinamento = ? AND Aluno_idAluno = ?', [requisito, IdAluno], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          aceito(results[0].status);
        } else { aceito(false); }
      });
    });
  },
  inserirAlunoVaga: (IdAluno, codigo) => {
    return new Promise((aceito, rejeitado) => {
      db.query('insert into canditatovagaemprego (Aluno_idAluno, VagaEmprego_idVagaEmprego) values (?, ?);', [IdAluno, codigo], (error, results) => {
        if (error) { rejeitado(error); return; }
        if (results.length > 0) {
          aceito(results[0].status);
        } else { aceito(false); }
      });
    });
  },

  excluir: (codigo) => {
    return new Promise((aceito, rejeitado) => {
      db.query('DELETE FROM users WHERE codigo = ?', [codigo], (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  },
  buscarTodosCursosM: () => {
    return new Promise((aceito, rejeitado) => {
      db.query('SELECT * FROM alunotreinamento', (error, results) => {
        if (error) { rejeitado(error); return; }
        aceito(results);
      });
    });
  }
};




