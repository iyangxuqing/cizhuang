let config = require('../../../utils/config.js')
import { Case } from '../../../utils/case.js'
import { cases } from '../case.data.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: config.imagesUrl
  },

  onCaseTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../caseDetail2/caseDetail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    Case.get({ cases: 'cases' })
      .then(function (res) {
        if (res === 'cases') {
          for (let i in cases) {
            let data = cases[i]
            let last = cases[i].process[cases[i].process.length - 1]
            cases[i].time = last.time.szTime()
            cases[i].desc = last.desc
          }
          this.setData({
            cases,
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