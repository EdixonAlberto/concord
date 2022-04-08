import { v4 as uuid } from 'uuid'

export function id(mini: boolean = false): string {
  let id = uuid()
  if (mini) id = id.split('-')[0]

  return id
}

export function logger(title: string, payload: string | object, dev: boolean = false): void {
  if (!dev || global.env.MODE_DEV) {
    if (typeof payload === 'string') console.log(`${title} ->`, payload)
    else {
      console.log(title)
      console.table(payload)
    }
  }
}
