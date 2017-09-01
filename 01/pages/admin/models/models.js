import { http } from '../../../utils/http.js'
import { Models } from '../../../utils/models.js'
import { Resource } from '../../../utils/resource.js'
import { Loading } from '../../../template/loading/loading.js'
import { SwiperImagesEditor } from '../../../template/swiperImagesEditor/swiperImagesEditor.js'

let touchPositionX = 0
let touchPositionY = 0
let modelDeleteTimer = null
let app = getApp()

Page({

  data: {
    deleteId: -1,
    moving: {
      top: 0,
      left: 0,
      model: {},
      sourceIndex: -1,
      targetIndex: -1,
      display: 'none',
    },
    youImageMode: '',
  },

  touchstart: function (e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let row = Math.floor(index / 3)
    let col = index % 3
    let offsetLeft = col * 110
    let offsetTop = row * 140
    touchPositionX = x - offsetLeft
    touchPositionY = y - offsetTop

    let models = this.data.models
    this.data.moving.sourceIndex = index
    this.data.moving.model = models[index]
    this.setData({
      deleteId: -1
    })
  },

  touchmove: function (e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    let left = x - touchPositionX
    let top = y - touchPositionY

    let row = Math.round(top / 140)
    let col = Math.round(left / 110)
    if (col < 0) col = 0
    if (col > 2) col = 2
    let targetIndex = row * 3 + col

    let moving = this.data.moving
    moving.top = top
    moving.left = left
    moving.display = 'block'
    moving.targetIndex = targetIndex
    this.setData({
      moving: moving
    })
  },

  touchend: function (e) {
    let moving = this.data.moving
    let model = moving.model
    let sourceIndex = moving.sourceIndex
    let targetIndex = moving.targetIndex
    let models = Models.sort(model, sourceIndex, targetIndex)
    moving.display = 'none'
    moving.sourceIndex = -1
    moving.targetIndex = -1
    this.setData({
      models: models,
      moving: moving,
    })
  },

  onModelLongPress: function (e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      deleteId: id
    })
    clearTimeout(modelDeleteTimer)
    modelDeleteTimer = setTimeout(function () {
      this.setData({
        deleteId: -1
      })
    }.bind(this), 5000)
  },

  onModelDel: function (e) {
    let id = e.currentTarget.dataset.id
    let models = Models.del({ id })
    this.setData({
      models: models
    })
  },

  onModelTap: function (e) {
    let id = e.currentTarget.dataset.id
    let models = this.data.models
    this.setData({
      deleteId: -1
    })
    wx.navigateTo({
      url: '../model/model?id=' + id,
    })
  },

  onModelsUpdate: function (models) {
    this.setData({
      models: models
    })
  },

  loadModels: function () {
    let page = this
    page.loading.show()
    Models.getModels()
      .then(function (models) {
        page.setData({
          models,
          ready: true,
        })
        page.loading.hide()
      })
  },

  onImagesChanged: function (images) {
    Resource.set({
      key: 'homeHeadImages',
      value: JSON.stringify(images),
    })
  },

  onHomeSloganBlur: function (e) {
    let value = e.detail.value
    value = value.replace("'", "")
    value = value.replace("\\", "")
    let homeSlogan = value
    Resource.set({
      key: 'homeSlogan',
      value: homeSlogan,
    })
  },

  onHomeLogoTap: function (e) {
    let page = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        wx.showNavigationBarLoading()
        http.cosUpload({
          source: tempFilePath,
          target: Date.now()
        }).then(function (res) {
          if (res.errno === 0) {
            let homeLogo = res.url
            page.setData({
              homeLogo: homeLogo
            })
            Resource.set({
              key: 'homeLogo',
              value: homeLogo
            })
            wx.hideNavigationBarLoading()
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()

    let page = this
    Resource.get().then(function (resource) {
      let homeHeadImages = JSON.parse(resource['homeHeadImages']) || []
      let homeSlogan = resource['homeSlogan']
      let homeLogo = resource['homeLogo']
      page.swiperImagesEditor = new SwiperImagesEditor({
        images: homeHeadImages,
        imagesChanged: false,
        onImagesChanged: page.onImagesChanged,
      })
      page.setData({
        homeSlogan: homeSlogan,
        homeLogo: homeLogo,
      })
    })

    app.listener.on('models', this.onModelsUpdate)
    this.loadModels()
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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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