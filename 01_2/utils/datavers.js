import { http } from 'http.js'

let app = getApp()

function getDataVers(options = {}) {
  return new Promise(function (resolve, reject) {
    let datavers = app.datavers
    if (datavers && !options.nocache) {
      resolve(app.datavers)
    } else {
      http.get({
        url: 'cz/datavers.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let datavers = res.datavers
          app.datavers = datavers
          resolve(datavers)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

export var DataVers = {
  get: getDataVers
}