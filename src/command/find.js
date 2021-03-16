const request = require('../request')

module.exports = async ([serverName, name]) => {
  return request(serverName, '/api/v2/torrents/info')
    .then(({ data }) => {
      const result = data.find(item => item.name.includes(name))
      return result ? result.hash : 'no result found'
    })
    .catch(err => {
      return err
    })
}
