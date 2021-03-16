// const api = require('qbittorrent-api-v2')
const axios = require('axios')
const discord = require('discord.js')

const format2GB = size => (size/1024/1024/1024).toFixed(2) + 'GB'
const format2MB = size => (size/1024/1024).toFixed(2) + 'MB/s'

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
    added_on,
    total_size
  } = torrent
  return {
    Hash: hash,
    Name: name,
    Tracker: tracker,
    Ratio: ratio.toFixed(2),
    Size: format2GB(size),
    Total_Size: format2GB(total_size),
    Up_Speed: format2MB(upspeed),
    Dl_Speed: format2MB(dlspeed),
    Uploaded: format2GB(uploaded),
    Downloaded: format2GB(downloaded),
    Progress: `${(progress * 100).toFixed(2)}%`,
    State: state,
    Time_Active: `${(time_active / 60 / 60).toFixed(2)}小时`,
    Up_Limit: up_limit,
    Time_ADD: new Date(added_on * 1000)
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

exports.format2GB = format2GB

exports.format2MB = format2MB
