let config = require('../../../utils/config.js')
import { Anlis } from '../../../utils/anlis.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    youImageMode: config.youImageMode
  },

  onAnliTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../caseDetail/caseDetail?id=' + id
    })
  },

  loadAnlis: function (options = {}) {
    Anlis.getAnlis(options)
      .then(function (anlis) {
        for (let i in anlis) {
          let last = {
            time: '',
            desc: '',
            images: []
          }
          if (anlis[i].process.length) last = anlis[i].process[0]
          anlis[i].time = last.time
          anlis[i].desc = last.desc
          anlis[i].image = ''
          if (last.images.length) anlis[i].image = last.images[0]
        }

        let _anlis = []
        let length = anlis.length
        for (let i in anlis) {
          _anlis[i] = anlis[length - i - 1]
        }
        anlis = _anlis

        options.success && options.success(anlis)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadAnlis({
      success: function (anlis) {
        this.setData({
          anlis,
          ready: true
        })
      }.bind(this)
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
    this.loadAnlis({
      nocache: true,
      success: function (anlis) {
        this.setData({
          anlis
        })
        wx.stopPullDownRefresh()
      }.bind(this)
    })
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