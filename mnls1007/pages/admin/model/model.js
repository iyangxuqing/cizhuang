import { SwiperImagesEditor } from '../../../template/swiperImagesEditor/swiperImagesEditor.js'
import { Models } from '../../../utils/models.js'

let app = getApp()

Page({

  hasChanged: false,

  data: {
    youImageMode: app.youImageMode,
  },

  onTitleBlur: function (e) {
    let title = e.detail.value
    let oldTitle = this.data.model.title
    if (title != oldTitle) {
      this.setData({
        'model.title': title
      })
      this.hasChanged = true
    }
  },

  onDescsBlur: function (e) {
    let descs = e.detail.value
    let oldDescs = this.data.model.descs
    if (descs != oldDescs) {
      this.setData({
        'model.descs': descs
      })
      this.hasChanged = true
    }
  },

  onImagesChanged: function (images) {
    this.setData({
      'model.images': images
    })
    this.hasChanged = true
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
    if (this.hasChanged) {
      let model = this.data.model
      Models.set(model)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let model = this.loadModel(options)
    this.swiperImagesEditor = new SwiperImagesEditor({
      images: model.images,
      onImagesChanged: this.onImagesChanged,
      maxImagesLength: 9,
    })
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