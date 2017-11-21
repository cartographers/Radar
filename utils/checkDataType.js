
const checkDataType = (whereSpec, fields) => {
  let newWhereSpec = whereSpec
  fields.forEach(field => {
    if ((field.tableName + ' ' + field.name) === whereSpec.col) {
      if (field.dataTypeID === 23 || field.dataTypeID === 21 || field.dataTypeID === 1700) newWhereSpec.spec = Number(whereSpec.spec)
      else {
        if (whereSpec.spec.charAt(0) === "'" && whereSpec.spec.charAt(whereSpec.spec.length - 1) === "'") newWhereSpec.spec = whereSpec.spec
        else newWhereSpec.spec = "'" + whereSpec.spec + "'"
      }
    }
  })
  return newWhereSpec
}

export default checkDataType
