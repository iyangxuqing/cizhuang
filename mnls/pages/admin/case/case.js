import { http } from '../../../utils/http.js'
import { Anlis } from '../../../utils/anlis.js'

let app = getApp()
let imageDeleteTimer = null

Page({

  hasChanged: false,

  data: {
    editor: {
      top: 0,
      left: -1000,
      blur: false,
      focus: false,
      type: '',
      value: '',
    },
    editId: '',
    youImageMode: app.youImageMode,
  },

  onSubdistrictBlur: function (e) {
    let value = e.detail.value
    let oldValue = this.data.anli.subdistrict
    if (value != oldValue) {
      this.setData({
        'anli.subdistrict': value
      })
      this.hasChanged = true
    }
  },

  onHouseAddressBlur: function (e) {
    let value = e.detail.value
    let oldValue = this.data.anli.houseAddress
    if (value != oldValue) {
      this.setData({
        'anli.houseAddress': value
      })
      this.hasChanged = true
    }
  },

  onProcessAdd: function (e) {
    let time = new Date().Format("yyyy-MM-dd");
    let anli = this.data.anli
    if (anli.process.length && anli.process[0].descs == '' && anli.process[0].images.length == 0) return

    anli.process.unshift({
      time: time,
      descs: '',
      images: []
    })
    this.setData({
      anli: anli
    })
  },

  onProcessDel: function (e) {
    let processIndex = e.currentTarget.dataset.processIndex
    let anli = this.data.anli
    anli.process.splice(processIndex, 1)
    this.setData({
      anli: anli
    })
    this.hasChanged = true
  },

  onImageTap: function (e) {
    let pIndex = e.currentTarget.dataset.processIndex
    let index = e.currentTarget.dataset.imageIndex
    let anli = this.data.anli
    let images = anli.process[pIndex].images
    let that = this
    http.chooseImage().then(function (image) {
      if (index == -1) {
        index = images.length
        images.push('')
      }
      images[index] = image
      that.setData({ anli })
      that.hasChanged = true
    })
  },

  onImageLongPress: function (e) {
    let processIndex = e.currentTarget.dataset.processIndex
    let imageIndex = e.currentTarget.dataset.imageIndex
    let delImageIndex = 'del-' + processIndex + '-' + imageIndex
    this.setData({ delImageIndex })

    clearTimeout(imageDeleteTimer)
    imageDeleteTimer = setTimeout(function () {
      this.setData({ delImageIndex: -1 })
    }.bind(this), 5000)
  },

  onImageDel: function (e) {
    let processIndex = e.currentTarget.dataset.processIndex
    let imageIndex = e.currentTarget.dataset.imageIndex
    let anli = this.data.anli
    anli.process[processIndex].images.splice(imageIndex, 1)
    this.setData({
      delImageIndex: -1,
      anli: anli
    })
    this.hasChanged = true
  },

  onTimeTap: function (e) {
    if (this.data.editor.left >= 0) {
      this.setData({
        'editId': '',
        'editor.left': -1000,
        'editor.focus': false,
      })
      return
    }

    let top = e.currentTarget.offsetTop
    let left = e.currentTarget.offsetLeft
    let type = e.currentTarget.dataset.type
    let value = e.currentTarget.dataset.value
    let processIndex = e.currentTarget.dataset.processIndex
    let placeholder = '输入时间或说明...'
    let editId = 'process-' + processIndex + '-time'
    this.setData({
      editId: editId,
      'editor.blur': false,
      'editor.type': type,
      'editor.processIndex': processIndex,
      'editor.value': value,
      'editor.placeholder': placeholder
    })
    setTimeout(function () {
      this.setData({
        'editor.top': top,
        'editor.left': left,
        'editor.focus': true,
      })
    }.bind(this), 0)
  },

  onDescsTap: function (e) {
    if (this.data.editor.left >= 0) {
      this.setData({
        'editId': '',
        'editor.left': -1000,
        'editor.focus': false,
      })
      return
    }

    let top = e.currentTarget.offsetTop
    let left = e.currentTarget.offsetLeft
    let type = e.currentTarget.dataset.type
    let value = e.currentTarget.dataset.value
    let processIndex = e.currentTarget.dataset.processIndex
    let placeholder = '输入装修描述...'
    let editId = 'process-' + processIndex + '-descs'
    this.setData({
      editId: editId,
      'editor.blur': false,
      'editor.type': type,
      'editor.processIndex': processIndex,
      'editor.value': value,
      'editor.placeholder': placeholder
    })
    setTimeout(function () {
      this.setData({
        'editor.top': top,
        'editor.left': left,
        'editor.focus': true,
      })
    }.bind(this), 0)
  },

  onEditorBlur: function (e) {
    /* android系统中隐藏在界面外的textarea，在界面滚动时会不断产生blur事件 */
    if (this.data.editor.blur) return
    let editor = this.data.editor
    editor.blur = true

    this.setData({
      'editId': '',
      'editor.left': -1000,
      'editor.focus': false,
    })

    let type = editor.type
    let processIndex = editor.processIndex
    let value = e.detail.value
    let oldValue = editor.value
    if (value == oldValue) return

    let anli = this.data.anli
    anli.process[processIndex][type] = value
    this.setData({ anli: anli })
    this.hasChanged = true
  },

  loadAnli: function (options = {}) {
    let id = options.id
    let anli = {
      id: '',
      subdistrict: '',
      houseAddress: '',
      process: [{
        time: new Date().Format('yyyy-MM-dd'),
        descs: '',
        images: [],
        sort: 9999
      }],
      sort: 9999
    }
    if (id) {
      anli = Anlis.get({ id })
    }
    return anli
  },

  saveAnli: function () {
    if (this.hasChanged) {
      let anli = this.data.anli
      Anlis.set(anli)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let platform = wx.getSystemInfoSync().platform
    this.setData({ platform })

    let anli = this.loadAnli(options)
    this.setData({
      anli: anli
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
    this.saveAnli()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.saveAnli()
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