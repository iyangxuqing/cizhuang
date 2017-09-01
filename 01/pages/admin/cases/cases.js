let config = require('../../../utils/config.js')
import { Anlis } from '../../../utils/anlis.js'

let touch = {}
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagesUrl: config.imagesUrl
  },

  touchstart: function (e) {
    touch.id = e.currentTarget.dataset.id
    touch.x1 = e.touches[0].clientX;
    touch.y1 = e.touches[0].clientY;
    touch.t1 = e.timeStamp;
    touch.x2 = e.touches[0].clientX;
    touch.y2 = e.touches[0].clientY;
    touch.t2 = e.timeStamp;
  },

  touchmove: function (e) {
    touch.x2 = e.touches[0].clientX;
    touch.y2 = e.touches[0].clientY;
    touch.t2 = e.timeStamp;
  },

  touchend: function (e) {
    touch.t2 = e.timeStamp
    let dx = touch.x2 - touch.x1
    let dy = touch.y2 - touch.y1
    let dt = touch.t2 - touch.t1
    if ((Math.abs(dy) < Math.abs(dx) / 2 && dt < 250)) {
      if (dx < -20) this.onSwipeLeft(touch.id)
      if (dx > 20) this.onSwipeRight(touch.id)
    }
  },

  onSwipeLeft: function (id) {
    this.setData({
      swipeLeftId: id
    })
  },

  onSwipeRight: function (id) {
    this.setData({
      swipeLeftId: ''
    })
  },

  onAnliAdd: function (e) {
    wx.navigateTo({
      url: '../case/case',
    })
  },

  onAnliTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../case/case?id=' + id
    })
  },

  onItemDelete: function (e) {
    let id = e.currentTarget.dataset.id
    let anlis = Anlis.del({ id })

    let _anlis = []
    let length = anlis.length
    for (let i in anlis) {
      _anlis[i] = anlis[length - i - 1]
    }
    anlis = _anlis

    this.setData({
      swipeLeftId: '',
      anlis: anlis
    })
  },

  onItemSortUp: function (e) {
    let id = e.currentTarget.dataset.id
    let down = true //倒序
    let anlis = Anlis.sort({ id }, down)

    let _anlis = []
    let length = anlis.length
    for (let i in anlis) {
      _anlis[i] = anlis[length - i - 1]
    }
    anlis = _anlis

    this.setData({
      swipeLeftId: '',
      anlis: anlis
    })
  },

  onItemSortDown: function (e) {
    let id = e.currentTarget.dataset.id
    let down = false //倒序
    let anlis = Anlis.sort({ id }, down)

    let _anlis = []
    let length = anlis.length
    for (let i in anlis) {
      _anlis[i] = anlis[length - i - 1]
    }
    anlis = _anlis

    this.setData({
      swipeLeftId: '',
      anlis: anlis
    })
  },

  onAnlisUpdate: function (anlis) {
    this.loadAnlis({
      success: function (anlis) {
        this.setData({
          anlis
        })
      }.bind(this)
    })
  },

  loadAnlis: function (options) {
    Anlis.getAnlis()
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
    app.listener.on('anlis', this.onAnlisUpdate)
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