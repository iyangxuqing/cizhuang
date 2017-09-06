let config = require('../../utils/config.js')
import { Shop } from '../../utils/shop.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    youImageMode: config.youImageMode,
    // shop: {
    //   location: {
    //     latitude: 29.26948,
    //     longitude: 120.05691,
    //   },
    // },
  },

  onPhoneTap: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.shop.phone,
    })
  },

  onAddressTap: function (e) {
    wx.openLocation({
      name: this.data.shop.name,
      address: this.data.shop.address,
      latitude: this.data.shop.latitude,
      longitude: this.data.shop.longitude,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    Shop.get().then(function (shop) {
      shop.name = shop.name || '店铺名称'
      shop.phone = shop.phone || '联系电话'
      shop.address = shop.address || '店铺地址'
      page.setData({
        shop: shop,
        ready: true,
      })
      wx.setNavigationBarTitle({
        title: shop.name
      })
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
    let page = this
    Shop.get({ nochace: true })
      .then(function (shop) {
        shop.name = shop.name || '店铺名称'
        shop.phone = shop.phone || '联系电话'
        shop.address = shop.address || '店铺地址'
        page.setData({
          shop: shop,
          ready: true,
        })
        wx.setNavigationBarTitle({
          title: shop.name
        })
        wx.stopPullDownRefresh()
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