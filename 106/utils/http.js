let config = require('config.js')

function get(options) {
  return new Promise(function (resolve, reject) {

    let requestTask = wx.request({
      url: config.apiUrl + options.url,
      header: {
        'sid': config.sid,
        'ver': config.version,
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('token'),
      },
      data: options.data,
      success: function (res) {
        if (res.data && res.data.errno === 0) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      },
      complete: function (res) {
        clearTimeout(timer)
      }
    })

    let timer = setTimeout(function () {
      requestTask.abort()
      reject('30s timeout')
    }, 30000)

  })
}

export var http = {
  get: get,
}