import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import users from './users'
import database from './database'
import databases from './databases'
import fields from './fields'
import tables from './tables'
import queriedTable from './queriedTable'
import currentDatabase from './currentDatabase'
import createdGraphs from './createdGraphs'
import foreignKeys from './foreignKeys'
import portSetting from './portSetting'

const reducer = combineReducers({
	user,
	users,
	database,
	databases,
	fields,
	tables,
	queriedTable,
	currentDatabase,
	createdGraphs,
	foreignKeys,
	portSetting
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './users'
export * from './database'
export * from './databases'
export * from './fields'
export * from './tables'
export * from './queriedTable'
export * from './currentDatabase'
export * from './createdGraphs'
export * from './foreignKeys'
export * from './portSetting'
