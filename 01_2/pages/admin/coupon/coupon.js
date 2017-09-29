import { http } from '../../../utils/http.js'
import { Coupons } from '../../../utils/coupons.js'

let app = getApp()

Page({

  hasChanged: false,

  data: {
    youImageMode: app.youImageMode
  },

  onTitleBlur: function (e) {
    let title = e.detail.value
    let oldTitle = this.data.coupon.title
    if (title != oldTitle) {
      this.setData({
        'coupon.title': title
      })
      this.hasChanged = true
    }
  },

  onDescsBlur: function (e) {
    let descs = e.detail.value
    let oldDescs = this.data.coupon.descs
    if (descs != oldDescs) {
      this.setData({
        'coupon.descs': descs
      })
      this.hasChanged = true
    }
  },

  onNotesBlur: function (e) {
    let notes = e.detail.value
    let oldNotes = this.data.coupon.notes
    if (notes != oldNotes) {
      this.setData({
        'coupon.notes': notes
      })
      this.hasChanged = true
    }
  },

  onImageTap: function (e) {
    let page = this
    http.chooseImage().then(function (image) {
      page.setData({
        'coupon.image': image
      })
      page.hasChanged = true
    })


  },

  loadCoupon: function (id) {
    let coupon = {
      id: '',
      title: '',
      descs: '',
      notes: '',
      image: '',
      sort: 9999
    }
    if (id) {
      coupon = Coupons.get(id)
    }
    return coupon
  },

  saveCoupon: function () {
    if (this.hasChanged) {
      let coupon = this.data.coupon
      Coupons.set(coupon).then(function (res) {
        let coupons = Coupons.getCouponsSync()
        if (coupon.id) {
          for (let i in coupons) {
            if (coupons[i].id == coupon.id) {
              coupons[i] = coupon
              break
            }
          }
        } else {
          coupon.id = res.insertId
          coupons.push(coupon)
        }
        app.listener.trigger('coupons', coupons)
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let coupon = this.loadCoupon(options.id)
    this.setData({
      coupon: coupon
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
    this.saveCoupon()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveCoupon()
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