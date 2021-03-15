const serverConfig = require('../config.json')
const { getClient } = require('./utils')

module.exports = async (serverName) => {
  const client = await getClient(serverConfig[serverName])
  return client.get('/api/v2/torrents/info')
    .then(({ data }) => {
      return data
    })
    .catch(err => {
      return err
    })
}
