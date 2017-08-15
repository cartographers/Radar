const router = require('express').Router()
const pg = require('pg')

router.put('/', (req, res, next) => {

	const postgresUrl = 'postgres://localhost/'

	const client = new pg.Client(postgresUrl)

	client.connect()

	const query = client.query('SELECT * FROM ' + req.body.table, (err, result) => {
	  console.log(err, result)
	  client.end()
	})

  res.json(query)
})

// Send field back to front-end

router.put('/table', (req, res, next) => {
	const postgresUrl = 'postgres://localhost:' + req.body.port + '/' + req.body.database

	const client = new pg.Client(postgresUrl)
	let querySearch = ['SELECT * FROM', req.body.table]
	if (req.body.join) querySearch.push('JOIN ' + req.body.field)
	if (req.body.filter) querySearch.push('ON ' + req.body.filter)

	querySearch = querySearch.join(' ').trim()

	client.connect()

	client.query(querySearch, (err, result) => {  // AVOID SEQUEL INJECTIONS
	  console.log(err, result)
	  client.end()
	})
	.then(result => res.json(result.rows))
	.catch(next)

})


module.exports = router
