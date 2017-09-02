import { http } from '../../../utils/http.js'
import { Loading } from '../../../template/loading/loading.js'
import { Models } from '../../../utils/models.js'
import { Resource } from '../../../utils/resource.js'
import { SwiperImagesEditor } from '../../../template/swiperImagesEditor/swiperImagesEditor.js'
import { ListGridEditor } from '../../../template/listGridEditor/listGridEditor.js'

let touchPositionX = 0
let touchPositionY = 0
let modelDeleteTimer = null
let app = getApp()

Page({

  data: {
    youImageMode: '',
  },

  onModelsUpdate: function (models) {
    this.setData({
      models: models
    })
  },

  onHomeHeadImagesChanged: function (images) {
    Resource.set({
      key: 'homeHeadImages',
      value: JSON.stringify(images),
    })
  },

  onHomeSloganBlur: function (e) {
    let value = e.detail.value
    value = value.replace("'", "")
    value = value.replace("\\", "")
    let homeSlogan = value
    Resource.set({
      key: 'homeSlogan',
      value: homeSlogan,
    })
  },

  onHomeLogoTap: function (e) {
    let page = this
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
            let homeLogo = res.url
            page.setData({
              homeLogo: homeLogo
            })
            Resource.set({
              key: 'homeLogo',
              value: homeLogo
            })
            wx.hideNavigationBarLoading()
          }
        })
      }
    })
  },

  onGridItemTap: function (item) {
    wx.navigateTo({
      url: '../model/model?id=' + item.id
    })
  },

  onGridItemDel: function (model, models) {
    http.get({
      url: 'cz/models.php?m=del',
      data: {
        id: model.id
      }
    })
    app.models = models
  },

  onGridItemSort: function (models) {
    for (let i in models) {
      if (models[i].sort != i) {
        models[i].sort = i
        http.get({
          url: 'cz/models.php?m=set',
          data: {
            id: models[i].id,
            sort: models[i].sort
          }
        })
      }
    }
    app.models = models
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = this
    page.loading = new Loading()
    app.listener.on('models', this.onModelsUpdate)

    page.loading.show()
    Models.getModels().then(function (models) {
      page.listGridEditor = new ListGridEditor({
        items: models,
        onItemTap: page.onGridItemTap,
        onItemDel: page.onGridItemDel,
        onItemSort: page.onGridItemSort
      })

      Resource.get().then(function (resource) {
        let homeHeadImages = resource['homeHeadImages']
        homeHeadImages = JSON.parse(homeHeadImages) || []
        let homeSlogan = resource['homeSlogan']
        let homeLogo = resource['homeLogo']
        page.swiperImagesEditor = new SwiperImagesEditor({
          images: homeHeadImages,
          imagesChanged: false,
          onImagesChanged: page.onHomeHeadImagesChanged,
        })
        page.setData({
          homeSlogan: homeSlogan,
          homeLogo: homeLogo,
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