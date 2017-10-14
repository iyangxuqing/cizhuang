import { Anlis } from '../../../utils/anlis.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode
  },

  onImageTap: function (e) {
    let imageIndex = e.currentTarget.dataset.imageIndex
    let processIndex = e.currentTarget.dataset.processIndex
    let images = this.data.anli.process[processIndex].images
    // let urls = images.map(function (image) {
    //   return image + app.youImageMode
    // })
    let urls = images
    wx.previewImage({
      current: urls[imageIndex],
      urls: urls,
    })
  },

  onLoad: function (options) {
    let id = options.id
    let anli = {}
    let anlis = Anlis.getAnlisSync()
    for (let i in anlis) {
      if (anlis[i].id == id) {
        anli = anlis[i]
        break
      }
    }
    wx.setNavigationBarTitle({
      title: anli.subdistrict
    })
    this.setData({
      anli
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