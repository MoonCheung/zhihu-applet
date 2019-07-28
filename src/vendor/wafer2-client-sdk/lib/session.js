import Taro from '@tarojs/taro'
var constants = require('./constants.js')
var SESSION_KEY = 'weapp_session_' + constants.WX_SESSION_MAGIC_ID

var Session = {
  get: function() {
    return Taro.getStorageSync(SESSION_KEY) || null
  },

  set: function(session) {
    Taro.setStorageSync(SESSION_KEY, session)
  },

  clear: function() {
    Taro.removeStorageSync(SESSION_KEY)
  }
}

module.exports = Session
