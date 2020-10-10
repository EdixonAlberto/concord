import { Client, Message } from 'discord.js';
import { BotResponse } from './BotResponse';
import { MessageProcessor } from './MessageProcessor';
import * as commandsDefault from './commandsDefault';
import { TOptions, TContent } from '@types';

class Bot {
  readonly options: TOptions;
  private client: Client;

  constructor(_options: TOptions) {
    this.options = _options;
    this.client = new Client();
    this.event();
  }

  public async start(): Promise<void> {
    try {
      await this.client.login(this.options.token);
    } catch (error) {
      console.log('>> BOT -> ', error.message);
    }
  }

  private event(): void {
    this.client.on('ready', () => console.log('>> BOT -> OK'));

    this.client.on('message', (message: Message) => {
      const { content } = new MessageProcessor(message);
      const response: BotResponse = new BotResponse(message);

      this.commands(content, response);
    });
  }

  // TODO:
  public commands(content: TContent, response: BotResponse): void {
    if (content.prefix === this.options.prefix) {
      console.log('>> CONTENT -> ' + JSON.stringify(content));

      // create pack commands
      const commandsPack = {
        ...commandsDefault,
        ...this.options.commands
      };

      // Estudiar la verificaion de comandos despues
      // Verify commnad in commnads list
      // if (commandsList[content.command])

      try {
        commandsPack[content.command]({ content, response }); // Execute command dynamically
      } catch (error) {
        response.general('Comando Incorrecto ❌');
        console.error('>> COMMAND -> Incorrect', error.message);
      }
    }
  }
}

export { Bot };
