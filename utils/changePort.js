let portSetting = 'postgres://localhost:5432/'
const changePort = (portNumber) => {
  portSetting = 'postgres://localhost:' + portNumber + '/'
}

export default changePort
