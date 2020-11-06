import { Message, CollectorFilter, AwaitMessagesOptions, Collection } from 'discord.js';
import { commandsList } from '@ENUM';
import { TContent } from '@types';

class MessageProcessor {
  private _content: TContent = {
    prefix: '',
    command: '' as commandsList,
    params: [],
    // The property "message" is used from a function
    // so that its data is not displayed in the log
    message: () => ({} as Message),
    await: (filter: CollectorFilter, options?: AwaitMessagesOptions) =>
      ({} as Promise<Collection<string, Message>>)
  };

  constructor(message: Message) {
    this.contentExtract(message);
  }

  private contentExtract(message: Message): void {
    const words = message.content.split(' ');
    const prefixComand: string = words.shift() || '';

    this._content = {
      prefix: message.content.substr(0, 1),
      command: prefixComand.substr(1) as commandsList,
      params: words,
      message: () => message,
      await: (filter: CollectorFilter, option?: AwaitMessagesOptions) =>
        message.channel.awaitMessages(filter, { ...option, time: 10000 })
    };
  }

  public get content(): TContent {
    return this._content;
  }
}

export { MessageProcessor };
