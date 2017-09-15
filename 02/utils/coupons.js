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

function setCoupon(coupon) {
  return new Promise(function (resolve, reject) {

    /* app.coupons */
    let coupons = app.coupons
    let index = -1
    for (let i in coupons) {
      if (coupons[i].id == coupon.id) {
        index = i
        coupons[i] = coupon
        break
      }
    }
    if (index < 0) {
      index = coupons.length
      coupons.push(coupon)
    }

    if (app.user.role == 'admin') {
      http.post({
        url: 'cz/coupons.php?m=set',
        data: coupon
      }).then(function (res) {
        if (res.errno === 0) {
          resolve(res)
          if (res.insertId) {
            coupon.id = res.insertId
          }
          app.listener.trigger('coupons', coupons)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    } else {
      if (coupon.id == '') {
        coupons[index].id = id
      }
      app.listener.trigger('coupons', coupons)
    }
  })
}

function delCoupon(coupon) {
  if(app.user.role=='admin'){
    http.get({
      url: 'cz/coupons.php?m=del',
      data: coupon
    })
  }

  /* app.coupons */
  let coupons = app.coupons
  let index = -1
  for (let i in coupons) {
    if (coupons[i].id == coupon.id) {
      index = i
      break
    }
  }
  coupons.splice(index, 1)
  app.listener.trigger('coupons', coupons)
}

function sortCoupon(coupons) {
  for (let i in coupons) {
    let id = coupons[i].id
    for (let j in app.coupons) {
      if (app.coupons[j].id == id) {
        if (i != j) {
          if (app.user.role == 'admin') {
            http.get({
              url: 'cz/coupons.php?m=set',
              data: { id, sort: i }
            })
          }
        }
        break
      }
    }
  }

  /* app.coupons */
  app.coupons = coupons
  app.listener.trigger('coupons', coupons)
}

export var Coupons = {
  getCoupons: getCoupons,
  getCouponsSync: getCouponsSync,
  get: getCoupon,
  set: setCoupon,
  del: delCoupon,
  sort: sortCoupon,
}