import { Loading } from '../../template/loading/loading.js'
import { Shop } from '../../utils/shop.js'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    youImageMode: app.youImageMode,
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

  onShopUpdate: function (shop) {
    this.setData({
      shop: shop
    })
    wx.setNavigationBarTitle({
      title: shop.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.listener.on('shop', this.onShopUpdate)
    this.loading = new Loading()
    this.loading.show()
    let page = this
    Shop.get().then(function (shop) {
      page.setData({
        shop: shop,
        ready: true,
      })
      wx.setNavigationBarTitle({
        title: shop.name
      })
      page.loading.hide()
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
    Shop.get({ nocache: true })
      .then(function (shop) {
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