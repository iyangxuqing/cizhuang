//app.js
import {} from 'utils/utils.js'
import { Listener } from 'utils/listener.js'
import { User } from 'utils/user.js'

App({

  onLaunch: function () {
    this.listener = new Listener()
    setTimeout(function () {
      User.login()
    }, 0)
  },

})