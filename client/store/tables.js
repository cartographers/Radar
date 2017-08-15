import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_TABLES = 'GET_TABLES'


/**
 * ACTION CREATORS
 */
const getTables = tables => ({type: GET_TABLES, tables})

/**
 * THUNK CREATORS
 */
export const fetchTables = (database) =>
  dispatch =>
    axios.put('/api/database/tables', database)
      .then(res =>
        dispatch(getTables(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
 
export default function (state = [], action) {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    default:
      return state
  }
}
