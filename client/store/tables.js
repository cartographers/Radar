import {loadTables} from '../../utils/connectDB'
import {fetchFields} from './fields'
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
export const fetchTables = (settings) =>
  dispatch => {
    const result = loadTables(settings)
    result
    .then(response => {
      if (response.length) {
        dispatch(fetchFields({ database: settings.database, table: response[0]}))
      }
      return dispatch(getTables(response))
    })
    .catch(err => console.log(err))
}

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
