import { Customer } from '../../../utils/customer.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  loadData: function (options = {}) {
    Customer.get({
      nocache: options.nocache,
      pageIndex: options.pageIndex
    }).then(function (customers) {
      let _customers = []
      for (let i in customers) {
        let customer = customers[i]
        if (!customer.avatarUrl && !customer.mobileNumber) continue
        let time = new Date(customer.created * 1000)
        customer.time = time.Format('yyyy-MM-dd hh:mm:ss')
        _customers.push(customer)
      }
      options.success && options.success(_customers)
    }.bind(this))
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.pageIndex = 0
    this.loadData({
      success: function (customers) {
        this.setData({
          customers
        })
      }.bind(this)
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
    this.loadData({
      nocache: true,
      success: function (customers) {
        this.pageIndex = 0;
        this.setData({
          customers
        })
        wx.stopPullDownRefresh()
      }.bind(this)
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (e) {
    if (!this.pageIndex) this.pageIndex = 0
    this.pageIndex++
    let _customers = this.data.customers
    this.loadData({
      nocache: true,
      pageIndex: this.pageIndex,
      success: function (customers) {
        for (let i in customers) {
          _customers.push(customers[i])
        }
        this.setData({
          customers: _customers
        })
      }.bind(this)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})