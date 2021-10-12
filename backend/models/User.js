var knex = require("../database/connection");
var bcrypt = require('bcrypt');


class User {
    /**
    * Retorna uma lista com todos os usuários
    *
    * @return {Array} Array com os usuários em Json
    */
    async findAll() {
        try {
            var result = await knex.select(["id", "email", "name", "role"]).table('users');
            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    /**
    * Retorna um usuário dentro de um array
    *
    * @param  {Number} id Id do usuário
    * @return {Array} retorna um usuário dentro de um array
    */
    async findById(id) {
        try {
            var result = await knex.select(["id", "email", "name", "role"]).where({id:id}).table('users');
            if (result.length > 0) {
                return result;
            }
            return [];
        } catch(error) {
            return [];
        }
    }

    /**
    * Retorna um usuário dentro de um array
    *
    * @param  {String} email E-mail do usuário
    * @return {Array} retorna um usuário dentro de um array
    */
    async findByEmail(email) { // email => [{item}]
        try {
            var result = await knex.select(["id", "email", "password", "name", "role"]).where({email:email}).table('users');
            if (result.length > 0) {
                return result;
            }
            return [];
        } catch(error) {
            return [];
        }
    }

    /**
    * Insere um usuário no banco de dados gerando um hash da senha com bcrypt
    *
    * @param  {String} email E-mail do usuário
    * @param  {String} password Senha em texto plano do usuário
    * @param  {String} name Nome do usuário
    * @return {null} Não retorna nada
    */
    async create(email, password, name) {
        try {
            var hash = await bcrypt.hash(password, 10)
            await knex.insert({email, password: hash, name, role: 0}).table('users');
        } catch(error) {
            console.log(error);
        }
    }

    /**
    * Encontra um usuário no banco de dados por e-mail
    *
    * @param  {String} email E-mail do usuário
    * @return {Boolean} Retorna true se o usuário for encontrado
    */
    async findEmail(email) {
        try {
            var result = await knex.select("*").from('users').where({email:email});
            if (result.length > 0) {
                return true // Encontrou no sistema
            }
            return false

        } catch(error) {
            console.log(':', error)
            // Esse false pode ser problematico
            return false;
        }
    }

    /**
    * Atualiza um usuário no banco de dados
    *
    * @param  {Number} id Id do usuário
    * @param  {String} email E-mail do usuário
    * @param  {String} name Nome do usuário
    * @param  {Number} role Nível de acesso do usuário
    * @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
    */
    async update(id, email, name, role) {
        var user = await this.findById(id);

        if (user.length > 0) {
            var edit = {}

            console.log(email, user[0].email)
            // E-mail válido e diferente do atual
            if ((email != undefined ) && (email != user[0].email)) {
                var result = await this.findEmail(email);

                // Email não registrado ainda
                if(!result) {
                    edit.email = email;
                } else {
                    return {status: false, error: 'O e-mail já está registrado no sistema para outro usuário.'}
                }
            }

            if (name != undefined) { edit.name = name; }
            if (role != undefined) { edit.role = role; }

            try {
                await knex.update(edit).where({id}).table('users');
                return {status: true}
            } catch(error) {
                console.log(error);
                return {status: false, error: "Erro durante a atualização do usuário"}
            }
        } else {
            return {status: false, error: 'Usuário não existe!'}
        }
    }

    /**
    * Deleta um usuário qualquer pelo id
    *
    * @param  {Number} id Id do usuário
    * @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
    */
    async delete(id) {
        var user = await this.findById(id);
        if(user.length > 0) {
            try {
                await knex.delete().where({user_id:id}).table('password_tokens');
                await knex.delete().where({id:id}).table('users');
                return {status: true}
            } catch(error) {
                console.log(error)
                return {status: false, error: 'Erro ao deletar usuário'}
            }

        } else {
            return {status: false, error:" Usuário não existe!"}
        }
    }

    /**
    * Altera a senha de um usuário com base em um token disponível e seu id.
    *
    * @param  {String} newPassword Nova senha em texto plano
    * @param  {Number} id Id do usuário
    * @param  {Number} token_id Id do token disponibilizado ao usuário
    * @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
    */
    async changePassword(newPassword, id, token_id) {
        try {
            var hash = await bcrypt.hash(newPassword, 10)
            await knex.update({used: true}).where({id: token_id}).table('password_tokens');
            await knex.update({password: hash}).where({id:id}).table('users');
            return {status: true}
        } catch(error) {
            console.log(error);
            return {status: false, error:"Erro ao alterar senha"}
        }
    }
}

module.exports = new User();
