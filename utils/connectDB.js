const pg = require('pg')

const initDatabases = function () {
  const client = new pg.Client()
  client.connect()
  return client.query('SELECT datname FROM pg_database WHERE datistemplate = false')
  .then(result => {
		const databases = result.rows
    return databases
  })

}

module.exports = {initDatabases}
