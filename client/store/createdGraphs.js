
/**
 * ACTION TYPES
 */

export const GET_GRAPHS = 'GET_GRAPHS'
export const ADD_GRAPH = 'ADD_GRAPH'
export const DELETE_GRAPH = 'DELETE_GRAPH'

/**
 * ACTION CREATORS
 */
const getGraphs = () => ({type: GET_GRAPHS})
const addGraph = graph => ({type: ADD_GRAPH, graph})
const deleteGraph = settings => ({type: DELETE_GRAPH, settings})

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

export const destroyGraph = (settings) =>
  dispatch => {
    dispatch(deleteGraph(settings))
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
    case DELETE_GRAPH:
      return state.filter(graph => graph.settings !== action.settings)
    default:
      return state
  }
}
