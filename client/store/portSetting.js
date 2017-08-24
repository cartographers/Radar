/**
 * ACTION TYPES
 */
export const SET_PORT = 'SET_PORT'
export const UPDATE_PORT = 'UPDATE_PORT'


/**
 * ACTION CREATORS
 */
const setPort = port => ({type: SET_PORT, port})
const updatePort = port => ({type: UPDATE_PORT, port})

/**
 * THUNK CREATORS
 */

export const fetchPort = (port) =>
  dispatch => {
    dispatch(setPort(port))
}

export const editPort = (port) =>
  dispatch => {
    dispatch(updatePort(port))
}
/**
 * REDUCER
 */

export default function (state = '5432', action) {
  switch (action.type) {
    case SET_PORT:
      return action.port
    case UPDATE_PORT:
      return action.port
    default:
      return state
  }
}
