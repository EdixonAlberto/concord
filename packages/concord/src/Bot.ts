import { Client, Collection, Message } from 'discord.js';
import { BotResponse } from './BotResponse';
import { MessageProcessor } from './MessageProcessor';
import * as commandsDefault from './commandsDefault';
import { TOptions, TContent } from '@types';
import { promises as fs } from 'fs';
import { resolve } from 'path';

class Bot {
  readonly options: TOptions;
  private client: Client;
  static commandsList: object = {};

  constructor(_options: TOptions) {
    this.options = _options;
    this.client = new Client();
    this.loadCommandFiles();
    this.event();
  }

  public async start(): Promise<void> {
    try {
      await this.client.login(this.options.token);
    } catch (error) {
      console.log('!! ERROR-BOT ->', error.message);
    }
  }

  private event(): void {
    this.client.on('ready', () => console.log('>> BOT -> OK'));

    this.client.on('message', (message: Message) => {
      const { content } = new MessageProcessor(message);
      const response: BotResponse = new BotResponse(message, this.options.color);

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
        ...Bot.commandsList
      };

      // Estudiar la verificaion de comandos despues
      // Verify commnad in commnads list
      // if (commandsList[content.command])

      try {
        commandsPack[content.command]({ content, response }); // Execute command dynamically
      } catch (error) {
        response.general('❌ Comando Incorrecto');
        console.error('>> COMMAND -> Incorrect', error.message);
      }
    }
  }

  private async loadCommandFiles() {
    const path = resolve('dist', 'commands');
    const commandFiles = await fs.readdir(path);

    for (const file of commandFiles) {
      const command = await import(resolve(path, file));

      Bot.commandsList = { ...Bot.commandsList, ...command };
    }
  }
}

export { Bot };
