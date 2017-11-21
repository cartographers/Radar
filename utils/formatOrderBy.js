const formatOrderBy = (orderOptions) => {
  if (!orderOptions) return ''
  let [orderCondition, orderCol] = orderOptions
  if (orderCondition === 'Ascending') orderCondition = 'ASC'
  else if (orderCondition === 'Descending') orderCondition = 'DESC'
  else return ''
  if (!orderCol || orderCol == 'Make a choice' ) return ''
  return 'ORDER BY ' + orderCol + ' ' + orderCondition
}

export default formatOrderBy
