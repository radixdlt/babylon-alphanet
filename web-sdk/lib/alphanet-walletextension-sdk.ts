import { MessageClient } from './messages/message-client'
import { request, sendTransaction } from './methods'
import log from 'loglevel'

const WalletSdk = () => {
  log.debug(`🔵 wallet sdk instantiated`)
  const messageClient = MessageClient()

  const destroy = () => {
    log.debug(`🔵🧹 destroying wallet sdk instance`)
    messageClient.destroy()
  }

  const methods = {
    request: request(messageClient.subjects),
    sendTransaction: sendTransaction(messageClient.subjects),
  }

  return {
    ...methods,
    destroy,
    __subjects: messageClient.subjects,
  }
}

export default WalletSdk
