import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_DATABASE = 'GET_DATABASE'
export const QUERY_DATABASE = 'QUERY_DATABASE'


/**
 * ACTION CREATORS
 */
const getDatabase = database => ({type: GET_DATABASE, database})
const queryDatabase = database => ({type: GET_DATABASE, database})

/**
 * THUNK CREATORS
 */
export const fetchDatabase = (data) =>
  dispatch =>
    axios.put('/api/database', data)
      .then(res =>
        dispatch(getDatabase(res.data)))
      .catch(err => console.log(err))

export const searchDatabase = (data) =>
  dispatch =>
    axios.put('/api/database/table', data)
      .then(res =>
        dispatch(queryDatabase(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
 
export default function (state = [], action) {
  switch (action.type) {
    case GET_DATABASE:
      return action.database
    case QUERY_DATABASE:
      return action.database
    default:
      return state
  }
}
