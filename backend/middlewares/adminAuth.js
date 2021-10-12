const secret = require('../secret');
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    // Cabeçalho bearer com o token
    // bearer hh31hobhoeq
    const authToken = req.headers['authorization'];

    var msgErro = "Você não tem autorização";
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try {
            console.log(token, secret)
            var decoded = jwt.verify(token, secret);
            if (decoded.role == 1) { // Usuário não é admin, e não tem permissão para acessar
                console.log('é admin')
                next();
            } else {
                console.log('Usuário não é administrador')
                res.status(403);
                res.json({'error':msgErro});
            }
        } catch(error) {
            console.log('op4')
            res.status(403);
            console.log('token inválido!', error)
            res.json({'error':msgErro});
        }
    } else {
        console.log('op7')
        res.status(403);
        res.json({'error':msgErro});
    }
}
