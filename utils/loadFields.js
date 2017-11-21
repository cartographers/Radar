var pg = require('pg')
var BlueBird = require('bluebird')

let portSetting = 'postgres://localhost:5432/'

const loadFields = (settings) => {
  const postgresUrl = portSetting + settings.database
  const client = new pg.Client(postgresUrl)

  client.connect()
  let foreignTables = settings.foreignKeys ? settings.foreignKeys.map(keyObj => keyObj.foreign_table_name) : []
  let uniqueTables = [settings.table]
  foreignTables.forEach(val => {
    if (!uniqueTables.includes(val))uniqueTables.push(val)
  })
  return BlueBird.map(uniqueTables, (tableName) => {
    let tableQuery = 'SELECT * FROM ' + tableName
    return client.query(tableQuery)
  .then(result => {
   if (!result) return []
   return result.fields.map((col) => {
    col.tableName = tableName
    return col
   })
  })
  }).then((allCols) => {
    return allCols.reduce((a, b) => a.concat(b))
  }).catch(console.log)
}

export default loadFields
