
const joinTables = (settings) => {
  let foreignKeysArray = settings.foreignKeys
  if (foreignKeysArray !== undefined) {
    foreignKeysArray = foreignKeysArray.map(key => {
      return 'JOIN ' + key.foreign_table_name + ' ON ' + key.table_name + '."' + key.column_name + '"' + ' = ' + key.foreign_table_name + '."' + key.foreign_column_name + '"'
    })
    foreignKeysArray = foreignKeysArray.join(' ').trim()
  }
  return foreignKeysArray || ''
}

export default joinTables
