import { Message } from 'discord.js'

class MessageProcessor {
  private _content: TContent = {
    prefix: '',
    command: '' as TCommandList,
    params: [],
    // The property "message" is used from a function
    // so that its data is not displayed in the log
    message: () => ({} as Message),
    await: {} as TContent['await']
  }

  constructor(message: Message) {
    this.contentExtract(message)
  }

  public get content(): TContent {
    return this._content
  }

  private contentExtract(message: Message): void {
    const words = message.content.split(' ')
    const prefixComand: string = words.shift() || ''

    this._content = {
      prefix: message.content.substr(0, 1),
      command: prefixComand.substr(1) as TCommandList,
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
