let config = require('../../../utils/config.js')
import { Anlis } from '../../../utils/anlis.js'

Page({

  data: {
    youImageMode: config.youImageMode
  },

  onLoad: function (options) {
    let id = options.id
    let anli = {}
    let anlis = Anlis.getAnlisSync()
    for (let i in anlis) {
      if (anlis[i].id == id) {
        anli = anlis[i]
        break
      }
    }
    wx.setNavigationBarTitle({
      title: anli.subdistrict
    })
    this.setData({
      anli,
      ready: true
    })
  },

  onImageTap: function (e) {
    let imageIndex = e.currentTarget.dataset.imageIndex
    let processIndex = e.currentTarget.dataset.processIndex
    let images = this.data.anli.process[processIndex].images
    let urls = images.map(function (image) {
      return image + config.youImageMode
    })
    let current = images[imageIndex] + config.youImageMode
    wx.previewImage({
      current: current,
      urls: urls,
    })
  }

})