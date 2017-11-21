const pg = require('pg')

let portSetting = 'postgres://localhost:5432/'

const loadTables = (settings) => {
  const postgresUrl = portSetting + settings.database
  const client = new pg.Client(postgresUrl)
  let querySearch = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public'"
  client.connect()
  return client.query(querySearch)
    .then(result => {
      const tables = result.rows.map(table => table.table_name)
      return tables
    })
    .catch(err => console.log(err))
}

export default loadTables
