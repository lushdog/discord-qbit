const Discord = require('discord.js')
const client = new Discord.Client()
const { getMessageEmbed, formatTorrent } = require('./utils.js')
const { clientToken } = require('../config.json')
const add = require('./add.js')
const list = require('./list.js')
const remove = require('./remove.js')
const find = require('./find.js')

const handleMessage = async ({ content }) => {
  if (content.startsWith('!add')) {
    const result = await add(content.split(' ').slice(1)).catch(err => err)
    return result === 200 ? `添加成功～` : `添加失败: ${err}`
  }
  if (content.startsWith('!list')) {
    const [_, server] = content.split(' ')
    const listTorrents = await list(server)
    const embeds = listTorrents.map(item => getMessageEmbed(formatTorrent(item), item.name))
    return embeds
  }
  if (content.startsWith('!find')) {
    const [_, server, name] = content.split(' ')
    return await find(server, name)
  }
  if (content.startsWith('!remove')) {
    const [_, server, hashes, deleteFile] = content.split(' ')
    const result = await remove(server, hashes, deleteFile).catch(err => JSON.stringify(err))
    return result === 200 ? `删除${hashes}成功～` : `删除失败: ${err}`
  }
  return false
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  if (msg.content.startsWith('!')) {
    const result = await handleMessage(msg).catch(err => `error: ${JSON.stringify(err)}`)
    if (result) {
      if (Array.isArray(result)) {
        result.forEach(text => msg.reply(text))
      } else {
        msg.reply(result)
      }
    } else {
      msg.reply('Oops, 找不到该指令!')
    }
  } else {
  }
})

// client.on('messageReactionAdd', (msg) => {
//   if (sg._emoji.name === '🍴') {
    
//   }
// })

client.login(clientToken)
