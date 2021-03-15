const request = require('./request')
const arg = require('arg')
const { getFilePriority, sleep } = require('./utils')

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
    '--paused': '-p',
    '--part': String
  }, {
    argv
  })
  const server = args['-s']
  return request(server, '/api/v2/torrents/add', {
    urls: args['-u'],
    upLimit: args['-l'],
    paused: args['-p'],
    tags: args['-t'],
    cookie: args['-c'],
  })
    .then(async result => {
      if (args['--part']) {
        await sleep(10000)
        const { data: list } = await request(server, '/api/v2/torrents/info', {
          sort: 'added_on'
        })
        const { hash, total_size } = list[list.length - 1]
        const { data: files } = await request(server, '/api/v2/torrents/files', {
          hash
        })
        const targetSize = total_size * (args['--part'] / 100)
        const { notDlList, dlList } = getFilePriority(files, targetSize)
        if (dlList.length === 0) {
          return result.status
        } 
        await request(server, '/api/v2/torrents/filePrio', {
          hash, id: notDlList.join('|'), priority: 0
        })
        await sleep(3000)
        const resume = await request(server, '/api/v2/torrents/resume', {
          hashes: hash
        })
        return resume.status
      } else {
        return result.status
      }
    })
    .catch(err => {
      console.log(err)
      return err
    })
}
