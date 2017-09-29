let data = {
  tabs: [
    {
      text: '首页',
      icon: '/images/tab/01/home.png',
      activeIcon: '/images/tab/02/home.png',
      url: '/pages/model/modelList/modelList'
    },
    {
      text: '身边案例',
      icon: '/images/tab/01/case.png',
      activeIcon: '/images/tab/02/case.png',
      url: '/pages/case/caseList/caseList'
    },
    {
      text: '店铺信息',
      icon: '/images/tab/01/shop.png',
      activeIcon: '/images/tab/02/shop.png',
      url: '/pages/shop/shop'
    },
    {
      text: '我的',
      icon: '/images/tab/01/user.png',
      activeIcon: '/images/tab/02/user.png',
      url: '/pages/wode/wode/wode'
    },
    {
      text: '后台管理',
      icon: '/images/tab/01/admin.png',
      activeIcon: '/images/tab/02/admin.png',
      url: '/pages/admin/admin/admin'
    },
  ]
}

let methods = {
  onTabTap: function (e) {
    let index = e.currentTarget.dataset.index
    let tabs = data.tabs
    // wx.navigateTo({
    //   url: tabs[index].url,
    // })
    wx.redirectTo({
      url: tabs[index].url,
    })
  },
}

export class ToolBar {

  constructor(options = {}) {
    let page = getCurrentPages().pop()
    let toolbar = {
      tabs: data.tabs,
      activeIndex: options.activeIndex
    }
    page.setData({
      toolbar: toolbar
    })
    // page.setData({
    //   'toolbar.tabs': data.tabs,
    //   'toolbar.activeIndex': options.activeIndex
    // })
    for (let key in methods) {
      page['toolbar.' + key] = methods[key].bind(this)
      page.setData({
        ['toolbar.' + key]: 'toolbar.' + key
      })
    }
  }

}