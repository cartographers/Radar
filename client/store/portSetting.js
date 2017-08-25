/**
 * ACTION TYPES
 */
export const SET_PORT = 'SET_PORT'
export const UPDATE_PORT = 'UPDATE_PORT'


/**
 * ACTION CREATORS
 */
const setPort = () => ({type: SET_PORT})
const updatePort = port => ({type: UPDATE_PORT, port})

/**
 * THUNK CREATORS
 */

export const fetchPort = () =>
  dispatch => {
    dispatch(setPort())
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
      return state
    case UPDATE_PORT:
      return action.port
    default:
      return state
  }
}
