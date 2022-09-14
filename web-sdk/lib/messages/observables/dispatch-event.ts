import { SubjectsType } from '../subjects'
import { map, tap } from 'rxjs'
import log from 'loglevel'
import { bridge } from '../../wallet-extension/bridge'

export const dispatchEvent = (subjects: SubjectsType) =>
  subjects.dispatchEventSubject.pipe(
    map(bridge.transformOutgoingMessage),
    tap(({ event, payload }) => {
      log.debug(`🔵💬⬆️ message sent\n${JSON.stringify(payload)}`)
      window.dispatchEvent(
        new CustomEvent(event, {
          detail: payload,
        })
      )
    })
  )
