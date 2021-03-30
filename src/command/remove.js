const request = require('../request')
const arg = require('arg')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '-h': String,
    '-p': Boolean,
    '--server': '-s',
    '--hash': '-h',
    '--presrveFiles': '-p'
  }, {
    argv
  })

  return request(args['-s'], '/api/v2/torrents/delete', {
    hashes: args['-h'],
    deleteFiles: !args['-p']
  })
    .then(result => {
      return result.status
    })
    .catch(err => {
      return err
    })
}
