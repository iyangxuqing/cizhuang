let config = require('../../../utils/config.js')
import { Model } from '../../../utils/model.js'
import { modelHead, models } from '../model.data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: config.imagesUrl
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
    Model.get({ models: 'models' })
      .then(function (res) {
        if (res == 'models') {
          this.setData({
            modelHead,
            models,
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