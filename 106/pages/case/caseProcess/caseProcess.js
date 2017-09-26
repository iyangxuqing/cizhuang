let config = require('../../../utils/config.js')
import { Case } from '../../../utils/case.js'
import { cases } from '../case.data.js'

Page({

  data: {
    imagesUrl: config.imagesUrl
  },

  onLoad: function (options) {
    let id = options.id
    Case.get({ cases: 'cases' })
      .then(function (res) {
        if (res === 'cases') {
          let current = -1
          for (let i in cases) {
            if (cases[i].id == id) {
              current = i
            }
            for (let j in cases[i].process) {
              if (cases[i].process[j].time) {
                cases[i].process[j].time = cases[i].process[j].time.szTime()
              }
            }
            if (cases[i].state != '完成') {
              if (cases[i].process[cases[i].process.length - 1].desc != '未完待续...') {
                cases[i].process.push({
                  desc: '未完待续...'
                })
              }
            }
          }
          this.setData({
            current,
            cases,
            ready: true
          })
        }
      }.bind(this))
  },

  onItemTap: function (e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let cases = this.data.cases
    let current = this.data.current
    let lastIndex = cases[current].process.length - 1
    if (cases[current].state != '完成' && index == lastIndex) return
    wx.navigateTo({
      url: '../caseDetail/caseDetail?id=' + id + '&index=' + index
    })
  }

})