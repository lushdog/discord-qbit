const request = require('../request')
const arg = require('arg')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '--server': '-s'
  }, {
    argv
  })
  return request(args['-s'], '/api/v2/torrents/info')
    .then(({ data }) => {
      return data
    })
    .catch(err => {
      return err
    })
}
