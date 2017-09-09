let config = require('config.js')

function get(options) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.apiUrl + options.url,
      header: {
        'sid': config.sid,
        'ver': config.version,
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('token'),
      },
      data: escape(options.data),
      success: function (res) {
        if (res.data && res.data.errno === 0) {
          resolve(unescape(res.data))
        } else {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

function post(options) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: config.apiUrl + options.url,
      method: 'POST',
      header: {
        'sid': config.sid,
        'ver': config.version,
        "Content-Type": "application/x-www-form-urlencoded",
        'token': wx.getStorageSync('token'),
      },
      data: escape(options.data),
      success: function (res) {
        if (res.data && res.data.errno === 0) {
          resolve(unescape(res.data))
        } else {
          reject(res)
        }
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

function escape(object) {
  if (!object) return
  let obj = JSON.stringify(object, function (key, value) {
    if (typeof value == 'string') {
      value = value.replace(/'/g, "u0027")
    }
    return value
  })
  return JSON.parse(obj)
}

function unescape(object) {
  if (!object) return
  let obj = JSON.stringify(object, function (key, value) {
    if (typeof value == 'string') {
      value = value.replace(/u0027/g, "'")
    }
    return value
  })
  return JSON.parse(obj)
}

/**
 * options = {
 *  source: source,
 *  target: target,
 * }
 */
function cosUpload(options) {
  return new Promise(function (resolve, reject) {
    let source = options.source
    let extension = source.split('.').pop()
    let target = config.sid + '/' + options.target + '.' + extension
    http.get({
      url: 'cz/cos.php?m=signature',
      data: { filename: target }
    }).then(function (res) {
      if (res.errno === 0) {
        let url = res.url
        let sign = res.multi_signature
        wx.uploadFile({
          url: url,
          name: 'filecontent',
          filePath: source,
          header: {
            Authorization: sign,
          },
          formData: {
            op: 'upload',
            insertOnly: 0,
          },
          success: function (res) {
            if (res.statusCode == 200) {
              let data = JSON.parse(res.data)
              if (data.message && data.message == 'SUCCESS') {
                let url = config.youImageHost + target
                resolve({
                  url,
                  target,
                  errno: 0,
                  error: '',
                })
              } else {
                reject(res)
              }
            }
          },
          fail: function (res) {
            reject(res)
          }
        })
      }
    })
  })
}

/**
 * options = {
 *  filename: filename
 * }
 */
function cosDelete(options) {
  return new Promise(function (resolve, reject) {
    http.get({
      url: 'cz/cos.php?m=signature',
      data: {
        filename: options.filename
      }
    }).then(function (res) {
      let url = res.url
      let sign = res.once_signature
      wx.request({
        url: url,
        header: {
          'Authorization': sign,
        },
        method: 'POST',
        data: { op: "delete" },
        success: function (res) {
          if (res.statusCode === 200) {
            let data = res.data
            if (data.message && data.message === 'SUCCESS') {
              resolve({ errno: 0, error: '' })
            }
          }
        },
      })
    })
  })
}

export var http = {
  get: get,
  post: post,
  cosUpload: cosUpload,
  cosDelete: cosDelete,
  escape: escape,
  unescape: unescape,
}