const serverConfig = require('../config.json')
const arg = require('arg')
const { getClient } = require('./utils')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '-u': String,
    '-l': String,
    '-t': String,
    '-c': String,
    '-p': Boolean,
    '--server': '-s',
    '--urls': '-u',
    '--upLimit': '-l',
    '--tags': '-t',
    '--cookie': '-c',
    '--paused': '-p'
  }, {
    argv
  })
  const client = await getClient(serverConfig[args['-s']])
  return client.get('/api/v2/torrents/add', {
    params: {
      urls: args['-u'],
      upLimit: args['-l'],
      paused: args['-p'],
      tags: args['-t'],
      cookie: args['-c'],
    }
  })
    .then(result => {
      // console.log(result)
      return result.status
    })
    .catch(err => {
      console.log(err)
      return err
    })
}
