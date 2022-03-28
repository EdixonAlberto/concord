class MessageProcessor {
  private _content: TBotContent = {
    prefix: '',
    event: '',
    command: '' as TCommandList,
    params: [],
    /*
      The property "message" is used from a function
      so that its data is not displayed in the log
    */
    message: () => ({} as TBotMessage),
    await: {} as TBotContent['await']
  }

  constructor(message: TBotMessage) {
    this.contentExtract(message)
  }

  public get content(): TBotContent {
    return this._content
  }

  private contentExtract(message: TBotMessage): void {
    const words = message.content.split(' ')
    const prefixComand: string = words.shift() || ''

    this._content = {
      prefix: message.content.substring(0, 1),
      event: 'messageCreate',
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
