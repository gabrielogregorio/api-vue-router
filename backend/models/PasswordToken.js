var knex = require('../database/connection');
var User = require('./User');
const { v4: uuidv4 } = require('uuid');


class PasswordToken {
    /**
    * Cria um token para resetar a senha no banco de dados
    *
    * @param  {String} email E-mail do usuário
    * @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
    */
    async create(email) {
        var user = await User.findByEmail(email);
        if (user.length > 0) {

            try {
                var token = uuidv4();
                await knex.insert({
                    user_id: user[0].id,
                    used: 0,
                    token: token
                }).table('password_tokens');
                return {status: true, token:token, user:user}
            } catch (error) {
                console.log(error)
                return {status: false, error: "Erro ao salvar um token"}
            }
        }
        return {status: false, error: "Email não está registrado"}
    }

    /**
    * Valida se o token é válido e o usuário tem permissão para usa-lo
    *
    * @param  {String} email E-mail do usuário
    * @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
    */
    async validate(token) {
        try {
            var result = await knex.select().where({token:token}).table('password_tokens');
            if(result.length > 0 ){
                var tk = result[0];

                if (tk.used == 0){
                    return {status: true, token:tk}
                } else {
                    return {status: false, error: "Token já foi usado!"}
                }
            } else {
                return {status: false, error: "Token não encontrado!"}
            }
        } catch(error) {
            console.log(error)
            return {status: false, error: "Erro ao validar token"}
        }
    }
}

module.exports = new PasswordToken();
