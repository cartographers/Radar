import axios from 'axios'

/**
 * ACTION TYPES
 */
export const QUERIED_TABLE = 'QUERIED_TABLE'


/**
 * ACTION CREATORS
 */

const queriedTable = table => ({type: QUERIED_TABLE, table})

/**
 * THUNK CREATORS
 */
export const appleSauce = (queryInfo) => 
  dispatch => 
    axios.put('/api/database/query', queryInfo)
      .then(res =>
        dispatch(queriedTable(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
 
export default function (state = [], action) {
  switch (action.type) {
    case QUERIED_TABLE:
      return action.table
    default:
      return state
  }
}
