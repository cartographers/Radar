const pg = require('pg')

const initDatabases = () => {
  const client = new pg.Client()
  client.connect()
  return client.query('SELECT datname FROM pg_database WHERE datistemplate = false')
    .then(result => result.rows)
    .catch(err => console.log(err))
}

export default initDatabases
