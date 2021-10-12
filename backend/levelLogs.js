
var level = ''
var list_levels = ['null', 'all', 'error', 'warning', 'info', 'debug'];

/**
* Valida se o token é válido e o usuário tem permissão para usa-lo
*
* @param  {Array} newLevel Nível do log: ['null', 'all', 'error', 'warning', 'info', 'debug']
* @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
*/
function defineLevelLogs(newLevel) {
    level = newLevel;
}

/**
* Valida se o token é válido e o usuário tem permissão para usa-lo
*
* @param  {String} msg mensagem de log
* @param  {Array} level_log Nível do log: ['error', 'warning', 'info', 'debug']}
* @return {JSON} Retorna o campo 'status', true para sucesso. Em caso de false, retorna o campo 'error' com a mensagem
*/
function log(msg, level_log) {
    if(!list_levels.slice(2,).includes(level_log)) {
        console.log("Você só pode usar os seguintes valores para o nível de erro: null, all, error, warning, info, debug")
    } else {
        if (level.includes('all') || level.includes(level_log)) {
            console.log('[' + level_log.toUpperCase() + '] - ' + msg)
        }
    }
}

module.exports = {defineLevelLogs, log}
