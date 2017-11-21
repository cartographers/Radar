var pg = require('pg')

const customQueryData = (settings) => {
  let portSetting = 'postgres://localhost:5432/'
  const postgresUrl = portSetting + settings.currentDatabase
  const client = new pg.Client(postgresUrl)
  let querySearch = settings.SQLquery.toUpperCase().trimLeft()
  if (querySearch.includes('DROP DATABASE') || querySearch.includes('DROP TABLE') || querySearch.includes('DELETE FROM')) {
    querySearch = ''
  }
  client.connect()
  return client.query(querySearch)
            .then(result => {
              if (!result) return []
                 return result.rows
            })
            .catch(err => console.log(err))
}

export default customQueryData
