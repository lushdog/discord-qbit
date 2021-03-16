const request = require('../request')

module.exports = async ([serverName]) => {
  return request(serverName, '/api/v2/torrents/info')
    .then(({ data }) => {
      return data
    })
    .catch(err => {
      return err
    })
}
