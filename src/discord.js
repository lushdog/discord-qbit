const Discord = require('discord.js')
const client = new Discord.Client()
const { clientToken } = require('../config.json')
const handleMessage = require('./handleMessage')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  if (msg.content.startsWith('!')) {
    const result = await handleMessage(msg).catch(err => `error: ${JSON.stringify(err)}`)
    if (result) {
      if (Array.isArray(result)) {
        result.length ? result.forEach(text => msg.reply(text)) : msg.reply('no torrent found')
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
