import { http } from '../../utils/http.js'

let methods = {

  onImageTap: function (e) {
    let page = getCurrentPages().pop()
    page.setData({
      'swiperImagesEditor.delImageIndex': -1
    })
    let index = e.currentTarget.dataset.index
    let images = page.data.swiperImagesEditor.images

    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        if (index == -1) {
          index = images.length
          images.push('')
        }
        wx.showNavigationBarLoading()
        http.cosUpload({
          source: tempFilePath,
          target: Date.now()
        }).then(function (res) {
          if (res.errno === 0) {
            images[index] = res.url
            page.setData({
              'swiperImagesEditor.images': images,
            })
            wx.hideNavigationBarLoading()
            self.imagesChanged = true
            self.onImagesChanged && self.onImagesChanged(images)
          }
        })
      }
    })
  },

  onImageDel: function (e) {
    let page = getCurrentPages().pop()
    let index = e.currentTarget.dataset.index
    let images = page.data.swiperImagesEditor.images
    images.splice(index, 1)
    page.setData({
      'swiperImagesEditor.images': images,
      'swiperImagesEditor.delImageIndex': -1
    })
    this.imagesChanged = true
    this.onImagesChanged && this.onImagesChanged(images)
  },

  onImageLongPress: function (e) {
    let page = getCurrentPages().pop()
    let index = e.currentTarget.dataset.index
    page.setData({
      'swiperImagesEditor.delImageIndex': index
    })
    clearTimeout(this.delImageTimer)
    this.delImageTimer = setTimeout(function () {
      page.setData({
        'swiperImagesEditor.delImageIndex': -1
      })
    }, 5000)
  }

}

export class SwiperImagesEditor {

  constructor(options) {
    this.delImageTimer = null
    this.imagesChanged = options.imagesChanged || false
    this.onImagesChanged = options.onImagesChanged || null

    let page = getCurrentPages().pop()
    let swiperImagesEdiotr = {
      delImageIndex: -1,
      images: options.images || [],
      maxImagesLength: options.maxImagesLength || 5
    }
    page.setData({
      swiperImagesEditor: swiperImagesEdiotr
    })

    for (let key in methods) {
      page['swiperImagesEditor.' + key] = methods[key].bind(this)
      page.setData({
        ['swiperImagesEditor.' + key]: 'swiperImagesEditor.' + key
      })
    }
  }

}