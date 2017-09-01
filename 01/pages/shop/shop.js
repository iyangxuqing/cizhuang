// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {
      name: '铱星瓷砖',
      phone: '15397553789',
      address: '义乌市江东南路750号三楼1758号',
      logo: 'http://122.226.60.90:8092/images/cizhuang/images/8.5/s02.png',
      images: [
        'http://122.226.60.90:8092/images/cizhuang/images/dianpu/s01.jpg',
        'http://122.226.60.90:8092/images/cizhuang/images/dianpu/s05.jpg',
        'http://122.226.60.90:8092/images/cizhuang/images/dianpu/s06.jpg',
        'http://122.226.60.90:8092/images/cizhuang/images/dianpu/s08.jpg',
      ],
      location: {
        latitude: 29.26948,
        longitude: 120.05691,
      },
    },
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
      latitude: this.data.shop.location.latitude,
      longitude: this.data.shop.location.longitude,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: this.data.shop.name,
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