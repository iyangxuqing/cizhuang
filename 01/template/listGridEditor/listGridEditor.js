import { http } from '../../utils/http.js'

let methods = {

  touchstart: function (e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;

    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let row = Math.floor(index / 2)
    let col = index % 2
    let offsetLeft = col * 165
    if (col == 1) offsetLeft = col * 165 + 15
    let offsetTop = row * 195
    this.touchPositionX = x - offsetLeft
    this.touchPositionY = y - offsetTop

    let page = getCurrentPages().pop()
    let items = page.data.listGridEditor.items
    let moving = page.data.listGridEditor.moving
    moving.sourceIndex = index
    moving.item = items[index]
    page.setData({
      'listGridEditor.delItemId': -1
    })
  },

  touchmove: function (e) {
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    let left = x - this.touchPositionX
    let top = y - this.touchPositionY

    let row = Math.round(top / 195)
    let col = Math.round(left / 165)
    if (col < 0) col = 0
    if (col > 1) col = 1
    let targetIndex = row * 2 + col

    let page = getCurrentPages().pop()
    let moving = page.data.listGridEditor.moving
    moving.top = top
    moving.left = left
    moving.display = 'block'
    moving.targetIndex = targetIndex
    page.setData({
      'listGridEditor.moving': moving
    })
  },

  touchend: function (e) {
    let page = getCurrentPages().pop()
    let items = page.data.listGridEditor.items
    let moving = page.data.listGridEditor.moving
    let sourceIndex = moving.sourceIndex
    let targetIndex = moving.targetIndex
    if (sourceIndex != targetIndex && targetIndex > -1) {
      let item = items[sourceIndex]
      items.splice(sourceIndex, 1)
      items.splice(targetIndex, 0, item)
    }
    moving.display = 'none'
    moving.sourceIndex = -1
    moving.targetIndex = -1
    page.setData({
      'listGridEditor.items': items,
      'listGridEditor.moving': moving
    })
    this.onItemSort && this.onItemSort(items)
  },

  onItemTap: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    page.setData({
      'listGridEditor.delItemId': -1
    })
    this.onItemTap && this.onItemTap({ id })
  },

  onItemDel: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    let items = page.data.listGridEditor.items
    let index = -1
    for (let i in items) {
      if (items[i].id == id) {
        index = i
        break
      }
    }
    items.splice(index, 1)
    page.setData({
      'listGridEditor.items': items
    })
    this.onItemDel && this.onItemDel({ id }, items)
  },

  onItemLongPress: function (e) {
    let page = getCurrentPages().pop()
    let id = e.currentTarget.dataset.id
    page.setData({
      'listGridEditor.delItemId': id,
    })
    clearTimeout(this.delItemTimer)
    this.delItemTimer = setTimeout(function () {
      page.setData({
        'listGridEditor.delItemId': -1,
      })
    }, 5000)
  }

}

export class ListGridEditor {

  constructor(options = {}) {
    this.touchPositionX = 0
    this.touchPositionY = 0
    this.delItemTimer = null
    this.onItemTap = options.onItemTap
    this.onItemDel = options.onItemDel
    this.onItemSort = options.onItemSort

    let listGridEditor = {
      items: options.items || [],
      delItemId: -1,
      moving: {
        sourceIndex: -1,
        targetIndex: -1,
        top: 0,
        left: 0,
        display: 'none',
        item: {}
      }
    }

    let page = getCurrentPages().pop()
    page.setData({
      listGridEditor: listGridEditor
    })
    for (let key in methods) {
      page['listGridEditor.' + key] = methods[key].bind(this)
      page.setData({
        ['listGridEditor.' + key]: 'listGridEditor.' + key
      })
    }
  }

}