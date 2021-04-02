const request = require('../request')
const { URL } = require('url')
const arg = require('arg')
const { format2GB, format2MB } = require('../utils')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '-b': Boolean,
    '--server': '-s',
    '--brief': '-b'
  }, {
    argv
  })
  return request(args['-s'], '/api/v2/torrents/info')
    .then(({ data }) => {
      if (args['-b']) {
        let message = ''
        for (item of data) {
          const url = new URL(item.tracker)
          const torrentInfo = `name: ${item.name} ${(item.progress * 100).toFixed(2)}% dlspeed: ${format2MB(item.dlspeed)} upspeed: ${format2MB(item.upspeed)} ratio: ${item.ratio.toFixed(2)} uploaded: ${format2GB(item.uploaded)} tracker: ${url.host}\n`
          message += torrentInfo
        }
        return message
      } else {
        return data
      }
    })
    .catch(err => {
      return err
    })
}
