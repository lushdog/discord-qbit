// const api = require('qbittorrent-api-v2')
const axios = require('axios')
const discord = require('discord.js')

exports.getClient = async ({ QBIT_HOST, QBIT_PORT, QBIT_USERNAME, QBIT_PASSWORD } = {}) => {
  if (!QBIT_HOST) {
    return Promise.reject('no server found')
  }
  const baseURL = `http://${QBIT_HOST}:${QBIT_PORT}`
  return axios.get(`${baseURL}/api/v2/auth/login`, {
    params: {
      username: QBIT_USERNAME,
      password: QBIT_PASSWORD
    }
  }).then(res => {
    return axios.create({
      baseURL,
      headers: {'Cookie': res.headers['set-cookie'][0]}
    })
  })
}

exports.getMessageEmbed = async (Msg, desc) => {
  const embed = new discord.MessageEmbed()
  embed.setDescription(desc)
  Object.entries(Msg).forEach(([key, value]) => {
    value !== '' && embed.addField(key, value, true)
  })
  return embed
}

exports.getMessageEmbed = (Msg, desc) => {
  const embed = new discord.MessageEmbed()
  embed.setDescription(desc)
  Object.entries(Msg).forEach(([key, value]) => {
    value !== '' && embed.addField(key, value, true)
  })
  return embed
}

exports.formatTorrent = (torrent) => {
  const {
    hash,
    name,
    tracker,
    ratio,
    upspeed,
    dlspeed,
    size,
    uploaded,
    downloaded,
    progress,
    state,
    time_active,
    up_limit,
    added_on
  } = torrent
  return {
    hash,
    名字: name,
    服务器: tracker,
    分享率: ratio,
    大小: `${(size/1024/1024/1024).toFixed(2)}GB`,
    上传速度: `${(upspeed/1024/1024).toFixed(2)}MiB/s`,
    下载速度: `${(dlspeed/1024/1024).toFixed(2)}MiB/s`,
    已上传: `${(uploaded/1024/1024/1024).toFixed(2)}GB`,
    已下载: `${(downloaded/1024/1024/1024).toFixed(2)}GB`,
    进度: `${progress * 100}%`,
    状态: state,
    活跃时间: `${(time_active / 60 / 60).toFixed(2)}小时`,
    上传速度限制: up_limit,
    添加时间: new Date(added_on * 1000)
  }
}

exports.getFilePriority = (fileList, targetSize) => {
  const newFileList = fileList.map((item, id) => Object.assign(item, { id }))
  newFileList.sort((a, b) => b.size - a.size)
  let totalSize = 0
  const dlList = []
  const notDlList = []
  for (const file of newFileList) {
    if ((totalSize + file.size) <= targetSize) {
      dlList.push(file.id)
      totalSize += file.size
    } else {
      notDlList.push(file.id)
    }
  }
  return { dlList, notDlList }
}

exports.sleep = time => new Promise((resolve) => setTimeout(resolve, time))
