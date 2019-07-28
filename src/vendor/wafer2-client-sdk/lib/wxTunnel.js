import Taro from '@tarojs/taro'
/* istanbul ignore next */
const noop = () => undefined

let onOpen, onClose, onMessage, onError

/* istanbul ignore next */
function listen(listener) {
  if (listener) {
    onOpen = listener.onOpen
    onClose = listener.onClose
    onMessage = listener.onMessage
    onError = listener.onError
  } else {
    onOpen = noop
    onClose = noop
    onMessage = noop
    onError = noop
  }
}

/* istanbul ignore next */
function bind() {
  Taro.onSocketOpen(result => onOpen(result))
  Taro.onSocketClose(result => onClose(result))
  Taro.onSocketMessage(result => onMessage(result))
  Taro.onSocketError(error => onError(error))
}

listen(null)
bind()

module.exports = { listen }
