import { http } from 'http.js'

let app = getApp()

function getResource(options = {}) {
  return new Promise(function (resolve, reject) {
    let resource = app.resource
    if (resource && !options.nocache) {
      resolve(app.resource)
    } else {
      http.get({
        url: 'cz/resource.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let resource = res.resource
          app.resource = resource
          resolve(resource)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function setResource(resource, cb) {
  return new Promise(function (resolve, reject) {
    http.post({
      url: 'cz/resource.php?m=set',
      data: resource
    }).then(function (res) {
      if (res.errno === 0) {
        resolve(res)
        cb && cb(res)
      } else {
        reject(res)
      }
    }).catch(function (res) {
      reject(res)
    })
  })
}

function delResource(resource) {
  return new Promise(function (resolve, reject) {
    http.post({
      url: 'cz/resource.php?m=del',
      data: resource
    }).then(function (res) {
      if (res.errno === 0) {
        resolve(res)
        cb && cb(res)
      } else {
        reject(res)
      }
    }).catch(function (res) {
      reject(res)
    })
  })
}

export var Resource = {
  get: getResource,
  set: setResource,
  del: delResource,
}