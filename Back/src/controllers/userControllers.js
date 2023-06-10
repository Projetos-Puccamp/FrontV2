const UserServices = require('../services/userServices');
module.exports = {
    buscarTodos: async (req, res)=>{
        let json = {erro:'', result:[]};

        let users = await UserServices.buscarTodos();
        for(let i in users){
            json.result.push({
                codigo: users[i].codigo,
                descricao: users[i].email
            });
        }
        res.json(json);
    },
    buscarUm: async(req,res) =>{
        let json = {erro:'', result:{}};

        let email = req.body.email;
        let senha = req.body.senha;
        let user = await UserServices.buscarUm(email, senha);
        let vr = user.NivelPermissao;
        let l = 'administrador/Padministrador.html';
        if (user) {
            // Credenciais corretas, retorna uma resposta de sucesso
            res.json({ autenticado: true, NvP : vr, Local : l});
          } else {
            // Credenciais inválidas, retorna uma resposta de erro
            res.json({ autenticado: false });
          }
    },
    
    login: async(req,res) =>{
        let email = req.body.email;
        let senha = req.body.senha;
        let user = await UserServices.buscarUm(email, senha);
        
        let vr =  user.NivelPermissao;
        console.log(vr);
        switch (vr) {
            case '1':
             l = 'alunos/Paluno.html';
              break;
            case '2': 
             l ='administrador/Padministrador.html';
              break;
            case '3':
              l= 'empresas/Pempresas.html';
              break;
            case '4':
             l = 'mentor/Pmentor';
              break;
            default:
              console.log("Opção inválida");
          }
        if (user) {
            //salvando na sessao o valor do idUsuario
            req.session.user = user.idUsuario;
            req.session.save();
            // Credenciais corretas, retorna uma resposta de sucesso
            res.json({ autenticado: true, NvP : vr, Local : l, em : req.session.user });
          } else {
            // Credenciais inválidas, retorna uma resposta de erro
            res.json({ autenticado: false });
          }
    },

    FillCursos: async(req, res) => {
            console.log("ID user--->"+req.session.user);
            let json = {erro:'', result:[]};
            let cursos = await UserServices.buscarTodosCursos();
            for(let i in cursos){
                json.result.push({
                    codigo: cursos[i].idTreinamento,
                    descricao: cursos[i].Descricao
                });
            }
            res.json(json);  
    },


    inserir: async(req,res) =>{
        let json = {erro:'', result:{}};
        
        let nome=req.body.nome;
        let descricao = req.body.email;
        let senha = req.body.senha;

        if(email && senha){
            let userCodigo = await UserServices.inserir(nome,email, senha);
            json.result = {
                codigo: userCodigo,
                email,
                senha
            };
        }else{
            json.erro = 'Campos não enviados';
        }
        res.json(json);
    },
    alterar: async(req,res) =>{
        let json = {erro:'', result:{}};

        let codigo = req.params.codigo;
        let email = req.body.email;
        let senha = req.body.senha;

        if(codigo && email && senha){
            await UserServices.alterar(codigo, email, senha);
            json.result = {
                codigo,
                email,
                senha
            };
        }else{
            json.erro = 'Campos não enviados';
        }
        res.json(json);
    }

    
}