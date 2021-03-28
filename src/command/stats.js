const request = require('../request')
const arg = require('arg')
const { getMessageEmbed, format2GB } = require('../utils')

module.exports = async (argv) => {
  const args = arg({
    '-t': String,
    '-f': String,
    '-s': String,
    '--tracker': '-t',
    '--filter': '-f',
    '--server': '-s',
  }, {
    argv
  })
  return request(args['-s'], '/api/v2/torrents/info', {
    filter: args['-f'] || 'completed'
  })
    .then(({ data }) => {
      const list = args['-t'] ? data.filter(torrent => torrent.tracker.includes(args['-t'])) : data
      let upload = 0
      let download = 0
      let ratio = 0
      list.forEach(torrent => {
        download += torrent.size,
        upload += torrent.uploaded,
        ratio += torrent.ratio
      })
      return getMessageEmbed({
        total_torrents: list.length,
        total_upload: format2GB(upload),
        total_download: format2GB(download),
        total_ratio: (upload / download).toFixed(2),
        average_ratio: (ratio / list.length).toFixed(2)
      }, `${args['-s']} Status`)
    })
    .catch(err => {
      console.log(err)
      return err
    })
}
