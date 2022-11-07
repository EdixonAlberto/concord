import { v4 as uuid } from 'uuid'
import { getConfig } from '~UTILS'

export function id(mini: boolean = false): string {
  let id = uuid()
  if (mini) id = id.split('-')[0]

  return id
}

export function logger(title: string, payload: string | object | Error | unknown, force: boolean = false): void {
  if (getConfig().MODE_DEV || force) {
    if (typeof payload === 'string' || payload instanceof Error) {
      let errorMessage: string = ''

      if (payload instanceof Error) {
        const { message } = payload
        errorMessage = message.search(':') > -1 ? message.split(':')[1].trim() : message
      } else errorMessage = payload

      console.log(`[${title}] -`, errorMessage)
    } else {
      console.log(title)
      console.table(payload)
    }
  }
}
