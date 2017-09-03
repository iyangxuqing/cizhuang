import { http } from '../../utils/http.js'

let methods = {

  touchstart: function (e) {
    this.touch.id = e.currentTarget.dataset.id
    this.touch.x1 = e.touches[0].clientX;
    this.touch.y1 = e.touches[0].clientY;
    this.touch.t1 = e.timeStamp;
    this.touch.x2 = e.touches[0].clientX;
    this.touch.y2 = e.touches[0].clientY;
    this.touch.t2 = e.timeStamp;
  },

  touchmove: function (e) {
    this.touch.x2 = e.touches[0].clientX;
    this.touch.y2 = e.touches[0].clientY;
    this.touch.t2 = e.timeStamp;
  },

  touchend: function (e) {
    this.touch.t2 = e.timeStamp
    let dx = this.touch.x2 - this.touch.x1
    let dy = this.touch.y2 - this.touch.y1
    let dt = this.touch.t2 - this.touch.t1
    if ((Math.abs(dy) < Math.abs(dx) / 2 && dt < 250)) {
      if (dx < -20) this.onSwipeLeft(this.touch.id)
      if (dx > 20) this.onSwipeRight(this.touch.id)
    }
  },

  // onSwipeLeft: function (id) {
  //   let page = getCurrentPages().pop()
  //   page.setData({
  //     'listRowsEditor.swipeLeftId': id
  //   })
  // },

  // onSwipeRight: function (id) {
  //   let page = getCurrentPages().pop()
  //   page.setData({
  //     'listRowsEditor.swipeLeftId': ''
  //   })
  // },

  onItemTap: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    page.setData({
      'listRowsEditor.swipeLeftId': ''
    })
    this.onItemTap && this.onItemTap({ id })
  },

  onItemDel: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    let items = page.data.listRowsEditor.items
    let index = -1
    for (let i in items) {
      if (items[i].id == id) {
        index = i
        break
      }
    }
    items.splice(index, 1)
    page.setData({
      'listRowsEditor.swipeLeftId': '',
      'listRowsEditor.items': items
    })
    this.onItemDel && this.onItemDel({ id }, items)
  },

  onItemSortUp: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    let items = page.data.listRowsEditor.items
    let desc = true //倒序
    let index = -1
    for (let i in items) {
      if (items[i].id == id) {
        index = i
        break
      }
    }
    let temp = items[i]
    if (i > 0) {
      items[i] = items[i - 1]
      items[i - 1] = temp
    }
    this.setData({
      'listRowsEditor.swipeLeftId': '',
      'listRowsEditor.items': items
    })
    this.onItemSort && this.onItemSort(items)
  },

  onItemSortDown: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    let items = page.data.listRowsEditor.items
    let desc = true //倒序
    let index = -1
    for (let i in items) {
      if (items[i].id == id) {
        index = i
        break
      }
    }
    let temp = items[i]
    if (i < items.length - 1) {
      items[i] = items[i + 1]
      items[i + 1] = temp
    }
    this.setData({
      'listRowsEditor.swipeLeftId': '',
      'listRowsEditor.items': items
    })
    this.onItemSort && this.onItemSort(items)
  },

}

export class ListRowsEditor {

  constructor(options = {}) {
    this.touch = {}
    this.onItemTap = options.onItemTap
    this.onItemDel = options.onItemDel
    this.onItemSort = options.onItemSort

    let listRowsEditor = {
      items: options.items || [],
      swipeLeftId: '',
    }

    let page = getCurrentPages().pop()
    page.setData({
      listRowsEditor: listRowsEditor
    })
    for (let key in methods) {
      page['listRowsEditor.' + key] = methods[key].bind(this)
      page.setData({
        ['listRowsEditor.' + key]: 'listRowsEditor.' + key
      })
    }
  }

  onSwipeLeft(id) {
    let page = getCurrentPages().pop()
    page.setData({
      'listRowsEditor.swipeLeftId': id
    })
  }

  onSwipeRight(id) {
    let page = getCurrentPages().pop()
    page.setData({
      'listRowsEditor.swipeLeftId': ''
    })
  }

}