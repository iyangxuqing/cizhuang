import { User } from '../../../utils/user.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    User.getUserData().then(function (userInfos) {
      let _userInfos = []
      for (let i in userInfos) {
        let userInfo = userInfos[i]
        if (!userInfo.avatarUrl && !userInfo.mobileNumber) continue
        let time = new Date(userInfo.created * 1000)
        userInfo.time = time.Format('yyyy-MM-dd hh:mm:ss')
        _userInfos.push(userInfo)
      }
      this.setData({
        userInfos: _userInfos
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