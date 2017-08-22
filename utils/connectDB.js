const pg = require('pg')

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

const loadFields = (settings) => {
<<<<<<< HEAD
	const postgresUrl = 'postgres://localhost:5432/' +  settings.database
	const client = new pg.Client(postgresUrl)
	let querySearch = ['SELECT * FROM', `"${settings.table}"`]
	querySearch = querySearch.join(' ').trim()

	client.connect()
	console.log(querySearch)
	return client.query(querySearch)
	.then(result => {
		return result.fields
	})
	.catch(err => console.log(err))
=======
  const postgresUrl = 'postgres://localhost:5432/' + settings.database
  const client = new pg.Client(postgresUrl)
  let querySearch = ['SELECT * FROM', settings.table]
  querySearch = querySearch.join(' ').trim()
  
  client.connect()
  
  return client.query(querySearch)
    .then(result => {
      return result.fields
    })
    .catch(err => console.log(err))
>>>>>>> 36aee51b471e1edcef71074ea36cda0a2086b02c
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
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
}

const checkDataType = (whereSpec, fields) => {
  let newWhereSpec = whereSpec
  fields.forEach(field => {
    if (field.name === whereSpec.col) {
      if (field.dataTypeID === 23) newWhereSpec.spec = Number(whereSpec.spec)
      if (field.dataTypeID === 1043 || field.dataTypeID === 983071) {
        if (whereSpec.spec.charAt(0) === "'" && whereSpec.spec.charAt(whereSpec.spec.length - 1) === "'") newWhereSpec.spec = whereSpec.spec
        else newWhereSpec.spec = "'" + whereSpec.spec + "'"
      }
    }
  })
  return newWhereSpec
}

const formatOrderBy = (orderOptions) => {
<<<<<<< HEAD
	console.log('ORDER OPTIONS', orderOptions)
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
	let whereThese = settings.whereThese && settings.whereThese.map(where => checkDataType(where, settings.fields))

	let selectThese = settings.selectThese && settings.selectThese.join(', ') || '*'
	let whereConditional = ' ' + settings.AndOr + ' '
	whereThese = whereThese && whereThese.map(where => settings.currentTable + '.' + where.col + ' ' + where.is + ' ' + where.spec).join(whereConditional)
	whereThese = whereThese && whereThese.length ? 'WHERE ' + whereThese : ''
	let orderBy = formatOrderBy(settings.orderedBy)

	let querySearch = ['SELECT', selectThese, 'FROM', `"${settings.currentTable}"`, whereThese, orderBy]

	querySearch = querySearch.join(' ').trim()
	console.log('QUERY SEARCH (connectDB):', querySearch)

	client.connect()

	return client.query(querySearch)
	.then(result => {
		return result.rows

	})
	.catch(err => console.log(err))
=======
  console.log('ORDER OPTIONS', orderOptions)
  if (!orderOptions) return ''
  let [orderCondition, orderCol] = orderOptions
  if (orderCondition === 'Ascending') orderCondition = 'ASC'
  else if (orderCondition === 'Descending') orderCondition = 'DESC'
  else return ''
  if (!orderCol || orderCol == 'Please choose an Option') return ''
  return 'ORDER BY ' + orderCol + ' ' + orderCondition
}

const queryData = (settings) => {
  // const postgresUrl = 'postgres://localhost:' + settings.port + '/' + settings.database
  const postgresUrl = 'postgres://localhost:5432/' + settings.currentDatabase
  const client = new pg.Client(postgresUrl)
  console.log('Query settings....', settings)
  let whereThese = settings.whereThese && settings.whereThese.map(where => checkDataType(where, settings.fields))
  let selectThese = settings.selectThese ? settings.selectThese : []
  selectThese = selectThese.push('COUNT (*) ')
  console.log('selectthese line 90', selectThese)
    selectThese = selectThese && selectThese.join(', ') || '*'
  let whereConditional = ' ' + settings.AndOr + ' '
  whereThese = whereThese && whereThese.map(where => settings.currentTable + '.' + where.col + ' ' + where.is + ' ' + where.spec).join(whereConditional)
  whereThese = whereThese && whereThese.length ? 'WHERE ' + whereThese : ''
  let orderBy = formatOrderBy(settings.orderedBy)
  console.log('SELECT THESE', selectThese)
  let querySearch = ['SELECT ', selectThese, 'FROM', settings.currentTable, whereThese, orderBy]
  
  querySearch = querySearch.join(' ').trim()
  console.log('QUERY SEARCH:', querySearch)
  queryAggregation = queryAggregation.join('').trim()
  console.log('QUERY AGGREGATION (connectDB):', queryAggregation)
  
  client.connect()
  
  return client.query(querySearch)
    .then(result => {
      return result.rows
    })
    .then(() => client.query(queryAggregation))
    .then(result => {
      console.log('RESULT', result)
      return result
    })
    .catch(err => console.log(err))
>>>>>>> 36aee51b471e1edcef71074ea36cda0a2086b02c
}


module.exports = {
  initDatabases,
  queryData,
  loadTables,
  loadFields,
  loadTableForeignKeys
}
