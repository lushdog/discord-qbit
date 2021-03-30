const Discord = require('discord.js')
const path = require('path')
const client = new Discord.Client()
const RUN_ENV = process.env.RUN_ENV
const configPath = path.join(__dirname, RUN_ENV === 'docker' ? '../../config/config.json' : '../config.json')
const { clientToken } = require(configPath)
const handleMessage = require('./handleMessage')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async msg => {
  if (msg.content.startsWith('!')) {
    const result = await handleMessage(msg).catch(err => `error: ${err.toString()}`)
    if (result) {
      if (Array.isArray(result)) {
        console.log(result[0])
        result.length ? result.forEach(text => msg.reply(text)) : msg.reply('no torrent found')
      } else {
        msg.reply(result)
      }
    } else {
      msg.reply('Oops, no cmmond!')
    }
  } else {
  }
})

// client.on('messageReactionAdd', (msg) => {
//   if (sg._emoji.name === '🍴') {
    
//   }
// })

client.login(clientToken)
