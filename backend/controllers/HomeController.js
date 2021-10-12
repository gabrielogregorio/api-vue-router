class HomeController{
    /**
    * Retorna uma simples mensagem de status da api
    */
    async index(req, res){
        return res.send("API is running");
    }

    /**
    * Acesso simples, com objetivo de acionar um middleware caso o usuário não tenha permissão de administrador
    */
    async validate(req, res) {
        // Valida o token do usuário e suas permissões para o frontend
        res.send('');
    }
}

module.exports = new HomeController();
