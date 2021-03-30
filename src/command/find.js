const request = require('../request')
const arg = require('arg')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '-n': String,
    '--server': '-s',
    '--name': '-n'
  }, {
    argv
  })

  return request(args['-s'], '/api/v2/torrents/info')
    .then(({ data }) => {
      const result = data.find(item => item.name.includes(args['-n']))
      return result ? result.hash : 'no result found'
    })
    .catch(err => {
      return err
    })
}
