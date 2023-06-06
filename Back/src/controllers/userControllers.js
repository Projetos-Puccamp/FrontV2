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

        let codigo = req.params.codigo;
        let user = await UserServices.buscarUm(codigo);

        if(user){
            json.result = user;
        }
        res.json(json);
    }
}