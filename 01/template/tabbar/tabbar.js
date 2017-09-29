let tabs = [
  {
    url: "/pages/shop/shop",
    text: "首页",
    icon: "/images/tab/01/home.png",
    activeIcon: "/images/tab/02/home.png",
    active: true,

  },
  {
    url: "/pages/products/products",
    text: "商品",
    icon: "/images/tab/01/shop.png",
    activeIcon: "/images/tab/02/shop.png",
    active: false,
  },
  {
    url: "/pages/wode/wode/wode",
    text: "我的",
    icon: "/images/tab/01/user.png",
    activeIcon: "/images/tab/02/user.png",
    active: false,
  },
  {
    url: "/pages/admin/admin/admin",
    text: "后台管理",
    icon: "/images/tab/01/admin.png",
    activeIcon: "/images/tab/02/admin.png",
    active: false,
    hidden: true
  }
]

let methods = {

  onTabTap: function (e) {
    let index = e.currentTarget.dataset.index
    let page = getCurrentPages().pop()
    let tabs = page.data.tabbar.tabs

    if (index == 0) {
      this.tabCount++
    } else {
      this.tabCount = 0
    }
    if (this.tabCount >= 3) {
      for (let i in tabs) {
        if ('hidden' in tabs[i] && tabs[i].hidden == true) {
          tabs[i].hidden = false
        }
      }
      page.setData({
        'tabbar.tabs': tabs
      })
      return
    }

    for (let i in tabs) {
      tabs[i].active = false
      if (i == index) tabs[i].active = true
      if (i != index && 'hidden' in tabs[i]) {
        tabs[i].hidden = true
      }
    }
    page.setData({
      'tabbar.tabs': tabs
    })
    this.onTabChanged && this.onTabChanged(index)
  }

}

export class Tabbar {
  constructor(options = {}) {
    this.tabCount = 0
    this.onTabChanged = options.onTabChanged

    let page = getCurrentPages().pop()
    page.setData({
      tabbar: {
        tabs: tabs
      }
    })
    for (let key in methods) {
      page['tabbar.' + key] = methods[key].bind(this)
      page.setData({
        ['tabbar.' + key]: 'tabbar.' + key
      })
    }
  }
}