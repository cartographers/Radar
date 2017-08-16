import axios from 'axios'

/**
 * ACTION TYPES
 */
export const QUERY_DATABASE = 'QUERY_DATABASE'


/**
 * ACTION CREATORS
 */
const queryDatabase = database => ({type: QUERY_DATABASE, database})

/**
 * THUNK CREATORS
 */
export const searchDatabase = (data) =>
  dispatch =>
    axios.put('/api/database/query', data)
      .then(res =>
        dispatch(queryDatabase(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case QUERY_DATABASE:
      return action.database
    default:
      return state
  }
}
