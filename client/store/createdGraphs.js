/**
 * ACTION TYPES
 */
export const GET_GRAPHS = 'GET_GRAPHS'
export const ADD_GRAPH = 'ADD_GRAPH'

/**
 * ACTION CREATORS
 */
const getGraphs = () => ({type: GET_GRAPHS})
const addGraph = graph => ({type: ADD_GRAPH, graph})

/**
 * THUNK CREATORS
 */
export const fetchGraphs = () =>
  dispatch => {
    dispatch(getGraphs())
}

export const saveGraph = (settings) =>
  dispatch => {
    dispatch(addGraph(settings))
}
/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_GRAPHS:
      return state
    case ADD_GRAPH:
      return [...state, action.graph]
    default:
      return state
  }
}
