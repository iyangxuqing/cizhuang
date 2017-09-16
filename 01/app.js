let config = require('/utils/config.js')
import 'utils/utils.js'
import { Listener } from 'utils/listener.js'
import { User } from 'utils/user.js'

App({

  youImageMode: config.youImageMode,

  onLaunch: function (options) {

    this.listener = new Listener()
    if (!wx.getStorageSync('sid')) wx.setStorageSync('sid', config.sid)

    User.login()
    User.getUser({
      fields: 'role'
    }).then(function (user) {
      this.user = Object.assign({}, this.user, user);
    }.bind(this))

  }

})