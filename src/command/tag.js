const request = require('../request')
const arg = require('arg')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '--server': '-s'
  }, {
    argv
  })
  const serverName = args['-s']
  return request(serverName, '/api/v2/torrents/info')
    .then(({ data }) => {
      const hashes = []
      for (torrent of data) {
        if (!torrent.tracker) {
          hashes.push(torrent.hash)
        }
        // const result = await request(serverName, '/api/v2/torrents/trackers', {
        //   hash: torrent.hash
        // })
        // const tracker = result.data.find(item => item.url === torrent.tracker)
        // if (tracker.status !== 2) {
        //   if (/unregistered|registered|found|remove/.test(tracker.msg)) {
        //     hashes.push(torrent.hash)
        //   }
        // }
      }
      if (hashes.length) {
        const msg = 
        `Add ${hashes.length} torrents tag successfuly`
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
