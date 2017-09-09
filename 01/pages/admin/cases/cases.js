import { Anlis } from '../../../utils/anlis.js'
import { ListRowsEditor } from '../../../template/listRowsEditor/listRowsEditor.js'

let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    youImageMode: app.youImageMode
  },

  onAnliAdd: function (e) {
    wx.navigateTo({
      url: '../case/case',
    })
  },

  onAnlisUpdate: function (anlis) {
    let page = this
    page.loadAnlis({
      success: function (anlis) {
        page.setData({
          'listRowsEditor.items': anlis
        })
      }
    })
  },

  loadAnlis: function (options) {
    Anlis.getAnlis()
      .then(function (anlis) {
        for (let i in anlis) {
          let last = {
            time: '',
            descs: '',
            images: []
          }

          //fix me 因为anlis[i].process可能为null
          if (anlis[i].process.length) last = anlis[i].process[0]
          anlis[i].time = last.time
          anlis[i].descs = last.descs
          anlis[i].image = ''
          if (last.images.length) anlis[i].image = last.images[0]
        }
        let _anlis = []
        let length = anlis.length
        for (let i in anlis) {
          _anlis[i] = anlis[length - i - 1]
        }
        anlis = _anlis
        options.success && options.success(anlis)
      })
  },

  onItemTap: function (item) {
    wx.navigateTo({
      url: '../case/case?id=' + item.id
    })
  },

  onItemDel: function (item) {
    Anlis.del(item)
  },

  onItemSort: function (items) {
    Anlis.sort(items)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    app.listener.on('anlis', this.onAnlisUpdate)
    this.loadAnlis({
      success: function (anlis) {
        page.listRowsEditor = new ListRowsEditor({
          items: anlis,
          sort: 'desc',
          onItemTap: page.onItemTap,
          onItemDel: page.onItemDel,
          onItemSort: page.onItemSort,
          itemTemplate: 'anli',
        })
        page.setData({
          ready: true
        })
      }
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