import { Models } from '../../../utils/models.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.sid) wx.setStorageSync('sid', options.sid)
    let id = options.id
    Models.getModels().then(function (models) {
      let index = -1
      for (let i in models) {
        if (models[i].id == id) {
          index = i
          break
        }
      }
      this.setData({
        models: models,
        current: index,
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
    let sid = wx.getStorageSync('sid')
    return {
      path: '/pages/model/modelDetail/modelDetail?sid=' + sid
    }
  }
})