const addQuotes = (str) => {
  str = str.replace(/\'/g, '"')
  return /\"[A-Za-z1-9_]+\"/.test(str) ? str : '"' + str + '"'
}

export default addQuotes
