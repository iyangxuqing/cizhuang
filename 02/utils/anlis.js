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
            anlis[i].process = JSON.parse(anlis[i].process)
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

function setAnli(anli) {
  return new Promise(function (resolve, reject) {

    /* app.anlis */
    let anlis = app.anlis
    let index = -1
    for (let i in anlis) {
      if (anlis[i].id == anli.id) {
        index = i
        anlis[i] = anli
        break
      }
    }
    if (index < 0) {
      index = anlis.length
      anlis.push(anli)
    }

    if (app.user.role == 'admin') {
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
          if (res.insertId) {
            anli.id = res.insertId
          }
          app.listener.trigger('anlis', anlis)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    } else {
      if (anli.id == '') {
        anlis[index].id = -1
      }
      app.listener.trigger('anlis', anlis)
    }
  })
}

function delAnli(anli) {
  if (app.user.role == 'admin') {
    http.get({
      url: 'cz/anlis.php?m=del',
      data: anli
    })
  }

  /* app.anlis */
  let anlis = app.anlis
  let index = -1
  for (let i in anlis) {
    if (anlis[i].id == anli.id) {
      index = i
      break
    }
  }
  anlis.splice(index, 1)
  app.listener.trigger('anlis', anlis)
}

function sortAnli(anlis) {
  for (let i in anlis) {
    let id = anlis[i].id
    for (let j in app.anlis) {
      if (app.anlis[j].id == id) {
        if (i != j) {
          if (app.user.role == 'admin') {
            http.get({
              url: 'cz/anlis.php?m=set',
              data: { id, sort: i }
            })
          }
        }
        break
      }
    }
  }

  /* app.anlis */
  app.anlis = anlis
  app.listener.trigger('anlis', anlis)
}

export var Anlis = {
  getAnlis: getAnlis,
  getAnlisSync: getAnlisSync,
  get: getAnli,
  set: setAnli,
  del: delAnli,
  sort: sortAnli,
}