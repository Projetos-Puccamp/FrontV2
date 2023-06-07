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
        if (user) {
            // Credenciais corretas, retorna uma resposta de sucesso
            res.json({ autenticado: true, NvP : vr});
          } else {
            // Credenciais inválidas, retorna uma resposta de erro
            res.json({ autenticado: false });
          }
    },
    inserir: async(req,res) =>{
        let json = {erro:'', result:{}};
        
        let nome=req.body.nome;
        let email = req.body.email;
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
    },
    excluir: async(req, res) => {
        let json = {erro:'', result:{}};

        await UserServices.excluir(req.params.codigo);

        res.json(json);
        
    }
}