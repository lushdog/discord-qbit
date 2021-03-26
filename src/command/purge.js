const request = require('../request')
const arg = require('arg')

module.exports = async (argv) => {
  const args = arg({
    '-t': String,
    '-u': String,
    '-n': String,
    '-f': String,
    '-s': String,
    '--tracker': '-t',
    '--speed': '-s',
    '--name': '-n',
    '--tag': String,
    '--filter': '-f',
    '--upspeed': '-u',
    '--server': '-s',
  }, {
    argv
  })

  const checkItem = torrent => {
    const name = args['-n']
    const tag = args['--tag']
    const speed = args['-u']
    const tracker = args['-t']
    let result = true
    if (name && !torrent.name.includes(name)) {
      result = false
    }
    if (tracker && !torrent.tracker.includes(tracker)) {
      result = false
    }
    if (tag && !torrent.tags.includes(tag)) {
      result = false
    }
    if (speed && (torrent.upspeed/1024/1024) >= Number(speed)) {
      result = false
    }
    return result
  }

  return request(args['-s'], '/api/v2/torrents/info', {
    filter: args['-f'] || 'completed'
  })
    .then(({ data }) => {
      const deleteTorrents = data.filter(item => checkItem(item))
      if (deleteTorrents.length) {
        const hashes = deleteTorrents.map(item => item.hash).join('|')
        const msg = 
        `Deleting these torrents ${deleteTorrents.map(item => item.name).join(',')} successfuly`
        return request(args['-s'], '/api/v2/torrents/delete', {
          hashes,
          deleteFiles: true
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
