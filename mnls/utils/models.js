import { http } from 'http.js'

let app = getApp()

function getModels(options = {}) {
  return new Promise(function (resolve, reject) {
    let models = app.models
    if (models && !options.nocache) {
      resolve(app.models)
    } else {
      http.get({
        url: 'cz/models2.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let models = res.models
          for (let i in models) {
            models[i].images = JSON.parse(models[i].images)
            models[i].descs = JSON.parse(models[i].descs)
          }
          app.models = models
          resolve(models)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function getModelsSync() {
  return app.models
}

function getModel(options) {
  let id = options.id
  let models = app.models
  for (let i in models) {
    if (models[i].id == id) {
      return models[i]
    }
  }
}

function setModel(model) {
  return new Promise(function (resolve, reject) {

    /* app.models */
    let models = app.models
    let index = -1
    for (let i in models) {
      if (models[i].id == model.id) {
        index = i
        models[i] = model
      }
    }
    if (index < 0) {
      index = models.length
      models.push(model)
    }

    if (app.user.role == 'admin') {
      http.post({
        url: 'cz/models2.php?m=set',
        data: {
          id: model.id,
          title: model.title,
          images: JSON.stringify(model.images),
          descs: JSON.stringify(model.descs),
          sort: model.sort
        }
      }).then(function (res) {
        if (res.errno === 0) {
          resolve(res)
          if (res.insertId) {
            model.id = res.insertId
          }
          app.listener.trigger('models', models)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    } else {
      if (model.id == '') {
        models[index].id = -1
      }
      app.listener.trigger('models', models)
    }
  })
}

function delModel(model) {
  let id = model.id
  let models = app.models
  for (let i in models) {
    if (models[i].id == id) {
      models.splice(i, 1)
      break
    }
  }
  app.listener.trigger('models', models)

  /* server start */
  if (app.user.role == 'admin') {
    http.get({
      url: 'cz/models2.php?m=del',
      data: model
    })
  }
  /* server end */
}

function sortModel(models) {
  for (let i in models) {
    let id = models[i].id
    for (let j in app.models) {
      if (app.models[j].id == id) {
        if (i != j) {
          if (app.user.role == 'admin') {
            http.get({
              url: 'cz/models2.php?m=set',
              data: { id, sort: i }
            })
          }
        }
        break
      }
    }
  }

  /* app.models */
  app.models = models
  app.listener.trigger('models', models)
}

export var Models = {
  getModels: getModels,
  getModelsSync: getModelsSync,
  get: getModel,
  set: setModel,
  del: delModel,
  sort: sortModel,
}