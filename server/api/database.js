const router = require('express').Router()
const pg = require('pg')

let conditionals = ['greater than', 'greater than or equal to', 'less than', 'less than or equal to','equal to', 'not', 'between', 'not between']
let postGresConditionals = ['>', '>=', '<', '<=', '=', '!=']

router.get('/', (req, res, next) => {

	const client = new pg.Client()
	client.connect()

	client.query('SELECT datname FROM pg_database WHERE datistemplate = false', (err, result) => {
	  console.log(err, result)
	  client.end()
	})
	.then(result => {
		const databases = result.rows
		res.json(databases)
	})
	.catch(next)
})

// Send field back to front-end

router.put('/query', (req, res, next) => {

	const postgresUrl = 'postgres://localhost:' + req.body.port + '/' + req.body.database
	const client = new pg.Client(postgresUrl)

	let selectThese = req.body.selectThese.join(', ') || '*'
	let whereThese = req.body.whereThese
	let conditionals = req.body.conditionals

	let querySearch = ['SELECT ', selectThese, ' FROM', req.body.table]
	// if (req.body.join) querySearch.push('JOIN ' + req.body.field)
	// if (req.body.whereThese) querySearch.push('ON ' + req.body.whereThese)

	querySearch = querySearch.join(' ').trim()

	client.connect()

	client.query(querySearch, (err, result) => {  // AVOID SEQUEL INJECTIONS
	  console.log(err, result)
	  client.end()
	})
	.then(result => res.json(result.rows))
	.catch(next)
})

router.put('/tables', (req, res, next) => {

	const postgresUrl = 'postgres://localhost:5432/' + req.body.database
	const client = new pg.Client(postgresUrl)

	let querySearch = "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public'"

	client.connect()

	client.query(querySearch, (err, result) => {  // AVOID SEQUEL INJECTIONS
	  console.log(err, result)
	  client.end()
	})
	.then(result => {
		const tables = result.rows.map(table => table.table_name)
		res.json(tables)
	})
	.catch(next)
})

router.put('/fields', (req, res, next) => {
	const postgresUrl = 'postgres://localhost:5432/' + req.body.database
	const client = new pg.Client(postgresUrl)
	let querySearch = ['SELECT * FROM', req.body.table]
	querySearch = querySearch.join(' ').trim()

	client.connect()

	client.query(querySearch, (err, result) => {
	  console.log(err, result)
	  client.end()
	})
	.then(result => {
		const fields = result.fields.map(field => field.name)
		res.json(fields)
	})
	.catch(next)
})


module.exports = router
