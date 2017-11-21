var pg = require('pg')

let portSetting = 'postgres://localhost:5432/'

const loadTableForeignKeys = (settings) => {
  const postgresUrl = portSetting + settings.database
  const client = new pg.Client(postgresUrl)

  let querySearch = ['SELECT tc.constraint_name, tc.table_name, kcu.column_name, ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name',
              'FROM information_schema.table_constraints AS tc JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name',
              'JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name WHERE constraint_type = \'FOREIGN KEY\' AND tc.table_name=\'']
  querySearch = querySearch.join(' ').trim() + settings.table + '\''
  client.connect()

  return client.query(querySearch)
  .then(result => result.rows)
  .catch(err => console.log(err))

}

export default loadTableForeignKeys
