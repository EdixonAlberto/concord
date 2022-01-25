import { TContent } from '~ENTITIES/types'

class MessageProcessor {
  private _content: TContent = {
    prefix: '',
    command: '' as TCommandList,
    params: [],
    /*
      The property "message" is used from a function
      so that its data is not displayed in the log
    */
    message: () => ({} as TMessage),
    await: {} as TContent['await']
  }

  constructor(message: TMessage) {
    this.contentExtract(message)
  }

  public get content(): TContent {
    return this._content
  }

  private contentExtract(message: TMessage): void {
    const words = message.content.split(' ')
    const prefixComand: string = words.shift() || ''

    this._content = {
      prefix: message.content.substring(0, 1),
      command: prefixComand.substring(1) as TCommandList,
      params: words,
      message: () => message,
      await: (filter, option) =>
        message.channel.awaitMessages({
          filter,
          max: 1,
          time: 15000,
          ...option
        })
    }
  }
}

export { MessageProcessor }
