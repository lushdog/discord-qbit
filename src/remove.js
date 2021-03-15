const request = require('./request')

module.exports = async (serverName, hashes, deleteFiles = true) => {
  return request(serverName, '/api/v2/torrents/delete', {
    hashes,
    deleteFiles
  })
    .then(result => {
      return result.status
    })
    .catch(err => {
      return err
    })
}
