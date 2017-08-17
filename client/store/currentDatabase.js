/**
 * ACTION TYPES
 */
export const SET_DATABASE = 'SET_DATABASE'


/**
 * ACTION CREATORS
 */
const setDatabase = database => ({type: SET_DATABASE, database})

/**
 * THUNK CREATORS
 */
export const currentDatabase = (database) =>
  dispatch => {
    dispatch(setDatabase(database))
}
/**
 * REDUCER
 */

export default function (state = '', action) {
  switch (action.type) {
    case SET_DATABASE:
      return action.database
    default:
      return state
  }
}
