import { Coupons } from '../../../utils/coupons.js'
import { ListRowsEditor } from '../../../template/listRowsEditor/listRowsEditor.js'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    youImageMode: app.youImageMode
  },

  onCouponAdd: function (e) {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },

  onItemTap: function (item) {
    wx.navigateTo({
      url: '../coupon/coupon?id=' + item.id
    })
  },

  onItemDel: function (item) {
    Coupons.del(item)
  },

  onItemSort: function (items) {
    Coupons.sort(items)
  },

  onCouponsUpdate: function (coupons) {
    let page = this
    Coupons.getCoupons().then(function (coupons) {
      page.setData({
        'listRowsEditor.items': coupons
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    app.listener.on('coupons', this.onCouponsUpdate)
    Coupons.getCoupons().then(function (coupons) {
      page.listRowsEditor = new ListRowsEditor({
        items: coupons,
        onItemTap: page.onItemTap,
        onItemDel: page.onItemDel,
        onItemSort: page.onItemSort,
        itemTemplate: 'coupon',
      })
      page.setData({
        ready: true
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