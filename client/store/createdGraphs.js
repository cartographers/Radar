import {saveSettings, openSettings} from '../../utils/saveFile'
/**
 * ACTION TYPES
 */

export const GET_GRAPHS = 'GET_GRAPHS'
export const ADD_GRAPH = 'ADD_GRAPH'

/**
 * ACTION CREATORS
 */
const getGraphs = graphs => ({type: GET_GRAPHS, graphs})
const addGraph = graph => ({type: ADD_GRAPH, graph})

/**
 * THUNK CREATORS
 */
export const fetchGraphs = () =>
  dispatch => {
    openSettings()
      .then(graphs => {
        const graphsJson = JSON.parse(graphs)
        console.log(graphsJson)
        dispatch(getGraphs(graphsJson))

      })
      }

export const saveGraph = (settings) =>
  (dispatch, getState) => {
    dispatch(addGraph(settings))
    const updatedGraphs = getState().createdGraphs
    saveSettings(JSON.stringify(updatedGraphs))
}

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case GET_GRAPHS:
      return action.graphs
    case ADD_GRAPH:
      return [...state, action.graph]
    default:
      return state
  }
}
