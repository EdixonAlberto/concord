import { v4 as uuid } from 'uuid'

export function id(mini: boolean = false): string {
  let id = uuid()
  if (mini) id = id.split('-')[0]

  return id
}

export function logger(title: string, message: string, dev: boolean = false): void {
  if (dev && global.env.MODE_DEV) {
    console.log(`${title} ->`, message)
  }
}
