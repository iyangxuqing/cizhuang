let config = require('../../../utils/config.js')
import { http } from '../../../utils/http.js'
import { Shop } from '../../../utils/shop.js'

let app = getApp()

let hasChanged = false

Page({

  data: {
    youImageMode: config.youImageMode,

    shop: {
      latitude: 29.26948,
      longitude: 120.05691,
    },
  },

  onShopNameBlur: function (e) {
    let name = e.detail.value
    let oldName = this.data.shop.Name
    if (name != oldName) {
      this.setData({
        'shop.name': name
      })
      hasChanged = true
    }
  },

  onShopPhoneBlur: function (e) {
    let phone = e.detail.value
    let oldPhone = this.data.shop.phone
    if (phone != oldPhone) {
      this.setData({
        'shop.phone': phone
      })
      hasChanged = true
    }
  },

  onShopAddressBlur: function (e) {
    let address = e.detail.value
    let oldAddress = this.data.shop.address
    if (address != oldAddress) {
      this.setData({
        'shop.address': address
      })
      hasChanged = true
    }
  },

  chooseImage: function (cb) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0]
        wx.showNavigationBarLoading()
        http.cosUpload({
          source: tempFilePath,
          target: Date.now()
        }).then(function (res) {
          if (res.errno === 0) {
            cb && cb(res.url)
            wx.hideNavigationBarLoading()
          }
        })
      },
    })
  },

  onShopLogoTap: function (e) {
    let page = this
    page.chooseImage(function (image) {
      page.setData({
        'shop.logo': image
      })
      hasChanged = true
    })
  },

  onShopImageTap: function (e) {
    let index = e.currentTarget.dataset.index
    let page = this
    let images = page.data.shop.images
    page.chooseImage(function (image) {
      images[index] = image
      page.setData({
        'shop.images': images
      })
      hasChanged = true
    })
  },

  onAddressMapTap: function (e) {
    let page = this
    wx.chooseLocation({
      success: function(res){
        let latitude = res.latitude
        let longitude = res.longitude
        page.setData({
          'shop.latitude': latitude,
          'shop.longitude': longitude,
        })
        hasChanged = true
      }
    })    
  },

  saveShop: function () {
    if (hasChanged) {
      let shop = this.data.shop
      Shop.set(shop)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    Shop.get().then(function (shop) {
      page.setData({
        shop: shop,
        ready: true,
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
    this.saveShop()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveShop()
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