let config = require('../../../utils/config.js')
import { http } from '../../../utils/http.js'
import { Models } from '../../../utils/models.js'
import { modelHead } from '../model.data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: config.imagesUrl,
    youImageMode: config.youImageMode,
  },

  onImageTap: function (e) {
  },

  onImageLongPress: function (e) {
    let type = e.currentTarget.dataset.type
    let index = e.currentTarget.dataset.index
    wx.chooseImage({
      count: 1,
      sizeType: 'compressed',
      success: function (res) {
        let source = res.tempFilePaths[0]
        let target = type + '-' + index
        http.cosUpload({
          source,
          target,
        }).then(function (res) {
        })
      },
    })
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../modelDetail/modelDetail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Models.getModels().then(function (models) {
      this.setData({
        modelHead,
        models,
        ready: true
      })
    }.bind(this))
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
    Models.getModels({ nocache: true })
      .then(function (models) {
        this.setData({
          modelHead,
          models,
          ready: true
        })
        wx.stopPullDownRefresh()
      }.bind(this))
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