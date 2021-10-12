var bcrypt = require('bcrypt')
var jwt = require("jsonwebtoken");
const User = require('../models/User');
var PasswordToken = require('../models/PasswordToken');
const secret = require('../secret');
var {defineLevelLogs, log} = require('../levelLogs');
defineLevelLogs(['all'])

class UserController {
    /**
    * Retorna uma simples mensagem de status da api
    */
    async index(req, res) {
        var users = await User.findAll();
        res.status(200);
        res.json(users);
    }
    /**
    * Retorna um usuário
    */
    async findUser(req, res) {
        var id = req.params.id;
        var user = await User.findById(id)

        if (user.length > 0) {
            res.status(200);
            res.json(user[0]);
        } else {
            res.status(404);
            res.json({});
        }
    }

    /**
    * Cria um usuário
    */
    async create(req, res) {
        var { email, name, password } = req.body;

        if ((email == undefined || name == undefined || password == undefined) ||
            (email == '' || name == '' || password == '')) {
                res.status(400);
                log('E-mail, password ou name inválidos', 'warning')
                res.json({error: 'Você precisa informar entradas válidas!'})
        } else {
            var emailExists = await User.findEmail(email);

            if (emailExists) {
                res.status(406)
                log('Tentativa de edição de um e-mail registrado', 'warning')
                return res.json({error: 'O e-mail já está registrado!'})
            }

            await User.create(email, password, name);
            res.status(200);
            res.send('Ok!');
        }
    }

    /**
    * Edita um usuário
    */
    async edit(req, res) {
        var {id, email, name} = req.body;
        var result = await User.update(id, email, name);
        console.log(result)
        // Sucesso
        if (result.status) {
            res.status(200);
            res.send('ok');
        } else {
            res.status(406);
            res.json({error:result.error});
        }
    }

    /**
    * Deleta um usuário
    */
    async delete(req, res) {
        var id = req.params.id;
        var result = await User.delete(id);
        if(result.status) {
            res.status(200);
            return res.send('ok');
        }
        res.status(406);
        return res.send(result.error);
    }


    /**
    * Realiza a recuperação de senhas
    */
    async recoveryPassword(req, res) {
        var email = req.body.email;

        var result = await PasswordToken.create(email);
        if(result.status) {
            res.status(200);
            // nodemailer....aqui
            return res.json({'token': result.token})
        }
        res.status(406);
        return res.send(result.error)
    }

    /**
    * Escolhe uma senha nova
    */
    async changePassword(req, res) {
        var token = req.body.token;
        var password = req.body.password;

        var isValidToken = await PasswordToken.validate(token);
        if (isValidToken.status) {
            try {
                var result = await User.changePassword(password, isValidToken.token.user_id, isValidToken.token.id)
                if (result.status) {
                    res.status(200);
                    return res.send('Senha alterada');
                }
                res.status(406);
                return res.send('Erro ao alterar senha');
            } catch(error) {
                res.status(406);
                console.log(error);
                res.send('erro');
            }
        } else {
            res.status(406)
            res.send('Token inválido!')
        }
    }

    /**
    * Realiza a autenticação de um usuário
    */
    async login(req, res) {
        var { email, password } = req.body;
        var user = await User.findByEmail(email);

        // Evita de em uma tentativa de ataque o atacante não saiba se o
        // e-mail está registrado no sistema
        var msgErro = "E-mail ou senha inválidos";

        if(user.length > 0) {
            var isValid = await bcrypt.compare(password, user[0].password);
            if (isValid) {

                var token = jwt.sign({email:user[0].email, role:user[0].role}, secret)
                res.status(200);
                res.json({status: true, token:token})
            } else {
                res.status(406);
                res.json({status: false, error: msgErro})
            }
        } else {
            res.status(406);
            res.json({status: false, error: msgErro})
        }
    }
}

module.exports = new UserController();
