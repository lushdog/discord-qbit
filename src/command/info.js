const request = require('../request')
const { getMessageEmbed, format2GB, format2MB } = require('../utils')
const arg = require('arg')

module.exports = async (argv) => {
  const args = arg({
    '-s': String,
    '--server': '-s'
  }, {
    argv
  })
  return request(args['-s'], '/api/v2/transfer/info')
    .then(({ data }) => {
      console.log(data)
      const {
        dl_info_data,
        dl_info_speed,
        up_info_data,
        up_info_speed
      } = data
      return getMessageEmbed({
        download_data: format2GB(dl_info_data),
        download_speed: format2MB(dl_info_speed),
        up_data: format2GB(up_info_data),
        up_speed: format2MB(up_info_speed),
      }, `${args['-s']} Status`)
    })
    .catch(err => {
      return err
    })
}
