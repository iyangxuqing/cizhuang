let config = require('../../../utils/config.js')
import { Loading } from '../../../template/loading/loading.js'
import { Models } from '../../../utils/models.js'
import { Resource } from '../../../utils/resource.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    youImageMode: config.youImageMode,
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
    let page = this
    page.loading = new Loading()

    page.loading.show()
    Models.getModels().then(function (models) {
      Resource.get().then(function (resource) {
        let homeHeadImages = resource['homeHeadImages']
        homeHeadImages = JSON.parse(homeHeadImages) || []
        let homeSlogan = resource['homeSlogan']
        let homeLogo = resource['homeLogo']
        page.setData({
          homeHeadImages: homeHeadImages,
          homeSlogan: homeSlogan,
          homeLogo: homeLogo,
          models: models,
          ready: true,
        })
        page.loading.hide()
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
    Models.getModels({ nocache: true }).then(function (models) {
      Resource.get({ nocache: true }).then(function (resource) {
        let homeHeadImages = resource['homeHeadImages']
        homeHeadImages = JSON.parse(homeHeadImages) || []
        let homeSlogan = resource['homeSlogan']
        let homeLogo = resource['homeLogo']
        page.setData({
          homeHeadImages: homeHeadImages,
          homeSlogan: homeSlogan,
          homeLogo: homeLogo,
          models: models,
          ready: true,
        })
        wx.stopPullDownRefresh()
      })
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