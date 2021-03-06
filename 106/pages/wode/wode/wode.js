import { Loading } from '../../../template/loading/loading.js'
import { Toptip } from '../../../template/toptip/toptip.js'
import { Mobile } from '../../../template/mobile/mobile.js'
import { Listener } from '../../../utils/listener.js'
import { User } from '../../../utils/user.js'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons: [
      {
        image: 'http://122.226.60.90:8092/images/cizhuang/images/8.14/3.png?',
        title: '转发有礼',
        subtitle: '转发给朋友或者群可领取纸巾一盒',
        time: '有效期至2017-12-31',
      },
      {
        image: 'http://122.226.60.90:8092/images/cizhuang/images/8.14/4.png',
        title: '认证有礼',
        subtitle: '认证后即可领取礼品杯一个',
        time: '有效期至2017-12-31',
      },
      {
        image: 'http://122.226.60.90:8092/images/cizhuang/images/logo/s01.png',
        money: '¥100',
        title: '100元东鹏代金券',
        subtitle: '一次性购买大于2900元可用',
        time: '有效期至2017-12-31',
      },
      {
        image: 'http://122.226.60.90:8092/images/cizhuang/images/logo/s01.png',
        money: '¥200',
        title: '200元东鹏代金券',
        subtitle: '一次性购买大于5888元可用',
        time: '有效期至2017-12-31',
      },
      {
        image: 'http://122.226.60.90:8092/images/cizhuang/images/logo/s01.png',
        money: '¥500',
        title: '500元东鹏代金券',
        subtitle: '一次性购买大于12888元可用',
        time: '有效期至2017-12-31',
      },
    ],    
  },

  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo
      })
      User.setUser(e.detail.userInfo)
    }
  },

  onAddressTap: function (e) {
    let address = this.data.address || {}
    let province = address.province || ''
    let city = address.city || ''
    let district = address.district || ''
    let detail = address.detail || ''
    wx.navigateTo({
      url: '../addressEditor/addressEditor?province=' + province + '&city=' + city + '&district=' + district + '&detail=' + detail,
    })
  },

  onToptip: function (message) {
    this.toptip.show({
      title: message
    })
  },

  onUserAddressUpdate: function (address) {
    this.setData({
      address,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    this.toptip = new Toptip()
    this.mobile = new Mobile()
    app.listener.on('toptip', this.onToptip)
    app.listener.on('userAddressUpdate', this.onUserAddressUpdate)

    this.loading.show()
    User.getUser({
      fields: 'avatarUrl, nickName, mobileNumber, mobileVerified, address_province, address_city, address_district, address_detail',
    }).then(function (user) {
      if (!user) user = {}
      this.setData({
        'ready': true,
        'userInfo.nickName': user.nickName,
        'userInfo.avatarUrl': user.avatarUrl,
        'mobile.number': user.mobileNumber,
        'mobile.verified': user.mobileVerified == '1',
        address: {
          province: user.address_province,
          city: user.address_city,
          district: user.address_district,
          detail: user.address_detail
        },
      })
      this.loading.hide()
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