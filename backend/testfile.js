var {defineLevelLogs, log} = require('./levelLogs');

defineLevelLogs(['error', 'warning', 'info'])

log('Olá mundodd', 'debug')
log('Olá mundodd', 'debug')
log('Olá mundodd', 'debug')

log('Olá mundos', 'warning')
log('Olá mundos', 'warning')

log('Olá mundo3', 'error')
log('Olá mundo3', 'error')

log('Olá mundo4', 'info')
log('Olá mundo4', 'info')
