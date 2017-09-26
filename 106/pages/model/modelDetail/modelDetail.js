let config = require('../../../utils/config.js')
import { Model } from '../../../utils/model.js'
import { models } from '../model.data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: config.imagesUrl
  },

  onSwiperChange: function (e) {
    let current = e.detail.current
    wx.setNavigationBarTitle({
      title: '样板房 - ' + models[current].title
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    Model.get({ models: 'models' })
      .then(function (res) {
        if (res === 'models') {
          let current = -1
          for (let i in models) {
            if (models[i].id == id) {
              current = i
              break
            }
          }
          wx.setNavigationBarTitle({
            title: '样板房 - ' + models[current].title
          })
          this.setData({
            current: current,
            models: models,
            ready: true
          })
        }
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