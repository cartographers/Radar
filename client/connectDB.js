const ipcRenderer = require('electron').ipcRenderer
const pg = require('electron').remote.require('pg')

export default class connectDB {
  address(params) {
    return `postgres://${params.user}:${params.password}@${params.host}:${params.port}/${params.database}`
  }

  connect(address, params) {
    pg.connect(address(params), (err, client) => {
      this.client = client
    })
  }

  getTables() {
    const query =
        `SELECT table_name
 FROM information_schema.tables
 WHERE table_schema='public'
 AND table_type='BASE TABLE'`
      this.client.query(query)
  }
}
