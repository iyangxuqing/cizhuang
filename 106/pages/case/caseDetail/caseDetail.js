let config = require('../../../utils/config.js')
import { cases } from '../case.data.js'

Page({

  data: {
    imagesUrl : config.imagesUrl
  },

  onLoad: function (options) {
    let id = options.id
    let indexOfProcess = options.index
    let index = -1
    for (let i in cases) {
      if (cases[i].id == id) {
        index = i
        break;
      }
    }
    if (index < 0) return

    let process = cases[index].process[indexOfProcess]
    this.setData({
      title: cases[index].subdistrict,
      process
    })
  }

})