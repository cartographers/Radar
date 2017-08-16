import {queryData} from '../../utils/connectDB'

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
export const searchDatabase = (settings) =>
  dispatch => {
    const result = queryData(settings)
    result
    .then(response => dispatch(queryDatabase(response)))
    .catch(err => console.log(err))
}
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
