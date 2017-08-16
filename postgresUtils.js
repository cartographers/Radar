const router = require('express').Router()
const pg = require('pg')

function loadDatabases(){
	const client = new pg.Client()
	client.connect()
	return client.query('SELECT datname FROM pg_database WHERE datistemplate = false', (err, result) => {
	  console.log(err, result)
	  client.end()
	})
	.then(result => {
		const databases = result.rows
		return databases
	})

}

function queryDatabase(settigns){
	
}

module.exports = {
	loadDatabases
}
