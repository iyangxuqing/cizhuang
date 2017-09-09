import { Loading } from '../../../template/loading/loading.js'
import { http } from '../../../utils/http.js'
import { Models } from '../../../utils/models.js'

let delImageShowTimer = null
let hasChanged = false
let app = getApp()

Page({
  data: {
    model: {
      id: '',
      title: '',
      ctns: [],
    },
    delImageIndex: -1,
    youImageMode: '',
  },

  onImageTap: function (e) {

    this.setData({
      delImageIndex: -1
    })

    let index = e.currentTarget.dataset.index

    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        let images = that.data.model.images
        if (index == -1) {
          index = images.length
          images.push('')
        }

        // that.loading.show()
        wx.showNavigationBarLoading()
        http.cosUpload({
          source: tempFilePath,
          target: Date.now()
        }).then(function (res) {
          if (res.errno === 0) {
            images[index] = res.url
            that.setData({
              'model.images': images,
            })
            hasChanged = true
            // that.loading.hide()
            wx.hideNavigationBarLoading()
          }
        })
      }
    })
  },

  onImageLongPress: function (e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      delImageIndex: index
    })
    clearTimeout(delImageShowTimer)
    delImageShowTimer = setTimeout(function () {
      this.setData({
        delImageIndex: -1
      })
    }.bind(this), 5000)
  },

  onImageDel: function (e) {
    let index = e.currentTarget.dataset.index
    let images = this.data.model.images
    images.splice(index, 1)
    this.setData({
      'model.images': images,
      delImageIndex: -1,
    })
    hasChanged = true
    /**
     * 商品删除图片时，只在数据库中删除该图片链接，
     * 并不会立即将图片库中的图片删除，
     * 因为不光是删除图片，更换图片、删除商品等操作，
     * 都会产生大量的孤立图片，
     * 将这些孤立图片统一由后台删除，可以减低前端代码复杂度，
     * 另外，产品编辑的保存是滞后的，
     * 删除图片后，并未立即从图床上删除图片，
     * 在由于其他原因致使产品编辑未被保存时，产品图片依然有效。
     */
  },

  onTitleBlur: function (e) {
    let title = e.detail.value
    let oldTitle = this.data.model.title
    if (title == '' || title == oldTitle) {
      this.setData({
        'model.title': oldTitle
      })
    } else {
      this.setData({
        'model.title': title
      })
      hasChanged = true
    }
  },

  onDescsBlur: function (e) {
    let descs = e.detail.value
    let oldDescs = this.data.model.descs
    this.setData({
      'model.descs': descs
    })
    if(descs != oldDescs){
      hasChanged = true
    }
  },

  loadModel: function (options = {}) {
    let id = options.id
    let model = {
      id: '',
      title: '',
      images: [],
      descs: '',
      sort: 9999
    }
    if (id) {
      model = Models.get({ id })
    }
    return model
  },

  saveModel: function () {
    if (hasChanged) {
      let model = this.data.model
      Models.set(model, function (res) {
        let models = Models.getModelsSync()
        for (let i in models) {
          if (models[i].id == model.id) {
            models[i] = model
            break
          }
        }
        if (res.insertId) {
          model.id = res.insertId
          models.push(model)
        }
        app.listener.trigger('models', models)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    let model = this.loadModel(options)
    hasChanged = false
    this.setData({
      model: model,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function (e) {
    this.saveModel()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {
    this.saveModel()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})