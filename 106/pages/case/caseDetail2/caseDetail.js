let config = require('../../../utils/config.js')
import { Case } from '../../../utils/case.js'
import { cases } from '../case.data.js'

Page({

  data: {
    imagesUrl: config.imagesUrl
  },

  onLoad: function (options) {
    let id = options.id || 1001
    let _case = {}
    for (let i in cases) {
      if (cases[i].id == id) {
        _case = cases[i]
        break
      }
    }
    wx.setNavigationBarTitle({
      title: _case.subdistrict
    })
    this.setData({
      case: _case,
      ready: true
    })
  },

  onImageTap: function (e) {
    let index = e.currentTarget.dataset.index
    let pIndex = e.currentTarget.dataset.pIndex
    console.log(pIndex, index)
    let imagesUrl = this.data.imagesUrl
    let images = this.data.case.process[pIndex].images
    let image = images[index]
    image = imagesUrl + image
    images = images.map(function (image) {
      return imagesUrl + image
    })
    wx.previewImage({
      current: image,
      urls: images,
    })
  }

})