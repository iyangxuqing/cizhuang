import { http } from 'http.js'

let app = getApp()

function getModels(options = {}) {
  return new Promise(function (resolve, reject) {
    let models = app.models
    if (models && !options.nocache) {
      resolve(app.models)
    } else {
      http.get({
        url: 'cz/models.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let models = res.models
          for (let i in models) {
            models[i].images = JSON.parse(models[i].images)
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

function getModelsSync(){
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

function setModel(model, cb) {
  return new Promise(function (resolve, reject) {
    http.get({
      url: 'cz/models.php?m=set',
      data: model
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

function delModel(model) {
  let id = model.id
  let models = app.models
  for (let i in models) {
    if (models[i].id == id) {
      models.splice(i, 1)
      break
    }
  }

  /* server start */
  http.get({
    url: 'cz/models.php?m=del',
    data: model
  }).then(function (res) {
    if (res.errno === 0) {
      app.listener.trigger('models', models)
    }
  })
  /* server end */
  return models
}

function sortModel(model, sourceIndex, targetIndex) {
  let models = app.models
  if (sourceIndex < 0 || sourceIndex >= models.length) {
    return models
  }
  if (targetIndex < 0 || targetIndex >= models.length) {
    return models
  }
  models.splice(sourceIndex, 1)
  models.splice(targetIndex, 0, model)

  /* server start */
  for (let i in models) {
    if (models[i].sort != i) {
      models[i].sort = i
      http.get({
        url: 'cz/models.php?m=set',
        data: {
          id: models[i].id,
          sort: models[i].sort
        }
      }).then(function (res) {
        if (!res.error) {
          app.listener.trigger('models', models)
        }
      })
    }
  }
  /* server end */
  return models
}

export var Models = {
  getModels: getModels,
  getModelsSync: getModelsSync,
  get: getModel,
  set: setModel,
  del: delModel,
  sort: sortModel,
}