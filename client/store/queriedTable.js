import {queryData, customQueryData} from '../../utils/connectDB'
/**
 * ACTION TYPES
 */
export const QUERIED_TABLE = 'QUERIED_TABLE'
export const RESET_QUERIED_TABLE = 'RESET_QUERIED_TABLE'


/**
 * ACTION CREATORS
 */

const queriedTable = table => ({type: QUERIED_TABLE, table})
const resetQueriedTables = () => ({type: RESET_QUERIED_TABLE})

/**
 * THUNK CREATORS
 */
export const fetchQueryTable = (queryInfo) =>
  dispatch => {
    const result = queryData(queryInfo)
    result
    .then(response => {
      dispatch(queriedTable(response))
    })
    .catch(err => console.log(err))
}

export const fetchQueryTableCustom = (queryInfo) =>
  dispatch => {
    const result = customQueryData(queryInfo)
    result
    .then(response => {
      if (!response) return console.log('Query results undefined.')
      dispatch(queriedTable(response))
    })
    .catch(err => console.log(err))
  }

export const resetQueriedTable = () =>
  dispatch => {
    dispatch(resetQueriedTables())
  }
/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case QUERIED_TABLE:
      return action.table
    case RESET_QUERIED_TABLE:
      return []
    default:
      return state
  }
}
