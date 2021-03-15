const axios = require('axios')
const serverConfig = require('../config.json')
const { getClient } = require('./utils')
const Axios = {}

const request = async (serverName, url, params = {}) => {
  if (Axios[serverName]) {
    return Axios[serverName].get(url, { params })
    .then(res => res)
    .catch(async err => {
      if (err.response && err.response.status === 403) {
        const axionInstace = await getClient(serverConfig[serverName])
        Axios[serverName] = axionInstace
        return request(serverName, url, params)
      } else {
        return Promise.reject(err)
      }
    })
  } else {
    const axionInstace = await getClient(serverConfig[serverName])
    Axios[serverName] = axionInstace
    return request(serverName, url, params)
  }
}

module.exports = async (serverName, url, params) => {
  return request(serverName, url, params)
}
