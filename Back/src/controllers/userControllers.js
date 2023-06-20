const UserServices = require('../services/userServices');
module.exports = {
  buscarTodos: async (req, res) => {
    let json = { erro: '', result: [] };

    let users = await UserServices.buscarTodos();
    for (let i in users) {
      json.result.push({
        codigo: users[i].codigo,
        descricao: users[i].email
      });
    }
    res.json(json);
  },
  buscarUm: async (req, res) => {

    let email = req.body.email;
    let senha = req.body.senha;
    let user = await UserServices.buscarUm(email, senha);
    let vr = user.NivelPermissao;
    let l = 'administrador/Padministrador.html';
    if (user) {
      // Credenciais corretas, retorna uma resposta de sucesso
      res.json({ autenticado: true, NvP: vr, Local: l });
    } else {
      // Credenciais inválidas, retorna uma resposta de erro
      res.json({ autenticado: false });
    }
  },
  buscarHistorico: async (req, res) => {
    let json = { erro: '', result: [] };
    let id = req.body.id;
    let l = '';// variavel para o doc correto
    let idAluno = await UserServices.buscaIdAluno(id);
    let historicos = await UserServices.buscarHistorico(idAluno);

    for (let i in historicos) {
      switch (historicos[i].status) {
        case 'N':
          l = 'testeaptidao.html';
          break;
        case 'C1':
          l = 'case1.html';
          break;
        case 'C2':
          l = 'case2.html';
          break;
        case 'F':
          l = 'testeaptidao.html';
          break;
        default:
          console.log("Opção inválida");
      }
      json.result.push({
        codigoT: historicos[i].Treinamento_idTreinamento,
        codigo: historicos[i].idAlunoTreinamento,
        nomecurso: historicos[i].NomeTreinamento,
        status: historicos[i].status,
        nota: historicos[i].NotaCase2,
        local: l
      });
    }
    res.json(json);
  },


  login: async (req, res) => {
    let email = req.body.email;
    let senha = req.body.senha;
    let user = await UserServices.buscarUm(email, senha);

    let vr = user.NivelPermissao;
    console.log(vr);
    switch (vr) {
      case '1':
        l = 'alunos/Paluno.html';
        break;
      case '2':
        l = 'administrador/Padministrador.html';
        break;
      case '3':
        l = 'empresas/Pempresas.html';
        break;
      case '4':
        l = 'mentor/Pmentor.html';
        break;
      default:
        console.log("Opção inválida");
    }
    if (user) {
      //salvando na sessao o valor do idUsuario


      // Credenciais corretas, retorna uma resposta de sucesso
      res.json({ autenticado: true, NvP: vr, Local: l, id: user.idUsuario });
    } else {
      // Credenciais inválidas, retorna uma resposta de erro
      res.json({ autenticado: false });
    }
  },

  FillCursos: async (req, res) => {
    let json = { erro: '', result: [] };
    let cursos = await UserServices.buscarTodosCursos();
    for (let i in cursos) {
      json.result.push({
        codigo: cursos[i].idTreinamento,
        nome: cursos[i].NomeComercial,
        descricao: cursos[i].Descricao,
        carga: cursos[i].CargaHoraria,
        inicio: cursos[i].DataInicio,
        fim: cursos[i].DataFim,
        testehref: 'Plogin.html'
      });
    }
    res.json(json);
  },

  FillCase: async (req, res) => {

    let json = { erro: '', result: [] };

    let IdTreinamento = req.body.IdTreinamento;
    console.log('Id treinmanto em Fill case == ' + IdTreinamento)
    let conteudo = await UserServices.buscarTodosConteudos(IdTreinamento);
    for (let i in conteudo) {
      json.result.push({
        titulo: conteudo[i].Titulo1,
        video: conteudo[i].linkVideo1,
        descricao: conteudo[i].Descricao1,
        tipo: conteudo[i].Tipo,
        titulo2: conteudo[i].Titulo2,
        video2: conteudo[i].linkVideo2,
        descricao2: conteudo[i].Descricao2
      });
    }
    res.json(json);
  },
  FillConteudo: async (req, res) => {

    let json = { erro: '', result: [] };
    let conteudo = await UserServices.buscarTodosConteudos2();
    for (let i in conteudo) {
      json.result.push({
        titulo: conteudo[i].Titulo1,
        video: conteudo[i].linkVideo1,
        descricao: conteudo[i].Descricao1,
        idconteudo: conteudo[i].idConteudoTreinamento,
        titulo2: conteudo[i].Titulo2,
        video2: conteudo[i].linkVideo2,
        descricao2: conteudo[i].Descricao2
      });
    }
    res.json(json);
  },

  FillPerguntas: async (req, res) => {
    let tipoPergunta = '';
    let titulo = '';
    let json = { erro: '', result: [] };
    let IdAluno = await UserServices.buscaIdAluno(req.body.IdUser);
    let IdTreinamento = req.body.IdTreinamento;
    let status = await UserServices.buscarStatus(IdAluno, IdTreinamento);
    let idQuiz = await UserServices.buscarQuiz(IdTreinamento);
    switch (status) {
      case 'N':
        tipoPergunta = '1';
        titulo = 'Teste de Apitidão';
        break;
      case 'C1':
        tipoPergunta = '2';
        titulo = 'Teste do Case 1';
        break;
      case 'C2':
        tipoPergunta = '3';
        titulo = 'Teste do Case 2';
        break;
      case 'F':
        tipoPergunta = '4';
        titulo = 'Teste Final';
        break;
      default:
        console.log("Opção inválida");
    }
    console.log('Teste no Fill PErguntas, IdQuiz e Tipo Pergunta'+ tipoPergunta+ idQuiz)
    let Perguntas = await UserServices.buscarTodosPerguntas(tipoPergunta, idQuiz);
    console.log(Perguntas);

    json.result.push({
      titulo: titulo,
      status: status
    });

    for (let i in Perguntas) {
      json.result.push({
        id: Perguntas[i].idPergunta,
        descricao: Perguntas[i].DescricaoPergunta,
        P1: Perguntas[i].Pergunta1,
        P2: Perguntas[i].Pergunta2,
        P3: Perguntas[i].Pergunta3,
        P4: Perguntas[i].Pergunta4,
        P5: Perguntas[i].Pergunta5

      });
    }

    res.json(json);
  },
  FillVagas: async (req, res) => {
    let json = { erro: '', result: [] };
    let vagas = await UserServices.buscarTodosVagas();
    for (let i in vagas) {
      json.result.push({
        codigo: vagas[i].idVagaEmprego,
        vaga: vagas[i].Vaga,
        descricao: vagas[i].DescricaoAtv,
        requisitos: vagas[i].Requisitos,
        salario: vagas[i].Salario
      });
    }
    res.json(json);

  },

  inserir: async (req, res) => {
    console.log('entrou');
    let json = { erro: '', result: {} };
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    if (email && senha) {
      let userCodigo = await UserServices.inserir(nome, email, senha);
      json.result = {
        codigo: userCodigo,
        email,
        senha
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirM: async (req, res) => {
    console.log('entrou');
    let json = { erro: '', result: {} };
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    if (email && senha) {
      let userCodigo = await UserServices.inserirM(nome, email, senha);
      json.result = {
        codigo: userCodigo,
        email,
        senha
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirE: async (req, res) => {
    console.log('entrou');
    let json = { erro: '', result: {} };
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    if (email && senha) {
      let userCodigo = await UserServices.inserirE(nome, email, senha);
      json.result = {
        codigo: userCodigo,
        email,
        senha
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirQuiz: async (req, res) => {
    console.log('entrou');
    let json = { erro: '', result: {} };
    let id = req.body.idQuiz;
    let titulo = req.body.titulo;
    if (id && titulo) {
      let Quiz = await UserServices.inserirQuiz(id,titulo);
      json.result = {
        quiz: Quiz,
        id,
        titulo
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirVaga: async (req, res) => {
    let json = { erro: '', result: {} };
    let id = req.body.id;
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let requisitos = req.body.requisitos;
    let fxsal = req.body.fxsal;
    if (id && titulo && descricao && requisitos && fxsal) {
      let idEmp = await UserServices.buscaIdEmp(id);
      console.log('Essa é o Id da empresa' + idEmp);

      let vagaCodigo = await UserServices.inserirVaga(idEmp, titulo, descricao, requisitos, fxsal);
      json.result = {
        codigo: vagaCodigo,
        idEmp,
        titulo,
        descricao,
        requisitos,
        fxsal
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirPergunta: async (req, res) => {
    let json = { erro: '', result: {} };
    console.log('Entrou em Inserir Perguntas');
    let idQuiz = req.body.idQuiz;
    let tipoPergunta = req.body.tipoPergunta;
    let pergunta = req.body.pergunta;
    let respostaA = req.body.respostaA;
    let respostaB = req.body.respostaB;
    let respostaC = req.body.respostaC;
    let respostaD = req.body.respostaD;
    let respostaE = req.body.respostaE;
    let respostaCorreta = req.body.respostaCorreta;

    if (idQuiz && tipoPergunta && pergunta && respostaA && respostaB && respostaC && respostaD && respostaE && respostaCorreta) {
      try {
        // Aqui você pode implementar a lógica de inserção da pergunta no banco de dados
        // Exemplo:
        let perguntaId = await UserServices.inserirPergunta(idQuiz, tipoPergunta, pergunta, respostaA, respostaB, respostaC, respostaD, respostaE, respostaCorreta);
        json.result = {
          perguntaId,
          idQuiz,
          tipoPergunta,
          pergunta,
          respostaA,
          respostaB,
          respostaC,
          respostaD,
          respostaE,
          respostaCorreta
        };
      } catch (error) {
        json.erro = 'Erro ao inserir a pergunta';
        console.error(error);
      }
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirTreinamento: async (req, res) => {
    let json = { erro: '', result: {} };
    console.log('Entrou em Inserir Treinamento');
    let nome = req.body.nome;
    let codigoQuiz = req.body.codigoQuiz;
    let codigoConteudo = req.body.codigoConteudo;
    let descricao = req.body.descricao;
    let cargaHoraria = req.body.cargaHoraria;
    let dataInicio = req.body.dataInicio;
    let dataFim = req.body.dataFim;
    console.log('Entrou em inserir treinamento');
    if (nome && codigoQuiz && codigoConteudo && descricao && cargaHoraria && dataInicio && dataFim) {
      try {
        // Aqui você pode implementar a lógica de inserção do treinamento no banco de dados
        // Exemplo:
        let treinamentoId = await UserServices.inserirTreinamento(nome, codigoQuiz, codigoConteudo, descricao, cargaHoraria, dataInicio, dataFim);
        let Idtreinamento = await UserServices.BuscaIdTreinamento(nome);
        console.log('IdTreinamento criado é' + Idtreinamento);
        await UserServices.inserirQuizTreinamento(Idtreinamento, codigoQuiz);
        await UserServices.inserirConteudoTreinamento(Idtreinamento, codigoConteudo);
        json.result = {
          treinamentoId,
          nome,
          codigoQuiz,
          codigoConteudo,
          descricao,
          cargaHoraria,
          dataInicio,
          dataFim
        };
      } catch (error) {
        json.erro = 'Erro ao inserir o treinamento';
        console.error(error);
      }
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },

  inserirVaga_Treinamento: async (req, res) => {
    let json = { erro: '', result: {} };
    let Idtreinamento = req.body.idTreinamento;
    let VagaEmp = req.body.idVemp;

    console.log('Entrou em Inserir TreinamentoVaga' + Idtreinamento + VagaEmp);
    if (Idtreinamento && VagaEmp) {
      try {
        console.log('Entrou em Inserir TreinamentoVaga' + Idtreinamento + VagaEmp);
        // Aqui você pode implementar a lógica de inserção do treinamento no banco de dados
        // Exemplo:
        let Treinamento_Vaga = await UserServices.InserirTreinamentoVaga(Idtreinamento, VagaEmp);
        json.result = {
          Idtreinamento,
          VagaEmp
        };
      } catch (error) {
        json.erro = 'Erro ao inserir o treinamento_vaga';
        console.error(error);
      }
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },
  inserirAluno_Treinamento: async (req, res) => {// Falta verificar se o aluno ja é cadastrado no curso
    let json = { erro: '', result: {} };
    let Idtreinamento = req.body.idTreinamento;
    let IdAluno = req.body.idUsuario;
    IdAluno = await UserServices.buscaIdAluno(IdAluno);
    let cursos = await UserServices.BuscaNomeTreinamento(Idtreinamento);
    if (cursos.length > 0) {
      let nomeComercial = cursos[0].NomeComercial; // Obtém o valor do nome comercial do primeiro objeto do array
      let cursosString = JSON.stringify(nomeComercial); // Converte o valor para uma string JSON
      cursosString = cursosString.replace(/"/g, '');
      console.log(cursosString);
    if (Idtreinamento && IdAluno) {
      try {
        // Aqui você pode implementar a lógica de inserção do treinamento no banco de dados
        // Exemplo:
        let Treinamento_Vaga = await UserServices.InserirTreinamentoAluno(Idtreinamento, IdAluno ,cursosString);
        json.result = {
          Idtreinamento,
          IdAluno,
          cursos
        };
      } catch (error) {
        json.erro = 'Erro ao inserir o treinamento_vaga';
        console.error(error);
      }
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);}
  },
  VerificarRespostas: async (req, res) => {
    console.log('Entrou em Verificar Resposta');
    let json = { erro: '', result: {} };
    let IdAluno = await UserServices.buscaIdAluno(req.body.IdUsuario);
    let IdTreinamento = req.body.IdTreinamento;
    let Respostas = req.body.Respostas;
    let IdPergunta = req.body.Idpergunta;
    let Status = req.body.Status;

    console.log('Entrou em Verificar Resposta: ' + IdTreinamento + IdAluno + Respostas[1] + IdPergunta[1] + Status);
    let nota = await UserServices.calculaNota(IdPergunta, Respostas);
    console.log('A nota é:  :'+nota);
    let mensagem = await UserServices.atualizaNotaStatus(IdTreinamento,IdAluno,nota,Status);
   
    let busca = await UserServices.buscarHistorico(IdAluno);
    let status = busca[0].status;
      json.result = {
        status : status
      };
      console.log('O novo status:  :'+status);

    res.json(json);
  },

  alterar: async (req, res) => {
    let json = { erro: '', result: {} };

    let codigo = req.params.codigo;
    let email = req.body.email;
    let senha = req.body.senha;

    if (codigo && email && senha) {
      await UserServices.alterar(codigo, email, senha);
      json.result = {
        codigo,
        email,
        senha
      };
    } else {
      json.erro = 'Campos não enviados';
    }
    res.json(json);
  },

  atualizarDescricao: async (req, res) => {
    let json = { erro: '', result: {} };
    let IdVaga = req.body.IdVaga;
    let descricao = req.body.desc;
    console.log('entrou em attdesc e '+IdVaga+descricao );
    if (IdVaga && descricao) {
      try {
        await UserServices.atualizarDescricao(IdVaga, descricao);

        json.result = {
          IdVaga,
          descricao
        };
      } catch (error) {
        json.erro = 'Erro ao atualizar a descrição da vaga';
      }
    } else {
      json.erro = 'Campos não enviados';
    }

    res.json(json);
  },
  atualizarDescricaoT: async (req, res) => {
    let json = { erro: '', result: {} };
    let IdTreinamento = req.body.IdTreinamento;
    let descricao = req.body.desc;
    console.log('entrou em attdesc e treinamento');
    if (IdTreinamento && descricao) {
      try {
        await UserServices.atualizarDescricaoT(IdTreinamento, descricao);

        json.result = {
          IdTreinamento,
          descricao
        };
      } catch (error) {
        json.erro = 'Erro ao atualizar a descrição do treinamento';
      }
    } else {
      json.erro = 'Campos não enviados';
    }

    res.json(json);
  },
  atualizarNome: async (req, res) => {
    let json = { erro: '', result: {} };
    let IdVaga = req.body.IdVaga;
    let nome = req.body.nome;
    console.log('entrou em attnome e '+IdVaga+nome );
    if (IdVaga && nome) {
      try {
        await UserServices.atualizarNome(IdVaga, nome);

        json.result = {
          IdVaga,
          nome
        };
      } catch (error) {
        json.erro = 'Erro ao atualizar o nome da vaga';
      }
    } else {
      json.erro = 'Campos não enviados';
    }

    res.json(json);
  },
  atualizarNomeT: async (req, res) => {
    let json = { erro: '', result: {} };
    let IdTreinamento = req.body.IdTreinamento;
    let nome = req.body.nome;
    console.log('entrou em attnome e ');
    if (IdTreinamento && nome) {
      try {
        await UserServices.atualizarNomeT(IdTreinamento, nome);

        json.result = {
          IdVaga,
          nome
        };
      } catch (error) {
        json.erro = 'Erro ao atualizar o nome do treinamento';
      }
    } else {
      json.erro = 'Campos não enviados';
    }

    res.json(json);
  },
  atualizarRequisito: async (req, res) => {
    let json = { erro: '', result: {} };
    let IdVaga = req.body.IdVaga;
    let requisito = req.body.req;
    console.log('entrou em attreq e '+IdVaga+requisito );
    if (IdVaga && requisito) {
      try {
        await UserServices.atualizarRequisito(IdVaga, requisito);

        json.result = {
          IdVaga,
          requisito
        };
      } catch (error) {
        json.erro = 'Erro ao atualizar o requisito da vaga';
      }
    } else {
      json.erro = 'Campos não enviados';
    }

    res.json(json);
  },
  atualizarCarga: async (req, res) => {
    let json = { erro: '', result: {} };
    let IdTreinamento = req.body.IdTreinamento;
    let carga = req.body.carga;
    console.log('entrou em attreq e carga');
    if (IdTreinamento && carga) {
      console.log('entrounoif');
      try {
        await UserServices.atualizarCarga(IdTreinamento, carga);

        json.result = {
          IdTreinamento,
          carga
        };
      } catch (error) {
        json.erro = 'Erro ao atualizar o requisito da vaga';
      }
    } else {
      json.erro = 'Campos não enviados';
    }

    res.json(json);
},

inserirConteudo: async (req, res) => {
  let json = { erro: '', result: {} };
  console.log('Entrou em Inserir Conteudo');

  let Titulo1 = req.body.Titulo1;
  let Titulo2 = req.body.Titulo2;
  let codigoConteudo = req.body.codigoConteudo;
  let descricao1 = req.body.descricao1;
  let descricao2= req.body.descricao2;
  let link1 = req.body.link1;
  let link2 = req.body.link2;
  console.log('Entrou em inserir Conteudo');
  if (Titulo1 && Titulo2 && codigoConteudo && descricao1 && descricao2 && link1 && link2) {
    try {
      // Aqui você pode implementar a lógica de inserção do treinamento no banco de dados
      // Exemplo:
      let Conteudo = await UserServices.inserirConteudo(Titulo1,Titulo2,codigoConteudo,descricao1,descricao2,link1,link2);
      json.result = {
        Conteudo,
        Titulo1,
        Titulo2,
        codigoConteudo,
        descricao1,
        descricao2,
        link1,
        link2
      };
    } catch (error) {
      json.erro = 'Erro ao inserir o Conteudo';
      console.error(error);
    }
  } else {
    json.erro = 'Campos não enviados';
  }
  res.json(json);
},
VerificarTreinamento: async (req, res) => {
  console.log('Entrou em Verificar treinamento');
  let json = { erro: '', result: {} };
  let IdAluno = await UserServices.buscaIdAluno(req.body.idUsuario);
  console.log(IdAluno);

  let requisito = await UserServices.buscaReqVaga(req.body.codigo);
  console.log(requisito);

  let Aprovado = await UserServices.fnotreinamento(requisito, IdAluno);
  console.log(Aprovado);

  if(Aprovado === 'F'){
    await UserServices.inserirAlunoVaga(IdAluno, req.body.codigo);
    json.result = true;
  }else{
    json.result = false;
  }

  res.json(json);
},
  FillCursosPAluno: async (req, res) => {
    let json = { erro: '', result: [] };
    let cursos = await UserServices.buscarTodosCursosM();
    for (let i in cursos) {
      json.result.push({
        codigo: cursos[i].Treinamento_idTreinamento,
        nome: cursos[i].NomeTreinamento,
        nomeAluno: cursos[i].Aluno_idAluno,
        testehref: 'Plogin.html'
      });
    }
    res.json(json);
  }
}
