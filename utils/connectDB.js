const pg = require('pg')

const initDatabases = () => {
  const client = new pg.Client()
  client.connect()
  return client.query('SELECT datname FROM pg_database WHERE datistemplate = false')
  .then(result => result.rows)
  .catch(err => console.log(err))
}

const queryData = (settings) => {
	// const postgresUrl = 'postgres://localhost:' + settings.port + '/' + settings.database
	const postgresUrl = 'postgres://localhost:5432/' + settings.database
	const client = new pg.Client(postgresUrl)

	let selectThese = settings.selectThese.join(', ') || '*'
	let whereThese = settings.whereThese
	let conditionals = settings.conditionals

	let querySearch = ['SELECT', selectThese, 'FROM', settings.table]
	// if (settings.join) querySearch.push('JOIN ' + settings.field)
	// if (settings.whereThese) querySearch.push('ON ' + settings.whereThese)

	querySearch = querySearch.join(' ').trim()
	console.log('QUERY SEARCH (connectDB):', querySearch)

	client.connect()

	return client.query(querySearch)
	.then(result => {
		console.log('RESULT (connectDB)::', result)
		return result.rows

	})
	.catch(err => console.log(err))
}

const loadTables = (settings) => {
	const postgresUrl = 'postgres://localhost:5432/' + settings.database
	const client = new pg.Client(postgresUrl)

	let querySearch = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public'"

	client.connect()

	return client.query(querySearch)
	.then(result => {
		console.log('result:',result)
		const tables = result.rows.map(table => table.table_name)
		return tables
	})
	.catch(err => console.log(err))
}

const loadFields = (settings) => {
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
}

module.exports = {
	initDatabases,
	queryData,
	loadTables,
	loadFields
}
