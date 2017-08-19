import {loadTableForeignKeys} from '../../utils/connectDB'

/**
 * ACTION TYPES
 */
export const GET_KEYS = 'GET_KEYS'


/**
 * ACTION CREATORS
 */
const getKeys = keys => ({type: GET_KEYS, keys})

/**
 * THUNK CREATORS
 */
export const fetchKeys = (data) =>
  dispatch => {
    const result = loadTableForeignKeys(data)
    result
    .then(response => {
      console.log(response)
      return dispatch(getKeys(response.rows))
    })
    .catch(err => console.log(err))
}

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_KEYS:
      return action.keys
    default:
      return state
  }
}
