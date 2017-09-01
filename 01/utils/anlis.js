import { http } from 'http.js'

let app = getApp()

function getAnlis(options = {}) {
  return new Promise(function (resolve, reject) {
    let anlis = app.anlis
    if (anlis && !options.nocache) {
      resolve(app.anlis)
    } else {
      http.get({
        url: 'cz/anlis.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let anlis = res.anlis
          for (let i in anlis) {
            anlis[i].process = anlis[i].process.json()
          }
          app.anlis = anlis
          resolve(anlis)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function getAnlisSync() {
  return app.anlis
}

function getAnli(options) {
  let id = options.id
  let anlis = app.anlis
  for (let i in anlis) {
    if (anlis[i].id == id) {
      return anlis[i]
    }
  }
}

function setAnli(anli, cb) {
  return new Promise(function (resolve, reject) {
    let data = {
      id: anli.id,
      sid: anli.sid,
      sort: anli.sort,
      subdistrict: anli.subdistrict,
      houseAddress: anli.houseAddress,
      process: JSON.stringify(anli.process)
    }
    http.post({
      url: 'cz/anlis.php?m=set',
      data: data
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

function delAnli(anli) {
  let id = anli.id
  let anlis = app.anlis
  for (let i in anlis) {
    if (anlis[i].id == id) {
      anlis.splice(i, 1)
      break
    }
  }
  /* server start */
  http.get({
    url: 'cz/anlis.php?m=del',
    data: anli
  })
  /* server end */
  return anlis
}

function sortAnli(anli, down = false) {
  let anlis = app.anlis
  let id = anli.id

  let index = -1
  for (let i in anlis) {
    if (anlis[i].id == id) {
      index = i
      break
    }
  }
  let temp = anlis[index]
  if (down) {
    if (index < anlis.length - 1) {
      anlis[index] = anlis[Number(index) + 1]
      anlis[Number(index) + 1] = temp
    }
  } else {
    if (index > 0) {
      anlis[index] = anlis[index - 1]
      anlis[index - 1] = temp
    }
  }

  /* server start */
  for (let i in anlis) {
    if (anlis[i].sort != i) {
      anlis[i].sort = i
      http.get({
        url: 'cz/anlis.php?m=set',
        data: {
          id: anlis[i].id,
          sort: anlis[i].sort
        }
      })
    }
  }
  /* server end */
  return anlis
}

export var Anlis = {
  getAnlis: getAnlis,
  getAnlisSync: getAnlisSync,
  get: getAnli,
  set: setAnli,
  del: delAnli,
  sort: sortAnli,
}