const pg = require('pg')
import BlueBird from 'bluebird'

const addQuotes = (str) => {
  str = str.replace(/\'/g, '"')
  return /\"[A-Za-z1-9_]+\"/.test(str) ? str : '"' + str + '"'
}

const initDatabases = () => {
  const client = new pg.Client()
  client.connect()
  return client.query('SELECT datname FROM pg_database WHERE datistemplate = false')
    .then(result => result.rows)
    .catch(err => console.log(err))
}

const loadTables = (settings) => {
  const postgresUrl = 'postgres://localhost:5432/' + settings.database
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

const loadTableForeignKeys = (settings) => {
  const postgresUrl = 'postgres://localhost:5432/' + settings.database
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

const joinTables = (settings) => {
  let foreignKeysArray = settings.foreignKeys
  if (foreignKeysArray !== undefined) {
    foreignKeysArray = foreignKeysArray.map(key => {
      return 'JOIN ' + key.foreign_table_name + ' ON ' + key.table_name + '."' + key.column_name + '"' + ' = ' + key.foreign_table_name + '."' + key.foreign_column_name + '"'
    })
    foreignKeysArray = foreignKeysArray.join(' ').trim()
  }
  return foreignKeysArray || ''
}

const loadFields = (settings) => {
  const postgresUrl = 'postgres://localhost:5432/' + settings.database
  const client = new pg.Client(postgresUrl)

  let querySearch = ['SELECT * FROM']

  client.connect()
  let foreignTables = settings.foreignKeys ? settings.foreignKeys.map(keyObj => keyObj.foreign_table_name) : []
  let uniqueTables = [settings.table]
  foreignTables.forEach(val => {
    if (!uniqueTables.includes(val))uniqueTables.push(val)
  })
  console.log(uniqueTables)
  //uniqueTables holds all the tables with columns that will populate our selections.
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

const checkDataType = (whereSpec, fields) => {
  let newWhereSpec = whereSpec
  fields.forEach(field => {
    if ((field.tableName + ' ' + field.name) === whereSpec.col) {
      if (field.dataTypeID === 23 || field.dataTypeID === 21 || field.dataTypeID === 1700) newWhereSpec.spec = Number(whereSpec.spec)
      else {
        if (whereSpec.spec.charAt(0) === "'" && whereSpec.spec.charAt(whereSpec.spec.length - 1) === "'") newWhereSpec.spec = whereSpec.spec
        else newWhereSpec.spec = "'" + whereSpec.spec + "'"
      }
    }
  })
  return newWhereSpec
}

const formatOrderBy = (orderOptions) => {
  if (!orderOptions) return ''
  let [orderCondition, orderCol] = orderOptions
  if (orderCondition === 'Ascending') orderCondition = 'ASC'
  else if (orderCondition === 'Descending') orderCondition = 'DESC'
  else return ''
  if (!orderCol || orderCol == 'Make a choice' ) return ''
  return 'ORDER BY ' + orderCol + ' ' + orderCondition
}

const queryData = (settings) => {
  // const postgresUrl = 'postgres://localhost:' + settings.port + '/' + settings.database
  const postgresUrl = 'postgres://localhost:5432/' + settings.currentDatabase
  const client = new pg.Client(postgresUrl)

  console.log('Query settings....', settings)
  const jointTables = joinTables(settings)

  let whereThese = settings.whereThese && settings.whereThese.map(where => checkDataType(where, settings.fields))
  let selectThese = settings.selectThese.length ? settings.selectThese : settings.fields.map(val => val.tableName + ' ' + val.name)
  selectThese = selectThese.map(val => {
    let [table, column] = val.split(' ')
    return addQuotes(table) + '.' + addQuotes(column) + 'AS' + addQuotes(val)
  }).join(', ')
  let whereConditional = ' ' + settings.AndOr + ' '
  whereThese = whereThese && whereThese.map(where => {
    let [tab, col]  = where.col.split(' ')
    tab = addQuotes(tab)
    col = addQuotes(col)
    let joinedWhere = tab + '.' + col + ' ' + where.is + ' ' + where.spec
    return joinedWhere
    }).join(whereConditional)
  whereThese = whereThese && whereThese.length ? 'WHERE ' + whereThese : ''

  let orderBy = formatOrderBy(settings.orderedBy)

  let aggregateSelects = settings.aggregateSelects && settings.aggregateSelects.map(val => `${val.agg}(${val.col}) ${val.agg}_${val.col}`).join(', ')
  let querySearch = ['SELECT', selectThese, 'FROM', `"${settings.currentTable}"`, jointTables, whereThese, orderBy]
  let aggregateSearch = ['SELECT', aggregateSelects, 'FROM', `"${settings.currentTable}"`, whereThese].join(' ').trim()

  querySearch = querySearch.join(' ').trim()
  console.log('Querying for....', querySearch)
  client.connect()

  let queryPromise = client.query(querySearch)
  let aggregatePromise = client.query(aggregateSearch)
  return BlueBird.all([queryPromise, aggregatePromise]).spread( (queryInfo, aggregateInfo) => {
    return [queryInfo.rows, aggregateInfo.rows]
  }).catch(console.log)
}

const customQueryData = (settings) => {
  const postgresUrl = 'postgres://localhost:5432/' + settings.currentDatabase
  const client = new pg.Client(postgresUrl)

  let querySearch = settings.SQLquery.toUpperCase().trimLeft()
  if (querySearch.includes('DROP DATABASE')
    || querySearch.includes('DROP TABLE')
    || querySearch.includes('DELETE FROM')
    ) querySearch = ''

  client.connect()

  return client.query(querySearch)
  .then(result => {
    if (!result) return []
    return result.rows
  })
  .catch(err => console.log(err))
}


module.exports = {
  initDatabases,
  queryData,
  loadTables,
  loadFields,
  loadTableForeignKeys,
  joinTables,
  customQueryData

}
