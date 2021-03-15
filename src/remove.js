const serverConfig = require('../config.json')
const { getClient } = require('./utils')

module.exports = async (serverName, hashes, deleteFiles = true) => {
  const client = await getClient(serverConfig[serverName])
  return client.get('/api/v2/torrents/delete', {
    params: {
      hashes,
      deleteFiles
    }
  })
    .then(result => {
      return result.status
    })
    .catch(err => {
      return err
    })
}
