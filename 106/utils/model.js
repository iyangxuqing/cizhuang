import { http } from 'http.js'

function getModels(options = {}) {
  return new Promise(function (resolve, reject) {
    http.get({
      url: 'cz/model.php?m=get',
      data: options
    }).then(function (res) {
      if (res.errno === 0) {
        resolve(res.data)
      } else {
        reject(res)
      }
    }).catch(function (res) {
      reject(res)
    })
  })
}

export var Model = {
  get: getModels
}