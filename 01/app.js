let config = require('/utils/config.js')
import 'utils/utils.js'
import { Listener } from 'utils/listener.js'
import { User } from 'utils/user.js'

App({

  youImageMode: config.youImageMode,

  onLaunch: function () {
    this.listener = new Listener()
    User.login()
  },

})