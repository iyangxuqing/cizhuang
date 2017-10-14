import { http } from 'http.js'

let app = getApp()

function getCustomers(options = {}) {
  return new Promise(function (resolve, reject) {
    http.get({
      url: 'cz/customer.php?m=get',
      data: {
        pageIndex: options.pageIndex || 0
      }
    }).then(function (res) {
      if (res.errno === 0) {
        app.customers = res.customers
        resolve(res.customers)
      } else {
        reject(res)
      }
    }).catch(function (res) {
      reject(res)
    })
  })
}

export var Customer = {
  get: getCustomers,
}