import { MessageClient } from './messages/message-client'
import { request, sendTransaction } from './methods'
import log from 'loglevel'

const WalletSdk = () => {
  log.debug(`๐ต wallet sdk instantiated`)
  const messageClient = MessageClient()

  const destroy = () => {
    log.debug(`๐ต๐งน destroying wallet sdk instance`)
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

export { ManifestBuilder } from './manifest'

export default WalletSdk