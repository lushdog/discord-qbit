const { getMessageEmbed, formatTorrent } = require('./utils')
const add = require('./command/add')
const list = require('./command/list')
const remove = require('./command/remove')
const find = require('./command/find')
const info = require('./command/info')
const purge = require('./command/purge')
const stats = require('./command/stats')
const tag = require('./command/tag')

const commands = {
  '!add': async param => {
    const result = await add(param).catch(err => err)
    return result === 200 ? `add torrrent successfully～` : `fail to add torrent: ${err}`
  },
  '!list': async param => {
    const listTorrents = await list(param)
    return Array.isArray(listTorrents) ? listTorrents.map(item => getMessageEmbed(formatTorrent(item), item.name)) : listTorrents
  },
  '!find': async param => await find(param),
  '!remove': async param => {
    const result = await remove(param).catch(err => err)
    return result === 200 ? `delete torrent successfully～` : `fail to delete torrent`
  },
  '!info': async param => await info(param),
  '!purge': async param => await purge(param),
  '!stats': async param => await stats(param),
  '!tag': async param => await tag(param),
}

module.exports =  async ({ content }) => {
  console.log(`reciving msg: ${content}`)
  const param = content.split(' ').slice(1)
  const cmd = content.split(' ')[0]
  if (commands[cmd]) {
    return commands[cmd](param)
  } else {
    return `not found: ${cmd}`
  }
}
