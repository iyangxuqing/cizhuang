import { Resource } from '../../../utils/resource.js'
import { Models } from '../../../utils/models.js'
import { Anlis } from '../../../utils/anlis.js'
import { Shop } from '../../../utils/shop.js'
import { User } from '../../../utils/user.js'
import { Coupons } from '../../../utils/coupons.js'
import { DataVers } from '../../../utils/datavers.js'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  onDataVerTap: function (e) {
    let id = e.currentTarget.dataset.id
    let datavers = this.data.datavers
    let sid = ''
    for (let i in datavers) {
      if (datavers[i].id == id) {
        sid = datavers[i].sid
        datavers[i].active = 1
      } else {
        datavers[i].active = 0
      }
    }

    wx.setStorageSync('sid', sid)
    this.setData({ datavers })
    app.listener.trigger('dataver', sid)
  },

  onDataVerChanged: function (e) {
    delete app.resource
    delete app.models
    delete app.anlis
    delete app.shop
    delete app.user
    delete app.coupons
    Resource.get().then(function (resource) {
      app.listener.trigger('resource', resource)
    })
    Models.getModels().then(function (models) {
      app.listener.trigger('models', models)
    })
    Anlis.getAnlis().then(function (anlis) {
      app.listener.trigger('anlis', anlis)
    })
    Shop.get().then(function (shop) {
      app.listener.trigger('shop', shop)
    })
    User.getUser().then(function (user) {
      app.listener.trigger('user', user)
      app.user = Object.assign({}, app.user, user);
    })
    Coupons.getCoupons().then(function (coupons) {
      app.listener.trigger('coupons', coupons)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.listener.on('dataver', this.onDataVerChanged)
    let sid = wx.getStorageSync('sid')
    DataVers.get().then(function (datavers) {
      datavers[0].active = 1
      for (let i in datavers) {
        if (datavers[i].sid == sid) {
          datavers[i].active = 1
        } else {
          datavers[i].active = 0
        }
      }
      this.setData({
        datavers: datavers
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

  }
})