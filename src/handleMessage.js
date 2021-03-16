const { getMessageEmbed, formatTorrent } = require('./utils.js')
const add = require('./command/add.js')
const list = require('./command/list.js')
const remove = require('./command/remove.js')
const find = require('./command/find.js')

const commands = {
  '!add': async param => {
    const result = await add(param).catch(err => err)
    return result === 200 ? `添加成功～` : `添加失败: ${err}`
  },
  '!list': async param => {
    const listTorrents = await list(param)
    return listTorrents.map(item => getMessageEmbed(formatTorrent(item), item.name))
  },
  '!find': async param => await find(param),
  '!remove': async param => {
    const result = await remove(param).catch(err => JSON.stringify(err))
    return result === 200 ? `删除${hashes}成功～` : `删除失败: ${err}`
  },
}

module.exports =  async ({ content }) => {
  console.log(`reciving msg: ${content}`)
  const param = content.split(' ').slice(1)
  const cmd = content.split(' ')[0]
  if (commands[cmd]) {
    commands[cmd](param)
  } else {
    return `${cmd}: not found`
  }
}
