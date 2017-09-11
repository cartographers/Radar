import {initDatabases} from '../../utils/connectDB'

/**
 * ACTION TYPES
 */
export const GET_DATABASES = 'GET_DATABASES'


/**
 * ACTION CREATORS
 */
const getDatabases = databases => ({type: GET_DATABASES, databases})

/**
 * THUNK CREATORS
 */
export const fetchDatabases = () =>
  dispatch => {
    const result = initDatabases()
    result
      .then(response => dispatch(getDatabases(response)))
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_DATABASES:
      return action.databases
    default:
      return state
  }
}
