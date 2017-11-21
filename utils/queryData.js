const pg = require('pg')
const BlueBird = require('bluebird')
import addQuotes from './addQuotes'
import joinTables from './joinTables'
import checkDataType from './checkDataType'
import formatOrderBy from './formatOrderBy'

let portSetting = 'postgres://localhost:5432/'

const queryData = (settings) => {
  console.log(settings)
  const postgresUrl = portSetting + settings.currentDatabase
  const client = new pg.Client(postgresUrl)

  const jointTables = joinTables(settings)

  let whereThese = settings.whereThese && settings.whereThese.map(where => checkDataType(where, settings.fields))
  let selectThese = settings.selectThese.length ? settings.selectThese : settings.fields.map(val => val.tableName + ' ' + val.name)
  selectThese = selectThese.map(val => {
    let [table, column] = val.split(' ')
    return addQuotes(table) + '.' + addQuotes(column) + ' AS ' + addQuotes(val)
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

  let aggregateSelects = settings.aggregateSelects && settings.aggregateSelects.map(val => {
    let [agTable, agCol] = val.col.split(' ')
    return `${val.agg}(${addQuotes(agTable)}.${addQuotes(agCol)}) ${val.agg}_${agTable}_${agCol}`}
  ).join(', ')
  let querySearch = ['SELECT', selectThese, 'FROM', `"${settings.currentTable}"`, jointTables, whereThese, orderBy]
  let aggregateSearch = ['SELECT', aggregateSelects, 'FROM', `"${settings.currentTable}"`, whereThese].join(' ').trim()

  querySearch = querySearch.join(' ').trim()
  client.connect()
  let queryPromise = client.query(querySearch)
  let aggregatePromise = client.query(aggregateSearch)
  return BlueBird.all([queryPromise, aggregatePromise]).spread( (queryInfo, aggregateInfo) => {
    return [queryInfo.rows, aggregateInfo.rows]
  }).catch(console.log)
}

export default queryData
