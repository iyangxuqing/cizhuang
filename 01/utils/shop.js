import { http } from 'http.js'

let app = getApp()

function getShop(options = {}) {
  return new Promise(function (resolve, reject) {
    let shop = app.shop
    if (shop && !options.nocache) {
      resolve(app.shop)
    } else {
      http.get({
        url: 'cz/shop.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let shop = res.shop || {
            name: '',
            phone: '',
            address: '',
            logo: '',
            images: '[]',
            latitude: 29.26948,
            longitude: 120.05691,
          }
          shop.images = JSON.parse(shop.images)
          shop.latitude = Number(shop.latitude)
          shop.longitude = Number(shop.longitude)
          resolve(shop)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function setShop(shop, cb) {
  return new Promise(function (resolve, reject) {
    shop.images = JSON.stringify(shop.images)
    http.post({
      url: 'cz/shop.php?m=set',
      data: shop
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

export var Shop = {
  get: getShop,
  set: setShop,
}