const request = require('../request')
const arg = require('arg')
const { sleep } = require('../utils')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '--server': '-s'
  }, {
    argv
  })
  const serverName = args['-s']
  return request(serverName, '/api/v2/torrents/info')
    .then(async ({ data }) => {
      const hashes = []
      for (torrent of data) {
        if (!torrent.tracker) {
          hashes.push(torrent.hash)
        }
        const result = await request(serverName, '/api/v2/torrents/trackers', {
          hash: torrent.hash
        })
        const tracker = result.data.find(item => item.url === torrent.tracker)
        if (tracker.status !== 2) {
          hashes.push(torrent.hash)
        }
        await sleep(10)
      }
      if (hashes.length) {
        const msg = 
        `Found ${hashes.length} error torrents`
        return request(serverName, '/api/v2/torrents/addTags', {
          hashes: hashes.join('|'),
          tags: 'unregistered'
        })
          .then(() => {
            return msg
          })
          .catch(err => {
            return err
          })
      } else {
        return 'no macthed torrents'
      }
    })
    .catch(err => {
      return err
    })
}
