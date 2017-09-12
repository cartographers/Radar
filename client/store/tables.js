import {loadTables} from '../../utils/connectDB'
import {fetchFields} from './fields'
/**
 * ACTION TYPES
 */
export const GET_TABLES = 'GET_TABLES'
export const RESET_TABLES = 'RESET_TABLES'


/**
 * ACTION CREATORS
 */
const getTables = tables => ({type: GET_TABLES, tables})
const resetTables = () => ({type: RESET_TABLES})

/**
 * THUNK CREATORS
 */
export const fetchTables = (settings) =>
  dispatch => {
    const result = loadTables(settings)
    result
    .then(response => {
      if (response.length) dispatch( fetchFields({ database: settings.database, table: response[0]}))
      return dispatch(getTables(response))
    })
    .catch(err => console.log(err))
}

export const resetTable = () =>
  dispatch => {
    dispatch(resetTables())
  }

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_TABLES:
      return action.tables
    case RESET_TABLES:
      return []
    default:
      return state
  }
}
