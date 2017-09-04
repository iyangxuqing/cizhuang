import { http } from 'http.js'

let app = getApp()

function getCoupons(options = {}) {
  return new Promise(function (resolve, reject) {
    let coupons = app.coupons
    if (coupons && !options.nocache) {
      resolve(app.coupons)
    } else {
      http.get({
        url: 'cz/coupons.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let coupons = res.coupons
          app.coupons = coupons
          resolve(coupons)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function getCouponsSync() {
  return app.coupons
}

function getCoupon(id) {
  let coupons = app.coupons
  for (let i in coupons) {
    if (coupons[i].id == id) {
      return coupons[i]
    }
  }
}

function setCoupon(coupon, cb) {
  return new Promise(function (resolve, reject) {
    http.post({
      url: 'cz/coupons.php?m=set',
      data: coupon
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

function delCoupon(coupon) {
  http.get({
    url: 'cz/coupons.php?m=del',
    data: coupon
  })

  /* app.coupons */
  let coupons = app.coupons
  let index = -1
  for(let i in coupons){
    if(coupons[i].id == coupon.id){
      index = i
      break
    }
  }
  coupons.splice(index, 1)
}

function sortCoupon(coupons) {
  for (let i in coupons) {
    if (coupons[i].sort != i) {
      coupons[i].sort = i
      http.get({
        url: 'cz/coupons.php?m=set',
        data: {
          id: coupons[i].id,
          sort: coupons[i].sort
        }
      })
    }
  }

  /* app.coupons */
  app.coupons = coupons
}

export var Coupons = {
  getCoupons: getCoupons,
  getCouponsSync: getCouponsSync,
  get: getCoupon,
  set: setCoupon,
  del: delCoupon,
  sort: sortCoupon,
}