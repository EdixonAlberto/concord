import { Client, Message } from 'discord.js';
import BotResponse from './BotResponse';
import MessageProcessor from './MessageProcessor';
// import * as Command from '../commands';
import { commandsList } from '@ENUM';

export class Bot {
  private static client: Client;
  private static options: TOptions;

  // TODO: agregar mas opciones de config para el bot
  constructor(_options: TOptions) {
    Bot.options = _options;
    Bot.client = new Client();
    this.event();
  }

  public async start(): Promise<void> {
    try {
      await Bot.client.login(Bot.options.token);
    } catch (error) {
      console.log('>> BOT -> ', error.message);
    }
  }

  private event(): void {
    Bot.client.on('ready', () => console.log('>> BOT -> OK'));
    Bot.client.on('message', (message: Message) => {
      const { content } = new MessageProcessor(message);
      const response: BotResponse = new BotResponse(message);
      // this.commands(content, response);
    });
  }

  // TODO:
  // private commands(content: TContent, response: BotResponse): void {
  //   if (content.prefix === Bot.options.prefix) {
  //     if (config.modeDebug) console.log('>> CONTENT -> ' + JSON.stringify(content));

  //     // Verify commnad in commnads list
  //     if (commandsList[content.command]) {
  //       Command[content.command](content, response); // Execute command dynamically
  //     } else {
  //       response.general('Comando Incorrecto ❌');
  //       console.log('>> COMMAND -> Incorrect');
  //     }
  //   }
  // }
}
