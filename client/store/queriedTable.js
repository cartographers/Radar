import {queryData, customQueryData} from '../../utils/connectDB'
/**
 * ACTION TYPES
 */
export const QUERIED_TABLE = 'QUERIED_TABLE'


/**
 * ACTION CREATORS
 */

const queriedTable = table => ({type: QUERIED_TABLE, table})

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
      dispatch(queriedTable(response))
    })
    .catch(err => console.log(err))
  }

/**
 * REDUCER
 */

export default function (state = [], action) {
  switch (action.type) {
    case QUERIED_TABLE:
      return action.table
    default:
      return state
  }
}
