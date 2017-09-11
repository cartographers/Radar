/**
 * ACTION TYPES
 */
export const SET_DATABASE = 'SET_DATABASE'
export const RESET_DATABASE = 'RESET_DATABASE'


/**
 * ACTION CREATORS
 */
const setDatabase = database => ({type: SET_DATABASE, database})
const resetDatabaseState = () => ({type: RESET_DATABASE})

/**
 * THUNK CREATORS
 */
export const currentDatabase = (database) =>
  dispatch => {
    dispatch(setDatabase(database))
}

export const resetDatabase = () =>
  dispatch => {
    dispatch(resetDatabaseState())
  }
/**
 * REDUCER
 */

export default function (state = '', action) {
  switch (action.type) {
    case SET_DATABASE:
      return action.database
    case RESET_DATABASE:
      return ''
    default:
      return state
  }
}
