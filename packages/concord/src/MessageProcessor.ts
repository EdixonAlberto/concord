import { Message } from 'discord.js';
import { commandsList } from '@ENUM';

class MessageProcessor {
  private _content: TContent = {
    prefix: '',
    command: '' as commandsList,
    params: [],
    message: () => {
      return {} as Message;
    }
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
      message: () => message
    };
  }

  public get content(): TContent {
    return this._content;
  }
}

export default MessageProcessor;
